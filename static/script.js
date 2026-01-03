function checkURL() {
    const url = document.getElementById("url").value;

    fetch("/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: url })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById("result").innerText = data.result;
        document.getElementById("confidence").innerText =
            "Confidence: " + data.confidence + "%";
    });
}
