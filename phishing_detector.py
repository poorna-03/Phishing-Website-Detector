# phishing_detector.py

import pandas as pd
import numpy as np
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import classification_report, accuracy_score
from urllib.parse import urlparse
import re

# --- 1. FEATURE EXTRACTION FUNCTIONS ---

def get_url_features(url):
    """Extracts a set of numerical features from a given URL."""
    try:
        # Parse the URL
        parsed = urlparse(url)
        path = parsed.path
        
        # 1. Length of URL
        len_url = len(url)
        
        # 2. Length of hostname
        len_hostname = len(parsed.netloc)
        
        # 3. Check for IP address in hostname (Phishing sites often use IP instead of domain)
        is_ip = 1 if re.match(r"\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}", parsed.netloc) else 0
        
        # 4. Count of special characters (@, ?, -, =, .)
        count_special = len(re.findall(r"[@\?\-=\.]", url))
        
        # 5. Presence of suspicious tokens (e.g., 'login', 'secure', 'bank' but not in TLD)
        suspicious_tokens = ['login', 'secure', 'bank', 'account']
        token_present = 1 if any(token in url.lower() and token not in parsed.netloc.split('.')[-1] for token in suspicious_tokens) else 0

        # 6. Count of dots in URL
        count_dots = url.count('.')
        
        # 7. Use of HTTPS (1=No HTTPS, 0=HTTPS used)
        # Note: Phishing sites increasingly use HTTPS, but this is still a traditional feature
        is_http = 1 if parsed.scheme == 'http' else 0

        # 8. Path depth (number of / in the path)
        path_depth = path.count('/')
        
        # 9. Shortening service (e.g., bit.ly, tinyurl)
        shortening_services = ['bit.ly', 'tinyurl', 'goo.gl', 't.co']
        is_shortened = 1 if any(service in parsed.netloc for service in shortening_services) else 0

        return [len_url, len_hostname, is_ip, count_special, token_present, count_dots, is_http, path_depth, is_shortened]
    
    except Exception as e:
        print(f"Error processing URL {url}: {e}")
        # Return zeros if parsing fails
        return [0] * 9 

# --- 2. DATA LOADING AND PREPARATION ---

def load_data(file_path='phishing_data.csv'):
    """Loads data, extracts features, and prepares it for ML."""
    print(f"Loading data from {file_path}...")
    try:
        # Assuming the dataset has 'URL' and 'Label' columns
        data = pd.read_csv(file_path)
        data = data[['URL', 'Label']].dropna()

        print("Extracting features (This may take a moment)...")
        # Apply the feature extraction function
        features = data['URL'].apply(lambda x: pd.Series(get_url_features(x), index=[
            'len_url', 'len_hostname', 'is_ip', 'count_special', 'token_present', 
            'count_dots', 'is_http', 'path_depth', 'is_shortened'
        ]))
        
        # Combine features with the target variable
        X = features.values
        y = data['Label'].values

        return X, y, data
    
    except FileNotFoundError:
        print(f"ERROR: Dataset file not found at {file_path}. Please download and ensure it is named 'phishing_data.csv'.")
        return None, None, None
    except Exception as e:
        print(f"An error occurred during data loading: {e}")
        return None, None, None


# --- 3. MODEL TRAINING AND EVALUATION ---

def train_and_evaluate(X, y):
    """Splits data, trains a Random Forest model, and reports results."""
    print("Splitting data into training and testing sets...")
    # Split data (80% train, 20% test)
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    print("Training Random Forest Classifier...")
    # Initialize and train the model
    model = RandomForestClassifier(n_estimators=100, random_state=42, n_jobs=-1)
    model.fit(X_train, y_train)

    print("Evaluating model performance...")
    # Make predictions and evaluate
    y_pred = model.predict(X_test)

    print("\n--- Model Evaluation Results ---")
    print(f"Accuracy: {accuracy_score(y_test, y_pred) * 100:.2f}%")
    print("Classification Report:\n", classification_report(y_test, y_pred, target_names=['Legitimate', 'Phishing']))
    
    # Return the trained model
    return model

# --- 4. PREDICTION FUNCTION ---

def predict_single_url(model, url):
    """Predicts the label for a single new URL."""
    # Extract features for the new URL
    features = get_url_features(url)
    
    # Predict (model expects a 2D array, so we reshape)
    prediction = model.predict([features])[0]
    
    # Predict probability for a confidence score
    probability = model.predict_proba([features])[0]
    confidence = max(probability) * 100

    if prediction == 1:
        result = "Phishing"
        print(f"\n[⚠️] RESULT: {url} is classified as {result}.")
    else:
        result = "Legitimate"
        print(f"\n[✅] RESULT: {url} is classified as {result}.")

    print(f"Confidence Score: {confidence:.2f}%")
    return result, confidence


# --- 5. MAIN EXECUTION BLOCK ---

if __name__ == "__main__":
    X, y, data = load_data()
    
    if X is not None:
        # 1. Train and get the model
        trained_model = train_and_evaluate(X, y)
        
        # 2. Test with new URLs
        print("\n" + "="*50)
        print("TESTING NEW URLS (Demo)")
        print("="*50)
        
        # Example 1: Legitimate (Google)
        predict_single_url(trained_model, "https://www.google.com/search?q=test")
        
        # Example 2: Suspicious (shortened URL with suspicious token)
        # Note: This is simulated and may not be accurate without external features
        predict_single_url(trained_model, "http://bit.ly/secure-login-update") 
        
        # Example 3: Clear Phishing Simulation (high dots, IP, http)
        predict_single_url(trained_model, "http://192.168.1.1/paypal.secure.login.php")
        
        # Example 4: Known Legitimate site with deep path
        predict_single_url(trained_model, "https://www.linkedin.com/in/poorna-devi-m-snsinstitutions/details/projects/")
