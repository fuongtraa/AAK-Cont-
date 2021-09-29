# Contributor Guide

First, thank you for considering contributing! Your contributions, regardless of their size, are critical to the survival of this project! 
Let's start with having a look at the build process map. It flows from top-left to bottom-right unless otherwise indicated with arrows. 

All build scripts are located in `/build-scripts` directory, other source files are either located in `/src` directory or pulled from uBlock Protector repository. 
Build scripts run at least once a day, they will also run for every commit. Versioning is handled by the build script as well. 

```
+-----------------------+   +--------------+         +--------------------+
| uBlock Protector List |---| Build Script |---<<<---| Meta / Extra Rules |
+-----------------------+   +--------------+         +--------------------+
                                   |
                    +------------------------------+
                    | Comtatible with AdBlock/ABP? |
                    +------------------------------+
                    |                              |
                   Yes                             No
                    |                              |
        +-------------------------+   +-------------------------------+
        | AAK-Cont Generic Filter |   | AAK-Cont uBlock Origin Filter |
        +-------------------------+   +-------------------------------+
                    ^                              |
                    ^               +----------------------------------+
            Syntax Mapper----<<<----| uBlock Origin Runtime Transpiler |---Unable to Transpile
       (Not working for now)        +----------------------------------+          |
                                                   |                        +-----------+
                                          Scriptlet Transpiler              | Discarded |
                                                   |                        +-----------+
                                    +----------------------------------+
                                    | uBlock Origin Runtime Userscript |
                                    +----------------------------------+


+-------------------------+   +--------------+         +---------------------------------------------------+
| AAK-Cont Generic Filter |---| Build Script |---<<<---| White Lists as a Workaround for Discarded Filters |
+-------------------------+   +--------------+         +---------------------------------------------------+
          |                          |
          |        +------------------------------------------------+ 
          |        | (FINAL OUTPUT) AAK-Cont Filter for AdBlock/ABP |
          |        +------------------------------------------------+
          |
   +--------------+   +--------------------------------------------------+
   | Build Script |---| (FINAL OUTPUT) AAK-Cont Filter for uBlock Origin |
   +--------------+   +--------------------------------------------------+
          ^
          ^
+-------------------------------+
| AAK-Cont uBlock Origin Filter |
+-------------------------------+


+----------------------------+
| uBlock Protector Extension |
+----------------------------+
             |
     Manual port and test
             |
+---------------------------+   +--------------+         +-------------+
| AAK-Cont Userscript Rules |---| Build Script |---<<<---| Meta / Core |
+---------------------------+   +--------------+         +-------------+
                                         |
                +------------------------------------------------------+
                | (FINAL OUTPUT) AAK-Cont Userscript for uBlock Origin |
                +------------------------------------------------------+
                                         |
                                         |
                                +--------------+   +----------------------------------------------------+
                                | Build Script |---| (FINAL OUTPUT) AAK-Cont Userscript for AdBlock/ABP |
                                +--------------+   +----------------------------------------------------+
                                         ^
                                         ^
                         +----------------------------------+
                         | uBlock Origin Runtime Userscript |
                         +----------------------------------+
```

As you can see, filter porting and transpiling is *mostly* automated, but Userscript is not. If you are proficient in JavaScript and wish to help, 
please help us automate the rest of the process so AAK-Cont can stay in sync with uBlock Protector. 
Documentation of uBlock Protector Extension Core can be found 
[here](https://github.com/jspenguin2017/uBlockProtector/blob/master/Extension%20Compiler/Extension/content/content-core.js), 
[here](https://github.com/jspenguin2017/uBlockProtector/blob/master/Extension%20Compiler/Extension/content/content-domlib.js), and 
[here](https://github.com/jspenguin2017/uBlockProtector/blob/master/Extension%20Compiler/Extension/background/background-core.js). 
Documentation for core API of AAK-Cont can be found [here](https://gitlab.com/xuhaiyang1234/AAK-Cont/blob/master/src/aak-cont-script-core.js). 
Please keep in mind that `$` in uBlock Protector Extension is NOT jQuery and behaves *quite* differently, but `this.$` of AAK-Cont Core IS jQuery. 

In case you know nothing about JavaScript, don't worry, you can still help. Have a look at the issues tracker, and see if there are any issues that you can solve. 
Testers are also needed on a regular basis, that's when you'll shine. 

Ready to make a contribution? As many people uses this project, making sure it works is rather important, so please, test your changes in at least 2 browsers. 
I recommend testing in Firefox, then Edge or Safari as they are the most used browsers of this project. 
Although we will accept any write access applications for now, it is prefered if you can head over to the issues tracker and introduce yourself. 
