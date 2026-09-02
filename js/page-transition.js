(() => {
	const STORAGE_KEY = "page-transition-incoming";
	const FADE_MS = 400;

	const overlay = document.createElement("div");
	overlay.id = "page-transition-overlay";
	(document.body || document.documentElement).appendChild(overlay);

	const isSameOriginPageLink = link => {
		if (!link.getAttribute("href") || link.target === "_blank") {
			return false;
		}
		let url;
		try {
			url = new URL(link.href, window.location.href);
		} catch {
			return false;
		}
		if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
			return false;
		}
		return true;
	};

	const navigate = href => {
		overlay.classList.add("is-active");
		window.setTimeout(() => {
			sessionStorage.setItem(STORAGE_KEY, "1");
			window.location.href = href;
		}, FADE_MS);
	};

	window.pageTransition = { navigate };

	document.addEventListener("click", event => {
		if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
			return;
		}
		const link = event.target.closest("a");
		if (!link || !isSameOriginPageLink(link)) {
			return;
		}
		event.preventDefault();
		navigate(link.href);
	});

	if (sessionStorage.getItem(STORAGE_KEY)) {
		sessionStorage.removeItem(STORAGE_KEY);
		overlay.classList.add("is-instant", "is-active");

		// Force layout so the opaque state is committed before the transition re-enables.
		void overlay.offsetHeight;

		requestAnimationFrame(() => {
			overlay.classList.remove("is-instant");
			requestAnimationFrame(() => {
				overlay.classList.remove("is-active");
			});
		});
	}

	window.addEventListener("pageshow", event => {
		if (event.persisted) {
			overlay.classList.remove("is-active", "is-instant");
		}
	});
})();
