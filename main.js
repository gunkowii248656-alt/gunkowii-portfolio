/* =========================================================
   GUNKOWII SABA PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

(function () {
    "use strict";

    function initPortfolio() {

        /* =====================================================
           MOBILE NAVIGATION
           ===================================================== */

        const menuToggle = document.getElementById("menuToggle");
        const navLinks = document.getElementById("navLinks");

        if (menuToggle && navLinks) {

            function closeMenu() {
                navLinks.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation menu"
                );

                menuToggle.textContent = "☰";
            }

            function openMenu() {
                navLinks.classList.add("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "true"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Close navigation menu"
                );

                menuToggle.textContent = "✕";
            }

            menuToggle.addEventListener("click", function (event) {

                event.stopPropagation();

                if (navLinks.classList.contains("open")) {
                    closeMenu();
                } else {
                    openMenu();
                }

            });

            navLinks.querySelectorAll("a").forEach(function (link) {

                link.addEventListener("click", function () {
                    closeMenu();
                });

            });

            document.addEventListener("click", function (event) {

                if (
                    navLinks.classList.contains("open") &&
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeMenu();
                }

            });

            document.addEventListener("keydown", function (event) {

                if (
                    event.key === "Escape" &&
                    navLinks.classList.contains("open")
                ) {
                    closeMenu();
                }

            });

        }


        /* =====================================================
           SCROLL REVEAL ANIMATION
           ===================================================== */

        const revealElements =
            document.querySelectorAll(".reveal");

        if (revealElements.length > 0) {

            /* 
               First section is visible immediately.
               This prevents the page from appearing blank.
            */

            if (revealElements[0]) {
                revealElements[0].classList.add("active");
            }


            /*
               Animate the remaining sections when they
               enter the viewport.
            */

            if ("IntersectionObserver" in window) {

                const revealObserver =
                    new IntersectionObserver(
                        function (entries, observer) {

                            entries.forEach(function (entry) {

                                if (entry.isIntersecting) {

                                    entry.target.classList.add("active");

                                    observer.unobserve(
                                        entry.target
                                    );

                                }

                            });

                        },
                        {
                            threshold: 0.12,
                            rootMargin: "0px 0px -50px 0px"
                        }
                    );


                revealElements.forEach(function (element, index) {

                    if (index !== 0) {
                        revealObserver.observe(element);
                    }

                });

            } else {

                /*
                   Browser fallback.
                   If IntersectionObserver is unavailable,
                   show everything normally.
                */

                revealElements.forEach(function (element) {
                    element.classList.add("active");
                });

            }

        }


        /* =====================================================
           SMOOTH ANCHOR NAVIGATION
           ===================================================== */

        const anchorLinks =
            document.querySelectorAll('a[href^="#"]');

        anchorLinks.forEach(function (link) {

            link.addEventListener("click", function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                let target;

                try {
                    target =
                        document.querySelector(targetId);
                } catch (error) {
                    return;
                }

                if (!target) {
                    return;
                }

                event.preventDefault();

                const header =
                    document.querySelector("header");

                const headerHeight =
                    header
                        ? header.offsetHeight
                        : 0;

                const targetPosition =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: "smooth"
                });

                /*
                   Close mobile navigation after
                   clicking an anchor link.
                */

                if (navLinks && menuToggle) {

                    navLinks.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    menuToggle.textContent = "☰";
                }

            });

        }


        /* =====================================================
           PAGE READY
           ===================================================== */

        document.body.classList.add("js-ready");

    }


    /* =========================================================
       START SAFELY
       ========================================================= */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initPortfolio
        );

    } else {

        initPortfolio();

    }

})();