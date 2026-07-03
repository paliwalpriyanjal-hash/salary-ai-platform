// ======================================================
// AI Salary Intelligence Platform
// Main JavaScript — v2.0
// Handles: World Map Canvas, Three.js AI Globe,
//          Scroll Animations, Navbar, Hamburger,
//          Button Ripples, Info Card Floats
// ======================================================


// ======================================
// 1. NAVBAR SCROLL EFFECT
// ======================================

const navbar = document.getElementById('navbar');

if (navbar) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, { passive: true });
}


// ======================================
// 2. MOBILE HAMBURGER MENU
// ======================================

const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobileNav');

if (hamburger && mobileNav) {

    hamburger.addEventListener('click', function () {
        hamburger.classList.toggle('active');
        mobileNav.classList.toggle('open');
    });

    // Close menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
            hamburger.classList.remove('active');
            mobileNav.classList.remove('open');
        });
    });

}


// ======================================
// 3. SCROLL ANIMATIONS — Intersection Observer (Step 9)
// ======================================

const revealObserver = new IntersectionObserver(
    function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                // Unobserve after animating once (performance)
                revealObserver.unobserve(entry.target);
            }
        });
    },
    {
        threshold: 0.08,
        rootMargin: '0px 0px -30px 0px'
    }
);

// Observe all .reveal elements
document.querySelectorAll('.reveal').forEach(function (el) {
    revealObserver.observe(el);
});


// ======================================
// 4. BUTTON RIPPLE EFFECT (Step 7)
// ======================================

function addRipple(button, e) {
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    const rect = button.getBoundingClientRect();
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top  = (e.clientY - rect.top)  + 'px';
    button.appendChild(ripple);
    setTimeout(function () { ripple.remove(); }, 700);
}

document.querySelectorAll('.btn, .btn-predict, .nav-cta').forEach(function (button) {
    button.addEventListener('click', function (e) {
        addRipple(button, e);
    });
});


// ======================================
// 5. STEP 1: WORLD MAP CANVAS — Hero Background
// ======================================

const worldCanvas = document.getElementById('world-map-canvas');

if (worldCanvas) {
    initWorldMap(worldCanvas);
}

/**
 * Draws an animated world-map-style background with:
 *  - Network nodes (approximate world city positions)
 *  - Static proximity connection lines
 *  - Animated data-transfer pulse dots
 *  - Floating ambient particles
 */
function initWorldMap(canvas) {

    const ctx = canvas.getContext('2d');

    // Resize canvas to fill parent
    function resize() {
        canvas.width  = canvas.offsetWidth  || window.innerWidth;
        canvas.height = canvas.offsetHeight || window.innerHeight;
    }

    resize();
    window.addEventListener('resize', resize, { passive: true });

    // ----------------------------------
    // Node positions (normalized 0–1)
    // Approximate real-world city regions
    // ----------------------------------
    const nodes = [
        // North America
        { x: 0.14, y: 0.30 }, { x: 0.18, y: 0.36 }, { x: 0.22, y: 0.42 },
        { x: 0.10, y: 0.28 }, { x: 0.25, y: 0.35 }, { x: 0.17, y: 0.48 },
        // South America
        { x: 0.26, y: 0.60 }, { x: 0.30, y: 0.68 }, { x: 0.22, y: 0.72 },
        // Europe
        { x: 0.46, y: 0.22 }, { x: 0.50, y: 0.26 }, { x: 0.53, y: 0.20 },
        { x: 0.44, y: 0.30 }, { x: 0.56, y: 0.24 }, { x: 0.48, y: 0.32 },
        { x: 0.52, y: 0.18 },
        // Africa
        { x: 0.50, y: 0.52 }, { x: 0.53, y: 0.58 }, { x: 0.47, y: 0.62 },
        { x: 0.54, y: 0.65 },
        // Middle East
        { x: 0.59, y: 0.38 }, { x: 0.62, y: 0.34 },
        // South Asia (India)
        { x: 0.65, y: 0.44 }, { x: 0.67, y: 0.48 }, { x: 0.70, y: 0.46 },
        { x: 0.68, y: 0.42 },
        // East Asia
        { x: 0.76, y: 0.30 }, { x: 0.80, y: 0.35 }, { x: 0.82, y: 0.28 },
        { x: 0.78, y: 0.40 }, { x: 0.74, y: 0.25 },
        // Southeast Asia
        { x: 0.78, y: 0.52 }, { x: 0.81, y: 0.55 },
        // Australia
        { x: 0.84, y: 0.68 }, { x: 0.87, y: 0.72 },
    ];

    // ----------------------------------
    // Floating ambient particles
    // ----------------------------------
    const PARTICLE_COUNT = 70;
    const particles = Array.from({ length: PARTICLE_COUNT }, function () {
        return {
            x:  Math.random(),
            y:  Math.random(),
            vx: (Math.random() - 0.5) * 0.00025,
            vy: (Math.random() - 0.5) * 0.00018,
            r:  Math.random() * 1.2 + 0.4,
            op: Math.random() * 0.35 + 0.1,
        };
    });

    // ----------------------------------
    // Active data-transfer connections
    // ----------------------------------
    const MAX_CONNECTIONS = 14;
    let connections = [];

    function makeConnection() {
        const from = Math.floor(Math.random() * nodes.length);
        let to = Math.floor(Math.random() * nodes.length);
        while (to === from) to = Math.floor(Math.random() * nodes.length);
        return { from: from, to: to, progress: 0, speed: 0.0025 + Math.random() * 0.004 };
    }

    for (let i = 0; i < MAX_CONNECTIONS; i++) {
        connections.push(makeConnection());
    }

    // ----------------------------------
    // Main draw loop
    // ----------------------------------
    function draw() {

        const W = canvas.width;
        const H = canvas.height;

        ctx.clearRect(0, 0, W, H);

        // --- 1. Static proximity lines between nodes ---
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = (nodes[i].x - nodes[j].x) * W;
                const dy = (nodes[i].y - nodes[j].y) * H;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 160) {
                    const alpha = (1 - dist / 160) * 0.14;
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x * W, nodes[i].y * H);
                    ctx.lineTo(nodes[j].x * W, nodes[j].y * H);
                    ctx.strokeStyle = 'rgba(99, 102, 241, ' + alpha + ')';
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }

        // --- 2. Animated data-transfer pulses ---
        connections.forEach(function (conn, idx) {

            conn.progress += conn.speed;

            if (conn.progress > 1.05) {
                connections[idx] = makeConnection();
                return;
            }

            const A = nodes[conn.from];
            const B = nodes[conn.to];

            // Dim line along the path
            ctx.beginPath();
            ctx.moveTo(A.x * W, A.y * H);
            ctx.lineTo(B.x * W, B.y * H);
            ctx.strokeStyle = 'rgba(6, 182, 212, 0.08)';
            ctx.lineWidth = 0.8;
            ctx.stroke();

            // Travelling pulse dot
            const px = (A.x + (B.x - A.x) * conn.progress) * W;
            const py = (A.y + (B.y - A.y) * conn.progress) * H;

            const pGrad = ctx.createRadialGradient(px, py, 0, px, py, 7);
            pGrad.addColorStop(0, 'rgba(99, 102, 241, 0.92)');
            pGrad.addColorStop(0.5, 'rgba(99, 102, 241, 0.4)');
            pGrad.addColorStop(1, 'rgba(99, 102, 241, 0)');

            ctx.beginPath();
            ctx.arc(px, py, 7, 0, Math.PI * 2);
            ctx.fillStyle = pGrad;
            ctx.fill();

        });

        // --- 3. Node dots with glow ---
        nodes.forEach(function (node) {

            const x = node.x * W;
            const y = node.y * H;

            // Glow halo
            const halo = ctx.createRadialGradient(x, y, 0, x, y, 9);
            halo.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
            halo.addColorStop(1, 'rgba(99, 102, 241, 0)');
            ctx.beginPath();
            ctx.arc(x, y, 9, 0, Math.PI * 2);
            ctx.fillStyle = halo;
            ctx.fill();

            // Core dot
            ctx.beginPath();
            ctx.arc(x, y, 2.5, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(139, 92, 246, 0.95)';
            ctx.fill();

        });

        // --- 4. Ambient floating particles ---
        particles.forEach(function (p) {

            p.x += p.vx;
            p.y += p.vy;

            // Wrap around edges
            if (p.x < -0.01) p.x = 1.01;
            if (p.x >  1.01) p.x = -0.01;
            if (p.y < -0.01) p.y = 1.01;
            if (p.y >  1.01) p.y = -0.01;

            ctx.beginPath();
            ctx.arc(p.x * W, p.y * H, p.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(255, 255, 255, ' + p.op + ')';
            ctx.fill();

        });

        requestAnimationFrame(draw);
    }

    draw();
}


// ======================================
// 6. STEP 3: THREE.JS AI GLOBE — Predict Page
// ======================================

const rupeeContainer = document.getElementById('rupee-container');

if (rupeeContainer && typeof THREE !== 'undefined') {
    initAIGlobe(rupeeContainer);
}

/**
 * Creates a premium Three.js wireframe AI globe with:
 *  - Rotating wireframe sphere
 *  - Fibonacci-distributed surface nodes
 *  - Orbiting torus rings
 *  - Smooth mouse-parallax interaction
 *  - Floating animation
 */
function initAIGlobe(container) {

    let W = container.offsetWidth;
    let H = container.offsetHeight;

    // Scene setup
    const scene    = new THREE.Scene();
    const camera   = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    camera.position.z = 3.2;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // --- Main wireframe globe ---
    const globeGeo = new THREE.SphereGeometry(1, 36, 36);
    const globeMat = new THREE.MeshBasicMaterial({
        color:       0x6366f1,
        wireframe:   true,
        opacity:     0.22,
        transparent: true,
    });
    const globe = new THREE.Mesh(globeGeo, globeMat);
    scene.add(globe);

    // --- Inner semi-transparent fill ---
    const innerGeo = new THREE.SphereGeometry(0.96, 20, 20);
    const innerMat = new THREE.MeshBasicMaterial({
        color:       0x6366f1,
        opacity:     0.03,
        transparent: true,
    });
    scene.add(new THREE.Mesh(innerGeo, innerMat));

    // --- Outer glow ring sphere ---
    const outerGeo = new THREE.SphereGeometry(1.18, 18, 18);
    const outerMat = new THREE.MeshBasicMaterial({
        color:       0x06b6d4,
        wireframe:   true,
        opacity:     0.07,
        transparent: true,
    });
    const outerSphere = new THREE.Mesh(outerGeo, outerMat);
    scene.add(outerSphere);

    // --- Surface nodes using Fibonacci sphere distribution ---
    const nodeGeo = new THREE.SphereGeometry(0.028, 8, 8);
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x8b5cf6 });
    const NODE_COUNT = 32;

    for (let i = 0; i < NODE_COUNT; i++) {
        const phi   = Math.acos(-1 + (2 * i) / NODE_COUNT);
        const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
        const node  = new THREE.Mesh(nodeGeo, nodeMat);
        node.position.set(
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
        );
        globe.add(node);
    }

    // --- Accent nodes (cyan) ---
    const accentMat = new THREE.MeshBasicMaterial({ color: 0x06b6d4 });
    [0, 8, 16, 24].forEach(function (i) {
        const phi   = Math.acos(-1 + (2 * i) / NODE_COUNT);
        const theta = Math.sqrt(NODE_COUNT * Math.PI) * phi;
        const accent = new THREE.Mesh(
            new THREE.SphereGeometry(0.04, 8, 8),
            accentMat
        );
        accent.position.set(
            Math.sin(phi) * Math.cos(theta),
            Math.sin(phi) * Math.sin(theta),
            Math.cos(phi)
        );
        globe.add(accent);
    });

    // --- Orbiting torus ring 1 ---
    const ring1 = new THREE.Mesh(
        new THREE.TorusGeometry(1.38, 0.007, 6, 90),
        new THREE.MeshBasicMaterial({ color: 0x6366f1, opacity: 0.45, transparent: true })
    );
    ring1.rotation.x = Math.PI / 2.8;
    scene.add(ring1);

    // --- Orbiting torus ring 2 ---
    const ring2 = new THREE.Mesh(
        new THREE.TorusGeometry(1.24, 0.005, 6, 70),
        new THREE.MeshBasicMaterial({ color: 0x06b6d4, opacity: 0.3, transparent: true })
    );
    ring2.rotation.x = Math.PI / 4;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    // --- Mouse interaction state ---
    let targetRotX = 0;
    let targetRotY = 0;

    container.addEventListener('mousemove', function (e) {
        const rect = container.getBoundingClientRect();
        targetRotX = -((e.clientY - rect.top)  / H - 0.5) * 0.5;
        targetRotY =  ((e.clientX - rect.left) / W - 0.5) * 0.5;
    });

    // --- Animation loop ---
    let tick = 0;

    function animate() {

        requestAnimationFrame(animate);
        tick += 0.005;

        // Auto-rotation
        globe.rotation.y       +=  0.0045;
        globe.rotation.x       +=  0.0008;
        outerSphere.rotation.y -=  0.0022;
        outerSphere.rotation.x +=  0.0006;
        ring1.rotation.z       +=  0.0018;
        ring2.rotation.z       -=  0.0026;

        // Smooth mouse parallax
        globe.rotation.x += (targetRotX - globe.rotation.x) * 0.04;
        globe.rotation.y += (targetRotY - globe.rotation.y) * 0.04;

        // Subtle floating camera bob
        camera.position.y = Math.sin(tick * 0.8) * 0.06;

        renderer.render(scene, camera);
    }

    animate();

    // --- Handle resize ---
    window.addEventListener('resize', function () {
        W = container.offsetWidth;
        H = container.offsetHeight;
        if (W === 0 || H === 0) return;
        camera.aspect = W / H;
        camera.updateProjectionMatrix();
        renderer.setSize(W, H);
    });
}


// ======================================
// 7. HERO GLOBE IMAGE PARALLAX (legacy — kept from original)
// ======================================

const heroGlobe = document.querySelector('.hero-globe img');

if (heroGlobe) {
    document.addEventListener('mousemove', function (e) {
        const x = (e.clientX / window.innerWidth  - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;
        heroGlobe.style.transform = 'translate(' + x + 'px, ' + y + 'px)';
    });
}


// ======================================
// 8. INFO BOX FLOATING ANIMATION (preserved from original)
// ======================================

const infoCards = document.querySelectorAll('.info-box');

infoCards.forEach(function (card, index) {
    card.style.animation = 'floatCard 3s ease-in-out ' + (index * 0.4) + 's infinite';
});


// ======================================
// 9. MOUSE POSITION CSS VARIABLES (preserved from original)
// ======================================

document.addEventListener('mousemove', function (event) {
    document.body.style.setProperty('--mouse-x', event.clientX + 'px');
    document.body.style.setProperty('--mouse-y', event.clientY + 'px');
});


// ======================================
// 10. SMOOTH FADE-IN ON PAGE LOAD (preserved from original)
// ======================================

window.addEventListener('load', function () {
    document.body.style.opacity = '1';
});


// ======================================
// 11. CONSOLE BRANDING
// ======================================

console.log(
    '%c🧠 AI Salary Intelligence Platform v2.0',
    'color: #6366f1; font-size: 16px; font-weight: 800; font-family: Inter, sans-serif;'
);
console.log(
    '%c  Premium UI · Machine Learning · Real-time Predictions',
    'color: #06b6d4; font-size: 11px;'
);