(function () {
    if (document.location.hash === "" || document.location.hash === "#") {
        document.location.hash = "#front";

        var isChrome = !!window.chrome && !!window.chrome.webstore;

        var mixBlends = document.querySelectorAll(".nav__item");

        if (isChrome) {
            mixBlends.forEach(function (obj) {
                obj.style.mixBlendMode = "normal";
                obj.style.color = "black";
            });
        }
    }
})();