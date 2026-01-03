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
    data = request.get_json()
    url = data["url"]

    features = extract_features(url)
    prediction = model.predict([features])[0]
    probability = model.predict_proba([features])[0][prediction]

    if prediction == 1:
        result = "🚨 Phishing Website"
    else:
        result = "✅ Legitimate Website"

    return jsonify({
        "result": result,
        "confidence": round(probability * 100, 2)
    })

if __name__ == "__main__":
    app.run(debug=True)
