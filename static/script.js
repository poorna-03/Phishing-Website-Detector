function checkURL() {
    const url = document.getElementById("url").value;

    if (url.trim() === "") {
        alert("Please enter a URL");
        return;
    }

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ "url": url })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error("Server error");
        }
        return response.json();
    })
    .then(data => {
        document.getElementById("result").innerText = data.result;
        document.getElementById("confidence").innerText =
            "Confidence: " + data.confidence + "%";
    })
    .catch(error => {
        console.error(error);
        alert("Prediction failed. Check console.");
    });
}
