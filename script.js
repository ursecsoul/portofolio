/* ══════════════════════════════
   PROJECT DATA
══════════════════════════════ */
const projects = [
    {
        title: 'Website Profile SMPN 10 Malang',
        tag: 'Web Development',
        desc: 'A comprehensive school profile website with an admin dashboard for content management. Features school information, news, gallery, and a dynamic data management system. Built with PHP and MySQL for a robust backend.',
        tech: ['PHP', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        link: 'https://github.com/ursecsoul',
        image: 'img/sekolah.png'
    },
    {
        title: 'ISO: Izin Siswa Online',
        tag: 'Mobile App',
        desc: 'A Flutter mobile app for digital student attendance and leave requests. Makes it easy for students to submit leave, teachers to verify attendance, and parents to monitor their child\'s presence in real-time.',
        tech: ['Flutter', 'Dart', 'Supabase', 'REST API'],
        link: 'https://github.com/ursecsoul',
        image: 'img/iso.png'
    },
    {
        title: 'Pawtopia',
        tag: 'Web Development',
        desc: 'A complete pet care information system. Features include service booking, catalog, and a full admin dashboard for managing a veterinary clinic.',
        tech: ['PHP', 'Laravel', 'MySQL', 'Blade', 'Tailwind CSS'],
        link: 'https://github.com/ursecsoul',
        image: 'img/pawtopia.png'
    }
];

/* ══════════════════════════════
   MODAL
══════════════════════════════ */
function openModal(i) {
    const p = projects[i];

    document.getElementById('modalTag').textContent = p.tag;
    document.getElementById('modalTitle').textContent = p.title;
    document.getElementById('modalDesc').textContent = p.desc;
    document.getElementById('modalLink').href = p.link;

    const modalImage = document.getElementById("modalImage");
    const placeholder = document.getElementById("modalPlaceholder");

    if (p.image) {
        modalImage.src = p.image;
        modalImage.style.display = "block";
        placeholder.style.display = "none";
    } else {
        modalImage.style.display = "none";
        placeholder.style.display = "flex";
    }

    const techEl = document.getElementById('modalTech');
    techEl.innerHTML = p.tech.map(t => `<span>${t}</span>`).join('');

    const modal = document.getElementById('projectModal');
    modal.classList.add('is-open');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    document.getElementById('projectModal').classList.remove('is-open');
    document.body.style.overflow = '';
}

document.getElementById('projectModal').addEventListener('click', function(e) {
    if (e.target === this) closeModal();
});

/* ══════════════════════════════
   TYPING EFFECT
══════════════════════════════ */
const roles = ['Web Developer', 'Mobile Developer', 'UI/UX Designer'];
let ri = 0, ci = 0, deleting = false;
const typed = document.getElementById('typedRole');

function typeLoop() {
    const cur = roles[ri];
    if (!deleting) {
        typed.textContent = cur.slice(0, ++ci);
        if (ci === cur.length) {
            deleting = true;
            setTimeout(typeLoop, 1800);
            return;
        }
    } else {
        typed.textContent = cur.slice(0, --ci);
        if (ci === 0) {
            deleting = false;
            ri = (ri + 1) % roles.length;
        }
    }
    setTimeout(typeLoop, deleting ? 55 : 90);
}
typeLoop();

/* ══════════════════════════════
   CUSTOM CURSOR
══════════════════════════════ */
const dot  = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');
let mx = 0, my = 0, rx = 0, ry = 0;

document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

function animateCursor() {
    dot.style.left = mx + 'px';
    dot.style.top  = my + 'px';
    rx += (mx - rx) * 0.12;
    ry += (my - ry) * 0.12;
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(animateCursor);
}
animateCursor();

document.querySelectorAll('a, button, .card, .social-link, .contact-link').forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovered'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovered'));
});

document.addEventListener('mouseleave', () => {
    dot.style.opacity  = 0;
    ring.style.opacity = 0;
});
document.addEventListener('mouseenter', () => {
    dot.style.opacity  = 1;
    ring.style.opacity = 1;
});

/* ══════════════════════════════
   READING PROGRESS BAR
══════════════════════════════ */
const pbar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    const total    = document.documentElement.scrollHeight - window.innerHeight;
    pbar.style.width = (scrolled / total * 100) + '%';
});

/* ══════════════════════════════
   NAVBAR SHRINK ON SCROLL
══════════════════════════════ */
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
});

/* ══════════════════════════════
   SCROLL REVEAL
══════════════════════════════ */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Animate skill bars when they come into view
            entry.target.querySelectorAll('.skill-bar-fill').forEach(bar => {
                bar.style.width = bar.dataset.width;
            });
        }
    });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => revealObserver.observe(el));

/* ══════════════════════════════
   ACTIVE NAV LINK
══════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('nav ul li a');

const activeObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(l => l.classList.remove('active'));
            const link = document.querySelector(`nav a[href="#${entry.target.id}"]`);
            if (link) link.classList.add('active');
        }
    });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => activeObserver.observe(s));