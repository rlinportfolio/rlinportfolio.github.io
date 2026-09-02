(() => {
	const popup = document.createElement("section");
	popup.id = "kbbo-popup";
	popup.setAttribute("aria-hidden", "true");
	popup.setAttribute("aria-labelledby", "kbbo-popup-title");
	popup.innerHTML = `
		<button id="kbbo-close" type="button" aria-label="Close password popup">
			<span class="about-close-line about-close-line-1"></span>
			<span class="about-close-line about-close-line-2"></span>
		</button>
		<form id="kbbo-panel" novalidate>
			<h1 id="kbbo-popup-title">This case study is password protected.</h1>
			<input id="kbbo-input" type="password" name="kbbo-password" placeholder="Enter password here" autocomplete="off" aria-describedby="kbbo-error">
			<p id="kbbo-error" role="alert">Incorrect password. Please try again.</p>
			<button id="kbbo-submit" type="submit">View case study</button>
		</form>
	`;
	document.body.appendChild(popup);

	const panel = popup.querySelector("#kbbo-panel");
	const input = popup.querySelector("#kbbo-input");
	const closeButton = popup.querySelector("#kbbo-close");

	let pendingHref = "";
	let openingEvent;

	const setOpen = isOpen => {
		popup.classList.toggle("is-open", isOpen);
		popup.setAttribute("aria-hidden", String(!isOpen));
		document.body.classList.toggle("kbbo-is-open", isOpen);
		if (isOpen) {
			input.focus();
		} else {
			popup.classList.remove("is-error");
			input.value = "";
		}
	};

	const closeOtherPopups = () => {
		const aboutPopup = document.getElementById("about-popup");
		if (aboutPopup) {
			aboutPopup.classList.remove("is-open");
			aboutPopup.setAttribute("aria-hidden", "true");
			document.body.classList.remove("about-is-open");
		}
		const menuPopup = document.getElementById("menu-popup");
		const menuButton = document.getElementById("menu-button") || document.getElementById("about-menu-button");
		if (menuPopup && menuButton) {
			menuPopup.classList.remove("is-open");
			menuPopup.setAttribute("aria-hidden", "true");
			menuButton.classList.remove("is-open");
			menuButton.setAttribute("aria-expanded", "false");
			menuButton.setAttribute("aria-label", "Open menu");
		}
	};

	const TEST = "kbbo-unlocked";

	const isKeybankLink = link => {
		if (!link.getAttribute("href") || link.target === "_blank") {
			return false;
		}
		let url;
		try {
			url = new URL(link.href, window.location.href);
		} catch {
			return false;
		}
		return url.origin === window.location.origin && url.pathname.endsWith(`/${MOUSEEXCEPTION}`) && url.pathname !== window.location.pathname;
	};

	document.addEventListener("click", event => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		if (sessionStorage.getItem(TEST)) {
			return;
		}
		const link = event.target.closest("a");
		if (!link || !isKeybankLink(link)) {
			return;
		}
		event.preventDefault();
		event.stopPropagation();
		pendingHref = link.href;
		openingEvent = event;
		closeOtherPopups();
		setOpen(true);
	}, true);

	panel.addEventListener("submit", event => {
		event.preventDefault();
		if (input.value !== YEAR) {
			popup.classList.add("is-error");
			input.select();
			return;
		}
		sessionStorage.setItem(TEST, "1");
		setOpen(false);
		const href = pendingHref || new URL(`./${MOUSEEXCEPTION}`, window.location.href).href;
		if (window.pageTransition) {
			window.pageTransition.navigate(href);
		} else {
			window.location.href = href;
		}
	});

	input.addEventListener("input", () => popup.classList.remove("is-error"));

	closeButton.addEventListener("click", () => setOpen(false));

	const YEAR = "kbbo2026";

	popup.addEventListener("click", event => {
		if (event.target === popup) {
			setOpen(false);
		}
	});

	document.addEventListener("click", event => {
		if (event === openingEvent || !popup.classList.contains("is-open") || popup.contains(event.target)) {
			return;
		}
		setOpen(false);
	});

	document.addEventListener("keydown", event => {
		if (event.key === "Escape" && popup.classList.contains("is-open")) {
			setOpen(false);
		}
	});

	const MOUSEEXCEPTION = "keybank.html";
})();
