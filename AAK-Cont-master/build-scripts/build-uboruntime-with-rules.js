//Creates a temporary file "tmp/uboruntime-with-rules.js"
//Expects "build-filters.js" just ran

"use strict";

const fs = require("fs");
const https = require("https");

const filterPath = "tmp/filters-for-ubo-conversion.txt"; //Expects this is just updated by build-filters.js
const uboResourcesHost = "raw.githubusercontent.com";
const uboResourcesPath = "/uBlockOrigin/uAssets/master/filters/resources.txt";
const outputPath = "tmp/uboruntime-with-rules.js";

let runtimeHeaderText = `
/*=============
| uBO Runtime |
==============*/

var ubo = (function() {
    return {
`;

let runtimeFooterText = `
    }
})();


/*=============================
| uBO Generated Website Rules |
==============================*/

`;


// Build the runtime.
let buildRuntime = () => {
    return new Promise((resolve, reject) => {
        let outputJsRuntime = runtimeHeaderText;
        
        https.get({
            hostname: uboResourcesHost,
            path: uboResourcesPath
        }, (response) => {
            let uboResources = "";
            response.on("data", (chunk) => {
                uboResources += chunk;
            });
            response.on("end", () => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    let uboResourceDefs = uboResources.split(/(?:\r?\n){3,}/g);
                    let functionDefs = [];
                    for (let i=0; i<uboResourceDefs.length; i++) {
                        
                        // Get the info for each resource file.
                        let ii;
                        let lines = uboResourceDefs[i].split(/\r?\n/g);
                        let fileDefLine = null;
                        let fileContents = "";
                        for (ii=0; ii<lines.length; ii++) {
                            var line = lines[ii];
                            if (!fileDefLine) {
                                if (line && !line.startsWith("#")) {
                                    fileDefLine = line;
                                }
                            } else {
                                break;
                            }
                        }
                        fileContents = lines.slice(ii).join("\n");
                        
                        // Only take the JS functions.
                        if (fileDefLine && fileDefLine.endsWith("application/javascript")) {
                            let functionName = fileDefLine.split(/\s/g)[0].replace(/\.js$/g, "").replace(/[\-\.\/\*\"]/g,"_");
                            if (functionName) {
                                let functionContents = fileContents.replace(/"/g, "\\\"").replace(/\n/g, "\\n").replace(/\t/g, "\\t");
                                let functionDef = ``
                                    + `"${functionName}": (...arguments) => {\n`
                                    + `    var injectFunc = "${functionContents}";\n`
                                    + `    for (let i=0; i<10; i++) {\n`
                                    + `        injectFunc = injectFunc.replace(new RegExp("\\\\{\\\\{"+(i+1)+"\\\\}\\\\}", "g"), arguments[i] || "");\n`
                                    + `    }\n`
                                    + `    a.addScript(injectFunc, a.scriptInjectMode.eval);\n`
                                    + `}`;
                                    
                                // Correct indentation
                                functionDef = functionDef.split("\n");
                                for (let ii=0; ii<functionDef.length; ii++) {
                                    functionDef[ii] = "        " + functionDef[ii];
                                }
                                functionDef = "\n        " + functionDef.join("\n").trim();
                                
                                functionDefs.push(functionDef);
                            }
                        }
                        
                    }
                    outputJsRuntime += "        " + functionDefs.join(",");
                    outputJsRuntime += runtimeFooterText;
                    resolve(outputJsRuntime);
                } else {
                    reject("Failed to pull uAssets resources.txt");
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
        
    });
};


// Build the rules.
let buildRules = () => {
    return new Promise((resolve, reject) => {
        let outputJsRules = "";
        
        let filters = fs.readFileSync(filterPath).toString().split("\n");
        for (let i = 0; i < filters.length; i++) {
            let filter = filters[i].trim();

            // Skip other rules, we can't assume that we only have script inject rules anymore
            if (!filter.includes("##script:inject("))
                continue;

            if (!filter.startsWith("!")) {
                let filterSplit = filter.split("##");

                if (filterSplit.length == 2) {
                    // Make domain names strings separated by commas.
                    let domainNames = filterSplit[0].split(",");
                    for (let ii = 0; ii < domainNames.length; ii++) {
                        domainNames[ii] = '"' + domainNames[ii] + '"';
                    }
                    domainNames = domainNames.join(",");

                    // Inject args/function name to call 
                    let injectArgs = filterSplit[1].substring(filterSplit[1].indexOf("script:inject(") + 14, filterSplit[1].lastIndexOf(")")).split(",");
                    let funcName = injectArgs.shift().replace(/\.js$/g, "").replace(/[\-\.\/\*\"]/g, "_");
                    for (let ii = 0; ii < injectArgs.length; ii++) {
                        injectArgs[ii] = '"' + (injectArgs[ii] + "").trim().replace(/^\"/g, "").replace(/\"$/g, "") + '"';
                    }
                    injectArgs = injectArgs.join(",");

                    // Output to string.
                    outputJsRules += ``
                        + `if (a.domCmp([${domainNames}])) {\n`
                        + `    ubo["${funcName}"](${injectArgs});\n`
                        + `}\n`;

                }

            }
        }
        resolve(outputJsRules);
    });
};

Promise.all([buildRuntime(), buildRules()]).then((values) => {
    let outputJsRuntime = values[0];
    let outputJsRules = values[1];
    fs.writeFileSync(outputPath, outputJsRuntime + outputJsRules);
}).catch((error) => {
    console.warn(error);
    process.exit(1);
});