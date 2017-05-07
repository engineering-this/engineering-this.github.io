(function(){if (document.location.hash == "" || document.location.hash == "#")
    document.location.hash = "#front";

var isFirefox = typeof InstallTrigger !== 'undefined';

var mixBlends = document.querySelectorAll('.nav__item');

if (!isFirefox){
    mixBlends.forEach(function(obj){obj.style.mixBlendMode = 'normal'});
}})();