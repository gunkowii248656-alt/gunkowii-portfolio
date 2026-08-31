document.addEventListener("DOMContentLoaded", () => {

/* =========================================
   SCROLL FADE-IN / SLIDE-UP ANIMATION
   ========================================= */

const animatedElements = document.querySelectorAll(
    "section, .service, .work-card, .credential, .step, .why-card, .about-card, .cta-box"
);

animatedElements.forEach((element) => {
    element.classList.add("scroll-reveal");
});

const observer = new IntersectionObserver(
    (entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.12,
        rootMargin: "0px 0px -50px 0px"
    }
);

animatedElements.forEach((element) => {
    observer.observe(element);
});


/* =========================================
   MOBILE NAVIGATION
   ========================================= */

const nav = document.querySelector("nav");
const navLinks = document.querySelector(".nav-links");

if (nav && navLinks) {

    // Create mobile menu button
    const menuButton = document.createElement("button");

    menuButton.className = "mobile-menu-button";
    menuButton.setAttribute("aria-label", "Open navigation menu");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.innerHTML = "☰";

    nav.appendChild(menuButton);

    menuButton.addEventListener("click", () => {

        const isOpen = navLinks.classList.toggle("mobile-open");

        menuButton.setAttribute(
            "aria-expanded",
            isOpen ? "true" : "false"
        );

        menuButton.innerHTML = isOpen ? "✕" : "☰";
    });


    // Close menu after clicking a navigation link
    navLinks.querySelectorAll("a").forEach((link) => {

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

});