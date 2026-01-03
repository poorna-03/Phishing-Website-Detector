import re
from urllib.parse import urlparse

def extract_features(url):
    features = []

    features.append(len(url))

   
    ip_pattern = re.compile(
        r'(\d{1,3}\.){3}\d{1,3}'
    )
    features.append(1 if ip_pattern.search(url) else 0)

    features.append(url.count('@') + url.count('?') + url.count('-') + url.count('='))


    suspicious_words = ['login', 'bank', 'verify', 'update', 'secure']
    features.append(1 if any(word in url.lower() for word in suspicious_words) else 0)


    shorteners = ['bit.ly', 'tinyurl', 'goo.gl', 'ow.ly']
    features.append(1 if any(short in url for short in shorteners) else 0)


    features.append(1 if url.startswith("http://") else 0)


    features.append(1 if url.startswith("https://") else 0)

    features.append(url.count('.'))

    path = urlparse(url).path
    features.append(path.count('/'))

    return features
