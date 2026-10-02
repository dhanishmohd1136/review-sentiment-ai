# REVIEW//ANALYZER • Customer Review Sentiment Intelligence

[![Live Demo](https://img.shields.io/badge/Live_Demo-Online-success?style=for-the-badge&logo=render)](https://review-sentiment-ai.onrender.com/#analyzer)
[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4%2B-F7931E.svg)](https://scikit-learn.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

> 🌐 **Live Web Application**: **[https://review-sentiment-ai.onrender.com/#analyzer](https://review-sentiment-ai.onrender.com/#analyzer)**  
> Test real-time sentiment predictions directly in the online deployment.

A production-grade customer review sentiment analysis platform and REST API powered by a high-throughput **FastAPI** inference engine and an optimized **TF-IDF + Logistic Regression** NLP pipeline trained on 50,000 IMDB customer reviews.

---

## ⚡ Core Capabilities

- **High-Throughput Inference**: Sub-15ms prediction latency with class probabilities (`positive`, `negative`) and confidence scoring.
- **Negation-Aware Preprocessing**: Custom NLTK text processing that preserves negation semantics (`not`, `no`, `never`, `nor`), strips HTML/special characters, and lemmatizes tokens with WordNet.
- **Optimized Feature Representation**: 20,000 Unigram + Bigram TF-IDF features capturing complex semantic patterns while remaining compact (< 1MB artifacts).
- **Production API Architecture**: Robust FastAPI service with Pydantic request/response schemas, CORS middleware, centralized logging, and automated health monitoring.
- **Reproducible ML Pipeline**: Complete end-to-end notebooks covering exploratory data analysis, feature engineering, model selection, hyperparameter tuning, and error analysis.

---

## 📊 Model Performance & Benchmarks

Trained on 50,000 IMDB reviews with 5-fold cross-validation and a dedicated 10,000-sample holdout test set.

### Feature Representation Comparison

| Representation | Vocabulary Features | Accuracy | Precision | Recall | F1 Score |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Bag of Words (Unigram) | 80,945 | 88.26% | 87.96% | 88.66% | 0.8831 |
| TF-IDF (Unigram) | 80,945 | 89.26% | 88.40% | 90.38% | 0.8938 |
| **TF-IDF (Unigram + Bigram)** | **20,000** | **89.93%** | **89.05%** | **91.06%** | **0.9004** |

### Final Production Model Validation (10,000 Holdout Test Samples)

| Metric | Value |
| :--- | :--- |
| **Accuracy** | **91.96%** |
| **Precision** | **90.86%** |
| **Recall** | **93.30%** |
| **F1-Score** | **92.07%** |
| **High Confidence Errors** | 19 / 10,000 (< 0.2%) |
| **Average Latency** | ~8ms – 15ms / request |

---

## 🏗️ Project Structure

```
├── backend/
│   ├── app/
│   │   ├── api/routes/          # Prediction and health check endpoints
│   │   │   ├── health.py        # /health and /api/v1/health
│   │   │   └── prediction.py    # /api/v1/predict
│   │   ├── core/
│   │   │   └── config.py        # App metadata, paths, and CORS settings
│   │   ├── schemas/
│   │   │   └── prediction.py    # Pydantic request and response models
│   │   ├── services/
│   │   │   ├── prediction.py    # Inference engine and probability mapping
│   │   │   └── preprocessing.py # NLTK regex cleaner, stopword filter & lemmatizer
│   │   ├── utils/
│   │   │   └── logger.py        # Logging utility
│   │   └── main.py              # FastAPI app instance and router registration
│   ├── artifacts/               # Production models (sentiment_model.pkl, tfidf_vectorizer.pkl)
│   ├── tests/                   # Pytest test suite (health & prediction)
│   ├── Dockerfile               # Production container definition
│   └── requirements.txt         # FastAPI & ML runtime dependencies
├── ml/
│   ├── artifacts/               # Model comparison, error analysis & evaluation summaries
│   ├── notebooks/               # Step-by-step Jupyter experimentation notebooks
│   │   ├── 01_data_analysis.ipynb
│   │   ├── 02_text_preprocessing.ipynb
│   │   ├── 03_text_representation.ipynb
│   │   ├── 04_model_experimentation.ipynb
│   │   └── 05_final_model.ipynb
│   ├── src/                     # Reusable training & evaluation modules
│   │   ├── features/vectorizer.py
│   │   ├── models/train.py
│   │   ├── preprocessing/text_cleaner.py
│   │   └── evaluation/evaluate.py
│   └── requirements.txt         # ML experimentation dependencies
├── data/
│   ├── raw/                     # Original IMDB dataset (git-ignored)
│   └── processed/               # Preprocessed review datasets (git-ignored)
├── docker-compose.yml           # Container orchestration
└── README.md
```

---

## 🚀 Getting Started

Follow this guide to get the backend and machine learning environment running locally on your system.

### 📋 Prerequisites

- **Git**: [Download Git](https://git-scm.com/downloads)
- **Python**: Version `3.10` or higher ([Download Python](https://www.python.org/downloads/))
- **Docker** *(Optional, for containerized execution)*: [Download Docker](https://www.docker.com/products/docker-desktop/)

### 🌐 Live Deployment

You can test the deployed application instantly without running anything locally:  
👉 **[Open Live Sentiment Analyzer](https://review-sentiment-ai.onrender.com/#analyzer)**

---

### 📥 1. Clone the Repository

```bash
git clone https://github.com/dhanishmohd1136/review-sentiment-ai.git
cd review-sentiment-ai
```

---

### ⚡ 2. Run with Docker (Recommended)

Run the backend API using Docker:

```bash
# Build and run the backend container
docker build -t sentiment-backend backend/
docker run -p 8000:8000 sentiment-backend
```

Or using Docker Compose:
```bash
docker compose up --build backend -d
```

- 🔌 **API Base**: [http://localhost:8000](http://localhost:8000)
- 📖 **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- 🩺 **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

---

### 💻 3. Manual Local Setup (Python Virtual Environment)

#### Step 3.1: Install Backend Dependencies

1. Navigate to the `backend` folder:
   ```bash
   cd backend
   ```

2. Create and activate a Python virtual environment:
   - **Linux / macOS**:
     ```bash
     python3 -m venv .venv
     source .venv/bin/activate
     ```
   - **Windows (Command Prompt / PowerShell)**:
     ```cmd
     python -m venv .venv
     .venv\Scripts\activate
     ```

3. Install requirements:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Download required NLTK corpora (WordNet lemmatizer & stopwords):
   ```bash
   python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"
   ```

5. Launch the FastAPI development server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   The API will be live at `http://localhost:8000` (Swagger UI at `http://localhost:8000/docs`).

---

#### Step 3.2: Exploring the Machine Learning Pipeline

To inspect the exploratory data analysis, feature representations, and model training:

1. Navigate to the `ml` directory:
   ```bash
   cd ml
   ```

2. Install ML training dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch Jupyter:
   ```bash
   jupyter notebook notebooks/
   ```

   Notebooks overview:
   - `01_data_analysis.ipynb` — Distribution of reviews, label balance, length analysis.
   - `02_text_preprocessing.ipynb` — HTML stripping, regex cleaning, lemmatization benchmarks.
   - `03_text_representation.ipynb` — Bag of Words vs. TF-IDF feature extraction.
   - `04_model_experimentation.ipynb` — Logistic Regression, Naive Bayes, hyperparameter sweeps.
   - `05_final_model.ipynb` — Final production pipeline serialization to `.pkl`.

---

### ✅ 4. Verifying Your Setup

#### Test via `curl`:
```bash
curl -X POST "http://localhost:8000/api/v1/predict" \
     -H "Content-Type: application/json" \
     -d '{"text": "The battery life on this laptop is incredible and the display is stunning!"}'
```

Expected JSON response:
```json
{
  "sentiment": "positive",
  "confidence": 0.9612,
  "probabilities": {
    "negative": 0.0388,
    "positive": 0.9612
  },
  "clean_text": "battery life laptop incredible display stunning"
}
```

#### Test via Python:
```python
import requests

url = "http://localhost:8000/api/v1/predict"
payload = {"text": "Poor customer service, the package arrived damaged and late."}

response = requests.post(url, json=payload)
print(response.json())
# Output: {'sentiment': 'negative', 'confidence': 0.9842, ...}
```

---

### ❓ Troubleshooting

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| `Resource stopwords not found` | NLTK stopwords/wordnet corpus missing | Run: `python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"` |
| `Port 8000 already in use` | Another process is occupying port 8000 | Kill process: `lsof -ti:8000 \| xargs kill -9` or run uvicorn on `--port 8001` |
| `Model file not found` | Missing model artifact in `backend/artifacts` | Ensure `backend/artifacts/sentiment_model.pkl` and `tfidf_vectorizer.pkl` exist |

---

## 📡 API Reference

### 1. Health Check
`GET /health` or `GET /api/v1/health`

**Response (Status 200 OK):**
```json
{
  "status": "healthy"
}
```

---

### 2. Predict Sentiment
`POST /api/v1/predict`

**Request Headers:** `Content-Type: application/json`

**Request Body:**
```json
{
  "text": "The camera quality on this phone exceeded my expectations! Battery lasts two full days easily."
}
```

**Response (Status 200 OK):**
```json
{
  "sentiment": "positive",
  "confidence": 0.9421,
  "probabilities": {
    "negative": 0.0579,
    "positive": 0.9421
  },
  "clean_text": "camera quality phone exceeded expectation battery last two full day easily"
}
```

---

## 🧪 Running Tests

Automated backend unit and integration tests are powered by `pytest`:

```bash
cd backend
source .venv/bin/activate
pytest tests/ -v
```

---

## 🛠️ Tech Stack Details

| Layer | Technologies |
| :--- | :--- |
| **Backend & API** | Python 3.12, FastAPI, Uvicorn, Pydantic |
| **Machine Learning** | Scikit-Learn (Logistic Regression, TF-IDF), Joblib, NumPy, Pandas |
| **NLP Pipeline** | Regex Sanitization, Negation-Preserving Stopwords Filter, WordNet Lemmatizer |
| **Testing & Quality** | Pytest, HTTPX |
| **Deployment** | Docker, Docker Compose |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
