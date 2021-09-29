//Creates the files "dist/aak-cont-script-notubo.user.js" and "dist/aak-cont-script-ubo.user.js"
//Expects "build-filters.js", "build-ubp-rules-conversion.js", and "build-uboruntime-with-rules.js" just ran

"use strict";

const linebreak = process.argv[2] === "--windows" ? "\r\n" : "\n";

const fs = require("fs");
const esprima = require("esprima");

const metaScriptPath = "../src/aak-cont-script-meta.js";
const coreScriptPath = "../src/aak-cont-script-core.js";
const aakRulesPath = "../src/aak-cont-script-rules.js";
const uboRuntimePath = "tmp/uboruntime-with-rules.js";
const outputUboPath = "../dist/aak-cont-script-ubo.user.js";
const outputNotUboPath = "../dist/aak-cont-script-notubo.user.js";
const versionFile = "../dist/version.json";

const metaScriptContentLines = fs.readFileSync(metaScriptPath).toString().split("\n");
const coreScriptContent = fs.readFileSync(coreScriptPath).toString();
const aakRulesContent = fs.readFileSync(aakRulesPath).toString();
const uboRuntimeContent = fs.readFileSync(uboRuntimePath).toString();
const version = JSON.parse(fs.readFileSync(versionFile));

// Replace meta @pragma tags
let processedMeta_uBO = [];
let processedMeta_NotuBO = [];
{
    let i;
    for (i = 0; i < metaScriptContentLines.length; i++) {
        let entry = metaScriptContentLines[i].trim();

        switch (entry) {
            case "@pragma-insert-title":
                processedMeta_uBO.push("// @name AAK-Cont Userscript For uBlock Origin");
                processedMeta_NotuBO.push("// @name AAK-Cont Userscript For AdBlock, Adblock Plus, etc");
                break;
            case "@pragma-insert-version":
                processedMeta_uBO.push(`// @version ${version.version}`);
                processedMeta_NotuBO.push(`// @version ${version.version}`);
                break;
            case "@pragma-insert-urls":
                processedMeta_uBO.push(
                    `// @updateURL https://xuhaiyang1234.gitlab.io/AAK-Cont/dist/aak-cont-script-ubo.user.js` + linebreak +
                    `// @downloadURL https://xuhaiyang1234.gitlab.io/AAK-Cont/dist/aak-cont-script-ubo.user.js`
                );
                processedMeta_NotuBO.push(
                    `// @updateURL https://xuhaiyang1234.gitlab.io/AAK-Cont/dist/aak-cont-script-notubo.user.js` + linebreak +
                    `// @downloadURL https://xuhaiyang1234.gitlab.io/AAK-Cont/dist/aak-cont-script-notubo.user.js`
                );
                break;
            default:
                processedMeta_uBO.push(entry);
                processedMeta_NotuBO.push(entry);
        }
    }
}

let outputUbo = processedMeta_uBO.join(linebreak) + linebreak + coreScriptContent + linebreak + aakRulesContent;
let outputNotUbo = processedMeta_NotuBO.join(linebreak) + linebreak + coreScriptContent + linebreak + aakRulesContent + linebreak + uboRuntimeContent;

fs.writeFileSync(outputUboPath, outputUbo);
fs.writeFileSync(outputNotUboPath, outputNotUbo);

try {
    esprima.parse(outputUbo);
} catch(e) {
    console.warn("There are syntax error(s) in the uBlock Origin userscript.");
    console.warn(e);
    process.exit(1);
}
try {
    esprima.parse(outputNotUbo);
} catch(e) {
    console.warn("There are syntax error(s) in the non-uBlock Origin userscript.");
    console.warn(e);
    process.exit(1);
}
