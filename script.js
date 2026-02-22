document.addEventListener('DOMContentLoaded', () => {

    /* --- Mobile Navigation Toggle --- */
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn && navLinks) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('show');
            const isShow = navLinks.classList.contains('show');
            // Change icon
            menuBtn.innerHTML = isShow ? '✕' : '☰';
            menuBtn.setAttribute('aria-expanded', isShow);
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('show');
                menuBtn.innerHTML = '☰';
                menuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    /* --- Scroll Reveal Animation --- */
    // Using Intersection Observer to reveal elements as they enter viewport
    const revealElements = document.querySelectorAll('.reveal');

    const revealOptions = {
        threshold: 0.15, // Trigger when 15% of element is visible
        rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return; // Do nothing if not intersecting
            }

            // Add active class to trigger CSS transition
            entry.target.classList.add('active');

            // If it's a timeline item, also highlight the node
            if (entry.target.classList.contains('timeline-item')) {
                entry.target.classList.add('active-node');
            }

            // Optional: Stop observing once revealed (uncomment if you only want it to happen once)
            // observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* --- Accordion Functionality --- */
    const accordionHeaders = document.querySelectorAll('.accordion-header');

    accordionHeaders.forEach(header => {
        header.addEventListener('click', function () {
            // Toggle active state on the item
            const item = this.parentElement;
            const content = this.nextElementSibling;

            // Is it currently open?
            const isOpen = item.classList.contains('active');

            // Close all other accordions (optional: remove this block if you want multiple open)
            document.querySelectorAll('.accordion-item').forEach(otherItem => {
                otherItem.classList.remove('active');
                otherItem.querySelector('.accordion-content').style.maxHeight = null;
                otherItem.querySelector('.accordion-header').setAttribute('aria-expanded', 'false');
            });

            // If it wasn't open, open it
            if (!isOpen) {
                item.classList.add('active');
                this.setAttribute('aria-expanded', 'true');
                // Calculate actual height needed
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });

    /* --- Dynamic Timeline Active State on Scroll --- */
    // Highlights the timeline dot when the user scrolls past it
    const timelineItems = document.querySelectorAll('.timeline-item');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY + (window.innerHeight / 2); // Middle of screen

        timelineItems.forEach(item => {
            const itemTop = item.offsetTop;
            const itemBottom = itemTop + item.offsetHeight;

            // If middle of screen is past the top of the item
            if (scrollPosition >= itemTop) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    });

});
