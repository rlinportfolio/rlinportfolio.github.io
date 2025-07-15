var menu = "menu"
var indexlink = "menu-index"
var aboutlink = "menu-about"
var projectslink = "menu-projects"
var resumelink = "menu-resume";



setInterval(function () {
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    scrollTop = (scrollTop/window.innerHeight) * 100
    if (scrollTop <= 20) {
        document.getElementById(menu).style = "border-left: 1px solid var(--dark);";
        document.getElementById(indexlink).style = "color: var(--dark);";
        document.getElementById(aboutlink).style = "color: var(--dark);";
        document.getElementById(projectslink).style = "color: var(--dark);";
        document.getElementById(resumelink).style = "color: var(--dark);";
    }
    if (scrollTop > 20 && scrollTop <= 100) {
        document.getElementById(indexlink).style = "color: var(--dark);";
        document.getElementById(aboutlink).style = "color: white;";
        document.getElementById(projectslink).style = "color: white;";
        document.getElementById(resumelink).style = "color: white;";
    }
    if (scrollTop > 100 && scrollTop <= 200) {
        document.getElementById(menu).style = "border-left: 1px solid white;";
        document.getElementById(indexlink).style = "color: white;";
        document.getElementById(aboutlink).style = "color: white;";
        document.getElementById(projectslink).style = "color: white;";
        document.getElementById(resumelink).style = "color: white;";
    }
    if (scrollTop > 200) {
        document.getElementById(menu).style = "opacity: 0;";
    }
}, 10)
