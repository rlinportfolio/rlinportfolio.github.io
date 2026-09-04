document.addEventListener("DOMContentLoaded", () => {
	const leftRails = document.querySelectorAll(".echo-dot-meta, .echo-dot-overview-label, .echo-dot-research-label, .echo-dot-design-process-label, .echo-dot-final-mockup-label, .echo-dot-conclusion-label, .walmart-meta, .walmart-overview-label, .walmart-research-label, .walmart-design-process-label, .walmart-final-mockup-label, .walmart-conclusion-label, .adelphi-media-meta, .adelphi-media-overview-label, .adelphi-media-research-label, .adelphi-media-design-process-label, .adelphi-media-final-mockup-label, .adelphi-media-conclusion-label, .keybank-meta, .keybank-overview-label, .keybank-research-label, .keybank-design-process-label");
	const syncLeftRailWidths = () => {
		if (!leftRails.length) {
			return;
		}
		if (window.matchMedia("(max-width: 1200px)").matches) {
			leftRails.forEach(rail => {
				rail.style.removeProperty("width");
				rail.style.removeProperty("flex-basis");
			});
			return;
		}
		leftRails[0].style.removeProperty("width");
		leftRails[0].style.removeProperty("flex-basis");
		const width = leftRails[0].getBoundingClientRect().width;
		leftRails.forEach((rail, index) => {
			if (index === 0) {
				return;
			}
			rail.style.width = `${width}px`;
			rail.style.flexBasis = `${width}px`;
		});
	};
	syncLeftRailWidths();
	window.addEventListener("resize", syncLeftRailWidths);
	if (leftRails.length && "ResizeObserver" in window) {
		new ResizeObserver(syncLeftRailWidths).observe(leftRails[0]);
	}

	const scrollProgress = document.getElementById("scroll-progress");
	const updateScrollProgress = () => {
		if (!scrollProgress) {
			return;
		}
		const scrollableHeight = document.documentElement.scrollHeight - window.innerHeight;
		const progress = scrollableHeight > 0 ? (window.scrollY / scrollableHeight) * 100 : 100;
		scrollProgress.style.width = `${Math.min(100, Math.max(0, progress))}%`;
	};
	updateScrollProgress();
	window.addEventListener("scroll", updateScrollProgress, { passive: true });

	const updateHeaderState = () => {
		document.querySelector("header").classList.toggle("is-scrolled", window.scrollY > 50);
	};
	updateHeaderState();
	window.addEventListener("scroll", updateHeaderState, { passive: true });

	const menuButton = document.getElementById("menu-button");
	const aboutMenuButton = document.getElementById("about-menu-button");
	const menuPopup = document.getElementById("menu-popup");
	const activeMenuButton = menuButton || aboutMenuButton;
	const setMenuOpen = isOpen => {
		activeMenuButton.classList.toggle("is-open", isOpen);
		menuPopup.classList.toggle("is-open", isOpen);
		activeMenuButton.setAttribute("aria-expanded", String(isOpen));
		activeMenuButton.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
		menuPopup.setAttribute("aria-hidden", String(!isOpen));
	};

	activeMenuButton.addEventListener("click", () => {
		setMenuOpen(!activeMenuButton.classList.contains("is-open"));
	});

	const aboutPopup = document.getElementById("about-popup");
	const aboutClose = document.getElementById("about-close");
	let aboutOpeningEvent;
	const updateAboutBounds = () => {
		const popupWidth = Math.min(860, window.innerWidth - 48);
		const popupCenter = (window.innerWidth / 2) - 36;
		const header = document.querySelector("header");
		const headerBottom = header ? header.getBoundingClientRect().bottom : 80;
		const popupTop = (headerBottom + window.innerHeight) / 2;
		if (aboutPopup) {
			aboutPopup.style.setProperty("--about-width", `${popupWidth}px`);
			aboutPopup.style.setProperty("--about-center", `${popupCenter}px`);
			aboutPopup.style.setProperty("--about-top", `${popupTop}px`);
		}
	};
	const setAboutOpen = isOpen => {
		if (!aboutPopup) {
			return;
		}
		if (isOpen) {
			const keybankPopup = document.getElementById("kbbo-popup");
			if (keybankPopup) {
				keybankPopup.classList.remove("is-open", "is-error");
				keybankPopup.setAttribute("aria-hidden", "true");
				document.body.classList.remove("kbbo-is-open");
			}
		}
		aboutPopup.classList.toggle("is-open", isOpen);
		document.body.classList.toggle("about-is-open", isOpen);
		aboutPopup.setAttribute("aria-hidden", String(!isOpen));
		updateAboutBounds();
	};

	document.querySelectorAll("#about-link, .menu-link[href$='about.html'], .echo-dot-footer-links a[href$='about.html'], .walmart-footer-links a[href$='about.html'], .adelphi-media-footer-links a[href$='about.html']").forEach(link => {
		link.addEventListener("click", event => {
			if (!aboutPopup) {
				return;
			}
			if (!window.matchMedia("(min-width: 1100px)").matches) {
				return;
			}
			event.preventDefault();
			aboutOpeningEvent = event;
			setMenuOpen(false);
			setAboutOpen(true);
		});
	});

	if (aboutClose && aboutPopup) {
		aboutClose.addEventListener("click", () => setAboutOpen(false));
		aboutPopup.addEventListener("click", event => {
			if (event.target === aboutPopup) {
				setAboutOpen(false);
			}
		});
		document.addEventListener("click", event => {
			if (event === aboutOpeningEvent || !aboutPopup.classList.contains("is-open") || aboutPopup.contains(event.target)) {
				return;
			}
			setAboutOpen(false);
		});
	}
	window.addEventListener("scroll", updateAboutBounds, { passive: true });

	if (aboutPopup && sessionStorage.getItem("openAboutPopup")) {
		sessionStorage.removeItem("openAboutPopup");
		setAboutOpen(true);
	}

	document.addEventListener("click", event => {
		if (!activeMenuButton.contains(event.target) && !menuPopup.contains(event.target)) {
			setMenuOpen(false);
		}
	});

	const verticalLine = document.getElementById("vline");
	const horizontalLine = document.getElementById("hline");
	const traceLinks = document.querySelectorAll(".header-home, .main-link, .menu-link, .menu-project");
	const tracePaths = new Map();

	traceLinks.forEach(link => {
		const trace = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		const arrow = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		const arrowBox = document.createElementNS("http://www.w3.org/2000/svg", "rect");
		const arrowImage = document.createElementNS("http://www.w3.org/2000/svg", "image");
		trace.classList.add("link-trace");
		path.classList.add("link-trace-path");
		arrow.classList.add("link-arrow");
		arrowBox.classList.add("link-arrow-box");
		arrowImage.classList.add("link-arrow-image");
		path.setAttribute("pathLength", "1");
		arrow.setAttribute("viewBox", "0 0 16 16");
		arrowBox.setAttribute("width", "16");
		arrowBox.setAttribute("height", "16");
		arrowImage.setAttribute("href", "./assets/little-arrow.png");
		arrowImage.setAttribute("width", "16");
		arrowImage.setAttribute("height", "16");
		arrow.append(arrowBox, arrowImage);
		trace.appendChild(path);
		link.prepend(trace);
		link.prepend(arrow);
		tracePaths.set(link, path);
		link.dataset.effectComplete = "false";
		arrow.addEventListener("animationend", event => {
			if (event.animationName === "menu-link-arrow") {
				link.dataset.effectComplete = "true";
			}
		});
		path.addEventListener("animationend", event => {
			if (event.animationName === "menu-link-trace-reverse") {
				link.classList.remove("link-is-leaving");
				link.dataset.effectComplete = "false";
			}
		});
		link.addEventListener("mouseenter", () => {
			link.classList.remove("link-is-leaving");
			link.dataset.effectComplete = "false";
			link.classList.add("link-is-hovered");
		});
		link.addEventListener("mouseleave", () => {
			link.classList.remove("link-is-hovered");
			if (link.dataset.effectComplete === "true") {
				link.classList.add("link-is-leaving");
			}
		});
	});

	const updateTracePaths = () => {
		tracePaths.forEach((path, link) => {
			const width = link.offsetWidth;
			const height = link.offsetHeight;
			const inset = 1;
			path.setAttribute("viewBox", `0 0 ${width} ${height}`);
			path.setAttribute("d", `M ${width - inset} ${height - inset} H ${inset} V ${inset} H ${width - inset} V ${height - inset}`);
			const arrow = link.querySelector(".link-arrow");
			arrow.style.left = `${width - 16}px`;
		});
	};

	let pointerX = 0;
	let pointerY = 0;
	let animationFrame;

	const updateLines = () => {
		animationFrame = undefined;
		if (!verticalLine || !horizontalLine || !document.getElementById("main-links")) {
			return;
		}
		if (getComputedStyle(verticalLine).display === "none") {
			return;
		}

		const links = document.getElementById("main-links").getBoundingClientRect();
		const title = document.getElementById("main-title").getBoundingClientRect();
		const top = document.getElementById("main-top").getBoundingClientRect();
		const work = document.getElementById("main-work").getBoundingClientRect();
		const lineClearance = 12;
		const horizontalProgress = Math.max(0, Math.min(1, pointerX / window.innerWidth));
		const verticalProgress = Math.max(0, Math.min(1, pointerY / window.innerHeight));
		const verticalStart = title.left - lineClearance;
		const verticalEnd = links.right + lineClearance;
		const horizontalStart = top.bottom + lineClearance;
		const horizontalEnd = work.top - lineClearance;
		const verticalPosition = verticalStart - horizontalProgress * (verticalStart - verticalEnd);
		const horizontalPosition = horizontalEnd - verticalProgress * (horizontalEnd - horizontalStart);

		verticalLine.style.left = `${verticalPosition - title.left}px`;
		horizontalLine.style.top = `${horizontalPosition - work.top}px`;
	};

	const requestLineUpdate = () => {
		if (!animationFrame) {
			animationFrame = requestAnimationFrame(updateLines);
		}
	};

	document.addEventListener("pointermove", event => {
		pointerX = event.clientX;
		pointerY = event.clientY;
		requestLineUpdate();
	});

	window.addEventListener("resize", requestLineUpdate);
	window.addEventListener("resize", updateTracePaths);
	window.addEventListener("resize", updateAboutBounds);
	updateTracePaths();
	requestLineUpdate();
});
