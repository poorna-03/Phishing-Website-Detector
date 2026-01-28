import re
from urllib.parse import urlparse

def extract_features(url):
    features = []

    # 1. URL Length
    features.append(len(url))

    # 2. IP Address in URL
    ip_pattern = re.compile(r'(\d{1,3}\.){3}\d{1,3}')
    features.append(1 if ip_pattern.search(url) else 0)

    # 3. Special Characters Count
    features.append(url.count('@') + url.count('?') +
                    url.count('-') + url.count('='))

    # 4. Suspicious Words
    suspicious_words = ['login', 'bank', 'verify', 'update', 'secure']
    features.append(1 if any(word in url.lower() for word in suspicious_words) else 0)

    # 5. URL Shortener
    shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 'ow.ly']
    features.append(1 if any(short in url for short in shorteners) else 0)

    # 6. HTTP Present
    features.append(1 if url.startswith("http://") else 0)

    # 7. HTTPS Present
    features.append(1 if url.startswith("https://") else 0)

    # 8. Number of dots
    features.append(url.count('.'))

    # 9. Number of subfolders
    path = urlparse(url).path
    features.append(path.count('/'))

    # -------- NEW FEATURES (ADD HERE) --------

    # 10. Count of "www"
    features.append(url.count('www'))

    # 11. Percentage Symbol
    features.append(url.count('%'))

    # 12. Domain Length
    features.append(len(urlparse(url).netloc))

    # 13. Too many subdomains
    features.append(1 if urlparse(url).netloc.count('.') > 3 else 0)

    return features
