/* =========================================================
   GUNKOWII SABA PORTFOLIO
   MAIN.JS
   Scroll Reveal + Smooth Navigation
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       SCROLL REVEAL
    ===================================================== */

    const revealItems = document.querySelectorAll(
        "section, .service, .work-card, .case-study, .step, .why-card, .about-card, .cta-box"
    );

    const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;


    /*
       If the visitor prefers reduced motion,
       show everything immediately.
    */

    if (reducedMotion) {

        revealItems.forEach(function (item) {
            item.classList.add("reveal-visible");
        });

    } else {

        /*
           Add the animation class.
        */

        revealItems.forEach(function (item) {
            item.classList.add("reveal-item");
        });


        /*
           Create the animation styles.
        */

        const style = document.createElement("style");

        style.textContent = `
            .reveal-item {
                opacity: 0;
                transform: translateY(40px);
                transition:
                    opacity 0.8s ease,
                    transform 0.8s ease;
            }

            .reveal-item.reveal-visible {
                opacity: 1;
                transform: translateY(0);
            }
        `;

        document.head.appendChild(style);


        /*
           Watch elements as they enter the screen.
        */

        if ("IntersectionObserver" in window) {

            const observer = new IntersectionObserver(
                function (entries, observer) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add(
                                "reveal-visible"
                            );

                            observer.unobserve(
                                entry.target
                            );
                        }

                    });

                },
                {
                    threshold: 0.08,
                    rootMargin: "0px 0px -50px 0px"
                }
            );


            revealItems.forEach(function (item) {
                observer.observe(item);
            });

        } else {

            /*
               Fallback for older browsers.
            */

            revealItems.forEach(function (item) {
                item.classList.add("reveal-visible");
            });

        }

    }


    /* =====================================================
       SMOOTH NAVIGATION
    ===================================================== */

    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );


    navigationLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetID = link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }


            const target = document.querySelector(
                targetID
            );


            if (!target) {
                return;
            }


            event.preventDefault();


            const header = document.querySelector(
                "header"
            );


            const headerHeight = header
                ? header.offsetHeight
                : 0;


            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;


            window.scrollTo({
                top: targetPosition,
                behavior: reducedMotion
                    ? "auto"
                    : "smooth"
            });

        });

    });


    /* =====================================================
       ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".nav-links a[href^='#']"
    );


    if (
        "IntersectionObserver" in window &&
        sections.length > 0
    ) {

        const sectionObserver =
            new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (!entry.isIntersecting) {
                            return;
                        }


                        const sectionID =
                            entry.target.getAttribute(
                                "id"
                            );


                        navLinks.forEach(function (link) {

                            link.classList.remove(
                                "active"
                            );


                            if (
                                link.getAttribute(
                                    "href"
                                ) === "#" + sectionID
                            ) {

                                link.classList.add(
                                    "active"
                                );

                            }

                        });

                    });

                },
                {
                    rootMargin:
                        "-35% 0px -55% 0px"
                }
            );


        sections.forEach(function (section) {

            sectionObserver.observe(
                section
            );

        });

    }


    /* =====================================================
       PAGE READY
    ===================================================== */

    document.body.classList.add(
        "js-ready"
    );

});