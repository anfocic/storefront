(() => {
    const reduced = window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

    function init() {
        const els = document.querySelectorAll("[data-reveal]");
        if (!els.length) return;

        els.forEach((el) => {
            el.classList.add(el.hasAttribute("data-reveal-stagger") ? "reveal-stagger" : "reveal");
        });

        if (reduced) {
            els.forEach((el) => el.classList.add("is-in"));
            return;
        }

        const io = new IntersectionObserver(
            (entries) => {
                entries.forEach((e) => {
                    if (e.isIntersecting) {
                        e.target.classList.add("is-in");
                        io.unobserve(e.target);
                    }
                });
            },
            { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
        );

        els.forEach((el) => io.observe(el));
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
