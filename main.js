(function () {

    if (document.location.hash === "" || document.location.hash === "#") {
        window.history.replaceState("", "", "?lang=pl#front");
        document.location = "?lang=pl#front";
    }

    let isChrome = !!window.chrome && !!window.chrome.webstore;
    const mixBlends = document.querySelectorAll(".nav__item");

    if (isChrome) {
        mixBlends.forEach(function (obj) {
            obj.style.mixBlendMode = "normal";
            obj.style.color = "black";
        });
    }

    let getQueryVariable = function (variable){
        let vars = window.location.search.substring(1).split("&");
        for (let item of vars) {
            if(item.split("=")[0] == variable){return item.split("=")[1];}
        }
        return(false);
    };

    const langEn = JSON.parse(langen),
        langPl = JSON.parse(langpl);

    const switchLangInAdr = function (lang){
        window.history.pushState("", "", `?lang=${lang}${document.location.hash}`)
    };

    let currentLang = getQueryVariable('lang');

    const langBtn = document.querySelector(".nav__item--lang"),
        cubeSides = ["front", "back", "right", "top", "left", "bottom"],
        cubeHeadings = cubeSides.map(item=>{return document.querySelector(`.cube__${item} h1`)}),
        cubeText = cubeSides.filter((item)=>{if (item != 'left'){return item}}).map(item=>{return document.querySelector(`.cube__${item} p`)}),
        leftHeadings = [...document.querySelectorAll('.cube__left h2')],
        leftText = [...document.querySelectorAll('.cube__left p')];


    const arrayIntoHtml = function (sourceArray, targetArray){
            for(let i = 0 ; i < targetArray.length; i++) {
                targetArray[i].innerHTML = sourceArray[i];
            }
    };


    const htmlLangSwitch = function (currentLang) {
        arrayIntoHtml(currentLang.headings, cubeHeadings);
        arrayIntoHtml(currentLang.txt, cubeText);
        arrayIntoHtml(currentLang.headingsleft, leftHeadings);
        arrayIntoHtml(currentLang.textleft, leftText);
    };

    const langSwitch = function () {
        if (currentLang === 'pl'){
            currentLang = 'en';
            switchLangInAdr(currentLang);
            htmlLangSwitch(langEn);
        } else {
            currentLang = 'pl';
            switchLangInAdr(currentLang);
            htmlLangSwitch(langPl);
        }

        langBtn.classList.toggle('nav__item--lang-pl');
        langBtn.classList.toggle('nav__item--lang-en');
    };

    langBtn.addEventListener('click', langSwitch);

    if (currentLang === 'pl') {
        langBtn.classList.add('nav__item--lang-pl');
        langBtn.classList.remove('nav__item--lang-en');
        htmlLangSwitch(langPl);
    }

    if (currentLang === 'en'){
        langBtn.classList.add('nav__item--lang-en');
        langBtn.classList.remove('nav__item--lang-pl');
        htmlLangSwitch(langEn);
    }

})();


