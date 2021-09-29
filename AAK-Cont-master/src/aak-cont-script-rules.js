/*=========================================================================
| AAK Website Rules                                                       |
| (Please keep in alphabetical order to avoid unnecessary duplicates.)    |
==========================================================================*/

//@pragma-keepline uBlock Protector Rules Start
//@pragma-keepline Solutions from Anti-Adblock Killer (originally by Reek) are modified to fit my Core API
//@pragma-keepline Anti-Adblock Killer Repository (contains original source code and license): https://github.com/reek/anti-adblock-killer

//Initialization
a.init({
    all: a.domCmp(["360.cn", "apple.com", "ask.com", "baidu.com", "bing.com", "bufferapp.com",
        "chromeactions.com", "easyinplay.net", "ebay.com", "facebook.com", "flattr.com", "flickr.com",
        "ghacks.net", "imdb.com", "imgbox.com", "imgur.com", "instagram.com", "jsbin.com", "jsfiddle.net",
        "linkedin.com", "live.com", "mail.ru", "microsoft.com", "msn.com", "paypal.com", "pinterest.com",
        "preloaders.net", "qq.com", "reddit.com", "stackoverflow.com", "tampermonkey.net", "twitter.com",
        "vimeo.com", "wikipedia.org", "w3schools.com", "yandex.ru", "youtu.be", "youtube.com", "xemvtv.net",
        "vod.pl", "agar.io", "pandoon.info", "fsf.org", "adblockplus.org", "plnkr.co", "exacttarget.com",
        "dolldivine.com", "popmech.ru", "calm.com", "chatango.com", "spaste.com"], true) || 
        a.domInc(["192.168.0", "192.168.1", "google", "google.co", "google.com", "amazon", "ebay", "yahoo"], true),
    Adfly: a.domCmp(["adf.ly", "ay.gy", "j.gs", "q.gs", "gamecopyworld.click", "babblecase.com",
        "pintient.com", "atominik.com", "bluenik.com", "sostieni.ilwebmaster21.com", "auto-login-xxx.com",
        "microify.com", "riffhold.com"]),
    adsjsV2: !a.domCmp(["gamersclub.com.br", "uploadboy.com", "vidoza.net", "videohelp.com", "zeiz.me",
        "passionea300allora.it", "memurlar.net", "palemoon.org", "stocks.cafe", "listamais.com.br",
         "acquavivalive.it"]),
    NoAdBlock: a.domCmp([], true)
});

    
//Rules start
if (a.domCmp(["aetv.com", "history.com", "mylifetime.com"])) {
    a.addScript(() => {
        "use strict";
        let val;
        window.Object.defineProperty(window, "_sp_", {
            configurable: false,
            set(value) {
                val = value;
            },
            get() {
                //Patch detection
                try {
                    val.checkState = (e) => { e(false); };
                    val.isAdBlocking = (e) => { e(false); };
                    delete val._detectionInstance;
                } catch (err) { }
                return val;
            },
        });
    });
}
if (a.domCmp(["blockadblock.com"])) {
    a.filter("eval");
    a.ready(() => {
        a.$("#babasbmsgx").remove();
    });
}
if (a.domCmp(["sc2casts.com"])) {
    a.readOnly("scriptfailed", () => { });
    a.filter("setTimeout");
}
if (a.domCmp(["jagranjunction.com"])) {
    a.readOnly("canRunAds", true);
    a.readOnly("isAdsDisplayed", true);
}
if (a.domCmp(["usapoliticstoday.com"])) {
    a.filter("eval");
}
if (a.domCmp(["jansatta.com", "financialexpress.com", "indianexpress.com"])) {
    a.readOnly("RunAds", true);
}
if (a.domCmp(["livemint.com"])) {
    a.readOnly("canRun1", true);
}
if (a.domCmp(["userscloud.com"])) {
    a.on("load", () => {
        a.$("#dl_link").show();
        a.$("#adblock_msg").remove();
    });
}
if (a.domCmp(["vidlox.tv", "vidoza.net"])) {
    //NSFW!
    a.readOnly("xRds", false);
    a.readOnly("cRAds", true);
}
if (a.domCmp(["cwtv.com"])) {
    //Thanks to szymon1118
    a.readOnly("wallConfig", false);
}
if (a.domCmp(["theinquirer.net"])) {
    a.readOnly("_r3z", true);
}
if (a.domCmp(["tweaktown.com"])) {
    a.on("load", () => {
        //Force enable scrolling
        a.css("html, body { overflow:scroll; }");
        //Watch and remove block screen
        const blockScreenRemover = () => {
            if (a.$("body").children("div").last().text().indexOf("Ads slowing you down?") > -1) {
                a.$("body").children("div").last().remove();
                a.$("body").children("div").last().remove();
            } else {
                a.setTimeout(blockScreenRemover, 500);
            }
        };
        a.setTimeout(blockScreenRemover, 500);
    });
}
if (a.domCmp(["ratemyprofessors.com"])) {
    a.readOnly("adBlocker", false);
    a.filter("addEventListener", a.matchMethod.RegExp, /^resize$/i);
}
if (a.domCmp(["gamepedia.com"])) {
    a.on("load", () => {
        a.$("#atflb").remove();
    });
}
if (a.domCmp(["cbox.ws"])) {
    a.readOnly("koddostu_com_adblock_yok", true);
}
if (a.domCmp(["pinkrod.com", "wetplace.com"])) {
    //NSFW!
    a.readOnly("getAd", () => { });
    a.readOnly("getUtm", () => { });
}
if (a.domInc(["hackintosh"])) {
    //Undo BlockAdblock styles
    a.readOnly("eval", () => {
        a.$("#babasbmsgx").remove();
        a.doc.body.style.setProperty("visibility", "visible", "important");
    });
    //Prevent article hidding
    if (a.domCmp(["hackintosh.computer"], true)) {
        a.noAccess("google_jobrunner");
    }
}
if (a.domCmp(["tvregionalna24.pl"])) {
    let text = [];
    const matcher = /var _ended=(.*);var _skipButton/;
    a.readOnly("videojs", (a, b, func) => {
        let temp = "(" + matcher.exec(String(func))[1] + ")();";
        temp = temp.replace("player.dispose();", "");
        text.push(temp);
    });
    a.on("load", function replace() {
        if (text.length > 0 && a.$(".vjs-poster").length > 0) {
            for (let i = 0; i < text.length; i++) {
                a.win.eval(text[i]);
            }
        } else {
            a.setTimeout(replace, 1000);
        }
    });
}
if (a.domCmp(["tvn.pl", "tvnstyle.pl", "tvnturbo.pl", "kuchniaplus.pl", "miniminiplus.pl"])) {
    //tvn.pl and related domains
    //Replace player - Thanks to mikhoul, szymon1118, and xxcriticxx
    //Potential related domains: "tvnfabula.pl", "itvnextra.pl", "tvn24bis.pl", "ttv.pl",
    //"x-news.pl", "tvn7.pl", "itvn.pl"
    const homePages = ["http://www.tvn.pl/", "http://www.tvnstyle.pl/", "http://www.tvnturbo.pl/"];
    //Homepages are partially fixed and are handled by List
    if (!homePages.includes(a.doc.location.href)) {
        a.on("load", () => {
            a.$(".videoPlayer").parent().after(a.nativePlayer(a.$(".videoPlayer").data("src"))).remove();
        });
    }
}
if (a.domCmp(["player.pl"])) {
    const matcher = /[.,]/;
    a.on("load", () => {
        //Check element
        let elem;
        if (a.$("header.detailImage").length > 0) {
            elem = a.$("header.detailImage");
        } else {
            return;
        }
        //Get ID
        const parts = a.doc.location.href.split(matcher);
        const id = parts[parts.length - 2];
        const params = {
            platform: "ConnectedTV",
            terminal: "Panasonic",
            format: "json",
            authKey: "064fda5ab26dc1dd936f5c6e84b7d3c2",
            v: "3.1",
            m: "getItem",
            id: id,
        };
        const api = "https://api.tvnplayer.pl/api/?" + a.serialize(params);
        const proxy = "http://www.proxy.xmc.pl/index.php?hl=3e5&q=";
        //Send request
        const requestURL = (a.cookie("tvn_location2") === "1") ? api : proxy +
            a.win.encodeURIComponent(api);
        GM_xmlhttpRequest({
            method: "GET",
            url: requestURL,
            onload(result) {
                //Find media url
                let url;
                try {
                    let data = JSON.parse(result.responseText);
                    let vidSources = data.item.videos.main.video_content;
                    if (vidSources[1].url) {
                        //Native player
                        elem.html("").append(a.nativePlayer(vidSources[1].url));
                        a.$("video").css("max-height", "540px");
                    } else if (vidSources[0].src) {
                        //DRM protected
                        a.out.error("AAK will not replace this video player " +
                            "because it is DRM prtected.");
                    }
                } catch (err) {
                    a.out.error("AAK failed to find media URL!");
                }
            },
            onerror() {
                a.out.error("AAK failed to find media URL!");
            },
        });
    });
}
if (a.domCmp(["abczdrowie.pl", "autokrata.pl", "autokult.pl", "biztok.pl", "gadzetomania.pl", "hotmoney.pl",
    "kafeteria.pl", "kafeteria.tv", "komediowo.pl", "komorkomania.pl", "money.pl", "pudelek.tv", "sfora.pl",
    "snobka.pl", "wawalove.pl", "wp.pl", "wp.tv", "wrzuta.pl", "pudelek.pl", "fotoblogia.pl", "parenting.pl",
    "echirurgia.pl", "pudelekx.pl", "o2.pl", "kardiolo.pl"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/70
    //Thanks to ghajini
    a.cookie("ABCABC", "true");
    a.filter("addEventListener", a.matchMethod.stringExact, "advertisement");
    a.readOnly("hasSentinel", () => false);
}
/*
if (a.domCmp(["abczdrowie.pl", "autokrata.pl", "autokult.pl", "biztok.pl", "gadzetomania.pl", "hotmoney.pl",
"kafeteria.pl", "kafeteria.tv", "komediowo.pl", "komorkomania.pl", "money.pl", "pudelek.tv", "sfora.pl",
"snobka.pl", "wawalove.pl", "wp.pl", "wp.tv", "wrzuta.pl", "pudelek.pl", "fotoblogia.pl"]) &&
!a.domCmp(["i.wp.pl"], true)) {
*/
if (a.domCmp(["money.pl", "parenting.pl", "tech.wp.pl", "sportowefakty.wp.pl", "teleshow.wp.pl", "moto.wp.pl"], true)) {
    //wp.pl and related domains
    //Thanks to szymon1118
    //Variables
    let mid; //Media ID of next video
    let midArray1 = []; //Media IDs method 1
    let midArray2 = []; //Media IDs method 2
    let url = null; //URL of the next video
    let replaceCounter = 0; //The number of video players that are replaced
    let loadCounter = 0; //The index of next item to load
    let networkBusy = false; //A flag to prevent sending a new request before the first one is done
    let networkErrorCounter = 0; //Will stop sending request if this is over 5
    let isInBackground = false; //A flag to prevent excessive CPU usage when the tab is in background
    //The player container matcher
    let containerMatcher = ".wp-player-outer, .player__container, .wp-player, .embed-container";
    //if (a.domCmp(["wp.tv"], true)) {
    //    containerMatcher = "";
    //}
    //if (a.domCmp(["wiadomosci.wp.pl"], true)) {
    //    containerMatcher = ".wp-player";
    //}
    //if (a.domCmp(["autokult.pl"], true)) {
    //    containerMatcher = ".embed-container";
    //}
    const matcher = /mid[=,]([0-9]+)/;
    //Main function
    const main = () => {
        //Do not tick when in background
        if (isInBackground) {
            return;
        }
        //Log media ID arrays
        a.config.debugMode && a.out.log(midArray1, midArray2);
        //Mid grabbing method 1
        try {
            if (a.win.WP.player.list.length > midArray1.length) {
                let thisMid = a.win.WP.player.list[midArray1.length].p.url;
                if (thisMid) {
                    thisMid = thisMid.substring(thisMid.lastIndexOf("=") + 1);
                }
                //Extra safety check
                if (thisMid) {
                    midArray1.push(thisMid);
                }
            }
        } catch (err) {
            a.out.error("AAK failed to find media ID with method 1!");
        }
        //Mid grabbing method 2
        if (a.$(containerMatcher).length > 0) {
            const elem = a.$(containerMatcher).first().find(".titlecont a.title");
            let thisMid = elem.attr("href");
            //Check if I got the element
            if (thisMid) {
                thisMid = matcher.exec(thisMid)[1].toString();
                //I will destroy the player soon anyway, I will remove this now so I will not grab it twice
                elem.remove();
            }
            //Extra safety check
            if (thisMid) {
                midArray2.push(thisMid);
            }
        }
        //See if I need to load next URL
        if (loadCounter === replaceCounter) {
            //Check flag and error counter
            if (networkBusy || networkErrorCounter > 5) {
                return;
            }
            //Get media ID
            let mid;
            //Prefer media ID grabbing method 2
            let midArray = (midArray1.length > midArray2.length) ? midArray1 : midArray2;
            if (midArray.length > loadCounter) {
                mid = midArray[loadCounter];
            } else {
                return;
            }
            //Get media JSON, I do not need to check if mid is found since the function will return if it is not
            networkBusy = true;
            GM_xmlhttpRequest({
                method: "GET",
                url: `http://wp.tv/player/mid,${mid},embed.json`,
                onload(res) {
                    //Try to find media URL
                    try {
                        const response = JSON.parse(res.responseText);
                        for (let i = 0; i < response.clip.url.length; i++) {
                            let item = response.clip.url[i];
                            if (item.quality === "HQ" && item.type.startsWith("mp4")) {
                                url = item.url;
                                break;
                            }
                        }
                        //Check if I found the URL
                        if (!url) {
                            throw "Media URL Not Found";
                        }
                        //Update counter
                        loadCounter++;
                        //Reset error counter
                        networkErrorCounter = 0;
                    } catch (err) {
                        a.out.error("AAK failed to find media URL!");
                        networkErrorCounter += 1;
                    }
                    //Update flag
                    networkBusy = false;
                },
                onerror() {
                    a.out.error("AAK failed to load media JSON!");
                    networkErrorCounter += 0.5;
                    //Update flag
                    networkBusy = false;
                },
            });
        } else {
            if (a.$(containerMatcher).length > 0) {
                //Log element to be replace
                if (a.config.debugMode) {
                    a.out.log("Replacing player...");
                    a.out.log(a.$(containerMatcher)[0]);
                }
                //Replace player
                a.$(containerMatcher).first().after(a.nativePlayer(url)).remove();
                //Update variables and counter
                url = null;
                replaceCounter++;
            }
        }
    };
    //The function will not run if the page is in the background, once per second will be fine
    a.setInterval(main, 1000);
    a.on("focus", () => { isInBackground = false; });
    a.on("blur", () => { isInBackground = true; });
}
if (a.domCmp(["mid-day.com", "happytrips.com"])) {
    a.readOnly("canRun", true);
}
if (a.domCmp(["ewallstreeter.com"])) {
    a.readOnly("OAS_rdl", 1);
}
if (a.domCmp(["megogo.net"])) {
    a.readOnly("adBlock", false);
    a.readOnly("showAdBlockMessage", () => { });
}
if (a.domCmp(["elektroda.pl"])) {
    a.filter("setTimeout", a.matchMethod.string, "adBlockTest.offsetHeight");
}
if (a.domCmp(["anandabazar.com"])) {
    a.readOnly("canRunAds", false);
    a.config.allowGeneric = false;
}
if (a.domCmp(["wtkplay.pl"])) {
    a.readOnly("can_run_ads", true);
}
if (a.domCmp(["betterdocs.net"])) {
    a.filter("eval", a.matchMethod.string, "eval(function(p,a,c,k,e,d)");
}
if (a.domCmp(["webqc.org"])) {
    a.filter("setTimeout");
}
if (a.domCmp(["wired.com"])) {
    a.readOnly("google_onload_fired", true);
}
if (a.domInc(["knowlet3389.blogspot"])) {
    a.filter("setTimeout", a.matchMethod.string, '$("#gAds").height()');
}
if (a.domCmp(["freegameserverhost.com"])) {
    a.css("#fab13 { height:11px; }");
}
if (a.domCmp(["elahmad.com"])) {
    a.css("#adblock { height:1px; }");
}
if (a.domCmp(["mrtzcmp3.net"])) {
    a.css(".rtm_ad { height:1px; }");
}
if (a.domCmp(["bknime.com", "go4up.com", "debrido.com"])) {
    a.css(".myTestAd { height:1px; }");
}
if (a.domCmp(["debridfast.com", "getdebrid.com", "debrid.us", "leecher.us"])) {
    a.css(".myTestAd, .my24Ad, .nabil { height:1px; }");
    a.ready(() => {
        a.$("#simpleAd").html(`<p style="display:none;">debridfast.com</p>`);
    })
}
if (a.domCmp(["bg-gledai.tv"])) {
    a.css(".myAd { height:1px; }");
}
if (a.domCmp(["thepcspy.com"])) {
    a.css(".myTestAd { height:1px; }");
    a.css(".blocked { display:none; }");
    a.ready(() => {
        a.$(".blocked").remove();
    })
}
if (a.domCmp(["vg.no", "e24.no"])) {
    a.css(".ad { display:none; }");
}
if (a.domCmp(["automobile-sportive.com"])) {
    a.css(".myTestAd { height:51px; display:none; }");
}
if (a.domCmp(["snsw.us"])) {
    a.css("#ad_1 { height:1px; }");
}
if (a.domCmp(["urlchecker.net"])) {
    a.css("#adchecker { height:20px; }");
}
if (a.domCmp(["skiplimite.tv"])) {
    a.css("div.addthis_native_toolbox + div[id] { height:12px; }");
}
if (a.domCmp(["filecore.co.nz"])) {
    a.css(".adsense { height:5px; }");
}
if (a.domCmp(["thomas-n-ruth.com"])) {
    a.css(".Google { height:5px; }");
}
if (a.domCmp(["interfans.org"])) {
    a.css(".ad_global_header { height:1px; display:none; }");
}
if (a.domCmp(["maxdebrideur.com"])) {
    a.css(".clear + div[id] { height:12px; }");
}
if (a.domCmp(["topzone.lt"])) {
    a.css(".forumAd { height: 1px; display:none; }");
}
if (a.domInc(["nana10"])) {
    a.css("#advert-tracker { height:1px; }");
}
if (a.domCmp(["plej.tv"])) {
    a.css(".advert_box { height:1px; }");
}
if (a.domCmp(["mangamint.com"])) {
    a.css(".ad728 { height:31px; }");
}
if (a.domCmp(["debrideurstream.fr"])) {
    a.css("#content div[id][align=center] { height:12px; }");
}
if (a.domCmp(["preemlinks.com"])) {
    a.css("#divads { height:1px; }");
}
if (a.domCmp(["hentai.to"])) {
    a.css("#hentaito123 { height:11px; }");
}
if (a.domCmp(["prototurk.com"])) {
    a.css("#reklam { height:1px; }");
}
if (a.domCmp(["mufa.de"])) {
    a.css("#leaderboard { height:5px; }");
    a.css("#large-rectangle { height:5px; }");
    a.css("#ad-header-468x60 { height:5px; }");
}
if (a.domCmp(["watcharab.com"])) {
    a.css("#adblock { height:5px; }");
}
if (a.domCmp(["freedom-ip.com"])) {
    a.css(".pub_vertical ins, .pub_vertical div { height:11px; }");
}
if (a.domCmp(["wakanim.tv"])) {
    a.css("#detector { display:none; }");
    a.css("#nopub { display:block; }");
}
if (a.domCmp(["simply-debrid.com"])) {
    a.win.adsbygoogle = {};
    a.win.adsbygoogle.loaded = true;
}
if (a.domCmp(["manga9.com", "mangabee.co"])) {
    a.css(".adblock { height:31px; }");
}
if (a.domCmp(["onemanga2.com"])) {
    a.css(".afs_ads { height:5px; }");
}
if (a.domCmp(["mangabird.com"])) {
    a.css(".afs_ads { height:5px; }");
}
if (a.domCmp(["kodilive.eu"])) {
    a.css(".Ad { height:5px; }");
}
if (a.domCmp(["backin.net"])) {
    a.css("#divad { height:31px; }");
}
if (a.domCmp(["mobile-tracker-free.com"])) {
    a.css("#myAds { height:1px; }");
}
if (a.domCmp(["workupload.com"])) {
    a.always(() => {
        a.css(".adBlock, .adsbygoogle, #sad { height:11px; }");
    });
}
if (a.domCmp(["intoday.in", "businesstoday.in", "lovesutras.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/109
    a.css("#adbocker_alt { display:none; }");
    a.readOnly("openPopup", () => { });
}
if (a.domCmp(["jc-mp.com"])) {
    a.css(".adsense { width:1px; height:1px; visibility:hidden; display:block; position:absolute; }");
}
if (a.domCmp(["mariage-franco-marocain.net"])) {
    a.css("#my_ad_div { height:1px; }");
}
if (a.domCmp(["happy-hack.ru"])) {
    a.css("#blockblockF4 { visibility:invisible; display:none; } #blockblockF4 td {visibility:invisible; display:none; } " +
        "#blockblockF4 td p { visibility:invisible; display:none; } #blockblockD3 { visibility:visible; display:block; }");
}
if (a.domCmp(["forbes.com"])) {
    if (a.win.location.pathname.includes("/welcome")) {
        a.cookie("welcomeAd", "true", 86400000, "/");
        a.cookie("dailyWelcomeCookie", "true", 86400000, "/");
        a.win.location = a.cookie("toUrl") || "https://www.forbes.com/";
    }
}
if (a.domCmp(["bitcoinaliens.com"])) {
    a.bait("ins", ".adsbygoogle");
}
if (a.domCmp(["osoarcade.com", "d3brid4y0u.info", "fileice.net", "nosteam.ro", "openrunner.com", "easybillets.com",
    "spox.fr", "yovoyages.com", "tv3.co.nz", "freeallmusic.info", "putlocker.com", "sockshare.com", "dramapassion.com",
    "yooclick.com", "online.ua"])) {
    a.bait("div", "#tester");
}
if (a.domCmp(["filecom.net", "upshare.org", "skippyfile.com", "mwfiles.net", "up-flow.org"])) {
    a.bait("div", "#add");
}
if (a.domCmp(["leaguesecretary.com", "teknogods.com", "hellsmedia.com"])) {
    a.bait("div", "#adpbtest");
}
if (a.domCmp(["freesportsbet.com", "sportsplays.com"])) {
    a.bait("div", "#ad-tester");
}
if (a.domCmp(["tgo-tv.com"])) {
    a.css("#adb, #bannerad1, .load_stream { display:none; }");
    a.bait("div", "#tester");
    a.on("load", () => {
        a.win.threshold = 1000;
        a.$(".chat_frame").remove();
    });
}
if (a.domCmp(["freegamehosting.nl"])) {
    a.bait("div", "#adtest");
}
if (a.domCmp(["theweatherspace.com"])) {
    a.bait("div", "#ab-bl-advertisement");
}
if (a.domCmp(["cleodesktop.com"])) {
    a.bait("div", "#myTestAd");
}
if (a.domCmp(["imageraider.com"])) {
    a.bait("div", "#myGContainer");
}
if (a.domCmp(["voici.fr", "programme-tv.net"])) {
    a.bait("div", "#sas_script2");
}
if (a.domCmp(["mil.ink"])) {
    a.bait("div", "#ads_div");
}
if (a.domCmp(["stream4free.eu"])) {
    a.bait("div", "#jpayday");
    a.readOnly("jpayday_alert", 1);
}
if (a.domCmp(["lg-firmware-rom.com"])) {
    a.readOnly("killads", true);
}
if (a.domCmp(["badtv.it", "badtaste.it", "badgames.it", "badcomics.it"])) {
    a.cookie("adBlockChecked", "disattivo");
}
if (a.domCmp(["independent.co.uk"])) {
    a.cookie("adblock_detected", "ignored");
}
if (a.domCmp(["3dnews.ru"])) {
    a.cookie("adblockwarn", "1");
    a.css("#earAds { width:401px; }");
    a.bait("div", "#earAds");
    a.readOnly("__AT_detected", true);
}
if (a.domCmp(["esmas.com"])) {
    a.readOnly("opened_adbblock", false);
}
if (a.domInc(["pinoy1tv"])) {
    a.readOnly("allowads", 1);
}
if (a.domCmp(["business-standard.com"])) {
    a.readOnly("adsLoaded", 1);
    a.cookie("_pw", "t");
}
/*
if (a.domCmp(["indiatimes.com", "samayam.com", "bangaloremirror.com"])) {
    //Patch HTML
    a.patchHTML(function (html) {
        html = html.replace("\\\\x61\\\\x64\\\\x62", a.c.syntaxBreaker);
        html = html.replace("function initBlock", a.c.syntaxBreaker);
        return html;
    });
}
*/
if (a.domCmp(["thechive.com"])) {
    a.readOnly("stephaneDetector", {
        hook(cb) { cb(false); },
        init() { },
        broadcastResult() { },
    });
}
if (a.domCmp(["richonrails.com"])) {
    a.ready(() => {
        const adsByGoogleHtml = `"<ins+id="aswift_0_expand"+style="display:inline-table;border:none;height:90px;` +
            `margin:0;padding:0;position:relative;visibility:visible;width:750px;background-color:transparent"><ins+id="aswi` +
            `ft_0_anchor"+style="display:block;border:none;height:90px;margin:0;padding:0;position:relative;visibility:visib` +
            `le;width:750px;background-color:transparent"><iframe+marginwidth="0"+marginheight="0"+vspace="0"+hspace="0"+all` +
            `owtransparency="true"+scrolling="no"+allowfullscreen="true"+onload="var+i=this.id,s=window.google_iframe_oncopy` +
            `,H=s&amp;&amp;s.handlers,h=H&amp;&amp;H[i],w=this.contentWindow,d;try{d=w.document}catch(e){}if(h&amp;&amp;d&am` +
            `p;&amp;(!d.body||!d.body.firstChild)){if(h.call){setTimeout(h,0)}else+if(h.match){try{h=s.upd(h,i)}catch(e){}w.` +
            `location.replace(h)}}"+id="aswift_0"+name="aswift_0"+style="left:0;position:absolute;top:0;"+width="750"+frameb` +
            `order="0"+height="90"></iframe></ins></ins>"`;
        a.$.ajax({
            url: a.$(".article-content").data("url"),
            dataType: "script",
            method: "post",
            data: {
                html: adsByGoogleHtml,
            },
            success(result) {
                const exec = result.replace("$('.article-content')", "$('.article-content-2')");
                a.win.eval(exec);
            },
        });
        a.$(".article-content").after(`<div class="article-content-2"></div>`).remove();
    });
}
if (a.domCmp(["rmprepusb.com"])) {
    a.cookie("jot_viewer", "3");
}
if (a.domCmp(["cubeupload.com"])) {
    a.filter("document.write", a.matchMethod.string, "Please consider removing adblock to help us pay our bills");
}
if (a.domCmp(["hentaihaven.org"])) {
    //NSFW!
    //Thanks to uBlock-user
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/76
    a.noAccess("desktop_variants");
}
if (a.domCmp(["primeshare.tv"])) {
    a.bait("div", "#adblock");
}
if (a.domCmp(["debridnet.com", "livedebrid.com"])) {
    a.css(".myTestAd2 { height:5px; }");
    a.bait("div", ".myTestAd2");
}
if (a.domCmp(["bluesatoshi.com"])) {
    a.css("#test { height:280px; }");
    a.bait("div", "#test");
}
if (a.domCmp(["razercrypt.com", "satoshiempire.com", "oneadfaucet.com"])) {
    a.css("#test { height:250px; }");
    a.bait("div", "#test");
}
if (a.domCmp(["jkanime.net"])) {
    a.bait("div", "#reco");
}
if (a.domCmp(["720pmkv.com"])) {
    a.bait("div", "#advert");
}
if (a.domCmp(["paidverts.com"])) {
    a.bait("div", ".afs_ads");
}
if (a.domCmp(["italiatv.org"])) {
    a.bait("div", "#fab13");
}
if (a.domCmp(["eventhubs.com"])) {
    a.bait("div", "#blahyblaci1");
}
if (a.domCmp(["superanimes.com"])) {
    a.bait("div", "#bannerLoja");
}
if (a.domCmp(["forum.pac-rom.com"])) {
    a.bait("div", ".banner_ads");
}
if (a.domCmp(["litv.tv"])) {
    a.bait("div", ".player_mask");
}
if (a.domCmp(["leveldown.fr"])) {
    a.bait("div", "#adblock");
    a.bait("div", "#adblocktest");
}
if (a.domCmp(["globeslot.com"])) {
    a.bait("div", "#add");
    a.bait("div", "#add1");
}
if (a.domCmp(["antennesport.com", "serverhd.eu"])) {
    a.ready(() => {
        a.$("#pub .pubclose").remove();
        a.$("#pub .embed iframe").attr("src", "/embed/embed.php");
    });
}
if (a.domCmp(["drivearabia.com", "putlocker.com", "doatoolsita.altervista.org", "sockshare.com",
    "free-movie-home.com", "pc.online143.com", "kooora.com", "str3amtv.co.nr", "str3amtv.altervista.org",
    "str3am.altervista.org", "filecom.net", "pipocas.tv", "generatupremium.biz", "mega-debrid.eu",
    "premiumst0re.blogspot.com", "dl-protect.com", "newsinlevels.com", "vipracing.biz", "businesstoday.in"])) {
    a.filter("alert");
}
if (a.domCmp(["generatupremium.biz"])) {
    a.cookie("genera", "false");
}
if (a.domCmp(["newstatesman.com"])) {
    a.cookie("donationPopup", "hide");
}
if (a.domCmp(["yes.fm"])) {
    a.readOnly("com_adswizz_synchro_initialize", () => { });
}
if (a.domCmp(["tek.no", "gamer.no", "teknofil.no", "insidetelecom.no", "prisguide.no", "diskusjon.no",
    "teknojobb.no", "akam.no", "hardware.no", "amobil.no"])) {
    a.ready(() => {
        a.$("<div>").attr("id", "google_ads_iframe_").html("<p></p>").appendTo("body");
    });
}
if (a.domInc(["planetatvonlinehd.blogspot"]) || a.domCmp(["planetatvonlinehd.com"])) {
    a.css(".adsantilok { height:1px; }");
}
if (a.domCmp(["beta.speedtest.net"])) {
    a.readOnly("adsOoklaComReachable", true);
    a.readOnly("scriptsLoaded", () => { });
}
if (a.domCmp(["binbucks.com"])) {
    a.readOnly("testJuicyPay", true);
    a.readOnly("testSensePay", true);
}
if (a.domCmp(["whiskyprijzen.com", "whiskyprices.co.uk", "whiskypreise.com", "whiskyprix.fr"])) {
    a.readOnly("OA_show", true);
}
if (a.domCmp(["di.se"])) {
    a.ready(() => {
        a.$("#header_overlay").remove();
        a.$("#message_modal").remove();
    });
}
if (a.domCmp(["libertaddigital.com"])) {
    a.readOnly("ad_already_played", true);
    a.readOnly("puedeMostrarAds", true);
}
if (a.domCmp(["folha.uol.com.br"])) {
    a.readOnly("paywall_access", true);
    a.readOnly("folha_ads", true);
}
if (a.domCmp(["gamer.com.tw"])) {
    a.readOnly("AntiAd", null);
};
if (a.domCmp(["armorgames.com"])) {
    a.readOnly("ga_detect", null);
}
if (a.domCmp(["mangahost.com"])) {
    a.readOnly("testDisplay", false);
}
if (a.domCmp(["videowood.tv"])) {
    a.filter("open");
    a.win.config = {};
    a.readOnly("adb_remind", false);
}
if (a.domCmp(["infojobs.com.br"])) {
    /*
    a.win.webUI = {};
    a.win.webUI.Utils = {};
    const noop = () => { };
    a.win.Object.defineProperty(a.win.webUI.Utils, "StopAdBlock", {
        configurable: false,
        set() { },
        get() {
            return noop;
        },
    });
    */
    //They changed detection method, the new detection method should be caught in the generic anti-bait filter
    //Enforce again just in case
    a.readOnly("adblock", 0);
}
if (a.domCmp(["cloudwebcopy.com"])) {
    a.filter("setTimeout");
}
if (a.domCmp(["narkive.com"])) {
    a.readOnly("adblock_status", () => false);
}
if (a.domCmp(["pregen.net"])) {
    a.cookie("pgn", "1");
}
if (a.domCmp(["phys.org"])) {
    a.readOnly("chkAB", () => { });
}
if (a.domCmp(["onvasortir.com"])) {
    a.readOnly("JeBloque", () => { });
}
if (a.domCmp(["fullhdzevki.com"])) {
    a.readOnly("check", () => { });
}
if (a.domCmp(["freecoins4.me"])) {
    a.readOnly("check", () => {
        return false;
    });
}
if (a.domCmp(["ville-ideale.com"])) {
    a.readOnly("execsp", () => { });
}
if (a.domCmp(["notre-planete.info"])) {
    a.readOnly("pubpop", () => { });
}
if (a.domCmp(["apkmirror.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/241
    //a.readOnly("doCheck", () => { });
    a.noAccess("ranTwice");
    //Ready for them to closure their code
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
}
if (a.domCmp(["mtlblog.com"])) {
    a.readOnly("puabs", () => { });
}
if (a.domCmp(["15min.lt"])) {
    a.noAccess("__adblock_config");
}
if (a.domCmp(["anizm.com"])) {
    a.always(() => {
        a.win.stopAdBlock = {};
    });
}
if (a.domCmp(["diarioinformacion.com"])) {
    a.readOnly("pr_okvalida", true);
}
if (a.domCmp(["cnbeta.com"])) {
    a.readOnly("JB", () => { });
}
if (a.domCmp(["haaretz.com", "haaretz.co.li", "themarker.com"])) {
    a.noAccess("AdBlockUtil");
}
if (a.domCmp(["pipocas.tv"])) {
    a.cookie("popup_user_login", "yes");
}
if (a.domCmp(["sc2casts.com"])) {
    a.win._gaq = { push() { } }
    a.readOnly("showdialog", () => { });
    a.readOnly("showPopup2", () => { });
}
if (a.domCmp(["vgunetwork.com"])) {
    a.ready(() => {
        a.cookie("stopIt", "1");
        a.$("#some_ad_block_key_close").click()
    });
}
if (a.domCmp(["eventosppv.me"])) {
    a.ready(() => {
        a.$("#nf37").remove();
    });
}
if (a.domCmp(["bolor-toli.com"])) {
    a.on("load", () => {
        a.$(".banner").html("<br>").css("height", "1px");
    });
}
if (a.domCmp(["vivo.sx"])) {
    a.on("load", () => {
        a.$("#alert-throttle").remove();
        a.$("button#access").removeAttr("id").removeAttr("disabled").html("Continue To Video");
        a.setTimeout(() => {
            a.$("input[name='throttle']").remove();
        }, 1000);
    });
}
if (a.domCmp(["luxyad.com"])) {
    a.ready(() => {
        if (a.win.location.pathname === "/Information.php") {
            const href = location.href;
            a.win.location.href = href.substr(href.indexOf("url=") + 4, href.length);
        }
    });
}
/*
if (a.domCmp(["mrpiracy.xyz", "mrpiracy.club"])) {
    //Crash script by keywords
    a.crashScript("Desativa o AdBlock para continuar");
}
*/
if (a.domCmp(["dbplanet.net"])) {
    a.cookie("newnoMoreAdsNow", "1");
}
if (a.domCmp(["aidemu.fr"])) {
    a.cookie("adblockPopup", "true");
}
if (a.domCmp(["eami.in"])) {
    a.always(() => {
        a.cookie("ad_locked", "1");
    });
}
if (a.domCmp(["bigdownloader.com"])) {
    a.ready(() => {
        a.$("#anti_adblock").remove();
    });
}
if (a.domCmp(["freeskier.com"])) {
    a.ready(() => {
        a.$("#adb-not-enabled").css("display", "");
        a.$("#videoContainer").css("display", "");
    });
}
if (a.domCmp(["gametrailers.com"])) {
    a.ready(() => {
        a.$("#ad_blocking").remove();
    });
}
if (a.domCmp(["scan-mx.com", "onepiece-mx.net", "naruto-mx.net"])) {
    a.readOnly("ad_block_test", () => { });
    a.ready(() => {
        a.$("#yop").attr("id", "");
    });
}
if (a.domCmp(["freebitcoins.nx.tc", "getbitcoins.nx.tc"])) {
    a.readOnly("ad_block_test", () => false);
}
if (a.domCmp(["bitcoinker.com"])) {
    a.readOnly("claim", () => true);
    a.ready(() => {
        a.$("#E33FCCcX2fW").remove();
    });
}
if (a.domCmp(["moondoge.co.in", "moonliteco.in", "moonbit.co.in", "bitcoinzebra.com"])) {
    a.ready(() => {
        a.$("#AB, #E442Dv, #eCC5h").remove();
    });
}
if (a.domCmp(["bitcoiner.net", "litecoiner.net"])) {
    a.bait("div", "#tester");
    a.bait("div", "#ad-top");
}
if (a.domCmp(["torrent-tv.ru"])) {
    a.readOnly("c_Oo_Advert_Shown", true);
}
if (a.domCmp(["cwtv.com"])) {
    a.readOnly("CWTVIsAdBlocking", undefined);
}
if (a.domCmp(["inn.co.il"])) {
    a.win.TRC = {};
    a.win.TRC.blocker = {
        states: {
            ABP_DETECTION_DISABLED: -2,
            ABP_NOT_DETECTED: 0,
            ABP_DETECTED: 1,
        },
        createBlockDetectionDiv() { return a.doc.createElement("div"); },
        isBlockDetectedOnDiv() { return 0; },
        isBlockDetectedOnClassNames() { return 0; },
        getBlockedState() { return 0; },
    };
}
if (a.domCmp(["bhaskar.com", "divyabhaskar.co.in"])) {
    a.readOnly("openPopUpForBreakPage", () => { });
    a.readOnly("canABP", true);
    a.readOnly("canCheckAds", true);
}
if (a.domCmp(["turkanime.tv"])) {
    a.always(() => {
        a.win.adblockblock = () => { };
        a.win.BlokKontrol = {};
    });
}
if (a.domCmp(["wtfbit.ch"])) {
    a.readOnly("writeHTMLasJS", () => { });
}
if (a.domCmp(["ndtv.com"])) {
    a.readOnly("___p__p", 1);
    a.readOnly("getNoTopLatestNews", () => { });
}
if (a.domCmp(["lesechos.fr", "lesechos.com"])) {
    a.readOnly("checkAdBlock", () => { });
    a.readOnly("paywall_adblock_article", () => { });
    a.readOnly("call_Ad", 1);
}
if (a.domCmp(["bitvisits.com"])) {
    a.readOnly("blockAdblockUser", () => { });
}
/*
if (a.domCmp(["exrapidleech.info"])) {
    //This does not work anymore
    //Set cookies, style, read only variables, disable open(), and create an element
    let tomorrow = new a.win.Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    //Cookies
    a.cookie("popcashpuCap", "1");
    a.cookie("popcashpu", "1");
    a.cookie("nopopatall", tomorrow.getTime().toString());
    a.cookie("noadvtday", "0");
    //Style
    a.css("div.alert.alert-danger.lead { opacity:0; }");
    //Read only variables
    a.readOnly("bdvbnr_pid", []);
    //a.readOnly("adblock", false);
    a.readOnly("PopAds", 1);
    //Filter open()
    a.filter("open");
    //Create element
    a.$("<iframe>").attr("src", "http://bdfrm.bidvertiser.com/BidVertiser.dbm?pid=383865&bid=1737418&RD=")
.attr("id", "bdvi").css("display", "none").appendTo("html");
}
*/
if (a.domCmp(["vipleague.is", "vipleague.ws", "vipleague.tv", "vipleague.se", "vipleague.tv", "vipleague.me",
    "vipleague.mobi", "vipleague.co", "vipleague.sx", "vipleague.ch", "vipbox.tv", "vipbox.co", "vipbox.biz",
    "vipbox.sx", "vipbox.eu", "vipbox.so", "vipbox.nu", "vipboxsa.co", "strikeout.co", "strikeout.me",
    "homerun.re", "vipboxtv.co", "vipapp.me"])) {
    a.readOnly("iExist", true);
    a.cookie("xclsvip", "1");
    a.css(".vip_052x003 { height:250px; }");
    a.css(".vip_09x827 { height:26px; }");
    a.css("#overlay { display:none; }");
}
if (a.domCmp(["zoomtv.me"])) {
    a.readOnly("iaxpEnabled", true);
}
if (a.domCmp(["vg.no", "e24.no"])) {
    a.readOnly("__AB__", () => { });
}
if (a.domCmp(["pornve.com"])) {
    //NSFW!
    a.readOnly("adxjwupdate", 1);
}
if (a.domCmp(["lol.moa.tw"])) {
    a.ready(() => {
        a.win.MoaObj = a.win.MoaObj || {};
        a.win.MoaObj.ad = a.win.MoaObj.ad || {};
        a.win.MoaObj.ad.hasAdblock = () => false;
        a.win.MoaObj.ad.checkABP = () => false;
    });
}
if (a.domCmp(["dailybitcoins.org"])) {
    a.ready(() => {
        a.$(".ad-img").remove();
    });
}
if (a.domCmp(["kozaczek.pl", "zeberka.pl"])) {
    a.cookie("ablc", "1");
    a.cookie("cookie_policy", "1");
}
if (a.domCmp(["spankwire.com", "keezmovies.com", "extremetube.com", "mofosex.com"])) {
    a.cookie("abClosed", "true");
    a.cookie("hide_ad_msg", "1");
}
if (a.domCmp(["youporn.com", "youporngay.com"])) {
    a.cookie("adblock_message", "closed");
}
if (a.domCmp(["citationmachine.net"])) {
    a.cookie("sbm_cm_citations", "0");
}
if (a.domCmp(["psarips.com"])) {
    a.bait("div", "#advert");
    a.noAccess("open");
}
if (a.domCmp(["extratorrent.cc", "extratorrent.com"])) {
    a.cookie("ppu_delay", "1");
    a.cookie("ppu_main", "1");
    a.cookie("ppu_sub", "1");
    a.cookie("ppu_show_on", "1");
}
if (a.domCmp(["tny.cz", "pasted.co"])) {
    a.cookie("__.popunderCap", "1");
    a.cookie("__.popunder", "1");
}
if (a.domCmp(["clubedohardware.com.br"])) {
    if (a.win.location.host.includes("forum")) {
        a.css("#banner, script { height:51px; }");
        a.bait("div", "#banner");
    } else {
        a.bait("div", ".banner_topo");
    }
    a.ready(() => {
        if (a.win.location.host.includes("forum")) {
            a.win.addBlocking.hide();
            a.win.addBlocking.kill();
        } else {
            a.doc.body.id = "";
            a.$(".adblock").remove();
        }
    });
}
if (a.domCmp(["debrastagi.com"])) {
    a.ready(() => {
        a.$("#stp-main").remove();
        a.$("#stp-bg").remove();
    });
}
if (a.domCmp(["ddlfrench.org"])) {
    a.ready(() => {
        a.$("#dle-content .d-content").removeClass();
        a.$("#content").attr("id", "");
    });
}
if (a.domCmp(["mega-debrid.eu"])) {
    a.on("load", () => {
        const elem = a.$(".realbutton")[0];
        elem.setAttribute("onclick", "");
        elem.setAttribute("type", "submit");
    });
}
if (a.domInc(["slideplayer"])) {
    a.on("load", () => {
        a.win.force_remove_ads = true;
        const slide_id = a.win.get_current_slide_id();
        const slide_srv = a.doc.getElementById("player_frame").src.split("/")[3];
        const time = 86400 + a.win.Math.floor(a.win.Date.now() / 1000);
        const secret = a.win.encodeURIComponent(a.win.strtr(a.win.MD5.base64("secret_preved slideplayer never solved " +
            time + slide_id + ".ppt"), "+/", "- "));
        const url = `http://player.slideplayer.org/download/${slide_srv}/${slide_id}/${secret}/${time}/${slide_id}.ppt`;
        let links = a.doc.querySelectorAll("a.download_link");
        for (let i = 0; i < links.length; i++) {
            let events = a.win.$._data(links[i]).events.click;
            events.splice(0, events.length);
            links[i].href = url;
        }
    });
}
if (a.domCmp(["bokepspot.com"])) {
    a.cookie("hideDialog", "hide");
    a.ready(() => {
        a.$("#tupiklan").remove();
    });
}
if (a.domCmp(["picload.org"])) {
    a.cookie("pl_adblocker", "false");
    a.ready(() => {
        a.win.ads_loaded = true;
        a.win.imageAds = false;
        a.$("div[oncontextmenu='return false;']").remove();
    });
}
if (a.domCmp(["freezedownload.com"])) {
    a.ready(() => {
        if (a.win.location.href.includes("freezedownload.com/download/")) {
            a.$("body > div[id]").remove();
        }
    });
}
if (a.domCmp(["monnsutogatya.com"])) {
    a.ready(() => {
        a.css("#site-box { display:block; }");
        a.$("#for-ad-blocker").remove();
    });
}
if (a.domCmp(["rapid8.com"])) {
    a.ready(() => {
        a.$("div.backk + #blcokMzg").remove();
        a.$("div.backk").remove();
    });
}
if (a.domCmp(["turkdown.com"])) {
    a.ready(() => {
        a.$("#duyuru").remove();
    });
}
if (a.domCmp(["privateinsta.com"])) {
    a.ready(() => {
        a.win.dont_scroll = false;
        a.$("#overlay_div").remove();
        a.$("#overlay_main_div").remove();
    });
}
if (a.domCmp(["oneplaylist.eu.pn"])) {
    a.readOnly("makePopunder", false);
}
if (a.domCmp(["onmeda.de"])) {
    a.readOnly("$ADP", true);
    a.readOnly("sas_callAd", () => { });
    a.readOnly("sas_callAds", () => { });
}
if (a.domCmp(["rockfile.eu"])) {
    a.ready(() => {
        a.$("<iframe>").attr("src", "about:blank").css("visibility", "hidden").appendTo("body");
    });
}
if (a.domCmp(["referencemega.com", "fpabd.com", "crackacc.com"])) {
    a.cookie("_lbGatePassed", "true");
}
if (a.domCmp(["link.tl"])) {
    a.css(".adblock { height:1px; }");
    a.readOnly("adblocker", false);
    a.timewarp("setInterval", a.matchMethod.stringExact, "1800");
}
if (a.domCmp(["wstream.video"])) {
    a.css("#adiv { height:4px; }");
}
if (a.domCmp(["4shared.com"])) {
    a.ready(() => {
        a.$("body").removeClass("jsBlockDetect");
    });
}
if (a.domCmp(["pro-zik.ws", "pro-tect.ws", "pro-ddl.ws", "pro-sport.ws"])) {
    a.cookie("visitedf", "true");
    a.cookie("visitedh", "true");
}
if (a.domCmp(["comptoir-hardware.com"])) {
    a.readOnly("adblock", "non");
}
if (a.domCmp(["bakersfield.com"])) {
    a.readOnly("AD_SLOT_RENDERED", true);
}
if (a.domCmp(["ekstrabladet.dk", "eb.dk"])) {
    a.noAccess("eb");
}
if (a.domCmp(["pcgames-download.net"])) {
    a.always(() => {
        a.cookie("noAdblockNiceMessage", "1");
        a.win.mgCanLoad30547 = true;
    });
}
if (a.domCmp(["lachainemeteo.com"])) {
    a.readOnly("js_loaded", true);
}
if (a.domCmp(["mac4ever.com"])) {
    a.readOnly("coquinou", () => { });
}
if (a.domCmp(["5278bbs.com"])) {
    a.readOnly("myaabpfun12", () => { });
}
if (a.domCmp(["thesimsresource.com"])) {
    a.readOnly("gadsize", true);
    a.readOnly("iHaveLoadedAds", true);
}
if (a.domCmp(["yellowbridge.com"])) {
    a.readOnly("finalizePage", () => { });
}
if (a.domCmp(["game-debate.com"])) {
    a.readOnly("ad_block_test", () => { });
}
if (a.domCmp(["kissanime.com", "kissanime.to", "kissanime.ru"])) {
    a.css("iframe[id^='adsIfrme'], .divCloseBut { display:none; }");
    a.ready(() => {
        const divContentVideo = a.doc.querySelector("#divContentVideo");
        if (a.win.DoDetect2) {
            a.win.DoDetect2 = null;
            a.win.CheckAdImage = null;
        } else if (divContentVideo) {
            const divDownload = a.doc.querySelector("#divDownload").cloneNode(true);
            a.setTimeout(() => {
                divContentVideo.innerHTML = "";
                a.win.DoHideFake();
                divContentVideo.appendChild(divDownload);
                a.$("iframe[id^='adsIfrme'], .divCloseBut").remove();
            }, 5500);
        }
    });
}
if (a.domCmp(["kissanime.io"])) {
    a.readOnly("check_adblock", true);
}
if (a.domCmp(["kisscartoon.me", "kisscartoon.se"])) {
    a.readOnly("xaZlE", () => { });
    a.ready(() => {
        a.$("iframe[id^='adsIfrme']").remove();
    });
}
if (a.domCmp(["openload.co", "openload.io", "openload.tv"])) {
    a.readOnly("adblock", false);
    a.readOnly("adblock2", false);
    a.readOnly("popAdsLoaded", true);
}
if (a.domCmp(["youwatch.to", "he2eini7ka.com", "shink.in"])) {
    a.readOnly("jsPopunder", () => { });
}
if (a.domCmp(["he2eini7ka.com"])) {
    a.readOnly("adsShowPopup1", 1);
}
if (a.domCmp(["youwatch.org", "chouhaa.info", "ahzahg6ohb.com", "ahzahg6ohb.com"])) {
    a.readOnly("adsShowPopup1", 1);
    a.ready(() => {
        a.$("#player_imj, #player_imj + div[id]").remove();
    });
}
if (a.domCmp(["exashare.com", "chefti.info", "bojem3a.info", "ajihezo.info", "yahmaib3ai.com",
    "yahmaib3ai.com"])) {
    a.readOnly("adsShowPopup1", 1);
    a.ready(() => {
        a.$("#player_gaz, #player_gaz + div[id]").remove();
    });
}
if (a.domCmp(["an1me.se"])) {
    a.readOnly("isBlockAds2", false);
}
if (a.domCmp(["hqq.tv"])) {
    a.ready(() => {
        if (a.win.location.pathname === "/player/embed_player.php") {
            a.$("form[id^='form-']").submit();
        }
    });
}
if (a.domCmp(["koscian.net"])) {
    a.ready(() => {
        a.$(".ban").remove();
    });
}
if (a.domCmp(["eclypsia.com"])) {
    a.generic.FuckAdBlock("MggAbd", "mggAbd");
}
if (a.domCmp(["gamingroom.tv"])) {
    a.readOnly("adblock_detect", () => { });
    a.readOnly("GR_adblock_hide_video", () => { });
    a.readOnly("adblock_video_msg_start", () => { });
    a.readOnly("adblock_video_msg_stop", () => { });
    a.readOnly("disable_chat", () => { });
}
if (a.domCmp(["rtl.de"])) {
    a.ready(() => {
        a.$("div[data-widget='video']").each(function () {
            const url = a.$(this).data("playerLayerCfg").videoinfo.mp4url;
            a.$(this).after(a.nativePlayer(url));
            a.$(this).remove();
        });
    });
}
if (a.domCmp(["play.radio1.se", "play.bandit.se", "play.lugnafavoriter.com", "play.rixfm.se"])) {
    a.on("load", () => {
        a.setTimeout(() => {
            a.win.player_load_live(a.win.stream_id);
        }, 1000);
    });
}
if (a.domCmp(["dplay.com", "dplay.dk", "dplay.se"])) {
    let date = new a.win.Date();
    date.setDate(date.getDate() + 365);
    const timestamp = date.getTime().toString();
    const value = JSON.stringify({
        notificationSubmission: "submitted",
        reportingExpiry: timestamp,
        notificationExpiry: timestamp,
    });
    a.cookie("dsc-adblock", value);
}
if (a.domCmp(["viafree.no", "viafree.dk", "viafree.se", "tvplay.skaties.lv", "play.tv3.lt", "tv3play.tv3.ee"])) {
    //Thanks to szymon1118
    let isInBackground = false;
    const idMatcher = /\/(\d+)/;
    const videoJS = (source, type, width, height) => {
        return `<iframe srcdoc='<html><head><link href="https://cdnjs.cloudflare.com/ajax/libs/video.js/5.10.5/al` +
            `t/video-js-cdn.min.css" rel="stylesheet"><script src="https://cdnjs.cloudflare.com/ajax/libs/video.j` +
            `s/5.10.5/video.min.js"><\/script><script src="https://cdnjs.cloudflare.com/ajax/libs/videojs-contrib` +
            `-hls/3.1.0/videojs-contrib-hls.min.js"><\/script><style type="text/css">html, body{padding:0; margin` +
            `:0;}.vjs-default-skin{color:#eee}.vjs-default-skin .vjs-play-progress,.vjs-default-skin .vjs-volume-` +
            `level{background-color:#eee}.vjs-default-skin .vjs-big-play-button,.vjs-default-skin .vjs-control-ba` +
            `r{background:rgba(0,0,0,.2)}.vjs-default-skin .vjs-slider{background:rgba(0,0,0,.3)}</style></head><` +
            `body><video id="uBlock_Protector_Video_Player" class="video-js vjs-default-skin" controls preload="a` +
            `uto" width="${width}" height="${height}"><source src="${source}" type="${type}"></video><script>vide` +
            `ojs("uBlock_Protector_Video_Player")<\/script></body></html>' width="${width}" height="${height}" fr` +
            `ameborder="0" scrolling="no" allowfullscreen="true"></iframe>`;
    };
    const handler = () => {
        if (isInBackground) {
            a.setTimeout(handler, 1000);
            return;
        }
        //Find player
        const elem = a.$("#video-player");
        if (elem.length === 0) {
            a.setTimeout(handler, 1000);
            return;
        }
        //Find ID
        let videoID;
        if (a.domCmp(["tvplay.skaties.lv", "play.tv3.lt", "tv3play.tv3.ee"], true)) {
            let tmp = idMatcher.exec(a.win.location.href);
            if (tmp) {
                videoID = tmp[1];
            }
        } else if (a.win.vfAvodpConfig) {
            videoID = a.win.vfAvodpConfig.videoId;
        }
        if (!videoID) {
            a.setTimeout(handler, 1000);
            return;
        }
        //Request data JSON
        //The proxy does not seem work anymore
        //const proxy = "http://www.sagkjeder.no/p/browse.php?u=";
        GM_xmlhttpRequest({
            method: "GET",
            url: `http://playapi.mtgx.tv/v3/videos/stream/${videoID}`,
            onload(result) {
                if (a.config.debugMode) {
                    a.out.info("Response received:");
                    a.out.info(result.responseText);
                }
                parser(result.responseText);
            },
            onerror() {
                a.out.error("AAK failed to find media URL!");
            },
        });
    };
    const parser = (data) => {
        //Parse response
        let streams;
        try {
            const parsedData = JSON.parse(data);
            streams = parsedData.streams;
            if (!streams) {
                throw "Media URL Not Found";
            }
        } catch (err) {
            a.out.error("AAK failed to find media URL!");
            return;
        }
        //Check source and type
        let source, type;
        if (streams.high && streams.high !== "") {
            source = streams.high;
            type = "video/mp4";
        } else if (streams.hls && streams.hls !== "") {
            source = streams.hls;
            type = "application/x-mpegURL";
        } else if (streams.medium && streams.medium !== "") {
            source = streams.medium;
            type = streams.medium.startsWith("rtmp") ? "rtmp/mp4" : "application/f4m+xml";
        } else {
            a.out.error("AAK failed to find media URL!");
            return;
        }
        if (a.config.debugMode) {
            a.out.info("Potential media URLs:");
            a.out.info([streams.high, streams.hls, streams.medium]);
            a.out.info("Used media URL:");
            a.out.info(source);
        }
        //Replace player
        const player = a.$("#video-player");
        const height = player.height();
        const width = player.width();
        player.after(videoJS(source, type, width, height)).remove();
        //Watch for more video players
        handler();
    };
    //Start
    handler();
    a.on("focus", () => { isInBackground = false; });
    a.on("blur", () => { isInBackground = true; });
}
if (a.domCmp(["firstrow.co", "firstrows.ru", "firstrows.tv", "firstrows.org", "firstrows.co",
    "firstrows.biz", "firstrowus.eu", "firstrow1us.eu", "firstsrowsports.eu", "firstrowsportes.tv",
    "firstrowsportes.com", "justfirstrowsports.com", "hahasport.me", "wiziwig.ru", "wiziwig.sx",
    "wiziwig.to", "wiziwig.tv", "myp2p.biz", "myp2p.tv", "myp2p.la", "myp2p.ec", "myp2p.eu", "myp2p.sx",
    "myp2p.ws", "myp2p.com", "atdhe.ru", "atdhe.se", "atdhe.bz", "atdhe.top", "atdhe.to", "atdhe.me",
    "atdhe.mx", "atdhe.li", "atdhe.al"])) {
    a.filter("open");
    a.always(() => {
        a.cookie("adb", "1");
        a.css("#bannerInCenter, #hiddenBannerCanvas { display:none; }");
    });
}
if (a.domCmp(["buzina.xyz", "farmet.info", "rimladi.com", "kitorelo.com", "omnipola.com", "porosin.co.uk",
    "rimleno.com", "simple4alls.com", "arsopo.com"])) {
    a.css("#adsframe { height:151px; }");
    a.ready(() => {
        a.$("#adsframe").remove();
        a.$("#remove-over").click();
    });
}
if (a.domCmp(["buzina.xyz"])) {
    a.css("#adsframe { height:151px; }");
    a.ready(() => {
        const elem = a.$("iframe[src*='.php?hash=']");
        if (elem.length > 0) {
            let parts = elem.attr("src").split("/");
            parts[2] = "arsopo.com";
            elem.attr("src", parts.join("/"));
        }
    });
}
if (a.domCmp(["allmyvideos.net", "amvtv.net"])) {
    a.cookie("_favbt33", "1");
}
if (a.domCmp(["ilive.to", "streamlive.to"])) {
    a.on("load", () => {
        if (a.win.location.pathname.toLowerCase().startsWith("/embedplayer.php")) {
            a.setTimeout(() => {
                a.win.removeOverlayHTML();
            }, 1000);
        }
    });
}
if (a.domCmp(["micast.tv"])) {
    a.cookie("vid_main", "true");
    a.cookie("vid_sub", "true");
    a.on("load", () => {
        if (a.win.removeOverlayHTML) {
            a.win.removeOverlayHTML();
        }
    })
}
if (a.domCmp(["pxstream.tv"])) {
    a.on("load", () => {
        if (a.win.location.pathname.startsWith("/embedrouter.php")) {
            a.setTimeout(() => {
                a.win.closeAd();
            }, 1000);
        }
    });
}
if (a.domCmp(["sawlive.tv"])) {
    a.ready(() => {
        if (a.win.location.pathname.toLowerCase().startsWith("/embed/watch/")) {
            a.win.display = false;
            a.win.closeMyAd();
        }
    });
}
if (a.domCmp(["goodcast.co"])) {
    a.ready(() => {
        if (a.win.location.pathname.startsWith("/stream.php")) {
            a.$(".advertisement").hide();
            a.$(".adsky iframe").attr("src", "about:blank");
        }
    });
}
if (a.domCmp(["showsport-tv.com"])) {
    a.ready(() => {
        if (a.win.location.pathname.startsWith("/ch.php")) {
            a.$("#advertisement, .advertisement").remove();
        }
    });
}
if (a.domCmp(["sharecast.to"])) {
    a.ready(() => {
        if (a.win.location.pathname.startsWith("/embed.php")) {
            const token = a.setInterval(() => {
                a.cookie("vid_main", "true");
                a.cookie("vid_sub", "2");
                a.cookie("vid_delay", "true");
            }, 100);
            a.setTimeout(() => {
                a.clearInterval(token);
            }, 5000);
            a.$("#table1").remove();
        }
    });
}
if (a.domCmp(["cityam.com", "computerworlduk.com", "techworld.com", "v3.co.uk"])) {
    a.ready(() => {
        a.$("#r3z-wait").remove();
        a.$(".r3z-hide").removeClass("r3z-hide");
        a.win._r3z = null;
    });
}
if (a.domCmp(["next-episode.net", "kingmaker.news", "gamespowerita.com", "todayidol.com", "receive-a-sms.com",
    "wakeupcallme.com", "ringmycellphone.com", "faqmozilla.org", "thememypc.com"])) {
    a.always(() => {
        a.win.google_jobrunner = {};
    });
}
if (a.domCmp(["dawn.com"])) {
    a.generic.FuckAdBlock("DetectAdBlock", "detectAdBlock");
}
if (a.domCmp(["sports.fr"])) {
    a.generic.FuckAdBlock("FabInstance", "fabInstance");
}
if (a.domCmp(["europe1.fr"])) {
    a.generic.FuckAdBlock("FabInstance", "fabInstance");
}
if (a.domCmp(["newyorker.com"])) {
    a.generic.FuckAdBlock("SniffAdBlock", "sniffAdBlock");
}
if (a.domCmp(["mangasproject.com.br", "mangasproject.net.br", "mangas.zlx.com.br"])) {
    a.generic.FuckAdBlock(a.uid(), "mangasLeitorSlider");
}
if (a.domCmp(["qnimate.com"])) {
    a.readOnly("adBlockDetected", () => { });
}
if (a.domCmp(["eurotransport.de"])) {
    a.generic.FuckAdBlock(a.uid(), "antiAdBlock");
}
if (a.domCmp(["tzetze.it", "beppegrillo.it", "la-cosa.it"])) {
    a.generic.FuckAdBlock("CADetect", "cadetect");
}
if (a.domCmp(["agario.sx", "agarabi.com"])) {
    a.generic.FuckAdBlock(a.uid(), "agario_SX_ads");
}
if (a.domCmp(["filespace.com"])) {
    a.generic.FuckAdBlock(a.uid(), "fAB");
}
if (a.domCmp(["topserialy.sk"])) {
    a.generic.FuckAdBlock(a.uid(), "sratNaVas");
}
if (a.domCmp(["sport-show.fr", "vipflash.net", "2site.me"])) {
    a.css("#blockblockA { visibility:invisible; display:none; } #blockblockA td { visibility:invisible; " +
        "display:none; } #blockblockA td p { visibility:invisible; display:none; } #blockblockB " +
        "{ visibility:visible; display:block; }");
}
if (a.domCmp(["gametransfers.com", "winandmac.com", "free-steam-giveaways.com", "canalwp.com",
    "alphahistory.com", "nordpresse.be", "sospc.name", "baboo.com.br", "nflix.pl"])) {
    a.always(() => {
        a.cookie("anCookie", "true");
        a.win.anOptions = {};
    });
}
if (a.domCmp(["lewebtvbouquetfrancophone.overblog.com", "webtv.bloguez.com", "latelegratuite.blogspot.com",
    "totaldebrid.org", "37.187.173.205", "tvgratuite.blogspot.com"])) {
    a.bait("div", "#my_ad_div");
    a.readOnly("jabbahud", () => { });
}
if (a.domCmp(["mybank.pl", "rapidgrab.pl"])) {
    a.filter("addEventListener", a.matchMethod.string, ".nextFunction()}");
}
if (a.domCmp(["linkdrop.net", "revclouds.com", "leporno.org", "uploadshub.com", "dasolo.org",
    "fullstuff.net", "zeusnews.it", "cheminots.net", "lolsy.tv", "animes-mangas-ddl.com",
    "noticiasautomotivas.com.br", "darkstars.org", "corepacks.com", "naturalbd.com",
    "coolsoft.altervista.org", "openload.us", "cda-online.pl", "urbanplanet.org", "mamahd.com",
    "sadeempc.com", "avmoo.com", "thailande-fr.com", "btaia.com", "tusoft.org", "hisse.net",
    "europeup.com", "nrj.fr", "srnk.co", "animmex.co", "socketloop.com", "crackhex.com",
    "revealedtricks4u.com", "pizzamaking.com", "computerworm.net", "yourlifeupdated.net"])) {
    a.filter("setTimeout", a.matchMethod.string, "bab_elementid");
}
/*
if (a.domCmp(["commentcamarche.net", "journaldesfemmes.com", "linternaute.com"])) {
    //Crash script by keywords
    a.crashScript("Asl.prototype.inject");
}
*/
if (a.domCmp(["fourchette-et-bikini.fr", "meteocity.com"])) {
    a.readOnly("adProtect", 1);
}
if (a.domCmp(["demo-phoenix.com", "dpstream.net", "gum-gum-streaming.com", "jeu.info", "sofoot.com",
    "gaara-fr.com", "gaytube.com", "tuxboard.com", "xstory-fr.com", "hentaifr.net", "filmstreaming-hd.com",
    "filmvf.net", "hentaihaven.org", "narutoshippudenvf.com", "thebadbuzz.com", "manga-news.com", "jeu.video",
    "mangas-fr.com"])) {
    //crashScript breaks uBO element picker
    //a.crashScript("PHENV");
    a.css("body { visibility:visible; }");
}
/*
if (a.domCmp(["tvspielfilm.de", "finanzen.ch"])) {
    //crashScript breaks uBO element picker
    a.crashScript("UABPInject");
}
if (a.domCmp(["watchgeneration.fr", "turbo.fr", "24matins.fr", "foot01.com", "clubic.com", "macg.co",
"begeek.fr", "igen.fr", "gamestar.de", "focus.de", "stern.de", "fem.com", "wetter.com",
"wetteronline.de", "pcwelt.de", "boerse-online.de", "sportauto.de", "auto-motor-und-sport.de",
"motor-klassik.de", "4wheelfun.de", "autostrassenverkehr.de", "lustich.de", "spox.com", "shz.de",
"transfermarkt.de", "rp-online.de", "motorradonline.de", "20min.ch", "main-spitze.de",
"wormser-zeitung.de", "lampertheimer-zeitung.de", "wiesbdener-tagblatt.de", "buerstaedter-zeitung.de",
"wiesbdener-kurier.de", "rhein-main-presse.de", "allgemeine-zeitung.de", "ariva.de", "spiegel.de",
"brigitte.de", "dshini.net", "gala.de", "gamepro.de", "gamona.de", "pnn.de", "promobil.de", "sportal.de",
"webfail.com", "computerbild.de", "finanzen.net", "comunio.de", "medisite.fr"]) || a.domInc(["sat1",
"prosieben", "kabeleins", "sat1gold", "sixx", "prosiebenmaxx", "the-voice-of-germany"])) {
    //crashScript breaks uBO element picker
    a.crashScript("uabInject");
}
*/
if (a.domCmp(["emuparadise.me"])) {
    a.always(() => {
        a.$("h2:contains('Bandwidth is expensive')").parent().remove();
    });
}
if (a.domCmp(["sapib.ca"])) {
    a.readOnly("Abd_Detector", () => { });
}
if (a.domCmp(["wowhead.com"])) {
    a.ready(() => {
        a.$("div[id^='ad-']").parent().parent().parent().remove();
    });
}
if (a.domCmp(["epiotrkow.pl"])) {
    a.bait("div", "#adboxx");
}
if (a.domCmp(["fox.com.tr"])) {
    a.readOnly("adblockDetector", {
        init() { }
    });
}
if (a.domCmp(["thebatavian.com"])) {
    a.readOnly("broadstreet", true);
}
if (a.domCmp(["zrabatowani.pl"])) {
    a.cookie("adblockAlert", "yes");
}
if (a.domCmp(["hanime.tv"])) {
    //NSFW!
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/76
    const _open = a.win.open;
    a.win.open = (...args) => {
        _open.apply(a.win, args);
        //This will close the tab instantly with Violentmonkey
        window.close();
    };
    //Old solution, I will run it just in case
    a.readOnly("BetterJsPop", () => { });
}
if (a.domCmp(["firstonetv.eu"])) {
    a.readOnly("blocked", () => { });
    a.readOnly("adFuckBlock", () => { });
}
if (a.domCmp(["whosampled.com"])) {
    a.readOnly("showAdBlockerOverlay", () => { });
}
if (a.domCmp(["pornhub.com", "redtube.com", "youporn.com", "tube8.com", "pornmd.com",
    "thumbzilla.com", "xtube.com", "peeperz.com", "czechhq.net", "29443kmq.video"])) {
    //NSFW!
    //29443kmq.video is the iframe of czechhq.net, other domains are part of Porthub Network
    a.win.open = (arg) => {
        if (arg.includes(a.dom)) {
            a.win.location.href = arg;
        }
    };
}
if (a.domCmp(["pastebin.com"])) {
    a.readOnly("abdd", "");
}
if (a.domCmp(["debridnet.com"])) {
    a.noAccess("_pop");
}
if (a.domCmp(["xnxx.com"])) {
    a.cookie("wpn-popupunder", "1");
    a.readOnly("openpop", () => { });
}
if (a.domCmp(["burning-feed.com"])) {
    //Thanks to uBlock-user
    //a.readOnly("testab", "1");
    //a.readOnly("ads_enable", "true");
    a.readOnly("ads_enable", () => { });
}
if (a.domCmp(["chip.de"])) {
    //https://github.com/uBlockOrigin/uAssets/blob/2a444825eb93f5abaf90b7f8594ed45ecef2f823/filters/filters.txt#L1435
    a.noAccess("stop");
}
if (a.domCmp(["ghame.ru"])) {
    a.$("<p class='adsbygoogle' style='display:none;'>hi</p>").prependTo("html");
}
if (a.domCmp(["thevideo.me", "fmovies.to", "fmovies.se", "fmovies.is"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/86
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/99
    a.win.open = () => { };
}
if (a.domCmp(["is.fi", "viasatsport.fi"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/88
    a.readOnly("Sabdetect_load", false);
    if (a.domCmp(["viasatsport.fi"], true)) {
        a.config.allowGeneric = false;
    }
}
if (a.domCmp(["mooseroots.com", "insidegov.com", "gearsuite.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/96
    a.css("html,body { overflow-y:scroll; } .BOX-wrap { display:none; }");
}
if (a.domCmp(["sandiegouniontribune.com"])) {
    const token = a.setInterval(() => {
        if (a.$("#reg-overlay").length) {
            a.$("#reg-overlay").remove()
            a.$("<style> html[data-dss-meterup], [data-dss-meterup] body { " +
                "overflow: scroll !important; } </style>").appendTo("head");
            a.clearInterval(token);
        }
    }, 1000);
    a.filter("addEventListener", a.matchMethod.stringExact, "scroll");
}
if (a.domCmp(["adz.bz", "mellow.link", "hop.bz", "mellowads.com", "url.vin",
    "clik.bz"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/106
    let val;
    a.win.Object.defineProperty(a.win, "linkVM", {
        configurable: false,
        set(arg) {
            val = arg;
        },
        get() {
            if (val.verify) {
                val.verify = (() => {
                    callAPI(
                        "publishing",
                        "VerifyLinkClick",
                        {
                            linkRef: val.linkRef(),
                            linkClickRef: $("#LinkClickRef")[0].value,
                            recaptchaResponse: val.recaptchaResponse()
                        },
                        "Verify",
                        "Verifying",
                        (response) => {
                            if (response.result) {
                                window.location.href = response.linkURL;
                            } else {
                                showMessageModal("Verify failed", response.resultHtml, response.result);
                            }
                        },
                        null,
                        () => {
                            grecaptcha.reset();
                        }
                    );
                }).bind(val);
            }
            return val;
        },
    });
}
if (a.domCmp(["zap.in"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/201
    let val;
    a.win.Object.defineProperty(a.win, "zapVM", {
        configurable: false,
        set(arg) {
            val = arg;
        },
        get() {
            if (val.verify) {
                val.verify = (() => {
                    callAPI(
                        "VerifyZapClick",
                        {
                            linkRef: val.linkRef(),
                            linkClickRef: $("#LinkClickRef")[0].value,
                            recaptchaResponse: val.recaptchaResponse()
                        },
                        "Verify",
                        "Verifying",
                        (response) => {
                            if (response.result) {
                                window.location.href = response.zapURL;
                            } else {
                                showMessageModal("Verify failed", response.resultHtml, response.result);
                            }
                        },
                        null,
                        () => {
                            grecaptcha.reset();
                        }
                    );
                }).bind(val);
            }
            return val;
        },
    });
}
if (a.domCmp(["adbull.me", "freepdf-books.com", "bc.vc", "themeslide.com", "linkdrop.net", "fas.li", "123link.top"])) {
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
}
if (a.domCmp(["shink.in"])) {
    //Prevent block screen
    a.readOnly("RunAds", true);
    //Skip countdown
    if (a.win.location.pathname.startsWith("/go/")) {
        a.ready(() => {
            const link = a.doc.getElementById("btn-main");
            const i = link.href.lastIndexOf("http");
            const url = link.href.substr(i);
            a.win.location.href = url;
        });
    }
    //Block popup
    a.readOnly("jsPopunder", () => { });
    a.win.open = () => { };
    a.filter('document.createElement', a.matchMethod.callback, function(args) {
        var elem = (args[0]||"").toLowerCase();
        return elem == "a";
    }, function(args) {
        switch (args[0].toLowerCase()) {
            case "a":
                return null;
        }
    });
}
if (a.domCmp(["gamezhero.com"])) {
    a.readOnly("ads", true);
    a.timewarp("setInterval", a.matchMethod.string, "function (){var _0x");
}
if (a.domCmp(["freetvall.com"])) {
    a.readOnly("clickNS", () => { });
}
if (a.domCmp(["hotslogs.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/121
    a.win.MonkeyBroker = {};
    a.noAccess("MonkeyBroker.regSlotsMap");
}
if (a.domCmp(["undeniable.info"])) {
    a.bait("div", "#testadblock");
}
if (a.domInc(["gamereactor"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/124
    a.cookie("countdownToAd", "-1");
    //Skip welcome page
    a.ready(() => {
        if (a.doc.querySelector("a.buttonBox.continue > span").innerHTML.startsWith("Continue to ")) {
            location.reload();
        }
    });
}
if (a.domCmp(["dasolo.co"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/126
    a.win.eval = () => { };
    a.noAccess("adblockblock");
    a.bait("div", "#loveyou");
    //Remove right click and shortcut keys blocker
    //a.readOnly will crash function declaration, so these are enough
    a.readOnly("nocontext", null);
    a.readOnly("mischandler", null);
    a.readOnly("disableselect", null);
    a.filter("document.addEventListener", a.matchMethod.stringExact, "contextmenu");
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/280
    a.filter("alert");
    a.on("load", () => {
        a.doc.oncontextmenu = null;
        a.doc.onmousedown = null;
        a.doc.onmouseup = null;
        a.setTimeout(() => {
            a.win.$("body").unbind("contextmenu");
            a.win.$("#id").unbind("contextmenu");
        }, 250);
    });
}
if (a.domCmp(["titulky.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/128
    a.generic.FuckAdBlock("FADB", "fADB");
}
if (a.domCmp(["discoveryrom.org"])) {
    a.win.adsbygoogle = [];
}
if (a.domCmp(["sthelensstar.co.uk", "runcornandwidnesworld.co.uk", "leighjournal.co.uk",
    "warringtonguardian.co.uk", "northwichguardian.co.uk", "middlewichguardian.co.uk",
    "knutsfordguardian.co.uk", "wilmslowguardian.co.uk", "creweguardian.co.uk",
    "thewestmorlandgazette.co.uk", "newsquest.co.uk", "messengernewspapers.co.uk",
    "lancashiretelegraph.co.uk", "asianimage.co.uk", "chorleycitizen.co.uk",
    "theboltonnews.co.uk", "burytimes.co.uk", "prestwichandwhitefieldguide.co.uk",
    "wirralglobe.co.uk", "autoexchange.co.uk", "chesterlestreetadvertiser.co.uk",
    "consettstanleyadvertiser.co.uk", "darlingtonaycliffesedgefieldadvertiser.co.uk",
    "darlingtonandstocktontimes.co.uk", "durhamadvertiser.co.uk",
    "edition.pagesuite-professional.co.uk", "durhamtimes.co.uk", "northyorkshireadvertiser.co.uk",
    "thenorthernecho.co.uk", "northernfarmer.co.uk", "wearvalleyadvertiser.co.uk",
    "gazetteherald.co.uk", "yorkpress.co.uk", "cravenherald.co.uk", "ilkleygazette.co.uk",
    "keighleynews.co.uk", "thetelegraphandargus.co.uk", "wharfedaleobserver.co.uk",
    "herefordtimes.com", "ludlowadvertiser.co.uk", "redditchadvertiser.co.uk",
    "bromsgroveadvertiser.co.uk", "droitwichadvertiser.co.uk", "cotswoldjournal.co.uk",
    "eveshamjournal.co.uk", "tewkesburyadmag.co.uk", "dudleynews.co.uk", "halesowennews.co.uk",
    "stourbridgenews.co.uk", "kidderminstershuttle.co.uk", "ledburyreporter.co.uk",
    "malverngazette.co.uk", "worcesternews.co.uk", "southendstandard.co.uk",
    "essexcountystandard.co.uk", "gazette-news.co.uk", "clactonandfrintongazette.co.uk",
    "harwichandmanningtreestandard.co.uk", "braintreeandwithamtimes.co.uk", "halsteadgazette.co.uk",
    "guardian-series.co.uk", "brentwoodweeklynews.co.uk", "chelmsfordweeklynews.co.uk",
    "maldonandburnhamstandard.co.uk", "thurrockgazette.co.uk", "basildonrecorder.co.uk",
    "echo-news.co.uk", "bucksfreepress.co.uk", "theargus.co.uk", "redhillandreigatelife.co.uk",
    "romseyadvertiser.co.uk", "dailyecho.co.uk", "hampshirechronicle.co.uk",
    "basingstokegazette.co.uk", "andoveradvertiser.co.uk", "stalbansreview.co.uk",
    "watfordobserver.co.uk", "heraldseries.co.uk", "banburycake.co.uk", "bicesteradvertiser.net",
    "oxfordmail.co.uk", "oxfordtimes.co.uk", "witneygazette.co.uk", "falmouthpacket.co.uk",
    "smallholder.co.uk", "southwestfarmer.co.uk", "dorsetecho.co.uk", "bournmouthecho.co.uk",
    "bridportnews.co.uk", "wiltsglosstandard.co.uk", "gazetteseries.co.uk", "bridgwatermercury.co.uk",
    "burnhamandhighbridgeweeklynews.co.uk", "chardandilminsternews.co.uk", "middevonstar.co.uk",
    "somersetcountygazette.co.uk", "thisisthewestcountry.co.uk", "yeovilexpress.co.uk",
    "wiltshiretimes.co.uk", "swindonadvertiser.co.uk", "salisburyjournal.co.uk",
    "boxingnewsonline.net", "engagedinvestor.co.uk", "globalreinsurance.com", "insurancetimes.co.uk",
    "pensions-insight.co.uk", "strategic-risk-global.com", "reward-guide.co.uk", "thestrad.com",
    "times-series.co.uk", "borehamwoodtimes.co.uk", "ealingtimes.co.uk", "enfieldindependent.co.uk",
    "haringeyindependent.co.uk", "harrowtimes.co.uk", "hillingdontimes.co.uk", "newsshopper.co.uk",
    "croydonguardian.co.uk", "epsomguardian.co.uk", "streathamguardian.co.uk", "suttonguardian.co.uk",
    "wandsworthguardian.co.uk", "wimbledonguardian.co.uk", "surreycomet.co.uk", "kingstonguardian.co.uk",
    "richmondandtwickenhamtimes.co.uk", "campaignseries.co.uk", "southwalesguardian.co.uk",
    "milfordmercury.co.uk", "pembrokeshirecountyliving.co.uk", "westerntelegraph.co.uk",
    "tivysideadvertiser.co.uk", "southwalesargus.co.uk", "cotswoldessence.co.uk",
    "freepressseries.co.uk", "monmouthshirecountylife.co.uk", "barryanddistrictnews.co.uk",
    "penarthtimes.co.uk", "eveningtimes.co.uk", "s1cars.com", "s1community.com", "s1homes.com",
    "s1jobs.com", "s1rental.com", "thescottishfarmer.co.uk", "heraldscotland.com", "thenational.scot"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/137
    a.readOnly("_sp_", null);
}
if (a.domCmp(["securenetsystems.net"])) {
    a.readOnly("iExist", true);
}
if (a.domCmp(["finalservers.net"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/125
    a.ready(() => {
        a.win.videojs("video_1").videoJsResolutionSwitcher();
    });
}
if (a.domCmp(["filmy.to", "histock.info"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/130
    a.win.open = () => {
        return { closed: false };
    };
}
if (a.domCmp(["flashx.tv"])) {
    a.filter("addEventListener", a.matchMethod.stringExact, "keydown", "window.document");
}
if (a.domCmp(["multiup.org", "multiup.eu"])) {
    a.cookie("visit", "1");
    a.readOnly("hi", () => { });
    a.ready(() => {
        a.$(".alert").each(function () {
            if (a.$(this).text().includes("Tired of ads ? Remove them")) {
                a.$(this).remove();
            }
        });
        const elem = a.$("#M130814ScriptRootC54591");
        elem.text().includes("Loading...") && elem.remove();
    });
}
if (a.domCmp(["linkneverdie.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/146
    a.readOnly("eval", () => {
        //Remove block screen
        a.$("div").each(function () {
            if (this.id.length === 30) {
                this.remove();
            }
        });
    });
    a.ready(() => {
        a.$(".SC_TBlock").each(function () {
            if (a.$(this).text() === "loading...") {
                this.remove();
            }
        });
        a.$("#wrapper").show();
    });
}
if (a.domCmp(["ally.sh", "al.ly", "croco.site"])) {
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
    a.win.open = null;
}
if (a.domCmp(["nbc.com"])) {
    a.noAccess("mps");
}
if (a.domCmp(["filmyiseriale.net"])) {
    //https://github.com/jspenguin2017/uBlockProtector/issues/152
    a.ready(() => {
        a.win.konik = 1;
    });
}
if (a.domCmp(["tf2center.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/141
    a.filter("setInterval", a.matchMethod.string, '"/adblock"');
    a.filter("setTimeout", a.matchMethod.stringExact, "function (){B(F+1)}");
}
if (a.domCmp(["gaybeeg.info"])) {
    //NSFW!
    a.observe("insert", (node) => {
        if (node && node.innerHTML && node.innerHTML.includes("AdBloker Detected")) {
            node.remove();
        }
    });
    a.ready(() => {
        //Execute some in-line scripts manually
        a.$("script").each((i, elem) => {
            if (!elem || !elem.text) {
                return;
            }
            const hash = a.md5(elem.text);
            //Emoji script
            if (hash === "780f6a53e6a6ce733d964a5b93c4a703") {
                a.win.eval(elem.text);
                return;
            }
            //Archive
            if (elem.text.includes("/*  Collapse Functions, version 2.0")) {
                const temp = elem.text.split("/*  Collapse Functions, version 2.0");
                if (temp.length === 2) {
                    const hash = a.md5(temp[1]);
                    if (hash === "2e4a544c72f4f71e64c86ab9c5f1dd49") {
                        a.win.eval(elem.text);
                    } else if (a.config.debugMode) {
                        a.out.warn("Archive related inline script does not match expected hash:");
                        a.out.warn(temp[1]);
                        a.out.warn(`Hash: ${hash}`);
                    } else {
                        a.out.warn("Archive related inline script does not match expected hash.");
                    }
                    //Return here to prevent it from being logged twice
                    return;
                }
            }
            //Log blocked code
            if (a.config.debugMode) {
                a.out.warn("This inline script is not executed:")
                a.out.warn(elem.text);
                a.out.warn(`Hash: ${hash}`);
            } else {
                a.out.warn("An inline script is not executed.");
            }
        });
        //Patch download button
        a.$(".download a.button").each((i, el) => {
            a.$(el).removeClass("locked").attr("href", a.$(el).data("href"))
                .removeAttr("data-href");
        });
    });
}
if (a.domCmp(["mma-core.com"])) {
    a.noAccess("displayAdBlockedVideo");
}
if (a.domCmp(["menshealth.pl", "womenshealth.pl", "runners-world.pl",
    "auto-motor-i-sport.pl", "motocykl-online.pl", "mojeauto.pl"])) {
    a.ready(() => {
        if (a.win.location.pathname.startsWith("/welcome-page")) {
            a.win.location.href = a.$("#timeLink").attr("href");
        }
    });
}
if (a.domCmp(["dovathd.com"])) {
    a.ready(() => {
        a.$(".onp-sl-social-buttons-enabled").remove();
        a.$(".onp-sl-content").show();
    });
}
if (a.domCmp(["temp-mail.org"])) {
    a.readOnly("checkadBlock", () => { });
}
if (a.domCmp(["gaana.com"])) {
    const noop = () => { };
    const pType = {
        _auds: "", //all
        isauds: false,
        lotamecall: false,
        itemInfo: [],
        colombiaAdeURL: "",
        deviceType: "", //desktop
        colombiaCookies: "",
        privateMode: true,
        adIconInfo: [],
        fns: { push: noop },
        update: noop,
        colombiaAdRequest: noop,
        resetAdDivClass: noop,
        clear: noop,
        clearData: noop,
        notifyColombiaAd: noop,
        refresh: noop,
        refreshFBAd: noop,
        timeoutHandler: noop,
        load: noop,
        loadDataAd: noop,
        drawIconHtml: noop,
        loadDisplayAd: noop,
        jsonCallback: noop,
        getCB: noop,
        repllaceMacro: noop,
        getAdJSON: noop,
        fireImpression: noop,
        fireThirdPartyImp: noop,
        storeThirdPartyImprURL: noop,
        dataResponseFormat: noop,
        storeAdIcons: noop,
        checkDevice: noop,
        dfpLog: noop,
    };
    let obj = function () { };
    obj.prototype = pType;
    a.readyOnly("colombia", new obj());
}
if (a.domCmp(["gelbooru.com"])) {
    if (a.win.location.pathname === "/") {
        a.on("load", () => {
            a.$("div").each(function () {
                if (a.$(this).text() === "Have you first tried disabling your AdBlock?") {
                    a.$(this).empty();
                }
            });
        });
    } else {
        a.noAccess("abvertDar");
    }
}
if (a.domCmp(["urle.co"])) {
    a.filter("setTimeout", a.matchMethod.string, "captchaCheckAdblockUser();");
    a.filter("eval");
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
}
if (a.domCmp(["playbb.me", "easyvideo.me", "videowing.me", "videozoo.me"])) {
    a.ready(() => {
        $(".safeuploada-content").css("background", "transparent");
    });
}
if (a.domCmp(["nicematin.com"])) {
    a.noAccess("checkAds");
}
if (a.domCmp(["up-4ever.com"])) {
    a.filter("setTimeout", a.matchMethod.string, "$('#adblock_detected').val(1);");
    //Force show download links
    a.css("#hiddensection { display:block; }");
    a.ready(() => {
        a.$("#hiddensection").show();
        a.$("#hiddensection2").remove();
    });
}
if (a.domCmp(["exrapidleech.info"])) {
    //Thanks to lain566
    a.filter("eval");
    //Prevent sending to verify page
    a.readOnly("PopAds", "this is a string");
    a.cookie("popcashpuCap", "1");
    a.cookie("popcashpu", "1");
    //Remove warnings
    a.ready(() => {
        a.$(".alert-danger.lead:contains('block')").remove();
        a.$("p:contains('Please disable ads block')").remove();
        a.$("p:contains('Please turn on popup')").remove();
    });
}
if (a.domCmp(["ouo.io"])) {
    a.win.localStorage.setItem("snapLastPopAt", (new a.win.Date()).getTime());
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
}
if (a.domCmp(["canalplus.fr"])) {
    let original; //Will be set later
    let currentVideoId = null; //So I do not switch unless it is different
    let videoElem; //Current video player element, used to replace it when changing episode
    //New handler
    const newFunc = function (onglet, liste, page, pid, ztid, videoId, progid) {
        //Switch video
        if (videoId !== currentVideoId) {
            currentVideoId = videoId;
            videoSwitch(videoId);
        }
        //Run original function
        original.apply(a.win, arguments);
    };
    //Video switcher
    const videoSwitch = function (videoID) {
        videoElem.text("Loading...");
        GM_xmlhttpRequest({
            method: "GET",
            url: `http://service.canal-plus.com/video/rest/getVideos/cplus/${videoID}?format=json`,
            onload(res) {
                //Try to find media URL
                try {
                    const response = JSON.parse(res.responseText);
                    const url = response.MEDIA.VIDEOS.HD;
                    if (url) {
                        const tempElem = a.$(a.nativePlayer(url + "?secret=pqzerjlsmdkjfoiuerhsdlfknaes"));
                        videoElem.after(tempElem).remove();
                        videoElem = tempElem;
                    } else {
                        throw "Media URL Not Found";
                    }
                } catch (err) {
                    a.out.error("AAK failed to find media URL!");
                }
            },
            onerror() {
                a.out.error("AAK failed to load media JSON!");
            },
        });
    };
    //Initialization
    a.ready(() => {
        //Insert our handler in between theirs
        original = a.win.changeOngletColonneCentrale;
        a.win.changeOngletColonneCentrale = newFunc;
        //Get the original player
        videoElem = a.$("#onePlayerHolder");
        //Set current video ID then patch the player for the first time
        if (currentVideoId = videoElem.data("video")) {
            videoSwitch(currentVideoId);
        }
    });
}
if (a.domCmp(["translatica.pl"])) {
    a.readOnly("adblock", false);
}
if (a.domCmp(["vidlox.tv"])) {
    a.readOnly("adb", 0);
}
if (a.domCmp(["receive-sms-online.info"])) {
    a.filter("addEventListener", a.matchMethod.stringExact, `function (b){return"undefined"!=typeof n&&` +
        `n.event.triggered!==b.type?n.event.dispatch.apply(a,arguments):void 0}`);
}
if (a.domCmp(["3dgames.com.ar"])) {
    a.generic.FuckAdBlock(a.uid(), "gw");
}
if (a.domCmp(["mexashare.com", "kisshentai.net"])) {
    a.readOnly("BetterJsPop", () => { });
}
if (a.domCmp(["comicallyincorrect.com"])) {
    a.observe("insert", (node) => {
        if (node && node.tagName === "DIV" && node.innerHTML && node.innerHTML.includes("Paid Content:")) {
            node.remove();
        }
    });
}
if (a.domCmp(["cda.pl"])) {
    a.readOnly("adblockV1", true);
}
if (a.domCmp(["linternaute.com"])) {
    let val;
    a.win.Object.defineProperty(a.win, "OO", {
        configurable: false,
        set(arg) {
            val = arg;
        },
        get() {
            val && (val.AAB = null);
            return val;
        },
    });
}
if (a.domCmp(["new-skys.net"])) {
    a.noAccess("alert");
}
if (a.domCmp(["gentside.com"])) {
    a.readOnly("adblockPopup", {
        IS_BLOCKED: false,
        init() { },
        removeAdblockPopup() { },
    });
}
if (a.domCmp(["idlelivelink.blogspot.com"])) {
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
    a.ready(() => {
        a.doc.body.oncontextmenu = null;
        a.doc.body.onkeydown = null;
        a.doc.body.onmousedown = null;
    });
}
if (a.domCmp(["hackinformer.com"])) {
    a.ready(() => {
        a.$(".special-message-wrapper:contains(your ad blocker)").remove();
    });
}
if (a.domCmp(["tg007.net"])) {
    a.bait("div", "#gads", true);
}
if (a.domCmp(["bild.de"])) {
    a.filter("document.querySelector", a.matchMethod.stringExact, "body");
}
if (a.domCmp(["codepo8.github.io"]) && a.win.location.pathname.startsWith("/detecting-adblock/")) {
    a.css(".notblocked { display:block; } .blocked { display:none; }");
}
if (a.domCmp(["altadefinizione.media"])) {
    //Issue: https://gitlab.com/xuhaiyang1234/uBlockProtectorSecretIssues/issues/1
    a.ready(() => {
        a.$("a[href='http://altarisoluzione.online/HD/play5.php']").remove();
    });
}
if (a.domCmp(["hdpass.net"])) {
    //Issue: https://gitlab.com/xuhaiyang1234/uBlockProtectorSecretIssues/issues/1
    let flag = false;
    a.win.open = () => {
        flag = true;
    };
    a.on("load", () => {
        let token = a.setInterval(() => {
            a.win.$(".wrapSpot span#closeSpot").click();
            if (flag) {
                a.clearInterval(token);
            }
        }, 500);
    });
}
if (a.domCmp(["nowvideo.ec", "nowvideo.li", "ewingoset.info"])) {
    //Issue: https://gitlab.com/xuhaiyang1234/uBlockProtectorSecretIssues/issues/2
    //Issue: https://gitlab.com/xuhaiyang1234/uBlockProtectorSecretIssues/issues/5
    a.ready(() => {
        a.$("#cty").append(`<input type="hidden" name="ab" value="1">`);
    });
}
if (a.domCmp(["karibusana.org"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/253
    a.noAccess("bizpanda");
    a.css(".onp-locker-call { display:block; }");
}
if (a.domCmp(["lewat.id", "u2s.io"])) {
    //Issue: https://gitlab.com/xuhaiyang1234/uBlockProtectorSecretIssues/issues/4
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
    let matcher;
    if (a.domCmp(["lewat.id"], true)) {
        matcher = /^https?:\/\/lewat\.id\//i;
    } else if (a.domCmp(["u2s.io"], true)) {
        matcher = /^https?:\/\/u2s\.io\//i;
    }
    const token = a.setInterval(() => {
        const elem = a.$(".skip-ad a");
        if (elem.length && elem[0].href && !matcher.test(elem[0].href)) {
            a.$(".skip-ad").hide();
            a.win.location.href = elem[0].href;
            a.clearInterval(token);
        }
    }, 250);
}
if (a.domCmp(["shinden.pl"])) {
    a.readOnly("shinden_ads", true);
}
if (a.domCmp(["onhax.me"])) {
    const _open = a.win.open;
    a.win.open = (...args) => {
        if (args[1].startsWith("wpcom")) {
            return _open.apply(a.win, args);
        }
    }
}
if (a.domCmp(["null-24.com"])) {
    a.ready(() => {
        a.$("#custom-links .custom-url-wrap a").each(function () {
            this.href = this.innerHTML;
        });
        a.setTimeout(() => {
            a.win.jQuery("span:contains(Download Direct Link)").parent().unbind("click");
        }, 250);
    });
}
if (a.domCmp(["searchftps.net"])) {
    a.$(`<iframe width="336" height="280" style="display:none;"></iframe>`).appendTo("html");
}
if (a.domCmp(["cyberterminators.co"])) {
    a.ready(() => {
        a.doc.oncontextmenu = null;
    });
}
if (a.domCmp(["youtube-videos.tv"])) {
    a.css(".cactus-video-content div { display:block; } .mts-cl-horizontal.mts-cl-social-locker { display:none; }");
    a.noAccess("KillAdBlock");
}
if (a.domCmp(["dailyuploads.net"])) {
    a.css("#downloadBtnClickOrignal { display:block; } #downloadBtnClick { display:none; } #chkIsAdd { display:none; }");
}
if (a.domCmp(["buickforums.com"])) {
    a.bait("div", "#TestAdBlock", true);
}
if (a.domCmp(["realkana.com"])) {
    a.generic.FuckAdBlock("HooAdBlock", "hooAdBlock");
}
if (a.domCmp(["generatorlinkpremium.com"])) {
    $(document).ready(() => {
        const normal = $("#normal").attr("href") + "&h=1";
        $("#quick").attr("href", normal);
        $("#quick").attr("title", "Download this file with a faster download speed");
        $("#quick").css("cursor", "pointer");
    });
}
if (a.domCmp(["genbird.com"])) {
    a.filter("addEventListener", a.matchMethod.string, "Please disable your ad blocker.");
}
if (a.domCmp(["pg3dhacks.com"])) {
    a.ready(() => {
        const buttons = document.querySelectorAll("button");
        const matcher = /Unlock.*Download/;
        for (let i = 0; i < buttons.length; i++) {
            if (buttons[i].innerText === "Download") {
                buttons[i].disabled = false;
            } else if (matcher.test(buttons[i].innerText)) {
                buttons[i].remove();
            }
        }
    });
}
if (a.domCmp(["lne.es"])) {
    a.ready(() => {
        a.addScript(() => {
            window.onload = null;
        });
    });
}
if (a.domCmp(["cutwin.com", "cut-urls.com", "adbull.me", "xess.pro", "clik.pw", "admove.co"])) {
    a.bait("div", "#test-block", true);
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
}
if (a.domCmp(["adshort.co", "linksh.top", "adshorte.com", "coinb.ink", "gratisjuegos.co"])) {
    a.noAccess("F3Z9");
}
if (a.domCmp(["gamersclub.com.br", "uploadboy.com", "vidoza.net", "videohelp.com"])) {
    a.generic.adsjsV2();
}
if (a.domCmp(["noticiasautomotivas.com.br"])) {
    a.css("html, body { overflow:scroll; } cloudflare-app[app-id='no-adblock'] { display:none; }", true);
}
if (a.domCmp(["tf1.fr"])) {
    a.xhrSpoof("@@||louccrossc.com^", "");
    a.xhrSpoof("@@||foilpolyth.com^", "");
}
if (a.domCmp(["sport365.live"])) {
    a.inject(() => {
        "use strict";
        const _eval = window.eval;
        window.eval = (...args) => {
            try {
                window.$.adblock = false;
            } catch (err) { }
            _eval.apply(window, args);
        };
    });
}
if (a.domCmp(["gsmarena.com"])) {
    a.filter("eval");
}
if (a.domCmp(["myfxbook.com"])) {
    a.inject(() => {
        "use strict";
        const err = new window.Error("This property may not be accessed!");
        window.Object.defineProperty(window, "isAdBlockerExist", {
            configurable: false,
            get() {
                throw err;
            },
            set(val) {
                if (val) {
                    throw err;
                }
            }
        });
    });
}
if (a.domCmp(["ptztv.com", "mahobeachcam.com"])) {
    a.readOnly("PTZtv", true);
}
if (a.domCmp(["mywrestling.com.pl"])) {
    a.generic.FuckAdBlock("KillAdBlock", "killAdBlock");
}
if (a.domCmp(["vvvvid.it"])) {
    a.ready(() => {
        a.inject(() => {
            //Based on KAADIVVVV
            //License: https://github.com/Robotex/KAADIVVVV/blob/master/LICENSE
            "use strict";
            if (window.vvvvid) {
                const re = /var a=function.*};/;
                const data = `var a=function(){vvvvid.advPlayer=null,$(c.playerControlsClass).removeClass("ppad"),d()};`;
                //Patch properties
                window.vvvvid.cab4 = function (a, b) {
                    this.isAdBlockActive = false;
                    b && b(false);
                };
                const func = window.String(window.vvvvid.models.PlayerObj.prototype.startAdv);
                if (!re.test(func)) {
                    window.console.error("AAK failed to set up VVVVID detector defuser!");
                }
                //That variable name feels like a trap
                //https://github.com/Robotex/KAADIVVVV/issues/16
                window.eval("window[mnsJHnyT] = window.vvvvid.models.PlayerObj.prototype.startAdv = " + func.replace(re, data));
            }
        });
    });
}
if (a.domCmp(["nekopoi.bid"])) {
    //NSFW!
    a.readOnly("adblock", false);
    a.readOnly("isAdsDisplayed", true);
}
if (a.domCmp(["wunderground.com"])) {
    a.readOnly("noAdBlocker", "no");
}
if (a.domCmp(["short.am"])) {
    if (location.pathname !== "/") {
        a.readOnly("RunAds", undefined);
        a.ready(() => {
            let check = a.$("#disable > div.alert-danger");
            if (check.length) {
                check.text("Please wait...");
                a.on("load", () => {
                    //Based on AdsBypasser
                    //License: https://github.com/adsbypasser/adsbypasser/blob/master/LICENSE
                    let f = document.createElement("form");
                    f.style.display = "none";
                    f.method = "post";
                    let i = document.createElement("input");
                    i.name = "_image";
                    i.value = "Continue";
                    f.appendChild(i);
                    document.body.append(f);
                    f.submit();
                });
            }
        });
    }
}
if (a.domCmp(["jbzdy.pl"])) {
    a.inject(() => {
        "use strict";
        let val;
        window.Object.defineProperty(window, "App", {
            configurable: false,
            set(arg) {
                val = arg;
                try {
                    val.adb.init = () => { };
                } catch (err) { }
            },
            get() {
                return val;
            },
        });
    });
}
if (a.domCmp(["egobits.com"])) {
    a.noAccess("detector_launch");
}
if (a.domCmp(["cbs.com"])) {
    if (!a.cookie("first_page_today") && !sessionStorage.getItem("_first_page_today_fallback")) {
        sessionStorage.setItem("_first_page_today_fallback", true);
        a.ready(() => {
            location.reload();
        });
    }
}
if (a.domCmp(["cdn-surfline.com"])) {
    a.filter("setTimeout", a.matchMethod.string, "ad blocker");
    a.ready(() => {
        a.inject(() => {
            "use strict";
            window.doFallBackonAdError = () => { };
        });
    });
}
if (a.domCmp(["zimuku.net"])) {
    a.readOnly("isAdEnabled", true);
}
if (a.domCmp(["timesofindia.indiatimes.com"])) {
    a.ready(() => {
        setTimeout(() => {
            if (location.href.includes("interstitial")) {
                a.cookie("nsIstial_Cook", "1");
                a.cookie("ns", "1");
                location.href = "https://timesofindia.indiatimes.com/";
            }
        }, 300);
    });
}
if (a.domCmp(["anonymousemail.me"])) {
    a.beforeScript((script) => {
        if (script.textContent && script.textContent.includes("anonymousemail.me/adblock.php")) {
            script.remove();
        }
    });
}
if (a.domCmp(["solowrestling.com"])) {
    a.readOnly("bloq", 1);
}
if (a.domCmp(["arenavision.us"])) {
    a.noAccess("H7WWWW");
}
if (a.domCmp(["wowtoken.info"])) {
    const re = /fail\(\);/g;
    a.beforeScript((script) => {
        if (script.src && script.src.includes("/js/main.js")) {
            $.request({
                method: "GET",
                url: script.src,
            }, (data) => {
                a.inject(data.replace(re, "true;"), true);
            }, () => {
                console.error("AAK failed to patch main script!");
            });
            script.remove();
        }
    });
}
if (a.domCmp(["wifihack.me"])) {
    a.noAccess("AdBlocked");
}
if (a.domCmp(["gntai.xyz"])) {
    a.readOnly("showAds", true);
}
if (a.domCmp(["viasatsport.se", "viasport.fi", "tv3sport.dk", "viasport.no"])) {
    a.inject(() => {
        "use strict";
        const observer = new window.MutationObserver(() => {
            const videos = window.document.querySelectorAll("video.blurred");
            for (let i = 0; i < videos.length; i++) {
                videos[i].classList.remove("blurred");
            }
            const buttons = window.document.querySelectorAll(".vjs-overlay-message-close-button");
            for (let i = 0; i < buttons.length; i++) {
                buttons[i].click();
            }
            if (window.videoPlayers instanceof window.Object) {
                for (let key in window.videoPlayers) {
                    try {
                        window.videoPlayers[key]._player.trigger("hideOverlayBlur");
                    } catch (err) { }
                }
            }
        });
        observer.observe(window.document, {
            childList: true,
            subtree: true,
        });
    });
}
if (a.domCmp(["graphiq-stories.graphiq.com"])) {
    a.loopback((ignored, url) => {
        if (url.startsWith("/ad?")) {
            return "window.FTBAds.blocking = false;";
        }
    });
}
if (a.domCmp(["graphiq-stories.graphiq.com"])) {
    a.loopback((ignored, url) => {
        if (url.startsWith("/ad?")) {
            return "window.FTBAds.blocking = false;";
        }
    });
}
if (a.domCmp(["nontonanime.org"])) {
    a.readOnly("ADBLOCK", true);
}
if (a.domCmp(["tuba.pl"])) {
    a.readOnly("adsOk", true);
}
if (a.domCmp(["wetter3.de"])) {
    a.readOnly("karte1", 18);
}
if (a.domCmp(["webnovel.com"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/457
    const bookExtractor = /\/book\/([^/]+)/;
    let isInBackground = false;
    const scanner = () => {
        if (isInBackground) {
            return;
        }
        $(".cha-content._lock").each((lock) => {
            //Remove flag
            lock.classList.remove("_lock");
            //Remove video
            const video = lock.closest(".chapter_content").querySelector(".lock-video");
            if (video) {
                video.remove();
            }
            //Let user know what is happening
            const contentElem = lock.querySelector(".cha-words");
            contentElem.insertAdjacentHTML("beforeend", "<p style='opacity:0.5;'>" +
                "AAK is fetching the rest of this chapter, this can take up to 30 seconds.</p>");
            //Get IDs
            const bookID = bookExtractor.exec(location.href)[1];
            const chapterID = lock.querySelector("[data-cid]").dataset.cid;
            //Check if I got IDs
            if (!bookID || !chapterID) {
                return;
            }
            //Get cookie
            const cookie = encodeURIComponent(a.cookie("_csrfToken"));
            //Get token
            $.ajax({
                method: "GET",
                url: `https://www.webnovel.com/apiajax/chapter/GetChapterContentToken?_csrfToken=` +
                `${cookie}&bookId=${bookID}&chapterId=${chapterID}`,
            }).done((data) => {
                try {
                    let token = JSON.parse(data).data.token;
                    token = encodeURIComponent(token);
                    fetchChapter(cookie, token, contentElem);
                } catch (err) {
                    console.error("AAK failed to find chapter token!");
                }
            }).fail(() => {
                console.error("AAK failed to find chapter token!");
            });
        });
    };
    const fetchChapter = (cookie, token, contentElem) => {
        const tick = () => {
            $.ajax({
                method: "GET",
                url: `https://www.webnovel.com/apiajax/chapter/GetChapterContentByToken?_csrfToken=` +
                `${cookie}&token=${token}`,
            }).done((data) => {
                try {
                    const content = JSON.parse(data).data.content.trim();
                    if (content) {
                        drawChapter(content, contentElem);
                    } else {
                        setTimeout(tick, 2000);
                    }
                } catch (err) {
                    setTimeout(tick, 2000);
                }
            }).fail(() => {
                setTimeout(tick, 2000);
            });
        };
        tick();
    };
    const drawChapter = (content, contentElem) => {
        const lines = content.split("\n");
        contentElem.innerHTML = "";
        for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            if (!line) {
                continue;
            }
            const p = document.createElement("p");
            p.textContent = line;
            contentElem.append(p);
        }
    };
    setInterval(scanner, 1000);
    a.on("focus", () => { isInBackground = false; });
    a.on("blur", () => { isInBackground = true; });
}
if (a.domCmp(["falter.at"])) {
    a.noAccess("showFalterGif");
}
if (a.domCmp(["ur.ly", "urly.mobi"])) {
    const re = /\?ref=.*/;
    a.onInsert((node) => {
        if (node.id === "skip_button1") {
            stop();
            location.href = node.href.replace(re, "?href=https://google.com/");
        }
    });
}
if (a.domCmp(["shutterdowner.com"])) {
    a.bait("div", "#zagshutter");
}
if (a.domCmp(["gpro.net"])) {
    a.ready(() => {
        $("#blockblockA").parent().parent().remove();
    });
}
if (a.domCmp(["vsports.pt"])) {
    a.readOnly("adblockDetecter", true);
}
if (a.domCmp(["sledujufilmy.cz"])) {
    a.readOnly("ads_ok", true);
}
if (a.domCmp(["bildungsspender.de"])) {
    a.readOnly("werbeblocker", true);
}
if (a.domCmp(["pseudo-flaw.net"])) {
    a.readOnly("stopBlock", () => { });
}
if (a.domCmp(["clasicotas.org"])) {
    a.filter("addEventListener", a.matchMethod.stringExact, "mouseup", "window.document");
}
if (a.domCmp(["mwpaste.com"])) {
    a.css("#downbloq { display:none; } .hidebloq { display:block; }");
    a.ready(() => {
        a.inject(() => {
            "use strict";
            const blocks = window.document.querySelectorAll(".hidebloq");
            for (let i = 0; i < blocks.length; i++) {
                blocks[i].innerHTML = window.atob(blocks[i].textContent);
            }
        });
    });
}
if (a.domCmp(["portel.pl"])) {
    a.readOnly("blokowanko", false);
}
if (a.domCmp(["mangacanblog.com"])) {
    a.readOnly("adblock", 1);
}
if (a.domCmp(["aargauerzeitung.ch", "badenertagblatt.ch", "basellandschaftlichezeitung.ch", "bzbasel.ch",
    "limmattalerzeitung.ch", "solothurnerzeitung.ch", "grenchnertagblatt.ch", "oltnertagblatt.ch"])) {
    a.filter("setTimeout", a.matchMethod.string, "[native code]");
}
if (a.domCmp(["qoshe.com"])) {
    a.readOnly("adBlockAlertShown", true);
    a.filter("setTimeout", a.matchMethod.string, "adBlockFunction()");
}
if (a.domCmp(["spiegel.de"])) {
    a.generic.FuckAdBlock("ABB", "abb");
}
if (a.domCmp(["tvnow.de"])) {
    a.replace(() => {
        if (url.includes("/v3/movies/")) {
            this.addEventListener("readystatechange", () => {
                if (this.readyState === 4) {
                    try {
                        let payload = window.JSON.parse(this.responseText);
                        payload.ignoreAd = true;
                        payload.noad = true;
                        payload.geoblocked = false;
                        payload.free = true;
                        payload.blockadeText = "0";
                        payload.format.enableAd = false;
                        payload.format.hasFreeEpisodes = true;
                        payload.format.isGeoBlocked = false;
                        replace(this, window.JSON.stringify(payload));
                    } catch (err) { }
                }
            });
        }
    });
}
if (a.domCmp(["acortar.net", "acortalo.net", "vellenger.com", "infobae.net"])) {
    a.on("load", () => {
        a.inject(() => {
            "use strict";
            let btn = window.document.querySelector(".linkhidder");
            if (btn) {
                const fallback = btn.onclick || (() => { });
                btn.onclick = () => {
                    try {
                        window.location.href = window.href[window.href.length - 1];
                    } catch (err) {
                        fallback();
                    }
                };
            }
        });
    });
}
if (a.domCmp(["peliculasmega.info"])) {
    a.css(".linkhidder { display:none; } a[class*='hidden_'] { display:block; }");
}
if (a.domCmp(["identi.li"])) {
    a.css(".linkhidder { display:none; } div[id^='hidden_'] { display:block; }");
    a.cookie("BetterJsPop0", "1");
    a.ready(() => {
        a.inject(() => {
            "use strict";
            //Type 1
            const blocks = window.document.querySelectorAll(".info_bbc");
            for (let i = 0; i < blocks.length; i++) {
                if (!blocks[i].firstChild.tagName) {
                    const links = window.GibberishAES.dec(blocks[i].textContent, window.hash);
                    blocks[i].innerHTML = window.linkify(links);
                    blocks[i].style.display = "block";
                    blocks[i].parentNode.previousSibling.remove();
                }
            }
            //Type 2
            if (window.$) {
                window.$("div #decrypt.myjdownloader").unbind("click").click(function () {
                    window._decrypt.fnID = "jdownloader";
                    window._decrypt.fnURL = this.getAttribute("href");
                    window._decrypt.objeto = null;
                    window._decrypt.open();
                });
            }
        });
    });
}
if (a.domCmp(["kiss.com.tw"])) {
    a.bait("div", "#ads");
}
if (a.domCmp(["nbcsports.com", "knowyourmeme.com"])) {
    a.readOnly("adblockDetect", () => { });
}
if (a.domCmp(["moviemakeronline.com"])) {
    a.readOnly("abNoticeShowed", true);
}
if (a.domInc(["10co"])) {
    a.bait("div", "#myTestAd", true);
    a.timewarp("setInterval", a.matchMethod.stringExact, "1000");
}
if (a.domCmp(["uptostream.com"])) {
    a.readOnly("check", () => {
        "use strict";
        window.$("#apbplus").css("display", "none");
        window.$("#vid").css("display", "block");
        window.$("#cred").css("display", "block");
    });
}
if (a.domCmp(["adageindia.in", "bombaytimes.com", "businessinsider.in", "gizmodo.in", "iamgujarat.com", "idiva.com",
    "in.techradar.com", "indiatimes.com", "lifehacker.co.in", "mensxp.com", "samayam.com", "gadgetsnow.com"])) {
    //Part 1
    a.inject(() => {
        "use strict";
        const magic = "a" + window.Math.random().toString(36).substring(2);
        const reScript = /typeof otab == 'function'/;
        const reComment = /\d{5,} \d{1,2}/;
        const getter = () => {
            let script;
            {
                let temp = [...window.document.querySelectorAll(`script:not([src]):not([${magic}])`)];
                if (window.document.currentScript && !window.document.currentScript.hasAttribute(magic)) {
                    temp.unshift(window.document.currentScript);
                }
                if (!temp.length) {
                    return true;
                }
                for (let i = 0; i < temp.length; i++) {
                    temp[i].setAttribute(magic, 1);
                    if (reScript.test(temp[i].textContent)) {
                        script = temp[i];
                        break;
                    }
                }
            }
            if (!script) {
                return true;
            }
            {
                const previous = script.previousSibling;
                let temp = previous;
                while (temp = temp.previousSibling) {
                    if (temp.nodeType === window.Node.COMMENT_NODE && reComment.test(temp.data)) {
                        previous.style.setProperty("display", "none", "important");
                        return false;
                    }
                }
            }
        };
        window.Object.defineProperty(window, "trev", {
            configurable: false,
            set() { },
            get() {
                let r;
                let i = 0;
                do {
                    try {
                        r = getter();
                    } catch (err) {
                        //window.console.error(err);
                    }
                } while (!r && (++i) < 100);
                return null;
            },
        });
        window.addEventListener("load", () => {
            void window.trev;
        });
    });
    //Part 2
    let isInBackground = false;
    const reStart = /^\/[a-z_]+\.cms/;
    const reEnd = /^ \d{5,} \d{1,2} $/;
    const adsHidder = (node) => {
        if (!document.body || isInBackground) {
            return;
        }
        let iterator = document.createTreeWalker(document.body, NodeFilter.SHOW_COMMENT);
        let comment;
        while (comment = iterator.nextNode()) {
            if (reStart.test(comment.data)) {
                let toHide = [];
                let previous = comment;
                while (previous = previous.previousSibling) {
                    if (previous.nodeType === Node.COMMENT_NODE && reEnd.test(previous.data)) {
                        if (toHide.length < 15) {
                            for (let i = 0; i < toHide.length; i++) {
                                try {
                                    toHide[i].style.setProperty("display", "none", "important");
                                } catch (err) { }
                            }
                        }
                        break;
                    }
                    toHide.push(previous);
                }
            }
        }
    };
    a.setInterval(adsHidder, 1000);
    a.on("focus", () => { isInBackground = false; });
    a.on("blur", () => { isInBackground = true; });
}
if (a.domCmp(["aternos.org"])) {
    a.filter("setTimeout", a.matchMethod.string, ".ad-detect");
}
if (a.domCmp(["webcafe.bg"])) {
    a.readOnly("bDetect", false);
}
if (a.domCmp(["telecinco.es", "cuatro.com", "divinity.es", "factoriadeficcion.com", "energytv.es", "bemad.es",
    "eltiempohoy.es", "mtmad.es"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/448
    a.inject(() => {
        "use strict";
        const err = new TypeError("Failed to execute 'getElementById' on 'Document': 'adsFooter' is not a valid ID.");
        const original = window.document.getElementById;
        window.document.getElementById = (id, ...rest) => {
            if (id === "adsFooter") {
                throw err;
            } else {
                return original.call(window.document, id, ...rest);
            }
        }
    })
}
if (a.domCmp(["mitele.es"])) {
    //Issue: https://github.com/jspenguin2017/uBlockProtector/issues/448
    a.inject(() => {
        "use strict";
        window.google = {};
    });
}
if (a.domCmp(["docer.pl"])) {
    a.readOnly("ads_unblocked", true);
    a.ready(() => {
        $("#square-1").css("width", "1px");
    });
}
if (a.domCmp(["samehadaku.net"])) {
    a.readOnly("tieE3", true);
}
if (a.domCmp(["booogle.net", "nsspot.net"])) {
    a.readOnly("gadb", false);
}
if (a.domCmp(["kbb.com"])) {
    a.inject(() => {
        "use strict";
        const v = window.Object.freeze({
            init() { },
            start() { },
        });
        window.KBB = {};
        window.Object.defineProperty(window.KBB, "Abb", {
            configurable: false,
            set() { },
            get() {
                return v;
            },
        });
    });
}
if (a.domCmp(["gp.se", "bohuslaningen.se", "hallandsposten.se", "hn.se", "stromstadstidning.se", "ttela.se"])) {
    a.inject(() => {
        "use strict";
        window.scrollTo = () => { };
        window.burtApi = {
            stopTracking() { },
            connect() { },
            annotate() { },
            startTracking() { },
            trackById() {
                return {
                    connect() { },
                };
            },
        };
        window._adform = {
            readTags() { },
        };
    });
}
if (a.domCmp(["playok.com", "kurnik.pl"])) {
    a.filter("getElementById", a.matchMethod.stringExact, "abp", "window.document");
}
if (a.domCmp(["explosm.net"])) {
    a.readOnly("showads", true);
}
if (a.domCmp(["videacesky.cz"])) {
    a.filter("setTimeout", a.matchMethod.string, "/dialog/adblock/");
}
if (a.domCmp(["playrust.io"])) {
    a.onInsert((node) => {
        if (node.textContent && node.textContent.includes("Advertising enables us")) {
            node.remove();
        }
    });
}
if (a.domCmp(["linkshrink.net"])) {
    //Skip glitchy timer caused by blocking popup
    //Based on AdsBypasser
    //License: https://github.com/adsbypasser/adsbypasser/blob/master/LICENSE
    const matcher = /revC\("([^"]+)"\)/;
    a.ready(() => {
        let match;
        const scripts = document.querySelectorAll("script");
        //Start from end as the script tend to be at the end
        for (let i = scripts.length - 1; i >= 0; i--) {
            if (match = matcher.exec(scripts[i].textContent)) {
                location.pathname = "/" + atob(match[1]);
                break;
            }
        }
    });
}
if (a.domCmp(["gamekit.com"])) {
    a.filter("setInterval", a.matchMethod.string, "a-d-block-popup");
}
if (a.domCmp(["dilidili.wang"])) {
    a.filter("addEventListener", a.matchMethod.stringExact, "DOMNodeInserted", "window.document");
    a.antiCollapse("innerHTML", (elem) => elem === window.document.body);
}
if (a.domCmp(["gamejolt.net"])) {
    a.onInsert((node) => {
        if (node && node.innerHTML && node.innerHTML.includes("View ad.")) {
            node.querySelector("h3").remove();
            node.querySelector("p").remove();
        }
    });
}
if (a.domCmp(["haber1903.com"])) {
    a.filter("setTimeout", a.matchMethod.string, "adblock");
    a.noAccess("EnableRightClick");
}

if (a.domCmp(["rule34hentai.net"])) {
    a.inject(() => {
        "use strict";
        window.base_href = "";
    });
}
if (a.domCmp(["paksociety.com"])) {
    a.css("html, body { overflow:scroll; }");
}
if (a.domCmp(["tlz.de"])) {
    a.filter("addEventListener", a.matchMethod.string, `document.getElementById("ad-container")`,
        "window.document");
}
if (a.domCmp(["cellmapper.net"])) {
    a.filter("alert", a.matchMethod.string, "Please disable ad-block");
}
if (a.domCmp(["1tv.ru"])) {
    a.inject(() => {
        "use strict";
        //Stage 1
        const fakeAntiblock = {
            opts: {
                url: "",
                detectOnStart: false,
                indicatorName: "",
                resources: [],
            },
            readyState: "ready",
            detected: false,
            ready(f) {
                window.setTimeout(f, 10, false);
                return this;
            },
            detect(f) {
                window.setTimeout(f.cb, 10, false, this);
                return this;
            }
        };
        window.EUMP = {};
        window.Object.defineProperty(window.EUMP, "antiblock", {
            configurable: false,
            set() { },
            get() {
                return fakeAntiblock;
            }
        });
        //Stage 2
        const original = window.XMLHttpRequest;
        window.XMLHttpRequest = function (...args) {
            const wrapped = new (window.Function.prototype.bind.apply(original, args));
            const _open = wrapped.open;
            wrapped.open = function (...args) {
                if (args.length > 1 && args[1].startsWith("//v.adfox.ru/")) {
                    this.withCredentials = false;
                }
                return _open.apply(wrapped, args);
            };
            return wrapped;
        };
    });
}
if (a.domCmp(["viz.com"])) {
    a.readOnly("show_dfp_preroll", false);
}
if (a.domCmp(["vod.pl"])) {
    a.onInsert((node) => {
        if (node.tagName !== "SCRIPT" && node.innerText && node.innerText.includes("Prosimy, odblokuj wy\u015Bwietlanie reklam")) {
            node.remove();
        }
    });
}
if (a.domCmp(["onet.pl", "komputerswiat.pl"])) {
    a.beforeScript((script) => {
        if (script.id === "adsinit") {
            script.remove();
        }
    });
}
if (a.domCmp(["oddreaders.com"])) {
    a.css(".onp-sl-blur-area { filter:none; }");
    a.onInsert((node) => {
        if (node.querySelector && node.querySelector("img[src='http://oddreaders.com/wp-content/uploads/2017/07/" +
            "A-Publisher-Approach-to-Adblock-Users.png'")) {
            node.remove();
        }
    });
}
if (a.domCmp(["giallozafferano.it"])) {
    a.filter("setTimeout", a.matchMethod.string, "adblock alert");
}
if (a.domCmp(["gry.wp.pl", "maketecheasier.com"])) {
    a.filter("atob");
}
if (a.domCmp(["di.fm", "jazzradio.com"])) {
    a.loopback((ignored, url) => {
        if (url.startsWith("https://pubads.g.doubleclick.net/")) {
            return `<?xml version="1.0" encoding="UTF-8"?>
<VAST xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="vast.xsd" version="3.0">
</VAST>`;
        }
    });
}
if (a.domCmp(["itv.com"])) {
    a.loopback((ignored, url) => {
        if (url.startsWith("https://tom.itv.com/itv/tserver/size=")) {
            return `<?xml version="1.0" encoding="utf-8"?>
<VAST version="2.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:noNamespaceSchemaLocation="vast.xsd">
</VAST>`;
        }
    });
}
if (a.domCmp(["digitalpoint.com"])) {
    a.ready(() => {
        a.inject(() => {
            "use strict";
            window.DigitalPoint._General.blockMessage = () => { };
        });
    });
}
if (a.domCmp(["ohmymag.com", "ohmymag.com.br", "ohmymag.de", "gentside.com", "gentside.com.br",
    "maxisciences.com"])) {
    a.readOnly("adblockPopup", `{
        IS_BLOCKED: false,
        init() { },
        removeAdblockPopup() { },
    }`);
}
if (a.domCmp(["yiv.com"])) {
    a.cookie("AdBlockMessage", "yes");
}