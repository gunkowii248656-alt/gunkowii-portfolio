document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       MOBILE NAVIGATION
    ========================================================= */

    const nav = document.querySelector("nav");
    const navLinks = document.querySelector(".nav-links");

    if (nav && navLinks) {

        const menuButton = document.createElement("button");

        menuButton.className = "mobile-menu-button";
        menuButton.setAttribute("aria-label", "Open navigation");
        menuButton.setAttribute("aria-expanded", "false");
        menuButton.innerHTML = "☰";

        nav.insertBefore(menuButton, navLinks);

        menuButton.addEventListener("click", () => {

            const isOpen = navLinks.classList.toggle("mobile-open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.innerHTML = isOpen ? "×" : "☰";

        });

        navLinks.querySelectorAll("a").forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("mobile-open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.innerHTML = "☰";

            });

        });

    }


    /* =========================================================
       CURRENT YEAR
    ========================================================= */

    const yearElements = document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });


    /* =========================================================
       SMOOTH INTERNAL LINKS
    ========================================================= */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", event => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================================
       REVEAL SECTIONS ON SCROLL
    ========================================================= */

    const revealItems = document.querySelectorAll(
        ".service, .work-card, .case-study, .step, .why-card, .about-card"
    );

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("is-visible");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12
            }
        );

        revealItems.forEach(item => {
            item.classList.add("reveal");
            observer.observe(item);
        });

    } else {

        revealItems.forEach(item => {
            item.classList.add("is-visible");
        });

    }


    /* =========================================================
       EXTERNAL LINKS
    ========================================================= */

    document.querySelectorAll('a[target="_blank"]').forEach(link => {

        link.setAttribute("rel", "noopener noreferrer");

    });


    /* =========================================================
       IMAGE FALLBACK
    ========================================================= */

    const portrait = document.querySelector(".portrait");

    if (portrait) {

        portrait.addEventListener("error", () => {

            portrait.style.display = "none";

            const frame = portrait.closest(".portrait-frame");

            if (frame) {
                frame.classList.add("image-missing");
            }

        });

    }


    /* =========================================================
       CONSOLE BRAND MESSAGE
    ========================================================= */

    console.log(
        "GUNKOWII SABA — E-commerce & Digital Solutions Specialist"
    );

});