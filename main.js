/* =========================================================
   GUNKOWII SABA PORTFOLIO
   MAIN JAVASCRIPT
   Scroll Reveal + Smooth Interactions
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =======================================================
       SCROLL REVEAL
    ======================================================= */

    const revealElements = document.querySelectorAll(
        "section, .service, .work-card, .case-study, .step, .why-card, .about-card, .cta-box"
    );

    /*
       Add the reveal class through JavaScript so the page
       remains fully visible if JavaScript is unavailable.
    */

    revealElements.forEach((element, index) => {
        element.classList.add("scroll-reveal");

        /*
           Small stagger effect for cards appearing in the
           same section.
        */
        const parent = element.parentElement;

        if (
            parent &&
            (
                parent.classList.contains("services") ||
                parent.classList.contains("work-grid") ||
                parent.classList.contains("steps") ||
                parent.classList.contains("why-grid")
            )
        ) {
            const siblings = Array.from(parent.children);
            const position = siblings.indexOf(element);

            element.style.setProperty(
                "--reveal-delay",
                `${Math.min(position * 70, 350)}ms`
            );
        }
    });


    /* =======================================================
       INJECT SCROLL REVEAL STYLES
    ======================================================= */

    const revealStyle = document.createElement("style");

    revealStyle.textContent = `
        .scroll-reveal {
            opacity: 0;
            transform: translateY(35px);
            transition:
                opacity 0.75s ease,
                transform 0.75s cubic-bezier(0.22, 1, 0.36, 1);
            transition-delay: var(--reveal-delay, 0ms);
            will-change: opacity, transform;
        }

        .scroll-reveal.revealed {
            opacity: 1;
            transform: translateY(0);
        }

        @media (prefers-reduced-motion: reduce) {
            .scroll-reveal {
                opacity: 1;
                transform: none;
                transition: none;
            }
        }
    `;

    document.head.appendChild(revealStyle);


    /* =======================================================
       INTERSECTION OBSERVER
    ======================================================= */

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    if (prefersReducedMotion) {

        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });

    } else if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach((entry) => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        /*
                           Stop observing after the element has
                           appeared so the animation does not
                           repeatedly run while scrolling.
                        */

                        observer.unobserve(entry.target);
                    }

                });

            },
            {
                root: null,
                rootMargin: "0px 0px -70px 0px",
                threshold: 0.08
            }
        );


        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });


    } else {

        /*
           Fallback for older browsers.
        */

        revealElements.forEach((element) => {
            element.classList.add("revealed");
        });

    }


    /* =======================================================
       SMOOTH NAVIGATION
    ======================================================= */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            const header = document.querySelector("header");

            const headerHeight = header
                ? header.offsetHeight
                : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: prefersReducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    });


    /* =======================================================
       ACTIVE NAVIGATION
    ======================================================= */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );


    if ("IntersectionObserver" in window && sections.length) {

        const sectionObserver = new IntersectionObserver(
            (entries) => {

                entries.forEach((entry) => {

                    if (!entry.isIntersecting) {
                        return;
                    }

                    const id = entry.target.getAttribute("id");

                    navLinks.forEach((link) => {

                        link.classList.remove("active");

                        if (
                            link.getAttribute("href") === `#${id}`
                        ) {
                            link.classList.add("active");
                        }

                    });

                });

            },
            {
                rootMargin: "-35% 0px -55% 0px",
                threshold: 0
            }
        );


        sections.forEach((section) => {
            sectionObserver.observe(section);
        });

    }


    /* =======================================================
       ACTIVE NAVIGATION STYLE
    ======================================================= */

    const navStyle = document.createElement("style");

    navStyle.textContent = `
        .nav-links a.active {
            color: #c29d4a;
        }

        .nav-links a {
            position: relative;
        }

        .nav-links a::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: -7px;
            width: 100%;
            height: 1px;
            background: #c29d4a;
            transform: scaleX(0);
            transform-origin: center;
            transition: transform 0.25s ease;
        }

        .nav-links a.active::after,
        .nav-links a:hover::after {
            transform: scaleX(1);
        }
    `;

    document.head.appendChild(navStyle);


    /* =======================================================
       BUTTON / LINK MICRO-INTERACTION
    ======================================================= */

    const buttons = document.querySelectorAll(
        ".button, .work-link"
    );

    buttons.forEach((button) => {

        button.addEventListener("mouseenter", () => {
            button.style.transform = "translateY(-2px)";
        });

        button.addEventListener("mouseleave", () => {
            button.style.transform = "";
        });

    });


    /* =======================================================
       EXTERNAL LINKS
       Open safely in a new tab where appropriate.
    ======================================================= */

    const externalLinks = document.querySelectorAll(
        'a[href^="http"]'
    );

    externalLinks.forEach((link) => {

        const currentHost = window.location.hostname;

        try {

            const linkURL = new URL(
                link.href,
                window.location.href
            );

            if (
                linkURL.hostname &&
                linkURL.hostname !== currentHost
            ) {
                link.setAttribute("target", "_blank");
                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );
            }

        } catch (error) {
            /* Ignore invalid URLs */
        }

    });


    /* =======================================================
       PAGE READY
    ======================================================= */

    document.body.classList.add("js-ready");

});