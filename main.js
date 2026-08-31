(function () {
    "use strict";

    function startPortfolio() {

        /* MOBILE MENU */

        var menuToggle = document.getElementById("menuToggle");
        var navLinks = document.getElementById("navLinks");

        // Fallback: if IDs aren't present in the markup, try class selectors
        if (!menuToggle) {
            menuToggle = document.querySelector('.menu-toggle');
        }
        if (!navLinks) {
            navLinks = document.querySelector('.nav-links');
        }

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

        // Ensure sections are marked for reveal so animation runs even if
        // markup didn't include the .reveal class.
        document.querySelectorAll('section').forEach(function (sec) {
            if (!sec.classList.contains('reveal')) {
                sec.classList.add('reveal');
            }
        });

        var revealElements = document.querySelectorAll(".reveal");

        // Only run reveal logic if we have reveal elements — do not exit the function
        if (revealElements.length > 0) {

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

                var headerHeight = header ? header.offsetHeight : 0;

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


        /* CONTACT FORM + TESTIMONIALS INJECTION */
        (function injectContactAndTestimonials() {
            try {
                // Testimonials: insert after the #work section
                var workSection = document.getElementById('work');
                if (workSection) {
                    var testimonialsHTML = '\n<section id="testimonials" class="reveal">\n  <div class="container">\n    <h2>What <span>Clients</span> Say</h2>\n    <p class="section-text">Short testimonials from clients I worked with — focused on results and collaboration.</p>\n    <div class="work-grid" style="margin-top:20px">\n      <div class="work-card">\n        <div class="content">\n          <h3>"Boosted ROAS by 3x"</h3>\n          <p>"Gunkowii improved our paid campaigns and optimized the store UX — revenue grew and costs dropped."</p>\n          <div style=\"color:var(--muted);font-size:.9rem;margin-top:12px\">— Store Owner, Iron Therapy</div>\n        </div>\n      </div>\n      <div class="work-card">\n        <div class="content">\n          <h3>"Email flows that convert"</h3>\n          <p>"Lifecycle emails and automations increased repeat purchases noticeably — great attention to detail."</p>\n          <div style=\"color:var(--muted);font-size:.9rem;margin-top:12px\">— Marketing Lead, Beeyouti</div>\n        </div>\n      </div>\n    </div>\n  </div>\n</section>\n';
                    workSection.insertAdjacentHTML('afterend', testimonialsHTML);
                }

                // Contact form: append a simple form to the #contact section container
                var contactContainer = document.querySelector('#contact .container');
                if (contactContainer) {
                    var formHTML = '\n<div style="max-width:760px;margin:28px auto 0;background:rgba(255,255,255,.02);padding:18px;border-radius:8px">\n  <form id="contactForm" method="POST" action="https://formspree.io/f/mbgjdgng">\n    <div style="display:flex;gap:12px;flex-wrap:wrap">\n      <input name="name" placeholder="Your name" required style="flex:1;padding:12px;border-radius:6px;border:1px solid rgba(0,0,0,.08)">\n      <input name="email" type="email" placeholder="Email address" required style="flex:1;padding:12px;border-radius:6px;border:1px solid rgba(0,0,0,.08)">\n    </div>\n    <div style="margin-top:12px">\n      <textarea name="message" rows="6" placeholder="Tell me about your store & goals" required style="width:100%;padding:12px;border-radius:6px;border:1px solid rgba(0,0,0,.08)"></textarea>\n    </div>\n    <div style="margin-top:12px;display:flex;gap:10px;align-items:center;justify-content:flex-start">\n      <button type="submit" style="background:#c29d4a;color:#14251d;padding:10px 16px;border-radius:6px;border:none;font-weight:700;cursor:pointer">Send message</button>\n      <small style="color:var(--muted)">Or email directly: <a href="mailto:ahmeedagunko@gmail.com">ahmeedagunko@gmail.com</a></small>\n    </div>\n    <div id="contactFormMessage" aria-live="polite" style="margin-top:10px;color:var(--muted)"></div>\n  </form>\n  <small style="display:block;margin-top:10px;color:var(--muted)">Submissions are sent via Formspree and will be delivered to your registered email. If you don't receive emails, check your Formspree inbox and verify your email address.</small>\n</div>\n';

                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = formHTML;
                    contactContainer.appendChild(wrapper);

                    // Add submit handler: use fetch to POST to Formspree and show a success/failure message inline
                    var contactForm = document.getElementById('contactForm');
                    if (contactForm) {
                        contactForm.addEventListener('submit', function (e) {
                            e.preventDefault();

                            var action = contactForm.getAttribute('action') || '';
                            var formMessage = document.getElementById('contactFormMessage');

                            var formData = new FormData(contactForm);

                            // Use fetch to submit as JSON to Formspree for a clean UX
                            var payload = {};
                            formData.forEach(function (value, key) {
                                payload[key] = value;
                            });

                            fetch(action, {
                                method: 'POST',
                                headers: {
                                    'Accept': 'application/json',
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(payload)
                            }).then(function (response) {
                                if (response.ok) {
                                    if (formMessage) {
                                        formMessage.style.color = 'green';
                                        formMessage.textContent = 'Thanks — your message was sent. I will reply shortly.';
                                    }
                                    contactForm.reset();
                                } else {
                                    return response.json().then(function (data) {
                                        var err = (data && data.error) ? data.error : 'Submission failed';

                                        if (formMessage) {
                                            formMessage.style.color = 'crimson';
                                            formMessage.textContent = 'Error: ' + err + '. If this persists, email ahmeedagunko@gmail.com';
                                        }
                                    });
                                }
                            }).catch(function (err) {
                                if (formMessage) {
                                    formMessage.style.color = 'crimson';
                                    formMessage.textContent = 'Network error. Please try again or email ahmeedagunko@gmail.com';
                                }
                            });

                        });
                    }

                }

            } catch (err) {
                // Fail silently — injection is progressive enhancement
                console.error('Contact/testimonials injection failed', err);
            }
        })();

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
