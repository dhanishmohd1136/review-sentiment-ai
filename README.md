# REVIEW//ANALYZER • Customer Review Sentiment Intelligence

A production-grade customer review sentiment analysis platform built with a **Bauhaus-inspired Neo-Brutalist design language** and **Swiss International Typographic Style**, directly connected to a real-time **FastAPI** inference backend (TF-IDF + Logistic Regression).

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
  - **Zero Gradients • Zero Glassmorphism • Zero Rounded Cards • Hard Neo-Brutalist 4px/6px Solid Drop Shadows**.
- **Swiss International Typographic Style**:
  - Oversized display typography with tight letter-spacing (`Inter` 900 weight display).
  - Industrial data telemetry readouts (`JetBrains Mono`).
  - Strict typographic hierarchy with numeric section tags (`01 / REVIEW INPUT`, `02 / ANALYSIS RESULT`, `03 / PROCESSED TEXT`, `04 / SPECIFICATION`).
- **Production-Grade Microservice Integration**:
  - Centralized API service (`src/services/api.js`).
  - Live heartbeat health checking (`GET /health`).
  - Sub-15ms sentiment inference (`POST /api/v1/predict`).
  - Real-time probability distributions, confidence meters with tick marks, and NLTK lemmatized token readouts.

---

## 🏗️ Project Structure

```
├── backend/
│   ├── app/
│   │   ├── api/routes/          # Prediction and health routes
│   │   ├── core/config.py       # Configuration and app metadata
│   │   ├── schemas/             # Pydantic request/response models
│   │   ├── services/            # Sentiment prediction & preprocessing pipeline
│   │   └── main.py              # FastAPI application with CORS enabled
│   ├── artifacts/               # Trained models (model.pkl, vectorizer.pkl)
│   └── Dockerfile
├── frontend/
│   ├── public/assets/           # Localized logos, avatars, and banner shape
│   ├── src/
│   │   ├── style.css            # Complete Tinyflow design system & animations
│   │   └── main.js              # Swiper coverflow engine & analyzer logic
│   ├── index.html               # Semantic HTML layout
│   ├── package.json
│   ├── nginx.conf
│   └── Dockerfile
└── docker-compose.yml           # Multi-container orchestration
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ & npm
- Python 3.10+ (or Docker)

### Option 1: Run Locally (Development)

#### 1. Start the Backend API:
```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```
Backend API will be running at `http://localhost:8000`.

#### 2. Start the Frontend (Vite):
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

---

### Option 2: Run with Docker Compose

```bash
docker compose up --build
```
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:8000`

---

## 📡 API Endpoints

### Health Check
`GET http://localhost:8000/api/v1/health`

### Predict Sentiment
`POST http://localhost:8000/api/v1/predict`

**Request Body:**
```json
{
  "text": "The stacked card slider is so intuitive and looks gorgeous on all screens!"
}
```

**Response:**
```json
{
  "sentiment": "positive",
  "confidence": 0.9421,
  "probabilities": {
    "negative": 0.0579,
    "positive": 0.9421
  },
  "clean_text": "stacked card slider intuitive looks gorgeous screens"
}
```
