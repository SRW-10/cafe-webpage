document.addEventListener("DOMContentLoaded", () => {
    const themeToggle = document.querySelector("[data-theme-toggle]");
    if (themeToggle) {
        const savedTheme = localStorage.getItem("cafe-theme");
        if (savedTheme === "calm") {
            document.body.classList.add("calm-theme");
            themeToggle.setAttribute("aria-pressed", "true");
            themeToggle.textContent = "Use pink theme";
        }

        themeToggle.addEventListener("click", () => {
            const calmTheme = document.body.classList.toggle("calm-theme");
            localStorage.setItem("cafe-theme", calmTheme ? "calm" : "pink");
            themeToggle.setAttribute("aria-pressed", String(calmTheme));
            themeToggle.textContent = calmTheme ? "Use pink theme" : "Switch theme";
        });
    }

    const openingStatus = document.querySelector("[data-opening-status]");
    if (openingStatus) {
        const currentHour = new Date().getHours();
        const isOpen = currentHour >= 9 && currentHour < 22;
        openingStatus.textContent = isOpen
            ? "Open today · 9:00 AM - 10:00 PM"
            : "Currently closed · Open daily from 9:00 AM";
        openingStatus.classList.toggle("is-open", isOpen);
    }

    document.querySelectorAll(".home-page section").forEach((section) => {
        section.classList.add("reveal-on-scroll");
    });

    if ("IntersectionObserver" in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-visible");
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll(".reveal-on-scroll").forEach((section) => revealObserver.observe(section));
    }

    const reviewTabs = document.querySelectorAll("[data-review-tab]");
    if (reviewTabs.length) {
        reviewTabs.forEach((tab) => {
            tab.addEventListener("click", () => {
                const targetId = tab.dataset.reviewTab;
                reviewTabs.forEach((item) => {
                    const isActive = item === tab;
                    item.classList.toggle("is-active", isActive);
                    item.setAttribute("aria-selected", String(isActive));
                });
                document.querySelectorAll(".review-tab-panel").forEach((panel) => {
                    panel.hidden = panel.id !== targetId;
                });
            });
        });
    }

    document.querySelectorAll("[data-carousel]").forEach((carousel) => {
        const track = carousel.querySelector(".photo-track");
        const cards = carousel.querySelectorAll(".photo-card");
        const previous = carousel.querySelector(".previous");
        const next = carousel.querySelector(".next");

        if (!track || !cards.length) {
            return;
        }

        const scrollByCard = (direction) => {
            const gap = Number.parseFloat(getComputedStyle(track).gap) || 0;
            track.scrollBy({
                left: direction * (cards[0].getBoundingClientRect().width + gap),
                behavior: "smooth"
            });
        };

        previous?.addEventListener("click", () => scrollByCard(-1));
        next?.addEventListener("click", () => scrollByCard(1));
    });

    const menuSearch = document.querySelector("[data-menu-search]");
    if (menuSearch) {
        const menuItems = [...document.querySelectorAll("[data-menu-item]")];
        const suggestions = document.querySelector("[data-menu-suggestions]");
        const results = document.querySelector("[data-menu-results]");
        const popularSearches = ["coffee", "cake", "drink", "sandwich", "sweet"];

        const filterMenu = (value) => {
            const query = value.trim().toLowerCase();
            let matches = 0;

            menuItems.forEach((item) => {
                const searchableText = `${item.dataset.search} ${item.textContent}`.toLowerCase();
                const visible = !query || searchableText.includes(query);
                item.classList.toggle("is-hidden", !visible);
                if (visible) {
                    matches += 1;
                }
            });

            if (results) {
                results.textContent = query
                    ? `${matches} ${matches === 1 ? "item" : "items"} found`
                    : "Showing all menu items";
            }
        };

        if (suggestions) {
            popularSearches.forEach((term) => {
                const button = document.createElement("button");
                button.type = "button";
                button.className = "suggestion-button";
                button.textContent = term;
                button.addEventListener("click", () => {
                    menuSearch.value = term;
                    filterMenu(term);
                    menuSearch.focus();
                });
                suggestions.append(button);
            });
        }

        menuSearch.addEventListener("input", (event) => filterMenu(event.target.value));
        filterMenu("");
    }

    const navLinks = document.querySelectorAll("nav a[href^='#']");
    const sections = document.querySelectorAll("main section[id], body > section[id]");

    navLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target = document.querySelector(link.getAttribute("href"));
            if (!target) {
                return;
            }
            event.preventDefault();
            target.scrollIntoView({ behavior: "smooth", block: "start" });
            history.replaceState(null, "", link.getAttribute("href"));
        });
    });

    if (sections.length && "IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    navLinks.forEach((link) => {
                        link.classList.toggle(
                            "active",
                            link.getAttribute("href") === `#${entry.target.id}`
                        );
                    });
                }
            });
        }, { rootMargin: "-25% 0px -60% 0px" });

        sections.forEach((section) => observer.observe(section));
    }

    const countdown = document.querySelector(".timer");
    if (countdown) {
        const deadline = Date.now() + (7 * 24 * 60 * 60 * 1000);
        const units = ["Days", "Hours", "Minutes", "Seconds"];
        const updateCountdown = () => {
            const remaining = Math.max(0, deadline - Date.now());
            const values = [
                Math.floor(remaining / 86400000),
                Math.floor((remaining % 86400000) / 3600000),
                Math.floor((remaining % 3600000) / 60000),
                Math.floor((remaining % 60000) / 1000)
            ];

            countdown.querySelectorAll("div").forEach((item, index) => {
                const spans = item.querySelectorAll("span");
                if (spans.length >= 2) {
                    spans[0].textContent = String(values[index]).padStart(2, "0");
                    spans[1].textContent = units[index];
                }
            });
        };

        updateCountdown();
        window.setInterval(updateCountdown, 1000);
    }

    const contactForm = document.querySelector("#contact form");
    if (contactForm) {
        const status = document.createElement("p");
        status.className = "form-status";
        status.setAttribute("aria-live", "polite");
        contactForm.append(status);

        contactForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!contactForm.checkValidity()) {
                contactForm.reportValidity();
                return;
            }
            status.textContent = `Thanks, ${contactForm.elements.fname.value.trim()}! Your reservation request has been received.`;
            status.classList.add("success");
            contactForm.reset();
        });
    }

    const reservationForm = document.querySelector("[data-reservation-form]");
    if (reservationForm) {
        reservationForm.addEventListener("submit", () => {
            window.setTimeout(() => reservationForm.scrollIntoView({ behavior: "smooth", block: "center" }), 0);
        });
    }

    const reviewForm = document.querySelector("[data-review-form]");
    if (reviewForm) {
        const reviewsSection = document.querySelector("#reviews");
        const reviewList = reviewsSection.querySelector("[data-review-list]");
        const status = document.createElement("p");
        status.className = "form-status";
        status.setAttribute("aria-live", "polite");
        reviewForm.append(status);

        const renderReview = ({ name, rating, text }) => {
            const review = document.createElement("article");
            review.className = "submitted-review";
            const stars = document.createElement("p");
            stars.className = "review-stars";
            stars.setAttribute("aria-label", `${rating} out of 5 stars`);
            stars.textContent = `${"★".repeat(Number(rating))}${"☆".repeat(5 - Number(rating))}`;
            const author = document.createElement("h3");
            author.textContent = `By: ${name}`;
            const message = document.createElement("p");
            message.textContent = text;
            review.append(stars, author, message);
            reviewList?.append(review);
        };

        try {
            const savedReviews = JSON.parse(localStorage.getItem("cafe-reviews") || "[]");
            savedReviews.forEach(renderReview);
        } catch {
            localStorage.removeItem("cafe-reviews");
        }

        reviewForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!reviewForm.checkValidity()) {
                reviewForm.reportValidity();
                return;
            }

            const name = reviewForm.elements["review-name"].value.trim();
            const rating = reviewForm.elements.rating.value;
            const text = reviewForm.elements["review-text"].value.trim();
            renderReview({ name, rating, text });
            const savedReviews = JSON.parse(localStorage.getItem("cafe-reviews") || "[]");
            savedReviews.push({ name, rating, text });
            localStorage.setItem("cafe-reviews", JSON.stringify(savedReviews));
            status.textContent = "Thank you! Your review has been posted.";
            status.classList.add("success");
            reviewForm.reset();
        });
    }

    document.querySelectorAll("img[data-lightbox], #home img, #reviews img, .menu-gallery img").forEach((image) => {
        image.addEventListener("click", () => {
            const overlay = document.createElement("div");
            overlay.className = "image-overlay";
            overlay.innerHTML = `<button type="button" aria-label="Close image">&times;</button><img src="${image.src}" alt="${image.alt}">`;
            document.body.append(overlay);
            overlay.querySelector("button").focus();
            overlay.addEventListener("click", (event) => {
                if (event.target === overlay || event.target.closest("button")) {
                    overlay.remove();
                }
            });
        });
    });

    const loginForm = document.querySelector("[data-login-form]");
    if (loginForm) {
        const status = document.createElement("p");
        status.className = "form-status";
        status.setAttribute("aria-live", "polite");
        loginForm.append(status);

        loginForm.addEventListener("submit", (event) => {
            event.preventDefault();
            if (!loginForm.checkValidity()) {
                loginForm.reportValidity();
                return;
            }
            window.location.href = "soulfultreats.html";
        });
    }
});
