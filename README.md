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

## 🚀 Getting Started with the Project

Follow this guide to get the project cloned, configured, and running locally on your system.

### 📋 Prerequisites

Ensure the following tools are installed on your workstation:
- **Git**: [Download Git](https://git-scm.com/downloads)
- **Python**: Version `3.10` or higher ([Download Python](https://www.python.org/downloads/))
- **Node.js**: Version `18.0` or higher & npm ([Download Node.js](https://nodejs.org/))
- **Docker & Docker Compose** *(Optional, recommended for instant one-command deployment)*: [Download Docker](https://www.docker.com/products/docker-desktop/)

---

### 📥 1. Clone the Repository

Clone the repository to your local system and enter the project folder:

```bash
git clone https://github.com/dhanishmohd1136/review-sentiment-ai.git
cd review-sentiment-ai
```

---

### ⚡ 2. Quick Start with Docker Compose (Recommended)

The quickest way to run the entire stack (FastAPI backend + Vite/Nginx frontend) without needing to configure local Python or Node environments:

```bash
# Build images and start services in the background
docker compose up --build -d
```

#### Service URLs:
- 🌐 **Frontend Application**: [http://localhost:5173](http://localhost:5173)
- 🔌 **FastAPI REST API**: [http://localhost:8000](http://localhost:8000)
- 📖 **Interactive Swagger Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)
- 🩺 **Health Check**: [http://localhost:8000/health](http://localhost:8000/health)

#### Helpful Docker Commands:
```bash
# View live container logs
docker compose logs -f

# Check container status
docker compose ps

# Stop all containers
docker compose down
```

---

### 💻 3. Manual Local Development Setup (Without Docker)

If you are developing or testing components locally, run the backend and frontend in separate terminals:

#### Step 3.1: Start the Backend Service

1. Open a terminal and navigate to the backend folder:
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

3. Install required Python packages:
   ```bash
   pip install --upgrade pip
   pip install -r requirements.txt
   ```

4. Download required NLTK corpora (WordNet lemmatizer & stopwords):
   ```bash
   python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"
   ```

5. Launch the FastAPI server:
   ```bash
   uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
   ```

   The backend will start at `http://localhost:8000`. You can inspect the interactive documentation at `http://localhost:8000/docs`.

---

#### Step 3.2: Start the Frontend Application

1. Open a **second terminal** window and navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the Vite development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   👉 **[http://localhost:5173](http://localhost:5173)**

---

#### Step 3.3: Exploring the Machine Learning Pipeline (Optional)

To inspect exploratory data analysis, feature representations, and model training:

1. Open a terminal and navigate to the `ml` directory:
   ```bash
   cd ml
   ```

2. Install ML experimentation dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Launch Jupyter:
   ```bash
   jupyter notebook notebooks/
   ```

   You can step through:
   - `01_data_analysis.ipynb` — Distribution of reviews, rating counts, word clouds.
   - `02_text_preprocessing.ipynb` — HTML tag stripping, regex cleaning, lemmatization benchmarks.
   - `03_text_representation.ipynb` — CountVectorizer vs TF-IDF feature extraction.
   - `04_model_experimentation.ipynb` — Logistic Regression, Naive Bayes, hyperparameter sweeps.
   - `05_final_model.ipynb` — Final production pipeline serialization to `.pkl`.

---

### ✅ 4. Verifying Your Setup

#### Quick Verification via Terminal (`curl`):
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

#### Verification via Web UI:
1. Open [http://localhost:5173](http://localhost:5173).
2. The telemetry badge in the top right will indicate `STATUS: ONLINE • 200 OK`.
3. Click any customer card on the Bauhaus coverflow slider or paste your own review.
4. Hit **RUN INFERENCE** to see real-time classification, probability distribution, confidence meter, and cleaned token telemetry.

---

### ❓ Troubleshooting

| Issue | Root Cause | Solution |
| :--- | :--- | :--- |
| `Resource stopwords not found` | NLTK stopwords/wordnet corpus missing | Run: `python -c "import nltk; nltk.download('stopwords'); nltk.download('wordnet')"` |
| `Port 8000 already in use` | Another process is occupying port 8000 | Kill process: `lsof -ti:8000 \| xargs kill -9` or run uvicorn on `--port 8001` |
| `Port 5173 already in use` | Another Vite server is active | Vite will automatically offer port 5174, or run: `npm run dev -- --port 5174` |
| `ERR_CONNECTION_REFUSED` in UI | Backend server is offline | Confirm FastAPI is running via `http://localhost:8000/health` |

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
