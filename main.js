(function () {
    "use strict";

    function startPortfolio() {

        /* MOBILE MENU */
        var menuToggle = document.getElementById("menuToggle");
        var navLinks = document.getElementById("navLinks");

        if (!menuToggle) menuToggle = document.querySelector('.menu-toggle');
        if (!navLinks) navLinks = document.querySelector('.nav-links');

        if (menuToggle && navLinks) {
            menuToggle.addEventListener("click", function (event) {
                event.stopPropagation();
                var opened = navLinks.classList.toggle("open");
                menuToggle.setAttribute("aria-expanded", opened ? "true" : "false");
                menuToggle.setAttribute("aria-label", opened ? "Close navigation menu" : "Open navigation menu");
                menuToggle.textContent = opened ? "✕" : "☰";
            });

            navLinks.querySelectorAll("a").forEach(function (link) {
                link.addEventListener("click", function () {
                    navLinks.classList.remove("open");
                    if (menuToggle) {
                        menuToggle.setAttribute("aria-expanded", "false");
                        menuToggle.setAttribute("aria-label", "Open navigation menu");
                        menuToggle.textContent = "☰";
                    }
                });
            });

            document.addEventListener("click", function (event) {
                if (navLinks.classList.contains("open") && !navLinks.contains(event.target) && !menuToggle.contains(event.target)) {
                    navLinks.classList.remove("open");
                    menuToggle.setAttribute("aria-expanded", "false");
                    menuToggle.textContent = "☰";
                }
            });
        }

        /* SCROLL REVEAL */
        document.querySelectorAll('section').forEach(function (sec) {
            if (!sec.classList.contains('reveal')) sec.classList.add('reveal');
        });

        var revealElements = document.querySelectorAll(".reveal");
        if (revealElements.length > 0) {
            if (revealElements[0]) revealElements[0].classList.add("active");

            if ("IntersectionObserver" in window) {
                var observer = new IntersectionObserver(function (entries) {
                    entries.forEach(function (entry) {
                        if (entry.isIntersecting) {
                            entry.target.classList.add("active");
                            observer.unobserve(entry.target);
                        }
                    });
                }, { threshold: 0.1 });

                revealElements.forEach(function (element, index) {
                    if (index > 0) observer.observe(element);
                });
            } else {
                revealElements.forEach(function (element) { element.classList.add("active"); });
            }
        }

        /* SMOOTH NAVIGATION */
        document.querySelectorAll('a[href^="#"]').forEach(function (link) {
            link.addEventListener("click", function (event) {
                var id = link.getAttribute("href");
                if (!id || id === "#") return;
                var target = document.querySelector(id);
                if (!target) return;
                event.preventDefault();
                var header = document.querySelector("header");
                var headerHeight = header ? header.offsetHeight : 0;
                var position = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                window.scrollTo({ top: position, behavior: "smooth" });
            });
        });

        /* CONTACT FORM: ensure form exists and attach handler */
        (function ensureContactForm() {
            try {
                var contactContainer = document.querySelector('#contact .container');
                if (!contactContainer) return;

                // If a form is already present, only attach handler if missing
                var existing = document.getElementById('contactForm');

                if (!existing) {
                    var formHTML = '\n<div id="contact-form-wrapper" style="max-width:760px;margin:28px auto 0;background:rgba(255,255,255,.02);padding:18px;border-radius:8px">\n  <form id="contactForm" method="POST" action="https://formspree.io/f/mbgjdgng">\n    <div style="display:flex;gap:12px;flex-wrap:wrap">\n      <label class="sr-only" for="c-name">Name</label>\n      <input id="c-name" name="name" placeholder="Your name" required style="flex:1;padding:12px;border-radius:6px;border:1px solid rgba(0,0,0,.08)">\n      <label class="sr-only" for="c-email">Email</label>\n      <input id="c-email" name="email" type="email" placeholder="Email address" required style="flex:1;padding:12px;border-radius:6px;border:1px solid rgba(0,0,0,.08)">\n    </div>\n    <div style="margin-top:12px">\n      <label class="sr-only" for="c-message">Message</label>\n      <textarea id="c-message" name="message" rows="6" placeholder="Tell me about your store & goals" required style="width:100%;padding:12px;border-radius:6px;border:1px solid rgba(0,0,0,.08)"></textarea>\n    </div>\n    <div style="margin-top:12px;display:flex;gap:10px;align-items:center;justify-content:flex-start">\n      <button id="contactSubmit" type="submit" style="background:#c29d4a;color:#14251d;padding:10px 16px;border-radius:6px;border:none;font-weight:700;cursor:pointer">Send message</button>\n      <small style="color:var(--muted)">Or email directly: <a href="mailto:ahmeedagunko@gmail.com">ahmeedagunko@gmail.com</a></small>\n    </div>\n    <div id="contactFormMessage" aria-live="polite" style="margin-top:10px;color:var(--muted)"></div>\n  </form>\n  <noscript><div style="margin-top:10px;color:var(--muted)">JavaScript is required for inline submission. Use <a href="mailto:ahmeedagunko@gmail.com">email</a> to contact.</div></noscript>\n</div>\n';

                    var wrapper = document.createElement('div');
                    wrapper.innerHTML = formHTML;
                    contactContainer.appendChild(wrapper);
                }

                // Attach a single submit handler (idempotent)
                var contactForm = document.getElementById('contactForm');
                if (!contactForm) return;

                if (!contactForm.dataset.hasHandler) {
                    contactForm.addEventListener('submit', function (e) {
                        e.preventDefault();
                        var submitBtn = document.getElementById('contactSubmit');
                        var msgBox = document.getElementById('contactFormMessage');
                        if (submitBtn) submitBtn.disabled = true;

                        var data = {
                            name: (contactForm.querySelector('[name="name"]').value || '').trim(),
                            email: (contactForm.querySelector('[name="email"]').value || '').trim(),
                            message: (contactForm.querySelector('[name="message"]').value || '').trim()
                        };

                        // Basic validation
                        if (!data.email || !data.message) {
                            if (msgBox) { msgBox.style.color = 'crimson'; msgBox.textContent = 'Please provide an email and a message.'; }
                            if (submitBtn) submitBtn.disabled = false;
                            return;
                        }

                        fetch(contactForm.action, {
                            method: 'POST',
                            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        }).then(function (res) {
                            if (res.ok) {
                                if (msgBox) { msgBox.style.color = 'green'; msgBox.textContent = 'Thanks — your message was sent. I will reply shortly.'; }
                                contactForm.reset();
                            } else {
                                return res.json().then(function (payload) {
                                    var err = (payload && payload.error) ? payload.error : 'Submission failed';
                                    if (msgBox) { msgBox.style.color = 'crimson'; msgBox.textContent = 'Error: ' + err + '. If this persists, email ahmeedagunko@gmail.com'; }
                                }).catch(function () {
                                    if (msgBox) { msgBox.style.color = 'crimson'; msgBox.textContent = 'Submission failed. Please email ahmeedagunko@gmail.com'; }
                                });
                            }
                        }).catch(function () {
                            if (msgBox) { msgBox.style.color = 'crimson'; msgBox.textContent = 'Network error. Please try again or email ahmeedagunko@gmail.com'; }
                        }).finally(function () { if (submitBtn) submitBtn.disabled = false; });

                    });

                    contactForm.dataset.hasHandler = '1';
                }

            } catch (err) {
                // Do not break the page if anything fails
                console.error('contact form init error', err);
            }
        })();

    }

    /* START */
    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", startPortfolio);
    } else {
        startPortfolio();
    }

})();
