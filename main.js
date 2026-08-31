/* =========================================================
GUNKOWII SABA PORTFOLIO
MAIN JAVASCRIPT
========================================================= */

(function () {
"use strict";

/* ---------------------------------------------------------
DOM READY
--------------------------------------------------------- */

document.addEventListener("DOMContentLoaded", function () {

initMobileMenu();
initSmoothNavigation();
initActiveNavigation();
initRevealAnimations();
initCurrentYear();
initContactForm();

});

/* ---------------------------------------------------------
MOBILE MENU
--------------------------------------------------------- */

function initMobileMenu() {

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (!menuToggle || !navLinks) {
  return;
}

menuToggle.addEventListener("click", function () {

  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute(
    "aria-expanded",
    isOpen ? "true" : "false"
  );

  menuToggle.setAttribute(
    "aria-label",
    isOpen
      ? "Close navigation menu"
      : "Open navigation menu"
  );

});


/* Close menu after selecting a link */

const links = navLinks.querySelectorAll("a");

links.forEach(function (link) {

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

  });

});


/* Close menu when clicking outside */

document.addEventListener("click", function (event) {

  const clickedInsideMenu =
    navLinks.contains(event.target);

  const clickedToggle =
    menuToggle.contains(event.target);

  if (
    !clickedInsideMenu &&
    !clickedToggle &&
    navLinks.classList.contains("open")
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

  }

});

}

/* ---------------------------------------------------------
SMOOTH NAVIGATION
--------------------------------------------------------- */

function initSmoothNavigation() {

const navigationLinks =
  document.querySelectorAll('a[href^="#"]');

navigationLinks.forEach(function (link) {

  link.addEventListener("click", function (event) {

    const targetId =
      link.getAttribute("href");

    if (
      !targetId ||
      targetId === "#" ||
      targetId.length < 2
    ) {
      return;
    }

    const target =
      document.querySelector(targetId);

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

}

/* ---------------------------------------------------------
ACTIVE NAVIGATION
--------------------------------------------------------- */

function initActiveNavigation() {

const sections =
  document.querySelectorAll("main section[id]");

const navLinks =
  document.querySelectorAll(
    '#navLinks a[href^="#"]'
  );

if (!sections.length || !navLinks.length) {
  return;
}

const observer =
  new IntersectionObserver(
    function (entries) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) {
          return;
        }

        const currentId =
          entry.target.getAttribute("id");

        navLinks.forEach(function (link) {

          const linkTarget =
            link.getAttribute("href");

          link.classList.toggle(
            "active",
            linkTarget === "#" + currentId
          );

        });

      });

    },
    {
      root: null,
      threshold: 0.25,
      rootMargin: "-80px 0px -35% 0px"
    }
  );

sections.forEach(function (section) {
  observer.observe(section);
});

}

/* ---------------------------------------------------------
REVEAL ANIMATIONS
--------------------------------------------------------- */

function initRevealAnimations() {

if (
  window.matchMedia &&
  window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches
) {
  return;
}

const revealItems =
  document.querySelectorAll(
    ".service-card, .work-card, .contact-item, .about-content, .about-image, .cta-box, .trust-item"
  );

if (!revealItems.length) {
  return;
}


/* Initial state */

revealItems.forEach(function (item) {

  item.style.opacity = "0";

  item.style.transform =
    "translateY(18px)";

  item.style.transition =
    "opacity .65s ease, transform .65s ease";

});


const observer =
  new IntersectionObserver(
    function (entries, observerInstance) {

      entries.forEach(function (entry) {

        if (!entry.isIntersecting) {
          return;
        }

        entry.target.style.opacity = "1";

        entry.target.style.transform =
          "translateY(0)";

        observerInstance.unobserve(
          entry.target
        );

      });

    },
    {
      threshold: 0.12
    }
  );


revealItems.forEach(function (item) {

  observer.observe(item);

});

}

/* ---------------------------------------------------------
CURRENT YEAR
--------------------------------------------------------- */

function initCurrentYear() {

const yearElement =
  document.getElementById("year");

if (!yearElement) {
  return;
}

yearElement.textContent =
  new Date().getFullYear();

}

/* ---------------------------------------------------------
CONTACT FORM
--------------------------------------------------------- */

function initContactForm() {

const form =
  document.getElementById("contactForm");

const messageBox =
  document.getElementById(
    "contactFormMessage"
  );

const submitButton =
  document.getElementById(
    "contactSubmit"
  );

if (!form) {
  return;
}


form.addEventListener(
  "submit",
  function (event) {

    /*
     * We allow FormSubmit to handle the actual
     * email delivery.
     *
     * JavaScript is only responsible for
     * checking the fields and giving the user
     * feedback before submission.
     */

    const name =
      document.getElementById("c-name");

    const email =
      document.getElementById("c-email");

    const message =
      document.getElementById("c-message");


    if (!name || !email || !message) {
      return;
    }


    /* Clear previous message */

    if (messageBox) {
      messageBox.textContent = "";
    }


    /* Name validation */

    if (
      name.value.trim().length < 2
    ) {

      event.preventDefault();

      showFormMessage(
        messageBox,
        "Please enter your name.",
        true
      );

      name.focus();

      return;

    }


    /* Email validation */

    if (
      !isValidEmail(
        email.value.trim()
      )
    ) {

      event.preventDefault();

      showFormMessage(
        messageBox,
        "Please enter a valid email address.",
        true
      );

      email.focus();

      return;

    }


    /* Message validation */

    if (
      message.value.trim().length < 10
    ) {

      event.preventDefault();

      showFormMessage(
        messageBox,
        "Please enter a little more detail about your project.",
        true
      );

      message.focus();

      return;

    }


    /*
     * Everything looks valid.
     *
     * Let the form submit normally to FormSubmit.
     */

    if (submitButton) {

      submitButton.disabled = true;

      submitButton.textContent =
        "Sending...";

    }

  }
);

}

/* ---------------------------------------------------------
EMAIL VALIDATION
--------------------------------------------------------- */

function isValidEmail(email) {

const pattern =
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

return pattern.test(email);

}

/* ---------------------------------------------------------
FORM MESSAGE
--------------------------------------------------------- */

function showFormMessage(
element,
message,
isError
) {

if (!element) {
  return;
}

element.textContent = message;

if (isError) {

  element.style.color =
    "#e7a6a6";

} else {

  element.style.color =
    "#c9a45c";

}

}

/* ---------------------------------------------------------
IMAGE FALLBACK
--------------------------------------------------------- */

function initImageFallbacks() {

const images =
  document.querySelectorAll("img");

images.forEach(function (image) {

  image.addEventListener(
    "error",
    function () {

      image.style.display = "none";

    }
  );

});

}

/*

* Keep image fallback separate so it does not
* interfere with the rest of the application.
  */

initImageFallbacks();

})();