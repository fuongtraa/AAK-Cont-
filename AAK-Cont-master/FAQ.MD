# Frequently Asked Questions

#### What is the "upstream project"? 

It is [uBlock Protector](https://jspenguin2017.github.io/uBlockProtector/).
If you are using Chrome and uBlock Origin, it is highly recommended to use
uBlock Protector instead of AAK-Cont. 

#### What does "fixed upstream" mean? 

It means the issue was just fixed in the upstream project. AAK-Cont build
engines will pull update from upstream once a day, so if the issue persist
in AAK-Cont after 24 hours, then it is likely to be caused by the build
engines not being able to port the change. 

If you are a skilled programmer, please consider helping us to make better
build engines. 

#### What does "works upstream" mean? 

It means the issue does not exist in the upstream project, and a maintainer
needs to manually resolve the problem. 

Due to the lack of maintainer, this can take a while, please let me know if
you wish to help. 

#### Do I need AAK-Cont if I'm using uBlock Protector? 

No. You don't need the original AAK neither. 

#### Will AAK-Cont slow down my browser? 

Yes. If you are worried about this, please consider switching to
uBlock Protector, which is about two times faster. Since AAK-Cont needs to
support many different setups, there isn't an easy way to get around the
overhead, Merge Requests welcomed. 

#### Will AAK-Cont allow ads in? 

No, however, AAK-Cont may open a few third party connections. 
