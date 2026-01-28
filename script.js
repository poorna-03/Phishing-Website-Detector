// ====================================
// Advanced Phishing Website Detector
// ====================================

function checkURL() {

    const url = document.getElementById("url").value.trim();
    const resultBox = document.getElementById("resultBox");
    const result = document.getElementById("result");
    const confidence = document.getElementById("confidence");

    if (url === "") {
        alert("Please enter a URL!");
        return;
    }

    let score = 0;
    let reasons = [];

    // -----------------------
    // Feature Checks
    // -----------------------

    if (!url.startsWith("https://")) {
        score += 20;
        reasons.push("No HTTPS");
    }

    if (url.length > 70) {
        score += 15;
        reasons.push("Very long URL");
    }

    if (url.includes("@")) {
        score += 20;
        reasons.push("Contains @ symbol");
    }

    if (url.includes("-")) {
        score += 10;
        reasons.push("Contains hyphen");
    }

    if ((url.match(/\./g) || []).length > 4) {
        score += 15;
        reasons.push("Too many dots");
    }

    if (url.match(/[0-9]{4,}/)) {
        score += 10;
        reasons.push("Many numbers");
    }

    if (url.match(/login|verify|secure|bank|update/i)) {
        score += 15;
        reasons.push("Sensitive keywords");
    }

    if (url.match(/bit\.ly|tinyurl|goo\.gl/i)) {
        score += 20;
        reasons.push("Shortened URL");
    }

    // -----------------------
    // Classification
    // -----------------------

    resultBox.classList.remove("hidden");

    if (score >= 60) {
        result.innerHTML = "🚨 Phishing Website Detected!";
        result.style.color = "red";
    }
    else if (score >= 35) {
        result.innerHTML = "⚠️ Suspicious Website";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "✅ Website Looks Safe";
        result.style.color = "green";
    }

    confidence.innerHTML =
        "Risk Score: " + score + "%<br>" +
        "Red Flags: " + (reasons.length ? reasons.join(", ") : "None");

}
