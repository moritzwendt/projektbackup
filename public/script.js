document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
        html.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
    }

    themeToggle.addEventListener('click', function () {
        html.classList.toggle('dark');

        if (html.classList.contains('dark')) {
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'dark');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
        } else {
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'light');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0070f3');
        }
    });

    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if (menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function () {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

        closeMenu.addEventListener('click', function () {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function () {
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    document.querySelectorAll('a[href^="#"').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;

            console.log('Form Submitted:', { name, email, message });

            const button = contactForm.querySelector('button[type="submit"]');
            const originalText = button.textContent;
            button.textContent = 'Message Sent!';

            contactForm.reset();

            setTimeout(() => {
                button.textContent = originalText;
            }, 3000);
        });
    }

    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    function checkScroll() {
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        } else {
            header.classList.remove('shadow-md');
        }

        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if (sectionTop < windowHeight * 0.85) {
                section.classList.add('opacity-100', 'translate-y-0');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
const terminalContainer = document.getElementById('terminal-container');
const terminalContent = document.querySelector('.terminal-content');
const commandSpan = document.querySelector('.command-text');

if (terminalContainer && terminalContent && commandSpan) {
    // Hier fügen wir nach dem .com/ das unsichtbare Umbruchzeichen ein
    const commandText = "git clone https://github.com/\u200Bmoritzwendt/Portfolio.git";

    let i = 0;
    const typeCommand = () => {
        if (i < commandText.length) {
            commandSpan.textContent += commandText.charAt(i);
            i++;
            setTimeout(typeCommand, 50);
        } else {
            const cursor = document.createElement('span');
            cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
            terminalContent.appendChild(cursor);
        }
    };

    setTimeout(typeCommand, 1000);
} else {
    const terminal = document.querySelector('.terminal-body');
    if (terminal) {
        const commandElement = terminal.querySelector('.command');
        const commandText = "git clone https://github.com/\u200Bmoritzwendt/Portfolio.git";
        commandElement.textContent = '';

        let i = 0;
        const typeCommand = () => {
            if (i < commandText.length) {
                commandElement.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            } else {
                commandElement.insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
            }
        };

        setTimeout(typeCommand, 1000);
    }
}
});
// ###############
// EmailJS Initialisierung
(function () {
    emailjs.init("-FGnRHyKguim-btDt");
})();

document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const nameInput = document.getElementById("name").value.trim();
        const emailInput = document.getElementById("email").value.trim();
        const messageInput = document.getElementById("message").value.trim();

        const formData = {
            to_name: "Moritz",
            from_name: nameInput,
            from_email: emailInput,
            subject: "Neue Kontaktanfrage über dein Portfolio",
            message: messageInput,
            reply_to: emailInput
        };

        console.log("Gesendete Daten:", formData); // Debug

        emailjs
            .send("service_gbcu138", "template_m76o0ua", formData)
            .then(function () {

                contactForm.reset();
                alert("Nachricht erfolgreich gesendet!");

            })
            .catch(function (error) {
                console.error("EmailJS Fehler:", error);
                alert("Fehler beim Senden. Bitte erneut versuchen.");
            });
    });
});