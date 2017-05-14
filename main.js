(function () {

    if (document.location.hash === "" || document.location.hash === "#") {
        window.history.replaceState("", "", "?lang=pl#front");
        document.location = "?lang=pl#front";
        var isChrome = !!window.chrome && !!window.chrome.webstore;

        var mixBlends = document.querySelectorAll(".nav__item");

        if (isChrome) {
            mixBlends.forEach(function (obj) {
                obj.style.mixBlendMode = "normal";
                obj.style.color = "black";
            });
        }
    }

    function getQueryVariable(variable)
    {
        var query = window.location.search.substring(1);
        var vars = query.split("&");
        for (var i=0;i<vars.length;i++) {
            var pair = vars[i].split("=");
            if(pair[0] == variable){return pair[1];}
        }
        return(false);
    }
    var langEn = JSON.parse(langen);
    var langPl = JSON.parse(langpl);

    var switchLangInAdr = function (lang){
        window.history.pushState("", "", `?lang=${lang}#front`)
    };

    var currentLang = getQueryVariable('lang');

    var langBtn = document.querySelector(".nav__item--lang");



    var cubeSides = ["front", "back", "right", "top", "left", "bottom"];
    var cubeHeadings = [];
    var cubeText = [];
    var leftHeadings = [...document.querySelectorAll('.cube__left h2')];
    var leftText = [...document.querySelectorAll('.cube__left p')];

    var htmlLangSwitch = function (currentLang) {
        for(i=0; i< cubeHeadings.length; i++) {
            cubeHeadings[i].innerText = currentLang.headings[i];
        }

        for(i=0; i< cubeText.length; i++) {
            cubeText[i].innerHTML = currentLang.txt[i];
        }

        for(i=0; i< leftHeadings.length; i++) {
            leftHeadings[i].innerText = currentLang.headingsleft[i];
        }

        for(i=0; i< leftText.length; i++) {
            leftText[i].innerHTML = currentLang.textleft[i];
        }
    };

    var langSwitch = function () {
        if (currentLang === 'pl'){
            currentLang = 'en';
            switchLangInAdr(currentLang);
            htmlLangSwitch(langEn);
        } else {
            currentLang = 'pl';
            switchLangInAdr(currentLang);
            htmlLangSwitch(langPl);
        }

        langBtn.classList.toggle('nav__item--lang-pl')
        langBtn.classList.toggle('nav__item--lang-en')
    };


    langBtn.addEventListener('click', langSwitch);



    cubeSides.forEach(function(item){
        cubeHeadings.push(document.querySelector(`.cube__${item} h1`));
        if (item != 'left') {
            cubeText.push(document.querySelector(`.cube__${item} p`));
        }
    });


    if (currentLang === 'pl') {
        langBtn.classList.add('nav__item--lang-pl');
        langBtn.classList.remove('nav__item--lang-en');
        htmlLangSwitch(langPl);
    }

    if (currentLang === 'en'){
        langBtn.classList.add('nav__item--lang-en');
        langBtn.classList.remove('nav__item--lang-pl');
        htmlLangSwitch(langEn);
        console.log(currentLang);
    }

})();


