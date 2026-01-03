function checkURL() {
    const url = document.getElementById("url").value.toLowerCase();
    let result = "✅ Legitimate Website";

    if (
        url.includes("login") ||
        url.includes("bank") ||
        url.includes("verify") ||
        url.includes("update") ||
        url.includes("bit.ly") ||
        url.includes("tinyurl") ||
        url.startsWith("http://")
    ) {
        result = "🚨 Phishing Website";
    }

    document.getElementById("result").innerText = result;
}
