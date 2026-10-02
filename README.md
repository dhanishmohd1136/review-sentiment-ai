# REVIEW//ANALYZER • Customer Review Sentiment Intelligence

[![Python](https://img.shields.io/badge/Python-3.10%2B-blue.svg)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.115%2B-009688.svg)](https://fastapi.tiangolo.com/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF.svg)](https://vitejs.dev/)
[![Scikit-Learn](https://img.shields.io/badge/Scikit--Learn-1.4%2B-F7931E.svg)](https://scikit-learn.org/)
[![Docker](https://img.shields.io/badge/Docker-Enabled-2496ED.svg)](https://www.docker.com/)

A production-grade, end-to-end customer review sentiment analysis platform featuring a **Bauhaus-inspired Neo-Brutalist design language** and **Swiss International Typographic Style**, powered by a high-throughput **FastAPI** inference backend and an optimized **TF-IDF + Logistic Regression** NLP pipeline.

---

## 📐 Design System & Philosophy

- **Bauhaus-Inspired Aesthetic**:
  - Strict geometric compositions (primary red circle, deep blue rectangle, cadmium yellow square, hard crosshair axis lines).
  - Limited, high-contrast primary color palette:
    - **Warm Canvas**: `#F7F6F2` (Unbleached Swiss paper)
    - **Ink Black**: `#111111` (Borders, structural grid, bold typography)
    - **Bauhaus Vermilion Red**: `#DE3831` (Primary action accent, negative sentiment indicator)
    - **Cadmium Yellow**: `#F5B800` (Telemetry accents, interactive chips)
    - **Prussian / Ultramarine Blue**: `#14365D` (Positive sentiment indicator, secondary blocks)
  - **Zero Gradients • Zero Glassmorphism • Zero Generic Soft Corners • Hard Neo-Brutalist 4px/6px Solid Drop Shadows**.
- **Swiss International Typographic Style**:
  - Oversized display typography with tight letter-spacing (`Inter` 900 weight display).
  - Industrial data telemetry readouts (`JetBrains Mono`).
  - Strict typographic hierarchy with numeric section tags (`01 / REVIEW INPUT`, `02 / ANALYSIS RESULT`, `03 / PROCESSED TEXT`, `04 / SPECIFICATION`).
- **Production-Grade Microservice Architecture**:
  - Centralized API service (`src/services/api.js`).
  - Live heartbeat health monitoring (`GET /health` & `GET /api/v1/health`).
  - Sub-15ms sentiment inference (`POST /api/v1/predict`).
  - Real-time probability distributions, confidence meters with tick marks, and NLTK lemmatized token readouts.

---

## 📊 Model Performance & Benchmarks

Trained on 50,000 IMDB customer reviews with text normalization, custom negation preservation, and WordNet lemmatization.

### Model Representation Comparison

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
| **Inference Latency** | ~8ms – 15ms / request |

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
│   ├── Dockerfile               # Backend container definition
│   └── requirements.txt         # FastAPI & ML runtime dependencies
├── frontend/
│   ├── public/assets/           # Avatars, logos, and banner shapes
│   ├── src/
│   │   ├── services/
│   │   │   └── api.js           # API client with health check & fallback handling
│   │   ├── style.css            # Complete Bauhaus / Neo-brutalist design system
│   │   └── main.js              # Swiper slider engine, state & live analyzer logic
│   ├── index.html               # Semantic HTML layout
│   ├── nginx.conf               # Production Nginx reverse proxy configuration
│   ├── Dockerfile               # Multi-stage frontend container build
│   └── package.json             # Frontend dependencies (Vite, Swiper, Canvas-Confetti)
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
│   └── requirements.txt         # ML training dependencies
├── data/
│   ├── raw/                     # Original IMDB dataset (git-ignored)
│   └── processed/               # Preprocessed review datasets (git-ignored)
├── docker-compose.yml           # Multi-container orchestration
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js**: v18+ & npm
- **Python**: v3.10+
- **Docker & Docker Compose** (optional, recommended for production)

---

### Option 1: Run with Docker Compose (Recommended)

Run both the FastAPI backend and Nginx-powered frontend with a single command:

```bash
docker compose up --build
```

- **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- **Backend API**: [http://localhost:8000](http://localhost:8000)
- **Interactive API Docs (Swagger)**: [http://localhost:8000/docs](http://localhost:8000/docs)

---

### Option 2: Run Locally (Development Mode)

#### 1. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create and activate virtual environment
python -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Download required NLTK resources
python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"

# Start development server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

The API will be live at `http://localhost:8000` (Swagger UI at `http://localhost:8000/docs`).

#### 2. Frontend Setup

In a separate terminal:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start Vite dev server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

### Option 3: Explore Machine Learning Notebooks

To run the exploratory data analysis and model training notebooks:

```bash
cd ml
pip install -r requirements.txt
jupyter notebook notebooks/
```

---

## 📡 API Reference

### 1. Health Check
`GET /health` or `GET /api/v1/health`

**Response:**
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
| **Frontend** | Vanilla JavaScript (ES Modules), CSS3 Neo-Brutalist Design System, Vite, Swiper.js, Canvas-Confetti |
| **Backend** | Python 3.12, FastAPI, Uvicorn, Pydantic, Scikit-Learn, Joblib, NLTK |
| **NLP Pipeline** | Regex Sanitization, Stopwords Filtering (negation-safe), WordNet Lemmatization, TF-IDF (Unigram + Bigram, 20,000 features) |
| **Deployment** | Docker, Docker Compose, Nginx |

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
