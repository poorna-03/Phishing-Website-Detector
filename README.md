# 🛡️ Phishing Website Detector (Machine Learning Project)

This project implements a machine learning model to classify URLs as either legitimate or malicious (phishing) based on various lexical and host-based features extracted directly from the URL string.

## 💡 Tech Stack

* **Language:** Python
* **Libraries:** Pandas, NumPy, Scikit-learn (Random Forest Classifier)
* **Core Concept:** Feature Engineering (Lexical Analysis of URLs)

## 🛠️ Feature Extraction

The model classifies URLs based on 9 core features extracted from the URL string, including:

1.  Length of the URL
2.  Presence of an **IP address** in the hostname.
3.  Count of special characters (`@`, `?`, `-`, `=`).
4.  Presence of suspicious keywords (`login`, `bank`).
5.  Use of **URL shortening services** (`bit.ly`, `tinyurl`).
6.  Use of **HTTP** (vs. HTTPS).
7.  Path depth.

## 🚀 Setup and Run

### Prerequisites

1.  Python 3.x installed.
2.  A dataset file named **`phishing_data.csv`**. This file must contain at least two columns: `URL` (the website link) and `Label` (0 for legitimate, 1 for phishing).

### Steps

1.  **Clone the Repository (or create the files):**
    ```bash
    git clone [https://github.com/poorna-03/Phishing_Website_Detector.git](https://github.com/poorna-03/Phishing_Website_Detector.git)
    cd Phishing_Website_Detector
    ```

2.  **Install Dependencies:**
    ```bash
    pip install -r requirements.txt
    ```

3.  **Place Data:** Ensure your `phishing_data.csv` file is in the root directory of the project.

4.  **Run the Detector:**
    ```bash
    python phishing_detector.py
    ```

## 📝 Example Output

The script will first train the model and report the accuracy and classification metrics, followed by a live demo:
