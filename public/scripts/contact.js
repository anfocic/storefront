(() => {
    const form = document.getElementById("contact-form");
    if (!(form instanceof HTMLFormElement)) return;

    const base = (form.dataset.dullahanUrl || "").replace(/\/$/, "");
    const success = document.getElementById("cform-success");
    const button = form.querySelector("[data-submit]");
    const label = form.querySelector("[data-submit-label]");
    const status = form.querySelector("[data-form-status]");

    const rules = {
        name: (v) => (v.trim().length >= 2 ? "" : "Please enter your name."),
        email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : "Please enter a valid email."),
        phone: (v) => (v.trim().length >= 6 ? "" : "Please enter a phone number."),
        message: (v) => (v.trim().length >= 10 ? "" : "Please add a short message (10+ characters)."),
    };

    const setError = (name, msg) => {
        const box = form.querySelector(`[data-err-for="${name}"]`);
        if (box) box.textContent = msg;
        const field = form.querySelector(`[name="${name}"]`)?.closest(".cform__field");
        if (field) field.classList.toggle("is-invalid", Boolean(msg));
    };

    const validate = () => {
        let ok = true;
        for (const [name, check] of Object.entries(rules)) {
            const el = form.elements.namedItem(name);
            const msg = el ? check(el.value) : "";
            setError(name, msg);
            if (msg) ok = false;
        }
        return ok;
    };

    form.querySelectorAll("input, textarea").forEach((el) => {
        el.addEventListener("blur", () => {
            const name = el.getAttribute("name");
            if (name && rules[name]) setError(name, rules[name](el.value));
        });
    });

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        if (status) status.textContent = "";

        // honeypot — bail silently if filled
        if (form.elements.namedItem("botcheck")?.checked) return;

        if (!validate()) return;

        if (!base) {
            if (status) status.textContent = "Form is not configured yet. Please call or email us instead.";
            return;
        }

        button.disabled = true;
        const original = label.textContent;
        label.textContent = "Sending…";

        const name = form.elements.namedItem("name").value.trim();
        const email = form.elements.namedItem("email").value.trim();
        const phone = form.elements.namedItem("phone").value.trim();
        const body = form.elements.namedItem("message").value.trim();
        // dullahan /contact only stores {name,email,message}; fold phone in.
        const message = `${body}\n\nPhone: ${phone}`;

        try {
            const res = await fetch(`${base}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, message }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            form.classList.add("is-hidden");
            success?.classList.remove("is-hidden");
            success?.scrollIntoView({ behavior: "smooth", block: "center" });
        } catch {
            if (status) status.textContent = "Something went wrong. Please call or email us instead.";
            button.disabled = false;
            label.textContent = original;
        }
    });
})();
