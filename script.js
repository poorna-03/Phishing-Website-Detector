function checkURL() {

    const urlInput = document.getElementById("url").value.trim();

    const resultBox = document.getElementById("resultBox");
    const result = document.getElementById("result");
    const confidence = document.getElementById("confidence");

    // ---------- FORMAT VALIDATION ----------
    const pattern = /^(https?:\/\/)[^\s/$.?#].[^\s]*$/i;

    if (!pattern.test(urlInput)) {
        resultBox.classList.remove("hidden");
        result.innerHTML = "❌ Invalid URL Format";
        result.style.color = "red";
        confidence.innerHTML = "Enter URL with http:// or https://";
        return;
    }

    let url = urlInput.toLowerCase();
    let score = 0;
    let flags = [];

    // ---------- CHECKS ----------
    if (!url.startsWith("https://")) {
        score += 30;
        flags.push("No HTTPS");
    }

    if (url.includes("@")) {
        score += 30;
        flags.push("@ symbol");
    }

    if (url.match(/[0-9]{4,}/)) {
        score += 15;
        flags.push("Many numbers");
    }

    if (url.length > 70) {
        score += 20;
        flags.push("Long URL");
    }

    if (url.includes("-")) {
        score += 10;
        flags.push("Hyphen");
    }

    if (url.match(/login|verify|secure|bank|update|account/i)) {
        score += 25;
        flags.push("Sensitive keywords");
    }

    // ---------- RESULT ----------
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
        "Red Flags: " + (flags.length ? flags.join(", ") : "None");
}
