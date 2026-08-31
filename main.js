(function () {
    "use strict";

    function startPortfolio() {

        /* MOBILE MENU */

        var menuToggle = document.getElementById("menuToggle");
        var navLinks = document.getElementById("navLinks");

        if (menuToggle && navLinks) {

            menuToggle.addEventListener("click", function (event) {

                event.stopPropagation();

                var opened = navLinks.classList.toggle("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    opened ? "true" : "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    opened
                        ? "Close navigation menu"
                        : "Open navigation menu"
                );

                menuToggle.textContent = opened ? "✕" : "☰";
            });

            navLinks.querySelectorAll("a").forEach(function (link) {

                link.addEventListener("click", function () {

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
                });

            });

            document.addEventListener("click", function (event) {

                if (
                    navLinks.classList.contains("open") &&
                    !navLinks.contains(event.target) &&
                    !menuToggle.contains(event.target)
                ) {
                    navLinks.classList.remove("open");

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.textContent = "☰";
                }

            });
        }


        /* SCROLL REVEAL */

        var revealElements =
            document.querySelectorAll(".reveal");

        if (revealElements.length === 0) {
            return;
        }

        /* Show the first section immediately */

        if (revealElements[0]) {
            revealElements[0].classList.add("active");
        }


        /* Animate other sections when they appear */

        if ("IntersectionObserver" in window) {

            var observer = new IntersectionObserver(
                function (entries) {

                    entries.forEach(function (entry) {

                        if (entry.isIntersecting) {

                            entry.target.classList.add("active");

                            observer.unobserve(entry.target);
                        }

                    });

                },
                {
                    threshold: 0.1
                }
            );

            revealElements.forEach(function (element, index) {

                if (index > 0) {
                    observer.observe(element);
                }

            });

        } else {

            revealElements.forEach(function (element) {
                element.classList.add("active");
            });

        }


        /* SMOOTH NAVIGATION */

        document.querySelectorAll('a[href^="#"]').forEach(function (link) {

            link.addEventListener("click", function (event) {

                var id = link.getAttribute("href");

                if (!id || id === "#") {
                    return;
                }

                var target = document.querySelector(id);

                if (!target) {
                    return;
                }

                event.preventDefault();

                var header = document.querySelector("header");

                var headerHeight =
                    header ? header.offsetHeight : 0;

                var position =
                    target.getBoundingClientRect().top +
                    window.pageYOffset -
                    headerHeight;

                window.scrollTo({
                    top: position,
                    behavior: "smooth"
                });

            });

        });

    }


    /* START */

    if (document.readyState === "loading") {

        document.addEventListener(
            "DOMContentLoaded",
            startPortfolio
        );

    } else {

        startPortfolio();

    }

})();