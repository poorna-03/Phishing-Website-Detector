from flask import Flask, render_template, request, jsonify
import joblib
from phishing_detector import extract_features

app = Flask(__name__)
model = joblib.load("model.pkl")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/predict", methods=["POST"])
def predict():
    try:
        data = request.get_json()
        url = data.get("url")

        features = extract_features(url)
        prediction = model.predict([features])[0]
        confidence = max(model.predict_proba([features])[0])

        result = "🚨 Phishing Website" if prediction == 1 else "✅ Legitimate Website"

        return jsonify({
            "result": result,
            "confidence": round(confidence * 100, 2)
    if not url.startswith("http://") and not url.startswith("https://"):
    return jsonify({
        "result": "❌ Invalid URL Format",
        "confidence": 0
    })

        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
