function headerfooter() {
    let header = `
        <div id="menu">
            <button class="little-link" id="menu-index" onclick="toIndex()">Index</button>
            <div id="menu-bottom">
                <button class="little-link" id="menu-about" onclick="toAbout()">About</button>
                <button class="little-link" id="menu-projects" onclick="toProjects()">Projects</button>
                <button class="little-link" id="menu-resume" onclick="toResume()">Resume</button>
            </div>
        </div>
    `;
    document.getElementById("menu-main").innerHTML = header;

    let footer = `
        <div id="footer">
            <div id="separator">
                <p class="normal-text" id="separator-text">ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER</p>
            </div>
            <div id="footer-main">
                <img id="footer-blob" src="./assets/graphc.png">
                <div id="footer-top">
                    <p class="normal-text" id="footer-name">Richard Lin</p>
                </div>
                <div id="footer-row-1">
                    <p class="title-text" id="footer-index" onclick="toIndex()">INDEX</p>
                    <p class="title-text" id="footer-about" onclick="toAbout()">ABOUT</p>
                </div>
                <div id="footer-row-2">
                    <p class="title-text" id="footer-projects" onclick="toProjects()">PROJECTS</p>
                </div>
                <div id="footer-bottom">
                    <div id="footer-bottom-left">
                        <a class="little-link" id="landing-linkedin" target="_blank" href="https://www.linkedin.com/in/richardlin4375/">LinkedIn</a>
                        <a class="little-link" id="landing-email" target="_blank" href="mailto:rlin@unc.edu">Email</a>
                    </div>
                    <p class="title-text" id="footer-resume" onclick="toResume()">RESUME</p>
                </div>
            </div>
        </div>
    `;
    document.getElementById("footer").innerHTML = footer;
}

var menu = "menu"
var indexlink = "menu-index"
var aboutlink = "menu-about"
var projectslink = "menu-projects"
var resumelink = "menu-resume";

function indexMenu() {
    if (window.location.pathname.includes("index")) {
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
    }
}
function aboutMenu() {
    if (window.location.pathname.includes("about")) {
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
                document.getElementById(menu).style = "border-left: 1px solid transparent;";
                document.getElementById(indexlink).style = "color: var(--dark);";
                document.getElementById(aboutlink).style = "opacity: 0;";
                document.getElementById(projectslink).style = "opacity: 0;";
                document.getElementById(resumelink).style = "opacity: 0;";
            }
            if (scrollTop > 100) {
                document.getElementById(menu).style = "opacity: 0;";
            }
        }, 10)
    }
}

function toIndex() {
    window.open("./index.html", "_self");
}
function toAbout() {
    window.open("./about.html", "_self");
}
function toProjects() {
    window.open("./projects.html", "_self");
}
function toResume() {
    window.open("./assets/resume.pdf", "_self");
}


window.onload = function() {
    headerfooter();
    indexMenu();
    aboutMenu();
}
