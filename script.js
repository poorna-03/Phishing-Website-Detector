function checkURL() {

    const urlInput = document.getElementById("url").value.trim();
    const url = urlInput.toLowerCase();

    const resultBox = document.getElementById("resultBox");
    const result = document.getElementById("result");
    const confidence = document.getElementById("confidence");

    // -------------------------
    // URL FORMAT VALIDATION
    // -------------------------
    const urlPattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

    if (!urlPattern.test(url)) {
        resultBox.classList.remove("hidden");
        result.innerHTML = "❌ Invalid URL Format";
        result.style.color = "red";
        confidence.innerHTML = "Please enter a valid website URL (include http:// or https://)";
        return;
    }

    let score = 0;
    let flags = [];

    // -------------------------
    // FEATURE CHECKS
    // -------------------------

    if (!url.startsWith("https://")) {
        score += 25;
        flags.push("No HTTPS");
    }

    if (url.includes("@")) {
        score += 30;
        flags.push("@ symbol detected");
    }

    if (url.match(/[0-9]{4,}/)) {
        score += 15;
        flags.push("Too many numbers");
    }

    if (url.length > 75) {
        score += 20;
        flags.push("Very long URL");
    }

    if (url.includes("-")) {
        score += 10;
        flags.push("Hyphen in domain");
    }

    if ((url.match(/\./g) || []).length > 4) {
        score += 15;
        flags.push("Multiple subdomains");
    }

    if (url.match(/login|verify|secure|update|account|bank|paypal|free|bonus/i)) {
        score += 25;
        flags.push("Sensitive keywords");
    }

    if (url.match(/bit\.ly|tinyurl|goo\.gl|t\.co/i)) {
        score += 30;
        flags.push("Shortened URL");
    }

    // -------------------------
    // CLASSIFICATION
    // -------------------------

    resultBox.classList.remove("hidden");

    if (score >= 70) {
        result.innerHTML = "🚨 Phishing Website Detected!";
        result.style.color = "red";
    }
    else if (score >= 40) {
        result.innerHTML = "⚠️ Suspicious Website";
        result.style.color = "orange";
    }
    else {
        result.innerHTML = "✅ Website Looks Safe";
        result.style.color = "green";
    }

    confidence.innerHTML =
        "Risk Score: " + score + "%<br>" +
        "Red Flags: " + (flags.length ? flags.join(", ") : "None");
}
