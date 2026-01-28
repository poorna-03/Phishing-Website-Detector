// ===============================
// Phishing Website Detector JS
// ===============================
<script src="script.js"></script>
function checkURL() {

    // Get elements
    const urlInput = document.getElementById("url");
    const resultBox = document.getElementById("resultBox");
    const resultText = document.getElementById("result");
    const confidenceText = document.getElementById("confidence");

    const url = urlInput.value.trim();

    // -------------------------
    // Validation
    // -------------------------
    if (url === "") {
        alert("Please enter a website URL!");
        return;
    }

    // -------------------------
    // Feature Extraction
    // -------------------------
    let score = 0;
    let totalChecks = 8;

    if (url.startsWith("http://")) score++;                 // No HTTPS
    if (url.length > 75) score++;                            // Long URL
    if (url.includes("@")) score++;                          // @ symbol
    if (url.includes("-")) score++;                          // Hyphen
    if ((url.match(/\./g) || []).length > 3) score++;       // Many dots
    if (url.includes("login") || url.includes("verify") || url.includes("bank")) score++;
    if (!url.includes("https://")) score++;                  // Missing HTTPS
    if (url.match(/[0-9]{4,}/)) score++;                     // Too many numbers

    // -------------------------
    // Confidence Calculation
    // -------------------------
    let riskPercent = Math.round((score / totalChecks) * 100);

    // -------------------------
    // Show Result
    // -------------------------
    resultBox.classList.remove("hidden");

    if (riskPercent >= 60) {
        resultText.innerHTML = "⚠️ Phishing Website Detected!";
        resultText.style.color = "#ff4d4d";
    } 
    else if (riskPercent >= 35) {
        resultText.innerHTML = "⚠️ Suspicious Website";
        resultText.style.color = "#ffa500";
    } 
    else {
        resultText.innerHTML = "✅ Website Looks Safe";
        resultText.style.color = "#2ecc71";
    }

    confidenceText.innerHTML = "Risk Score: " + riskPercent + "%";

}
