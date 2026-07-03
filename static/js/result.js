// ======================================================
// AI Salary Intelligence Platform
// Result Page JavaScript — v2.0
// Handles: Salary Counter, Salary Gauge, Chart.js Charts,
//          AI Dynamic Insights, Scroll Reveals, Confetti
// ======================================================

console.log("🧠 AI Salary Result Engine Loaded");

document.addEventListener("DOMContentLoaded", function () {

    // Retrieve prediction data from window object
    const data = window.PREDICTION_DATA || {
        prediction: 1200000,
        experience: 5,
        skills: 6,
        certifications: 1,
        confidence: 96,
        education: "Bachelor",
        industry: "Technology",
        location: "India",
        companySize: "Medium",
        remoteWork: "Yes",
        jobTitle: "Software Engineer"
    };

    // ======================================
    // 1. ANIMATED SALARY COUNTER (Preserved & Enhanced)
    // ======================================
    const salaryElement = document.getElementById("salaryCounter");
    if (salaryElement) {
        const target = Number(salaryElement.dataset.salary || data.prediction);
        let current = 0;
        const duration = 2000;
        const stepTime = 20;
        const increment = target / (duration / stepTime);

        const counter = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(counter);
            }
            // Format currency in Indian Rupees style (en-IN) as preserved
            salaryElement.innerHTML = "₹ " + Math.floor(current).toLocaleString("en-IN");
        }, stepTime);
    }

    // ======================================
    // 2. SALARY POSITION GAUGE (Step 15)
    // ======================================
    const gaugeCanvas = document.getElementById("salaryGauge");
    if (gaugeCanvas) {
        drawSalaryGauge(gaugeCanvas, data);
    }

    // ======================================
    // 3. INTERACTIVE CHARTS (Step 12)
    // ======================================
    initCharts(data);

    // ======================================
    // 4. AI DYNAMIC INSIGHTS (Step 14)
    // ======================================
    generateAIInsights(data);

    // ======================================
    // 5. CONFETTI BURST EFFECT
    // ======================================
    triggerConfetti();

    // ======================================
    // 6. AI REPORT GENERATION (Phase 3)
    // ======================================
    initReportGeneration(data);

    // ======================================
    // 7. MODEL EXPLAINABILITY (Phase 6)
    // ======================================
    if(data.explainability) {
        initExplainability(data.explainability);
    }

    // ======================================
    // 8. SALARY ANALYSIS SECTION
    // ======================================
    initSalaryAnalysis(data);

    // ======================================
    // 9. MODEL INFORMATION PANEL
    // ======================================
    initModelInfoPanel(data);

    // Auto-trigger PDF download if requested via query string (?download=true)
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('download') === 'true') {
        const btnDownload = document.getElementById("btnDownloadPdf");
        if (btnDownload) {
            setTimeout(() => {
                btnDownload.click();
            }, 1500); // Stagger to allow Chart.js and entry animations to draw fully
        }
    }

});

/**
 * Draws an elegant canvas semi-circular gauge
 */
function drawSalaryGauge(canvas, data) {
    const ctx = canvas.getContext("2d");
    const W = canvas.width;
    const H = canvas.height;

    // Determine position index on gauge (0.0 to 1.0)
    let ratio = 0.5; // Start at average
    if (data.experience > 7) ratio += 0.15;
    if (data.experience < 3) ratio -= 0.15;
    if (data.skills > 8) ratio += 0.1;
    if (data.skills < 4) ratio -= 0.1;
    if (data.certifications > 2) ratio += 0.1;
    if (data.education === "PhD") ratio += 0.1;
    if (data.education === "Master") ratio += 0.05;
    if (data.location === "USA" || data.location === "Germany") ratio += 0.1;

    // Keep ratio inside safe bounds
    ratio = Math.max(0.15, Math.min(0.85, ratio));

    // Animation variables
    let currentRatio = 0;
    const animationSpeed = 0.02;

    function render() {
        if (currentRatio < ratio) {
            currentRatio += animationSpeed;
            if (currentRatio > ratio) currentRatio = ratio;
        }

        ctx.clearRect(0, 0, W, H);

        const centerX = W / 2;
        const centerY = H - 20;
        const radius = 100;

        // Draw track arc (low to high background)
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI, 2 * Math.PI);
        ctx.lineWidth = 14;
        ctx.strokeStyle = "rgba(255, 255, 255, 0.05)";
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw active gradient arc
        const gradient = ctx.createLinearGradient(0, H, W, H);
        gradient.addColorStop(0, "#06b6d4"); // Cyan
        gradient.addColorStop(0.5, "#6366f1"); // Indigo
        gradient.addColorStop(1, "#8b5cf6"); // Purple

        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, Math.PI, Math.PI + (Math.PI * currentRatio));
        ctx.lineWidth = 14;
        ctx.strokeStyle = gradient;
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw center pivot core
        ctx.beginPath();
        ctx.arc(centerX, centerY, 8, 0, 2 * Math.PI);
        ctx.fillStyle = "#f8fafc";
        ctx.fill();

        // Draw needle pointer
        const needleAngle = Math.PI + (Math.PI * currentRatio);
        const needleLength = radius - 8;
        const targetX = centerX + needleLength * Math.cos(needleAngle);
        const targetY = centerY + needleLength * Math.sin(needleAngle);

        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(targetX, targetY);
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#f8fafc";
        ctx.lineCap = "round";
        ctx.stroke();

        if (currentRatio < ratio) {
            requestAnimationFrame(render);
        }
    }

    render();
}

/**
 * Initializes four custom Chart.js visualizations
 */
function initCharts(data) {
    const baseVal = data.prediction;

    // Common Chart.js font setting
    const chartFont = {
        family: "'Inter', sans-serif",
        size: 11
    };

    // Chart 1: Salary Comparison
    const ctxComp = document.getElementById("salaryComparisonChart");
    if (ctxComp) {
        new Chart(ctxComp, {
            type: 'bar',
            data: {
                labels: ['Your Offer', 'Industry Avg', 'Top 10% Avg'],
                datasets: [{
                    label: 'Salary (₹)',
                    data: [baseVal, baseVal * 0.85, baseVal * 1.3],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.85)', // Indigo
                        'rgba(255, 255, 255, 0.1)',  // Dim Gray
                        'rgba(6, 182, 212, 0.85)'   // Cyan
                    ],
                    borderColor: [
                        '#6366f1',
                        'rgba(255, 255, 255, 0.2)',
                        '#06b6d4'
                    ],
                    borderWidth: 1.5,
                    borderRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: chartFont } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: chartFont } }
                }
            }
        });
    }

    // Chart 2: Experience Impact
    const ctxExp = document.getElementById("experienceChart");
    if (ctxExp) {
        const expLabel = [];
        const expValues = [];
        const currentExp = Math.max(0, Math.floor(data.experience));

        for (let i = -2; i <= 4; i++) {
            const year = currentExp + i;
            if (year >= 0) {
                expLabel.push(year + ' yrs');
                // Standard salary curve projection based on years of experience
                const projectedVal = baseVal * (1 + (i * 0.08));
                expValues.push(projectedVal);
            }
        }

        new Chart(ctxExp, {
            type: 'line',
            data: {
                labels: expLabel,
                datasets: [{
                    label: 'Projected Trend',
                    data: expValues,
                    borderColor: '#6366f1',
                    backgroundColor: 'rgba(99, 102, 241, 0.08)',
                    fill: true,
                    tension: 0.4,
                    pointBackgroundColor: '#06b6d4',
                    pointBorderColor: '#fff',
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    y: { grid: { color: 'rgba(255, 255, 255, 0.05)' }, ticks: { color: '#94a3b8', font: chartFont } },
                    x: { grid: { display: false }, ticks: { color: '#94a3b8', font: chartFont } }
                }
            }
        });
    }

    // Chart 3: Skills Analysis
    const ctxSkills = document.getElementById("skillsChart");
    if (ctxSkills) {
        new Chart(ctxSkills, {
            type: 'radar',
            data: {
                labels: ['Core Technical', 'Soft Skills', 'Domain Expertise', 'Certifications', 'Leadership', 'System Design'],
                datasets: [{
                    label: 'Your Strength Profile',
                    data: [
                        Math.min(100, 60 + data.skills * 4),
                        75,
                        70,
                        Math.min(100, 30 + data.certifications * 20),
                        Math.min(100, 40 + data.experience * 5),
                        65
                    ],
                    backgroundColor: 'rgba(99, 102, 241, 0.2)',
                    borderColor: '#6366f1',
                    pointBackgroundColor: '#06b6d4',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: false } },
                scales: {
                    r: {
                        angleLines: { color: 'rgba(255, 255, 255, 0.08)' },
                        grid: { color: 'rgba(255, 255, 255, 0.08)' },
                        pointLabels: { color: '#94a3b8', font: chartFont },
                        ticks: { display: false }
                    }
                }
            }
        });
    }

    // Chart 4: Industry Insights
    const ctxInd = document.getElementById("industryChart");
    if (ctxInd) {
        new Chart(ctxInd, {
            type: 'doughnut',
            data: {
                labels: ['Base Pay', 'Performance Bonus', 'Stock Options / Equity', 'Benefits'],
                datasets: [{
                    data: [75, 12, 8, 5],
                    backgroundColor: [
                        'rgba(99, 102, 241, 0.85)', // Base Indigo
                        'rgba(6, 182, 212, 0.85)',   // Cyan
                        'rgba(139, 92, 246, 0.85)',  // Accent Purple
                        'rgba(255, 255, 255, 0.1)'   // Dim Gray
                    ],
                    borderColor: 'rgba(3, 7, 18, 0.9)',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { color: '#94a3b8', font: chartFont, boxWidth: 10 }
                    }
                }
            }
        });
    }
}

/**
 * Creates dynamic insights cards in the UI
 */
function generateAIInsights(data) {
    const grid = document.getElementById("insightsGrid");
    if (!grid) return;

    const insights = [];

    // Experience insight
    if (data.experience < 3) {
        insights.push({
            icon: "📈",
            title: "Early Career Phase",
            desc: "Your salary is aligned with entry-level benchmarks. Expect high growth in market value once you pass the 3-year threshold."
        });
    } else if (data.experience > 8) {
        insights.push({
            icon: "👑",
            title: "Senior Leadership Premium",
            desc: "Your extensive experience commands a high market premium. Focus on strategic influence and team scaling opportunities."
        });
    } else {
        insights.push({
            icon: "🚀",
            title: "Strong Mid-Career Velocity",
            desc: "You are in the sweet spot for salary growth. Demanding high-responsibility roles will maximize your returns."
        });
    }

    // Skills insight
    if (data.skills > 8) {
        insights.push({
            icon: "⚡",
            title: "High Skill Diversity Advantage",
            desc: "Having over 8 skills places you in the top 15% of applicants, significantly lowering the risk of salary stagnation."
        });
    } else {
        insights.push({
            icon: "🛠️",
            title: "Upskilling Opportunity",
            desc: "Expanding your technical stack by adding 3 more core competencies could elevate your market potential by 15%."
        });
    }

    // Certifications insight
    if (data.certifications > 0) {
        insights.push({
            icon: "🏅",
            title: "Credentials Validation",
            desc: "Your active certifications serve as a strong filter for screening tools, helping you command above-average salaries."
        });
    } else {
        insights.push({
            icon: "📖",
            title: "Professional Certification Recommendation",
            desc: "Acquiring a certified industry credential (like AWS, PMP, or Scikit-learn developer) boosts resume scores by up to 20%."
        });
    }

    // Location/Remote work insight
    if (data.remoteWork === "Yes") {
        insights.push({
            icon: "🏡",
            title: "Remote Work Flex Savings",
            desc: "Remote jobs offer substantial secondary value (up to ₹2,50,000/year saved on commutes and relocations)."
        });
    } else {
        insights.push({
            icon: "🏢",
            title: "In-Office Premium Value",
            desc: "On-site and hybrid roles currently capture a slightly higher average starting package compared to full remote."
        });
    }

    // Render cards to the DOM
    grid.innerHTML = insights.map(function (ins) {
        return `
            <div class="insight-card">
                <div class="insight-icon">${ins.icon}</div>
                <div class="insight-content">
                    <h4>${ins.title}</h4>
                    <p>${ins.desc}</p>
                </div>
            </div>
        `;
    }).join('');
}

/**
 * Triggers a simple particles/confetti burst on successfully landing on the result page
 */
function triggerConfetti() {
    // Create floating spark particles at the top header
    const header = document.querySelector(".result-header");
    if (!header) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement("div");
        particle.style.position = "absolute";
        particle.style.width = Math.random() * 6 + 3 + "px";
        particle.style.height = particle.style.width;
        particle.style.background = Math.random() > 0.5 ? "#6366f1" : "#06b6d4";
        particle.style.borderRadius = "50%";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = Math.random() * 50 + "px";
        particle.style.opacity = Math.random() * 0.7 + 0.3;
        particle.style.transform = `scale(${Math.random()})`;
        particle.style.pointerEvents = "none";
        particle.style.transition = "all 1.5s cubic-bezier(0.1, 0.8, 0.3, 1)";

        header.appendChild(particle);

        setTimeout(function () {
            particle.style.transform = `translate(${(Math.random() - 0.5) * 150}px, ${Math.random() * 100 + 40}px) scale(0)`;
            particle.style.opacity = "0";
        }, 50);

        setTimeout(function () {
            particle.remove();
        }, 1600);
    }
}

// ======================================
// 6. AI REPORT GENERATION MODULE
// ======================================
function initReportGeneration(data) {
    // Generate/use real Report ID from server data
    const reportId = data.reportId || ("AI-" + Date.now().toString().slice(-6));
    const idEls = document.querySelectorAll(".pdf-report-id");
    idEls.forEach(el => el.innerText = reportId);

    // Wire real AI model name to the dashboard card
    const dashModelEl = document.getElementById("dashModelName");
    if (dashModelEl && data.explainability && data.explainability.model_name) {
        const rawName = data.explainability.model_name;
        // Humanize model class name (e.g. "Ridge" -> "Ridge Regression")
        const displayName = rawName.includes("Regression") ? rawName : rawName + " Regression";
        dashModelEl.textContent = displayName;
    }

    // --- Wire REAL AI Summary from model (not static fallback) ---
    const summaryInsightEl = document.getElementById("summaryInsightText");
    if (summaryInsightEl) {
        // Use real AI summary generated by predict.py from actual feature contributions
        const realSummary = data.explainability && data.explainability.ai_summary
            ? data.explainability.ai_summary
            : (data.experience > 5
                ? "Your experience commands a premium in the current market."
                : "Focus on building core competencies to accelerate salary growth.");
        summaryInsightEl.textContent = realSummary;
    }

    // Recommendation — contextual, derived from real data
    const summaryRecEl = document.getElementById("summaryRecommendationText");
    if (summaryRecEl) {
        const topPos = data.explainability && data.explainability.top_positive
            ? data.explainability.top_positive
            : [];
        const topNeg = data.explainability && data.explainability.top_negative
            ? data.explainability.top_negative
            : [];
        let rec = "";
        if (topPos.length > 0) {
            rec += `Your strongest asset is ${topPos[0]}`;
            if (topPos.length > 1) rec += ` followed by ${topPos[1]}`;
            rec += ". ";
        }
        if (topNeg.length > 0) {
            rec += `To maximise earning potential, focus on improving your ${topNeg[0].toLowerCase()}.`;
        } else {
            rec += "Continue leveraging your skill set and consider upskilling in emerging technologies.";
        }
        summaryRecEl.textContent = rec || "Continue leveraging your skill set to negotiate better equity and bonuses.";
    }

    // Populate Page 2 Insights & Summary (PDF page)
    const pdfInsightsText = document.getElementById("pdfInsightsText");
    if(pdfInsightsText) {
        const aiSummary = data.explainability && data.explainability.ai_summary
            ? data.explainability.ai_summary
            : `Based on our AI model analysis, your profile shows a ${data.confidence}% probability of securing the predicted salary.`;
        pdfInsightsText.innerHTML = `
            <p>${aiSummary}</p>
            <ul>
                <li><strong>Experience Factor:</strong> Your ${data.experience} years of experience is a primary driver for this prediction.</li>
                <li><strong>Skills Advantage:</strong> Possessing ${data.skills} core skills places you competitively within the ${data.industry} sector.</li>
                <li><strong>Education &amp; Location:</strong> A ${data.education} degree combined with your location (${data.location}) adjusts the baseline prediction.</li>
            </ul>
            <p><strong>Overall Interpretation:</strong> The model indicates a stable market demand for your profile. Continued upskilling and strategic role positioning could further enhance your earning potential.</p>
        `;
    }

    // Populate Page 3 Model Explainability text
    const pdfExplainabilityText = document.getElementById("pdfExplainabilityText");
    if(pdfExplainabilityText && data.explainability) {
        pdfExplainabilityText.innerText = data.explainability.ai_summary || "Feature contributions have been calculated using linear SHAP-equivalent decomposition.";
    }

    // Populate Page 3 Feature Contribution Table
    const tableBody = document.getElementById("pdfFeatureContributionTableBody");
    if(tableBody && data.explainability && data.explainability.feature_contributions) {
        const contribs = data.explainability.feature_contributions;
        let rowsHtml = '';
        
        // Sort contributions by absolute value descending
        const sortedContribs = Object.keys(contribs)
            .map(key => ({ feature: key, value: contribs[key] }))
            .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
            
        sortedContribs.forEach(item => {
            let featName = item.feature;
            // Clean up feature names for professional display
            featName = featName
                .replace(/_/g, ' ')
                .replace(/\b\w/g, c => c.toUpperCase());
                
            let valStr = "—";
            // Match values from current profile
            if(item.feature === "experience_years") valStr = data.experience + " Years";
            else if(item.feature === "skills_count") valStr = data.skills + " Skills";
            else if(item.feature === "certifications") valStr = data.certifications;
            else if(item.feature === "education_level") valStr = data.education;
            else if(item.feature === "industry") valStr = data.industry;
            else if(item.feature === "location") valStr = data.location;
            else if(item.feature === "company_size") valStr = data.companySize;
            else if(item.feature === "remote_work") valStr = data.remoteWork;
            else if(item.feature === "job_title") valStr = data.jobTitle;
            else if(item.feature === "Intercept" || item.feature === "base_value") {
                featName = "Model Baseline (Intercept)";
                valStr = "N/A";
            }
            
            const formattedVal = Math.round(item.value);
            const formattedValStr = (formattedVal >= 0 ? "+ ₹ " : "- ₹ ") + Math.abs(formattedVal).toLocaleString("en-IN");
            const directionText = formattedVal >= 0 ? "🟢 Positive" : "🔴 Negative";
            const directionStyle = formattedVal >= 0 ? "color: #10b981; font-weight: 600;" : "color: #ef4444; font-weight: 600;";
            
            rowsHtml += `
                <tr>
                    <td><strong>${featName}</strong></td>
                    <td>${valStr}</td>
                    <td style="font-weight: 600; text-align: right;">${formattedValStr}</td>
                    <td style="${directionStyle}">${directionText}</td>
                </tr>
            `;
        });
        
        tableBody.innerHTML = rowsHtml;
    }

    // Populate Page 5 Recommendations Lists
    const pdfStrengthsList = document.getElementById("pdfStrengthsList");
    const pdfWeaknessesList = document.getElementById("pdfWeaknessesList");
    const pdfNextActionsList = document.getElementById("pdfNextActionsList");
    
    if(pdfStrengthsList) {
        const strengths = [];
        if (data.experience >= 5) strengths.push(`Strong experience (${data.experience} yrs) well-aligned with industry demands.`);
        strengths.push(`Solid educational foundation (${data.education}) serving as resume filter.`);
        if (data.certifications > 0) strengths.push(`Verified professional credentials (${data.certifications} certification${data.certifications > 1 ? 's' : ''}) validating capability.`);
        if (data.skills >= 6) strengths.push(`Diverse technical skill set (${data.skills} skills) placing you above average.`);
        pdfStrengthsList.innerHTML = strengths.map(s => `<li>${s}</li>`).join('');
    }
    if(pdfWeaknessesList) {
        const weaknesses = [];
        if (data.skills < 5) weaknesses.push('Relatively limited number of technical skills listed — expanding this improves profile competitiveness.');
        if (data.certifications === 0) weaknesses.push('No professional certifications — acquiring one industry credential can boost resume score significantly.');
        if (data.remoteWork === 'No') weaknesses.push('Limited flexibility may restrict access to global remote-first opportunities.');
        if (!weaknesses.length) weaknesses.push('Profile is well-balanced. Saturation in standard tech stacks may require specialization to stand out.');
        pdfWeaknessesList.innerHTML = weaknesses.map(w => `<li>${w}</li>`).join('');
    }
    if(pdfNextActionsList) {
        const actions = [
            `Negotiate based on the predicted salary of ₹ ${data.prediction.toLocaleString("en-IN")} as your baseline.`,
            `Invest in emerging technologies to future-proof your profile in the ${data.industry} sector.`,
            `Expand professional network within the ${data.industry} industry to access unadvertised opportunities.`
        ];
        if (data.certifications === 0) actions.push('Pursue at least one professional certification (e.g. AWS, PMP, TensorFlow Developer) in the next 6 months.');
        pdfNextActionsList.innerHTML = actions.map(a => `<li>${a}</li>`).join('');
    }

    // Notification Helper
    function showNotification(msg, type="success") {
        const container = document.getElementById("notificationContainer");
        if(!container) return;
        const notif = document.createElement("div");
        notif.className = "notification " + type;
        notif.innerHTML = type === "success" ? `✅ ${msg}` : `❌ ${msg}`;
        container.appendChild(notif);
        setTimeout(() => {
            notif.style.animation = "fadeOut 0.3s ease forwards";
            setTimeout(() => notif.remove(), 300);
        }, 3000);
    }

    // Loading overlay helper
    function showLoading(show, text="Generating AI Report...") {
        const overlay = document.getElementById("loadingOverlay");
        const textEl = document.getElementById("loadingText");
        if(overlay) {
            if(textEl) textEl.innerText = text;
            if(show) overlay.classList.add("active");
            else overlay.classList.remove("active");
        }
    }

    // Helper: Convert canvas to high-quality white-background image URL
    function canvasToImage(canvasId) {
        return new Promise((resolve) => {
            const canvas = document.getElementById(canvasId);
            if(!canvas) {
                resolve(null);
                return;
            }
            try {
                const tempCanvas = document.createElement("canvas");
                tempCanvas.width = canvas.width;
                tempCanvas.height = canvas.height;
                const ctx = tempCanvas.getContext("2d");
                
                // White background to match the PDF design
                ctx.fillStyle = "#ffffff";
                ctx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
                ctx.drawImage(canvas, 0, 0);
                
                resolve(tempCanvas.toDataURL("image/jpeg", 1.0));
            } catch(e) {
                console.error("Error converting canvas " + canvasId, e);
                resolve(null);
            }
        });
    }

    // Map all charts/gauges into image tags
    async function preparePdfContent() {
        showLoading(true, "Rendering Charts...");
        
        const chartMappings = [
            { canvasId: "explainabilityChart", imgId: "pdfExplainabilityChartImg", name: "Explainability Detail" },
            { canvasId: "salaryGauge", imgId: "pdfChartGaugeImg", name: "Confidence Gauge" },
            { canvasId: "skillsChart", imgId: "pdfChartSkillsImg", name: "Strength Profile" },
            { canvasId: "salaryComparisonChart", imgId: "pdfChartComparisonImg", name: "Salary Comparison" },
            { canvasId: "industryChart", imgId: "pdfChartIndustryImg", name: "Compensation Breakdown" }
        ];
        
        for(let mapping of chartMappings) {
            const img = document.getElementById(mapping.imgId);
            if(img) {
                const dataUrl = await canvasToImage(mapping.canvasId);
                if(dataUrl) {
                    img.src = dataUrl;
                    img.style.display = "block";
                } else {
                    img.src = "";
                    img.alt = `${mapping.name} unavailable`;
                    // Replace container content with an unavailable block
                    const parent = img.parentNode;
                    if(parent) {
                        parent.innerHTML = `<div style="padding: 20px; color: #ef4444; border: 1px dashed #e2e8f0; font-size:12px; border-radius:6px; background:#fff5f5;">📊 ${mapping.name} Unavailable</div>`;
                    }
                }
            }
        }
        
        // Return pages list
        return document.querySelectorAll(".pdf-page");
    }

    // Helper sleep
    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Download PDF compiled page-by-page
    const btnDownloadPdf = document.getElementById("btnDownloadPdf");
    if(btnDownloadPdf) {
        btnDownloadPdf.addEventListener("click", async () => {
            showLoading(true, "Preparing Report...");
            await sleep(600);
            try {
                // Renders charts internally, showing "Rendering Charts..." status
                const pages = await preparePdfContent();
                await sleep(500);

                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                
                for(let i = 0; i < pages.length; i++) {
                    showLoading(true, `Generating PDF... (Page ${i+1} of ${pages.length})`);
                    
                    // Render page element to canvas
                    const canvas = await html2canvas(pages[i], {
                        scale: 2.2, // optimized scale for visual balance and faster compile
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    });
                    
                    const imgData = canvas.toDataURL("image/jpeg", 0.95);
                    
                    if(i > 0) {
                        pdf.addPage();
                    }
                    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                }
                
                showLoading(true, "Download Ready");
                await sleep(800);

                pdf.save(`AI_Salary_Report_${reportId}.pdf`);
                
                // Polish: Make button pulse green as Download Ready status indicator
                btnDownloadPdf.classList.add("download-ready");
                btnDownloadPdf.innerHTML = "✅ Report Downloaded Successfully";
                
                showNotification("Report downloaded successfully!", "success");
            } catch(e) {
                console.error("PDF generation failed:", e);
                showNotification("Failed to generate PDF report", "error");
            } finally {
                showLoading(false);
            }
        });
    }

    // Preview Report inside Modal page-by-page
    const btnPreviewReport = document.getElementById("btnPreviewReport");
    const previewModal = document.getElementById("previewModal");
    const closePreviewBtn = document.getElementById("closePreviewBtn");
    const previewContainer = document.getElementById("previewContainer");
    
    if(btnPreviewReport && previewModal) {
        btnPreviewReport.addEventListener("click", async () => {
            showLoading(true, "Generating Preview...");
            try {
                const pages = await preparePdfContent();
                if(previewContainer) {
                    previewContainer.innerHTML = '';
                    
                    // Render and append each page canvas for pixel-perfect preview
                    for(let i = 0; i < pages.length; i++) {
                        const canvas = await html2canvas(pages[i], {
                            scale: 1.5, // Faster scale for modal preview
                            useCORS: true,
                            logging: false,
                            backgroundColor: '#ffffff'
                        });
                        canvas.style.width = "100%";
                        canvas.style.maxWidth = "700px";
                        canvas.style.marginBottom = "25px";
                        canvas.style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.15)";
                        canvas.style.borderRadius = "4px";
                        previewContainer.appendChild(canvas);
                    }
                }
                previewModal.classList.add("active");
            } catch(e) {
                console.error("Preview generation failed:", e);
                showNotification("Failed to generate preview", "error");
            } finally {
                showLoading(false);
            }
        });
        
        if(closePreviewBtn) {
            closePreviewBtn.addEventListener("click", () => {
                previewModal.classList.remove("active");
                if(previewContainer) previewContainer.innerHTML = '';
            });
        }
    }

    // Print compiled PDF
    const btnPrint = document.getElementById("btnPrint");
    if(btnPrint) {
        btnPrint.addEventListener("click", async () => {
            showLoading(true, "Preparing Print...");
            try {
                const pages = await preparePdfContent();
                const { jsPDF } = window.jspdf;
                const pdf = new jsPDF({
                    orientation: 'portrait',
                    unit: 'mm',
                    format: 'a4'
                });
                
                for(let i = 0; i < pages.length; i++) {
                    const canvas = await html2canvas(pages[i], {
                        scale: 2.0,
                        useCORS: true,
                        logging: false,
                        backgroundColor: '#ffffff'
                    });
                    const imgData = canvas.toDataURL("image/jpeg", 0.95);
                    if(i > 0) pdf.addPage();
                    pdf.addImage(imgData, 'JPEG', 0, 0, 210, 297);
                }
                
                const blobUrl = pdf.output('bloburl');
                showLoading(false);
                window.open(blobUrl, '_blank');
            } catch(e) {
                console.error("Print prep failed:", e);
                showNotification("Failed to prepare print document", "error");
                showLoading(false);
            }
        });
    }

    // Share
    const btnShare = document.getElementById("btnShare");
    if(btnShare) {
        btnShare.addEventListener("click", () => {
            if (navigator.share) {
                navigator.share({
                    title: 'AI Salary Intelligence Report',
                    text: `My AI predicted salary is ₹${data.prediction.toLocaleString("en-IN")} with ${data.confidence}% confidence.`,
                    url: window.location.href,
                }).then(() => showNotification("Shared successfully!"))
                  .catch((error) => console.log('Error sharing', error));
            } else {
                showNotification("Web Share not supported on this browser", "error");
            }
        });
    }

    // Export summary card as PNG
    const btnExportPng = document.getElementById("btnExportPng");
    if(btnExportPng) {
        btnExportPng.addEventListener("click", () => {
            showLoading(true, "Capturing PNG...");
            const card = document.querySelector(".report-summary-card");
            if(!card) { showLoading(false); return; }
            
            html2canvas(card, { backgroundColor: "#030712", scale: 2 }).then(canvas => {
                const link = document.createElement("a");
                link.download = `AI_Summary_${reportId}.png`;
                link.href = canvas.toDataURL("image/png");
                link.click();
                showLoading(false);
                showNotification("PNG Exported!");
            }).catch(e => {
                console.error(e);
                showLoading(false);
                showNotification("Failed to export PNG", "error");
            });
        });
    }

    // Export JSON data
    const btnExportJson = document.getElementById("btnExportJson");
    if(btnExportJson) {
        btnExportJson.addEventListener("click", () => {
            const jsonStr = JSON.stringify({
                reportId: reportId,
                timestamp: new Date().toISOString(),
                predictionData: data
            }, null, 2);
            
            const blob = new Blob([jsonStr], { type: "application/json" });
            const url = URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = `AI_Report_${reportId}.json`;
            link.click();
            URL.revokeObjectURL(url);
            showNotification("JSON Exported!");
        });
    }

    // Copy Summary Text to clipboard
    const btnCopySummary = document.getElementById("btnCopySummary");
    if(btnCopySummary) {
        btnCopySummary.addEventListener("click", () => {
            const text = `🧠 AI Salary Intelligence Report\n\nPrediction: ₹${data.prediction.toLocaleString("en-IN")}\nConfidence: ${data.confidence}%\nModel: Ridge Regression\n\nInsight: ${document.getElementById("summaryInsightText")?.innerText}\n\nGenerated by AI Data Intelligence Platform.`;
            navigator.clipboard.writeText(text).then(() => {
                showNotification("Summary copied to clipboard!");
            }).catch(err => {
                console.error(err);
                showNotification("Failed to copy", "error");
            });
        });
    }

    // Download active gauge chart
    const btnDownloadCharts = document.getElementById("btnDownloadCharts");
    if(btnDownloadCharts) {
        btnDownloadCharts.addEventListener("click", async () => {
            const chartCanvas = document.getElementById("salaryGauge");
            if(chartCanvas) {
                const dataUrl = await canvasToImage("salaryGauge");
                if(dataUrl) {
                    const link = document.createElement("a");
                    link.download = `AI_Gauge_${reportId}.jpg`;
                    link.href = dataUrl;
                    link.click();
                    showNotification("Chart downloaded!");
                } else {
                    showNotification("Failed to export chart", "error");
                }
            }
        });
    }
}

// ======================================
// 7. MODEL EXPLAINABILITY MODULE
// ======================================
function initExplainability(explainData) {
    if(!explainData || !explainData.feature_contributions) return;
    
    // Set text descriptions
    const explText = document.getElementById("aiExplanationText");
    if(explText) explText.innerText = explainData.ai_summary;
    
    // Set Panel Stats
    const tModel = document.getElementById("tModelName");
    const tBase = document.getElementById("tBaseValue");
    if(tModel) tModel.innerText = explainData.model_name || "Ridge Regression";
    if(tBase) tBase.innerText = "₹ " + (explainData.base_value ? explainData.base_value.toLocaleString("en-IN") : "0");
    
    // Prepare Chart Data
    const contribs = explainData.feature_contributions;
    
    // Convert object to array and sort by absolute contribution
    const sortedFeatures = Object.keys(contribs)
        .map(key => ({ feature: key, value: contribs[key] }))
        .filter(item => Math.abs(item.value) > 100) // filter out very tiny contributions
        .sort((a, b) => Math.abs(b.value) - Math.abs(a.value));
        
    const labels = sortedFeatures.map(item => item.feature);
    const dataValues = sortedFeatures.map(item => item.value);
    
    const colors = dataValues.map(v => v >= 0 ? "rgba(16, 185, 129, 0.8)" : "rgba(239, 68, 68, 0.8)");
    const borderColors = dataValues.map(v => v >= 0 ? "rgba(16, 185, 129, 1)" : "rgba(239, 68, 68, 1)");

    const ctx = document.getElementById("explainabilityChart");
    if(!ctx) return;
    
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Feature Contribution (₹)",
                data: dataValues,
                backgroundColor: colors,
                borderColor: borderColors,
                borderWidth: 1,
                borderRadius: 4
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    backgroundColor: "rgba(3, 7, 18, 0.9)",
                    titleColor: "#a5b4fc",
                    bodyColor: "#ffffff",
                    borderColor: "rgba(99, 102, 241, 0.3)",
                    borderWidth: 1,
                    padding: 12,
                    callbacks: {
                        label: function(context) {
                            let val = context.raw;
                            let prefix = val >= 0 ? "+ ₹" : "- ₹";
                            return prefix + Math.abs(val).toLocaleString("en-IN");
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: { color: "rgba(255, 255, 255, 0.05)" },
                    ticks: {
                        color: "rgba(255, 255, 255, 0.6)",
                        callback: function(val) {
                            return (val < 0 ? "-" : "") + "₹" + Math.abs(val)/1000 + "k";
                        }
                    }
                },
                y: {
                    grid: { display: false },
                    ticks: { color: "rgba(255, 255, 255, 0.8)", font: { size: 13 } }
                }
            }
        }
    });
}

// ======================================================
// SALARY ANALYSIS SECTION
// Wires salary meter and stat badges using salaryStats data
// ======================================================
function initSalaryAnalysis(data) {
    const ss = data.salaryStats || {};
    const pred = data.prediction;

    // --- Salary Meter ---
    const needle    = document.getElementById('salaryMeterNeedle');
    const lowLabel  = document.getElementById('meterLowVal');
    const midLabel  = document.getElementById('meterMidVal');
    const highLabel = document.getElementById('meterHighVal');

    const fmt = (v) => v != null ? '₹' + Math.round(v).toLocaleString('en-IN') : 'N/A';

    if (lowLabel)  lowLabel.textContent  = fmt(ss.salary_low);
    if (midLabel)  midLabel.textContent  = fmt(ss.salary_mid);
    if (highLabel) highLabel.textContent = fmt(ss.salary_high);

    // Position needle (0% = left edge = low, 100% = right edge = high)
    if (needle && ss.salary_low != null && ss.salary_high != null) {
        const low  = ss.salary_low;
        const high = ss.salary_high;
        let pct = ((pred - low) / (high - low)) * 100;
        pct = Math.max(2, Math.min(97, pct));
        setTimeout(() => {
            needle.style.transition = 'left 1.2s cubic-bezier(0.4,0,0.2,1)';
            needle.style.left = pct + '%';
        }, 600);
    }

    // --- Industry Average Badge ---
    const indAvgEl = document.getElementById('badgeIndustryAvgVal');
    if (indAvgEl) {
        indAvgEl.textContent = ss.industry_avg != null ? fmt(ss.industry_avg) : 'Unavailable';
        indAvgEl.style.color = ss.industry_avg != null ? '' : 'rgba(255,255,255,0.4)';
    }

    // --- Salary Difference Badge ---
    const diffEl = document.getElementById('badgeDiffVal');
    if (diffEl) {
        if (ss.salary_diff != null) {
            const isPos = ss.salary_diff >= 0;
            diffEl.textContent = (isPos ? '+' : '') + fmt(ss.salary_diff) + ' (' + (isPos ? '+' : '') + ss.salary_diff_pct + '%)';
            diffEl.style.color = isPos ? '#22c55e' : '#f97316';
        } else {
            diffEl.textContent = 'Unavailable';
            diffEl.style.color = 'rgba(255,255,255,0.4)';
        }
    }

    // --- Percentile Badge ---
    const pctEl = document.getElementById('badgePercentileVal');
    if (pctEl) {
        if (ss.percentile != null) {
            const ordinal = (n) => {
                const s = ["th","st","nd","rd"], v = n % 100;
                return n + (s[(v-20)%10] || s[v] || s[0]);
            };
            pctEl.textContent = ordinal(ss.percentile) + ' Percentile';
            pctEl.style.color = ss.percentile >= 75 ? '#22c55e' : ss.percentile >= 40 ? '#f59e0b' : '#f97316';
        } else {
            pctEl.textContent = 'Unavailable';
            pctEl.style.color = 'rgba(255,255,255,0.4)';
        }
    }
}

// ======================================================
// MODEL INFORMATION PANEL
// Populates all model metric fields from modelMetrics data
// ======================================================
function initModelInfoPanel(data) {
    const m  = data.modelMetrics || {};
    const et = data.executionTime;

    const set = (id, val) => {
        const el = document.getElementById(id);
        if (el && val != null) el.textContent = val;
    };

    set('miAlgorithm',    m.algorithm ? m.algorithm + ' (L2 Regularized)' : '—');
    set('miDataset',      m.dataset_name || '—');
    set('miTrainSamples', m.training_samples ? m.training_samples.toLocaleString() + ' records' : '—');
    set('miFeatures',     m.num_features ? m.num_features + ' engineered features' : '—');
    set('miR2',           m.r2_score != null ? m.r2_score + ' (' + (m.r2_score * 100).toFixed(1) + '% variance explained)' : '—');
    set('miMae',          m.mae != null ? '₹' + m.mae.toLocaleString() : '—');
    set('miRmse',         m.rmse != null ? '₹' + m.rmse.toLocaleString() : '—');
    set('miVersion',      m.model_version || '—');
    set('miPredTime',     et != null ? et + 's' : '—');
}