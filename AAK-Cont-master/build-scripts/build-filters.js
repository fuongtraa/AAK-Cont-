//Build filter lists

"use strict";

const linebreak = process.argv[2] === "--windows" ? "\r\n" : "\n";

const {
    readFileSync: read,
    writeFileSync: write,
    existsSync: exist,
    createReadStream: readStream,
    createWriteStream: writeStream,
} = require("fs");

const https = require("https");

// The meta file
const metaFilePath = "../src/filer-meta.txt";
// uBlock Origin Base Fitlers
const uBOBaseFilterHost = "raw.githubusercontent.com";
const uBOBaseFilterPath = "/uBlockOrigin/uAssets/master/filters/filters.txt";
// uBlock Origin Unbreak Fitlers
const uBOUnbreakFilterHost = "raw.githubusercontent.com";
const uBOUnbreakFilterPath = "/uBlockOrigin/uAssets/master/filters/unbreak.txt";
// uBlock Protector filter list
const uBPListRulesHost = "raw.githubusercontent.com";
const uBPListRulesPath = "/jspenguin2017/uBlockProtector/master/List%20Compiler/List/3-rules.txt";
const uBPListGenerichideHost = "raw.githubusercontent.com";
const uBPListGenerichidePath = "/jspenguin2017/uBlockProtector/master/List%20Compiler/List/4-generichide.txt";
const uBPListOtherHost = "raw.githubusercontent.com";
const uBPListOtherPath = "/jspenguin2017/uBlockProtector/master/List%20Compiler/List/6-other.txt";
const uBPListWhitelistHost = "raw.githubusercontent.com";
const uBPListWhitelistPath = "/jspenguin2017/uBlockProtector/master/List%20Compiler/List/5-whitelist.txt";
// Filters that run everywhere in addition to uBlock Protector
const aakFiltersPath = "../src/filter-rules.txt";
// Filters that run only on uBO setups
const uBOExtraFiltersPath = "../src/filter-extra-ubo.txt";
// Filters that run only on non-uBO setups
const notuBOExtraFiltersPath = "../src/filter-extra-notubo.txt";
// Version configuration
const versionFileHost = "xuhaiyang1234.gitlab.io";
const versionFilePath = "/AAK-Cont/dist/version.json";
const versionFileOutputPath = "../dist/version.json";

// Outputs
const uBOOutputPath = "../dist/aak-cont-list-ubo.txt";
const notuBOOutputPath = "../dist/aak-cont-list-notubo.txt";
const conversionFiltersOutputPath = "tmp/filters-for-ubo-conversion.txt"


// Data parsed from files.
const meta = read(metaFilePath).toString().split("\n");
let uBOBaseFilters; // Fetch with AJAX
let uBOUnbreakFilters; // Fetch with AJAX
let uBPFiltersRules; // Fetch with AJAX
let uBPFiltersGenerichide; // Fetch with AJAX
let uBPFiltersOther; // Fetch with AJAX
let uBPFiltersWhitelist; // Fetch with AJAX
const aakFilters = read(aakFiltersPath).toString().split("\n");
const uBOExtra = read(uBOExtraFiltersPath).toString().split("\n");
const notuBOExtra = read(notuBOExtraFiltersPath).toString().split("\n");


let getNetworkFile = (host, path) => {
    return new Promise((resolve, reject) => {
        https.get({
            hostname: host,
            path: path
        }, (response) => {
            let source = "";
            response.on("data", (chunk) => {
                source += chunk;
            });
            response.on("end", () => {
                if (response.statusCode >= 200 && response.statusCode < 300) {
                    resolve(source);
                } else {
                    reject("Failed to retrieve network file: " + host + path);
                }
            });
        }).on("error", (error) => {
            reject(error);
        });
    });
};


Promise.all([
    getNetworkFile(uBOBaseFilterHost, uBOBaseFilterPath),
    getNetworkFile(uBOUnbreakFilterHost, uBOUnbreakFilterPath),
    getNetworkFile(uBPListRulesHost, uBPListRulesPath),
    getNetworkFile(uBPListGenerichideHost, uBPListGenerichidePath),
    getNetworkFile(uBPListOtherHost, uBPListOtherPath),
    getNetworkFile(uBPListWhitelistHost, uBPListWhitelistPath),
    //getNetworkFile(versionFileHost, versionFilePath)
]).then((fetchedFiles) => {
    uBOBaseFilters = fetchedFiles[0].toString().split("\n");
    uBOUnbreakFilters = fetchedFiles[1].toString().split("\n");
    uBPFiltersRules = fetchedFiles[2].toString().split("\n");
    uBPFiltersGenerichide = fetchedFiles[3].toString().split("\n");
    uBPFiltersOther = fetchedFiles[4].toString().split("\n");
    uBPFiltersWhitelist = fetchedFiles[5].toString().split("\n");

    let version = {version: "1.300"};//JSON.parse(fetchedFiles[6].toString());
    version.version = parseFloat(version.version) + 0.001;
    version.version = String(Math.round(version.version * 1000) / 1000);

    //Prevent Check if the version is not totally broken
    if (!/^\d+\.?\d*$/.test(version.version)) {
        console.error("Version number is broken.");
        console.error(version.version);
        process.exit(1);
    } else if (/^\d+$/.test(version.version)) {
        //No decimal point
        version.version += ".";
    }
    //Fill in digits
    {
        let counter = 0;
        while (!/\.\d{3}$/.test(version.version)) {
            version.version += "0";
            if ((++counter) > 5) {
                console.error("Stuck in a loop when processing version number.");
                console.error(version.version);
                process.exit(1);
            }
        }
    }

    version.date = new Date().getTime();

    let uBO = [];
    let notuBO = [];
    let conversionFilters = [];

    let isuBOFilter = function (filter) {
        if (/(\$|\$.*,)(badfilter|beacon|csp|first\-party|important|inline\-script|popunder|redirect)([^a-z]|$)/g.test(filter)) return true;
        else if (/\#\#.*\:(contains|has|has\-text|if|if\-not|inject|matches\-css|matches\-css\-before|matches\-css\-after|style|xpath)\(.*\)/g.test(filter)) return true;
        return false;
    };

    // Replace variables in meta.
    {
        for (let i = 0; i < meta.length; i++) {
            let entry = meta[i].trim();

            switch (entry) {
                case "@pragma-insert-title":
                    uBO.push("! Title: AAK-Cont Filter For uBlock Origin");
                    notuBO.push("! Title: AAK-Cont Filter For AdBlock, Adblock Plus, etc");
                    break;
                case "@pragma-insert-version":
                    uBO.push(`! Version: ${version.version}`);
                    notuBO.push(`! Version: ${version.version}`);
                    break;
                default:
                    uBO.push(entry);
                    notuBO.push(entry);
            }
        }
    }

    // Parse out uBlock Origin lists.
    {
        let lists = [uBOBaseFilters, uBOUnbreakFilters];
        for (let i = 0; i < lists.length; i++) {
            let currentlist = lists[i];
            for (let ii = 0; ii < currentlist.length; ii++) {
                let entry = currentlist[ii].trim();

                if (entry.charAt(0) === "!" || entry.charAt(0) === "#" || entry === "")
                    continue;

                if (isuBOFilter(entry)) {
                    conversionFilters.push(entry);
                } else {
                    notuBO.push(entry)
                }
            }
        }
    }

    // Parse out uBlock Protector filters.
    {
        let lists = [uBPFiltersRules, uBPFiltersGenerichide, uBPFiltersOther, uBPFiltersWhitelist];
        for (let i = 0; i < lists.length; i++) {
            let currentlist = lists[i];
            for (let ii = 0; ii < currentlist.length; ii++) {
                let entry = currentlist[ii].trim();

                if (entry.charAt(0) === "!" || entry === "")
                    continue;

                if (isuBOFilter(entry)) {
                    conversionFilters.push(entry);
                } else {
                    notuBO.push(entry)
                }
                uBO.push(entry);
            }
        }
    }

    // Parse out aak filters so the next script can convert them into JS.
    {
        for (let i = 0; i < aakFilters.length; i++) {
            let entry = aakFilters[i].trim();

            if (entry.charAt(0) === "!" || entry === "")
                continue;

            if (isuBOFilter(entry)) {
                conversionFilters.push(entry);
            } else {
                notuBO.push(entry);
            }
            uBO.push(entry);
        }
    }

    // Parse out extra filters. These are only added to their respective distribution lists.
    {
        let i;
        for (i = 0; i < uBOExtra.length; i++) {
            let entry = uBOExtra[i].trim();

            if (entry.charAt(0) === "!" || entry === "")
                continue;

            uBO.push(entry);
        }
        for (i = 0; i < notuBOExtra.length; i++) {
            let entry = notuBOExtra[i].trim();

            if (entry.charAt(0) === "!" || entry === "")
                continue;

            if (isuBOFilter(entry)) {
                conversionFilters.push(entry);
            } else {
                notuBO.push(entry);
            }
        }
    }

    // Write output
    write(uBOOutputPath, uBO.join(linebreak));
    write(notuBOOutputPath, notuBO.join(linebreak));
    write(conversionFiltersOutputPath, conversionFilters.join(linebreak));

    //Save version
    write(versionFileOutputPath, JSON.stringify(version));

}).catch((error) => {
    console.warn("An error occurred when building the filter list:");
    console.warn(error);
    process.exit(1);
});
