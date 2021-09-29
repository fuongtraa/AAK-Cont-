//Creates the file "./tmp/ubp-rules.js"
//Expects "build-filters.js", and "build-uboruntime-with-rules.js" just ran

const fs = require("fs");
const https = require("https");
const esprima = require("esprima");

const ubpRulesHost = "raw.githubusercontent.com";
const ubpRulesPath = "/jspenguin2017/uBlockProtector/master/Script%20Compiler/Rules.js";
const outputPath = "tmp/ubp-rules.js";

https.get({
    hostname: ubpRulesHost,
    path: ubpRulesPath
}, (response) => {
    let source = "";
    response.on("data", (chunk) => {
        source += chunk;
    });
    response.on("end", () => {
        if (response.statusCode >= 200 && response.statusCode < 300) {
        
            let tokens = esprima.tokenize(source, { range: true });
            
            // Identify tokens to replace.
            var tokenReplacements = [];
            for (let i=0; i<tokens.length; i++) {
                if (tokens[i].value == ",") {
                    // Trailing commas inside function declaration.
                    if (tokens[i+1] && tokens[i+1].value == ")") {
                        tokenReplacements.push({
                            range: tokens[i].range,
                            replacement: ""
                        });
                    }
                }
            }
            // Replace identified tokens.
            for (let i=tokenReplacements.length-1; i>=0; i--) {
                let range = tokenReplacements[i].range;
                let replacement = tokenReplacements[i].replacement;
                source = source.slice(0, range[0]) + replacement + source.slice(range[1]);
            }
            
            // Validate ES6 syntax.
            try {
                esprima.parse(source);
            } catch(e) {
                console.warn("Esprima syntax validation failed!");
                console.warn(e);
                process.exit(1);
            }
            
            // Write to filesystem.
            fs.writeFileSync(outputPath, source);
            
        } else {
            console.warn("There was a problem fetching the master file.");
            process.exit(1);
        }
    });
});
