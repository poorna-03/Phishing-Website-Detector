async function checkURL() {

    const url = document.getElementById("url").value.trim();
    const resultBox = document.getElementById("resultBox");
    const result = document.getElementById("result");
    const confidence = document.getElementById("confidence");

    if (url.length === 0) {
        resultBox.classList.remove("hidden");
        result.innerHTML = "❌ Enter a URL";
        confidence.innerHTML = "";
        return;
    }

    try {
        const response = await fetch("/predict", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ url: url })
        });

        const data = await response.json();

        resultBox.classList.remove("hidden");
        result.innerHTML = data.result;
        confidence.innerHTML = "Confidence: " + data.confidence + "%";

    } catch (err) {
        resultBox.classList.remove("hidden");
        result.innerHTML = "❌ Server Error";
        confidence.innerHTML = "";
    }
}
