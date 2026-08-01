(() => {
    const form = document.getElementById("contact-form");
    if (!(form instanceof HTMLFormElement)) return;

    const base = (form.dataset.dullahanUrl || "").replace(/\/$/, "");
    // dullahan is multi-tenant: without this the submission is refused (503)
    // rather than falling back to some other site's inbox.
    const site = form.dataset.site || "";

    // All user-facing copy comes from the form's data-* attributes (set from
    // config in ContactForm.astro); the fallbacks keep the form working if a
    // string is ever missing.
    const cfg = {
        sendingLabel: form.dataset.sendingLabel || "Sending…",
        phonePrefix: form.dataset.phonePrefix ?? "Phone: ",
        msg: {
            name: form.dataset.msgName || "Please enter your name.",
            email: form.dataset.msgEmail || "Please enter a valid email.",
            phone: form.dataset.msgPhone || "Please enter a phone number.",
            message: form.dataset.msgMessage || "Please add a short message.",
            unconfigured: form.dataset.msgUnconfigured || "Form is not configured yet. Please call or email us instead.",
            error: form.dataset.msgError || "Something went wrong. Please call or email us instead.",
        },
    };

    const success = document.getElementById("cform-success");
    const button = form.querySelector("[data-submit]");
    const label = form.querySelector("[data-submit-label]");
    const status = form.querySelector("[data-form-status]");

    const rules = {
        name: (v) => (v.trim().length >= 2 ? "" : cfg.msg.name),
        email: (v) => (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ? "" : cfg.msg.email),
        phone: (v) => (v.trim().length >= 6 ? "" : cfg.msg.phone),
        message: (v) => (v.trim().length >= 10 ? "" : cfg.msg.message),
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

        if (!base || !site) {
            if (status) status.textContent = cfg.msg.unconfigured;
            return;
        }

        button.disabled = true;
        const original = label.textContent;
        label.textContent = cfg.sendingLabel;

        const name = form.elements.namedItem("name").value.trim();
        const email = form.elements.namedItem("email").value.trim();
        const phone = form.elements.namedItem("phone").value.trim();
        const body = form.elements.namedItem("message").value.trim();
        // dullahan /contact only stores {name,email,message}; fold phone in.
        const message = `${body}\n\n${cfg.phonePrefix}${phone}`;

        try {
            const res = await fetch(`${base}/contact`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ site, name, email, message }),
            });

            if (!res.ok) throw new Error(`HTTP ${res.status}`);

            form.classList.add("is-hidden");
            success?.classList.remove("is-hidden");
            success?.scrollIntoView({ behavior: "smooth", block: "center" });
        } catch {
            if (status) status.textContent = cfg.msg.error;
            button.disabled = false;
            label.textContent = original;
        }
    });
})();
