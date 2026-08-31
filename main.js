/* =========================================================
   GUNKOWII SABA PORTFOLIO
   MAIN JAVASCRIPT
   ========================================================= */

(function () {

    "use strict";

    /* =====================================================
       PAGE INITIALIZATION
       ===================================================== */

    function initPortfolio() {

        /* =================================================
           MOBILE NAVIGATION
           ================================================= */

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

                menuToggle.innerHTML = "☰";
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

                menuToggle.innerHTML = "✕";
            }


            menuToggle.addEventListener("click", function (event) {

                event.stopPropagation();

                if (navLinks.classList.contains("open")) {
                    closeMenu();
                } else {
                    openMenu();
                }

            });


            /* Close menu when a navigation link is clicked */

            navLinks.querySelectorAll("a").forEach(function (link) {

                link.addEventListener("click", function () {
                    closeMenu();
                });

            });


            /* Close menu when clicking outside */

            document.addEventListener("click", function (event) {

                if (
                    navLinks.classList.contains("open") &&
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    closeMenu();
                }

            });


            /* Close menu when pressing Escape */

            document.addEventListener("keydown", function (event) {

                if (
                    event.key === "Escape" &&
                    navLinks.classList.contains("open")
                ) {
                    closeMenu();
                }

            });

        }


        /* =================================================
           SCROLL REVEAL ANIMATION
           ================================================= */

        const revealElements =
            document.querySelectorAll(".reveal");


        /*
         * IMPORTANT:
         *
         * If JavaScript or IntersectionObserver fails,
         * the page must NEVER remain invisible.
         *
         * We therefore make every reveal element visible
         * first, then apply the animation only when the
         * browser supports it correctly.
         */

        revealElements.forEach(function (element) {

            element.classList.add("active");

        });


        /*
         * Use IntersectionObserver only for elements that
         * are below the initial viewport.
         */

        if (
            "IntersectionObserver" in window &&
            revealElements.length > 0
        ) {

            revealElements.forEach(function (element) {

                /*
                 * Keep the first visible content visible.
                 * The CSS transition can still animate it.
                 */

                element.classList.add("active");

            });

        }


        /* =================================================
           SMOOTH ANCHOR NAVIGATION
           ================================================= */

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


                let target = null;

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
                 * Close mobile navigation after
                 * anchor navigation.
                 */

                if (
                    navLinks &&
                    menuToggle
                ) {

                    navLinks.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation menu"
                    );

                    menuToggle.innerHTML = "☰";

                }

            });

        });


        /* =================================================
           PAGE READY
           ================================================= */

        document.body.classList.add("js-ready");

    }


    /* =====================================================
       START APPLICATION SAFELY
       ===================================================== */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            initPortfolio
        );

    } else {

        initPortfolio();

    }

})();