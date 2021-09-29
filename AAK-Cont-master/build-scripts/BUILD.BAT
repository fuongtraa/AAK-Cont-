@ECHO OFF
NPM install
NODE build-filters.js --windows
ECHO build-filters.js ended
NODE build-uboruntime-with-rules.js --windows
ECHO build-uboruntime-with-rules.js ended
NODE build-scripts.js --windows
ECHO build-scripts.js ended
ECHO build finished
PAUSE
