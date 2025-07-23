function components() {
    let header = `
        <div id="menu">
            <button class="little-link" id="menu-index" onclick="toLink('./index.html')">Index</button>
            <div id="menu-bottom">
                <button class="little-link" id="menu-about" onclick="toLink('./about.html')">About</button>
                <button class="little-link" id="menu-projects" onclick="toProjects()">Projects</button>
                <button class="little-link" id="menu-resume" onclick="toResume()">Resume</button>
            </div>
        </div>
    `;
    document.getElementById("menu-main").innerHTML = header;

    let footer = `
        <div id="footer">
            <div id="separator">
                <p class="normal-text" id="separator-text">ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER ACCESSIBLE BOLD EMPATHETIC STUDENT DESIGNER DEVELOPER </p>
            </div>
            <div id="footer-main">
                <img id="footer-blob" src="./assets/graphc.png">
                <div id="footer-top">
                    <p class="normal-text" id="footer-name">Richard Lin</p>
                </div>
                <div id="footer-row-1">
                    <p class="title-text" id="footer-index"  onclick="toLink('./index.html')">INDEX</p>
                    <p class="title-text" id="footer-about"  onclick="toLink('./about.html')">ABOUT</p>
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
    if (window.location.pathname.includes("index") || window.location.pathname === "/") {
        let projects = `
            <div id="projects">
                <div id="projects-top">
                    <p class="normal-text" id="projects-top-label">Projects +<br>Case Studies</p>
                    <div id="projects-numbers">
                        <p class="title-text projects-number" id="project-number-1" onclick="switchProject1()">01</p>
                        <p class="title-text projects-number" id="project-number-2" onclick="switchProject2()">02</p>
                        <p class="title-text projects-number" id="project-number-3" onclick="switchProject3()">03</p>
                        <p class="title-text projects-number" id="project-number-4" onclick="switchProject4()">04</p>
                    </div>
                </div>
                <div id="projects-bottom">
                    <a class="title-text" id="project-name" onclick="toLink(projectsLink)">ELSE!</a>
                    <p class="normal-text" id="project-description">A mobile application for finding online shopping alternatives based on selected preferences.</p>
                </div>
            </div>
        `
        document.getElementById("projects-main").innerHTML = projects;
    }
    
}

var menu = "menu"
var indexlink = "menu-index"
var aboutlink = "menu-about"
var projectslink = "menu-projects"
var resumelink = "menu-resume";

function menuHoverEffects(id, bg) {
    if (bg == "dark") {
        document.getElementById(id).style = "color: white;";
        document.getElementById(id).onmouseover = function() {
            document.getElementById(id).style = "color: var(--lighthover);";
        }
        document.getElementById(id).onmouseleave = function() {
            document.getElementById(id).style = "color: white;";
        }
    }
    if (bg == "light") {
        document.getElementById(id).style = "color: var(--dark);";
        document.getElementById(id).onmouseover = function() {
            document.getElementById(id).style = "color: var(--lighthover);";
        }
        document.getElementById(id).onmouseleave = function() {
            document.getElementById(id).style = "color: var(--dark);";
        }
    }
    
}

function indexMenu() {
    if (window.location.pathname.includes("index") || window.location.pathname === "/") {
        onscroll = (event) => {
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            scrollTop = (scrollTop/window.innerHeight) * 100;
            if (scrollTop <= 20) {
                document.getElementById(menu).style = "border-left: 1px solid var(--dark);";
                menuHoverEffects(indexlink, "light");
                menuHoverEffects(aboutlink, "light");
                menuHoverEffects(projectslink, "light");
                menuHoverEffects(resumelink, "light");
            }
            if (scrollTop > 20 && scrollTop <= 100) {
                menuHoverEffects(indexlink, "light");
                menuHoverEffects(aboutlink, "dark");
                menuHoverEffects(resumelink, "dark");
                menuHoverEffects(projectslink, "dark");
            }
            if (scrollTop > 100 && scrollTop <= 130) {
                document.getElementById(menu).style = "border-left: 1px solid white;";
                menuHoverEffects(indexlink, "dark");
                menuHoverEffects(aboutlink, "dark");
                menuHoverEffects(projectslink, "dark");
                menuHoverEffects(resumelink, "dark");
                document.getElementById("menu-bottom").style = "opacity: 100; pointer-events: all;";
            }
            if (scrollTop > 130 && scrollTop <= 200) {
                document.getElementById(menu).style = "opacity: 100; pointer-events: all;";
                document.getElementById("menu-bottom").style = "opacity: 0; pointer-events: none;";
                document.getElementById(menu).style = "border-left: 1px solid transparent";
            }
            if (scrollTop > 200) {
                document.getElementById(menu).style = "opacity: 0; pointer-events: none;";
            }
        }
    }
}
function aboutMenu() {
    if (window.location.pathname.includes("about")) {
        onscroll = (event) => {
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            scrollTop = (scrollTop/window.innerHeight) * 100;
            if (scrollTop <= 20) {
                document.getElementById(menu).style = "border-left: 1px solid var(--dark);";
                menuHoverEffects(indexlink, "light");
                document.getElementById("menu-bottom").style = "opacity: 100; pointer-events: all;"
            }
            if (scrollTop > 20 && scrollTop <= 100) {
                document.getElementById(menu).style = "border-left: 1px solid transparent;";
                document.getElementById(indexlink).style = "color: var(--dark);";
                document.getElementById("menu-bottom").style = "opacity: 0; pointer-events: none;"
            }
            if (scrollTop > 90) {
                document.getElementById(menu).style = "opacity: 0; pointer-events: none;";
            }
        }
    }
}
function projectMenu() {
    if (window.location.pathname.includes("else") || window.location.pathname.includes("walmart") || window.location.pathname.includes("polyvoc") || window.location.pathname.includes("messages")) {
        setTimeout(() => {
            document.getElementById("menu").style = "background: white;";
        }, 500);
        onscroll = (event) => {
            var body = document.body,
            html = document.documentElement;
            var height = Math.max( body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight );
            var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
            scrollTop = (scrollTop/window.innerHeight) * 100;
            height = (height/window.innerHeight) * 100;
            var distanceFromBottom = height - scrollTop - 100;
            console.log(distanceFromBottom);
            if (distanceFromBottom > 110) {
                document.getElementById(menu).style = "background: white;";
            }
            if (distanceFromBottom > 100 && distanceFromBottom <= 110) {
                console.log("h");
                document.getElementById(menu).style = "background: transparent; opacity: 100; pointer-events: all;";
                document.getElementById("menu-bottom").style = "opacity: 100; pointer-events: all;";
            }
            if (distanceFromBottom > 50 && distanceFromBottom <= 100) {
                document.getElementById(indexlink).style = "color: var(--dark)";
                document.getElementById("menu-bottom").style = "opacity: 0; pointer-events: none;";
                document.getElementById(menu).style = "border-left: 1px solid transparent; background: transparent; opacity: 100; pointer-events: all;";
            }
            if (distanceFromBottom < 50) {
                document.getElementById(menu).style = "opacity: 0;  pointer-events: none;";
            }
        }
    }
}

var projectsLink = "./else.html";

function projectHover(num) {
    document.getElementById(num).style.color = "var(--darkhover)";
}

function switchProject1() {
    document.getElementById("project-number-1").classList.add("activelist");
    document.getElementById("project-number-2").classList.remove("activelist");
    document.getElementById("project-number-3").classList.remove("activelist");
    document.getElementById("project-number-4").classList.remove("activelist");
    document.getElementById("project-name").innerHTML = "ELSE!"
    document.getElementById("project-description").innerHTML = "A mobile application for finding online shopping alternatives based on selected preferences."
    projectsLink = "./else.html";
}
function switchProject2() {
    document.getElementById("project-number-2").classList.add("activelist");
    document.getElementById("project-number-1").classList.remove("activelist");
    document.getElementById("project-number-3").classList.remove("activelist");
    document.getElementById("project-number-4").classList.remove("activelist");
    document.getElementById("project-name").innerHTML = "Walmart"
    document.getElementById("project-description").innerHTML = "An accessibility integration and simplified interface to assist elderly online shoppers."
    projectsLink = "./walmart.html";
}
function switchProject3() {
    document.getElementById("project-number-3").classList.add("activelist");
    document.getElementById("project-number-1").classList.remove("activelist");
    document.getElementById("project-number-2").classList.remove("activelist");
    document.getElementById("project-number-4").classList.remove("activelist");
    document.getElementById("project-name").innerHTML = "Polyvoc"
    document.getElementById("project-description").innerHTML = "A company website built for a client that runs a studio art class business for K - 12 students."    
    projectsLink = "./polyvoc.html";
}
function switchProject4() {
    document.getElementById("project-number-4").classList.add("activelist");
    document.getElementById("project-number-1").classList.remove("activelist");
    document.getElementById("project-number-3").classList.remove("activelist");
    document.getElementById("project-number-2").classList.remove("activelist");
    document.getElementById("project-name").innerHTML = "Messages"
    document.getElementById("project-description").innerHTML = "A video call integration concept for the Google Messages app, when only Google Duo existed. "
    projectsLink = "./messages.html";
}


function toLink(link) {
    document.getElementById("transition").style.height = "100vh";
    document.getElementById("menu").style = "background: transparent";
    setTimeout(() => {
        window.open(link, "_self");
    }, 700);
}
function toAbout() {
    window.open("./about.html", "_self");
}
function toProjects() {
    if (window.location.pathname.includes("index")) {
        document.getElementById('projects-main').scrollIntoView({behavior: "smooth"});
    }
    else {
        localStorage.setItem("toProjects", "going");
        toLink("./index.html");
    }
}
function localStorageProjects() {
    if (localStorage.getItem("toProjects") == "going") {
        document.getElementById('projects-main').scrollIntoView({behavior: "smooth"});
        localStorage.removeItem("toProjects");
    }
}
function toResume() {
    window.open("./assets/resume.pdf", "_blank");
}


window.onload = function() {
    components();
    setTimeout(() => {
        document.getElementById("transition").style = "height: 0";
    }, 200);
    indexMenu();
    aboutMenu();
    projectMenu();
    localStorageProjects()
    document.getElementById("project-number-1").classList.add("activelist");
}
    
window.onpointermove = event => { 
    const { clientX, clientY } = event;
    document.getElementById("followmouse").animate({
        left: `${clientX - 50}px`,
        top: `${clientY - 50}px`
    }, { duration: 400, fill: "forwards" });
    
}
document.addEventListener('mouseover', function(e) {
        const computedStyle = getComputedStyle(e.target);
        const cursorType = computedStyle.cursor;
        if (cursorType == "pointer") {
            document.getElementById("followmouse").style = "text-transform: capitalize; color: black; background: white; transform: rotate(0deg); width: auto; height: 5vw; border: 1px solid black";
            const hoveredElement = document.elementFromPoint(event.clientX, event.clientY);
            if (hoveredElement && hoveredElement.tagName.toLowerCase() !== 'div') {
                var spaceArrow = "&nbsp;&nbsp;&nbsp;&nbsp;→";
                if (hoveredElement.innerHTML == "") {
                    spaceArrow = "Open Image in New Tab&nbsp;&nbsp;&nbsp;&nbsp;→";
                }
                document.getElementById("followmouse").innerHTML = hoveredElement.innerHTML + spaceArrow;
            }
            if (hoveredElement.innerHTML == "ELSE!") {
                document.getElementById("followmouse").style = "text-transform: capitalize; color: white; background: var(--purple); transform: rotate(0deg); width: auto; height: 5vw; border: 1px solid black";
            }
            if (hoveredElement.innerHTML == "Walmart") {
                document.getElementById("followmouse").style = "text-transform: capitalize; color: white; background: #0071CE; transform: rotate(0deg); width: auto; height: 5vw; border: 1px solid black";
            }
            if (hoveredElement.innerHTML == "Polyvoc") {
                document.getElementById("followmouse").style = "text-transform: capitalize; color: white; background: #FF6200; transform: rotate(0deg); width: auto; height: 5vw; border: 1px solid black";
            }
            if (hoveredElement.innerHTML == "Messages") {
                document.getElementById("followmouse").style = "text-transform: capitalize; color: white; background: #4EB0FF; transform: rotate(0deg); width: auto; height: 5vw; border: 1px solid black";
            }
            
        }
        else if (cursorType != "pointer") {
            document.getElementById("followmouse").style = "rotate(-200deg); width: 2vw; height: 2vw; border: none";
            document.getElementById("followmouse").innerHTML = "→";
        }
});


