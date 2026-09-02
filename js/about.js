document.addEventListener("DOMContentLoaded", () => {
    const menuButton = document.getElementById("about-menu-button");
    const menuPopup = document.getElementById("menu-popup");

    const setMenuOpen = isOpen => {
        menuButton.classList.toggle("is-open", isOpen);
        menuPopup.classList.toggle("is-open", isOpen);
        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
        menuPopup.setAttribute("aria-hidden", String(!isOpen));
    };

    menuButton.addEventListener("click", () => {
        setMenuOpen(!menuButton.classList.contains("is-open"));
    });

    document.addEventListener("click", event => {
        if (!menuButton.contains(event.target) && !menuPopup.contains(event.target)) {
            setMenuOpen(false);
        }
    });
});