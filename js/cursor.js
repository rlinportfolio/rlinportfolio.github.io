document.addEventListener("DOMContentLoaded", () => {
    const cursor = document.createElement("div");
    const clockwiseSquare = document.createElement("div");
    const counterclockwiseTriangle = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    const trianglePath = document.createElementNS("http://www.w3.org/2000/svg", "polygon");

    cursor.id = "mouse-cursor";
    clockwiseSquare.className = "mouse-cursor-square mouse-cursor-square-clockwise";
    counterclockwiseTriangle.className = "mouse-cursor-triangle mouse-cursor-triangle-counterclockwise";
    counterclockwiseTriangle.setAttribute("viewBox", "0 0 24 24");
    trianglePath.setAttribute("points", "12,0.5 23.5,23.5 0.5,23.5");
    trianglePath.setAttribute("fill", "none");
    trianglePath.setAttribute("stroke", "black");
    trianglePath.setAttribute("stroke-width", "1");
    counterclockwiseTriangle.appendChild(trianglePath);
    cursor.append(clockwiseSquare, counterclockwiseTriangle);
    document.body.appendChild(cursor);

    const CLOSE_BUTTON_SELECTOR = "#about-close, #kbbo-close";
    const PRIMARY_LINK_SELECTOR = ".header-home, .main-link, .menu-link, .menu-project";

    const getActiveCloseButton = () => {
        if (document.getElementById("kbbo-popup")?.classList.contains("is-open")) {
            return document.getElementById("kbbo-close");
        }
        if (document.getElementById("about-popup")?.classList.contains("is-open")) {
            return document.getElementById("about-close");
        }
        return null;
    };

    const isPointerTarget = target => {
        let element = target instanceof Element ? target : null;
        while (element) {
            if (getComputedStyle(element).cursor === "pointer") {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    };

    const isPrimaryLink = target => target instanceof Element && Boolean(target.closest(PRIMARY_LINK_SELECTOR));

    const isOverBlackElement = target => {
        let element = target instanceof Element ? target : null;
        while (element) {
            if (["about-close", "kbbo-close", "menu-button", "about-menu-button", "menu-button-line-1", "menu-button-line-2", "about-menu-button-line-1", "about-menu-button-line-2", "vline", "hline"].includes(element.id) || element.classList.contains("about-close-line")) {
                return false;
            }
            if (getComputedStyle(element).backgroundColor === "rgb(0, 0, 0)") {
                return true;
            }
            element = element.parentElement;
        }
        return false;
    };

    const isOverBlackBehindClose = (closeButton, clientX, clientY) => {
        if (!closeButton) {
            return false;
        }

        const originalPointerEvents = closeButton.style.pointerEvents;
        closeButton.style.pointerEvents = "none";
        const elementsBehind = document.elementsFromPoint(clientX, clientY);
        closeButton.style.pointerEvents = originalPointerEvents;

        for (const elementBehind of elementsBehind) {
            if (elementBehind === closeButton || elementBehind.closest(CLOSE_BUTTON_SELECTOR) || elementBehind === document.documentElement) {
                continue;
            }
            if (elementBehind instanceof HTMLImageElement || elementBehind.closest("img")) {
                return false;
            }
            const backgroundColor = getComputedStyle(elementBehind).backgroundColor;
            if (backgroundColor === "rgba(0, 0, 0, 0)") {
                continue;
            }
            return backgroundColor === "rgb(0, 0, 0)";
        }
        return false;
    };

    let pointerX = 0;
    let pointerY = 0;
    let hasPointerPosition = false;

    const updateAboutCloseState = () => {
        const aboutClose = getActiveCloseButton();
        if (aboutClose) {
            const closeBounds = aboutClose.getBoundingClientRect();
            aboutClose.classList.toggle("is-over-black", isOverBlackBehindClose(aboutClose, closeBounds.left + closeBounds.width / 2, closeBounds.top + closeBounds.height / 2));
            const pointerTarget = document.elementFromPoint(pointerX, pointerY);
            clockwiseSquare.classList.toggle("is-over-white", Boolean(pointerTarget?.closest(CLOSE_BUTTON_SELECTOR) === aboutClose && aboutClose.classList.contains("is-over-black")));
        }
    };

    document.addEventListener("pointermove", event => {
        pointerX = event.clientX;
        pointerY = event.clientY;
        hasPointerPosition = true;
        const pointerTarget = document.elementFromPoint(pointerX, pointerY);
        cursor.style.left = `${pointerX}px`;
        cursor.style.top = `${pointerY}px`;
        cursor.classList.add("is-visible");
        cursor.classList.toggle("is-faded-for-primary-link", isPrimaryLink(pointerTarget));
        clockwiseSquare.classList.toggle("is-hovering", isPointerTarget(pointerTarget));
        clockwiseSquare.classList.toggle("is-over-black", isOverBlackElement(pointerTarget));
        const aboutClose = getActiveCloseButton();
        clockwiseSquare.classList.toggle("is-over-white", Boolean(aboutClose && pointerTarget?.closest(CLOSE_BUTTON_SELECTOR) === aboutClose && aboutClose.classList.contains("is-over-black")));
    });

    const aboutPopup = document.getElementById("about-popup");
    const kbboPopup = document.getElementById("kbbo-popup");
    let aboutCloseInterval;
    const updateAboutCloseInterval = () => {
        if (aboutPopup?.classList.contains("is-open") || kbboPopup?.classList.contains("is-open")) {
            if (!aboutCloseInterval) {
                updateAboutCloseState();
                aboutCloseInterval = setInterval(updateAboutCloseState, 100);
            }
        } else if (aboutCloseInterval) {
            clearInterval(aboutCloseInterval);
            aboutCloseInterval = undefined;
        }
    };

    if (aboutPopup) {
        new MutationObserver(updateAboutCloseInterval).observe(aboutPopup, { attributes: true, attributeFilter: ["class"] });
    }

    if (kbboPopup) {
        new MutationObserver(updateAboutCloseInterval).observe(kbboPopup, { attributes: true, attributeFilter: ["class"] });
    }

    if (aboutPopup || kbboPopup) {
        updateAboutCloseInterval();
    }

    document.addEventListener("pointerleave", () => {
        hasPointerPosition = false;
        cursor.classList.remove("is-visible");
    });

    document.addEventListener("pointerenter", () => {
        cursor.classList.add("is-visible");
    });
});
