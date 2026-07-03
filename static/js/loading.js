// ======================================
// AI Loading Screen — Professional Steps
// Handles progress fill & cycling status messages
// ======================================

document.addEventListener("DOMContentLoaded", function () {

    const form          = document.getElementById("predictionForm") || document.querySelector("form");
    const loadingScreen = document.getElementById("loading-screen");
    const loadingText   = document.getElementById("loading-text");
    const progressFill  = document.getElementById("progressFill");

    if (!form || !loadingScreen || !loadingText) return;

    // Professional stepped messages matching the spec
    const steps = [
        { msg: "⚙️ Preparing AI Model...",      pct: 15,  delay: 0    },
        { msg: "🔢 Processing Features...",       pct: 35,  delay: 700  },
        { msg: "🤖 Running Prediction Engine...", pct: 60,  delay: 1400 },
        { msg: "💡 Generating Insights...",       pct: 85,  delay: 2100 },
        { msg: "✅ Completed — Loading Report...", pct: 100, delay: 2800 },
    ];

    const TOTAL_DURATION = 3400;

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Show loading screen
        loadingScreen.style.display = "flex";

        // Reset progress
        if (progressFill) progressFill.style.width = "0%";

        // Disable submit button
        const submitBtn = document.getElementById("predictBtn");
        if (submitBtn) {
            submitBtn.classList.add("loading");
            submitBtn.disabled = true;
        }

        // Cycle through professional step messages
        steps.forEach(function (step) {
            setTimeout(function () {
                loadingText.textContent = step.msg;
                if (progressFill) {
                    progressFill.style.transition = "width 0.6s cubic-bezier(0.4, 0, 0.2, 1)";
                    progressFill.style.width = step.pct + "%";
                }
            }, step.delay);
        });

        // Submit form after animation
        setTimeout(function () {
            form.submit();
        }, TOTAL_DURATION);
    });

});