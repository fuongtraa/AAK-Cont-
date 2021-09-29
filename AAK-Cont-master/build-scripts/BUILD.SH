#!/bin/bash

set -e errexit
set -o pipefail
npm install
node build-filters.js --windows
echo build-filters.js ended
node build-uboruntime-with-rules.js --windows
echo build-uboruntime-with-rules.js ended
node build-scripts.js --windows
echo build-scripts.js ended
echo build finished
