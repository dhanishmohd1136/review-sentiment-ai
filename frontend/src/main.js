/**
 * REVIEW//AI • Bauhaus Neo-Brutalist Interface Controller
 * Swiss Typographic System • Strict Component Lifecycle • FastAPI Integration
 * Portfolio of MUHAMMED DHANISH (AI/ML Engineer • Data Scientist • Statistician)
 */

import {
  checkBackendHealth,
  predictSentiment,
  LINKEDIN_URL,
  GITHUB_URL,
} from "./services/api.js";

// ==========================================================================
// Application State
// ==========================================================================
const state = {
  isAnalyzing: false,
  apiConnected: false,
  latestResult: null,
};

// ==========================================================================
// Preset Example Reviews (Curated for ML Model Verification)
// ==========================================================================
const EXAMPLE_REVIEWS = {
  positive:
    "The product arrived swiftly and exceeded every expectation! Build quality is remarkably sturdy and the customer service was wonderful. Highly recommend to everyone.",
  negative:
    "Terrible and worst product ever! Completely broke immediately and customer service was awful. Horrible experience, waste of money.",
  average:
    "The product works as described, but shipping was somewhat slow and the packaging was slightly damaged on arrival.",
};

// ==========================================================================
// DOM Element Cache
// ==========================================================================
let els = {};

function initDomReferences() {
  els = {
    // Inputs & Form Controls
    reviewInput: document.getElementById("reviewInput"),
    charCounter: document.getElementById("charCounter"),
    analyzeBtn: document.getElementById("analyzeBtn"),
    analyzeBtnText: document.getElementById("analyzeBtnText"),
    geometricLoader: document.getElementById("geometricLoader"),
    clearBtn: document.getElementById("clearBtn"),
    exampleBtns: document.querySelectorAll("[data-example-key]"),

    // Error Panel
    errorPanel: document.getElementById("errorPanel"),
    errorMessage: document.getElementById("errorMessage"),

    // Result Containers
    resultStandbyView: document.getElementById("resultStandbyView"),
    resultActiveView: document.getElementById("resultActiveView"),

    // Sentiment Metric Elements
    sentimentHeroBanner: document.getElementById("sentimentHeroBanner"),
    sentimentHeadlineHuge: document.getElementById("sentimentHeadlineHuge"),
    sentimentStatusPill: document.getElementById("sentimentStatusPill"),

    // Confidence Meter
    confidencePercentageDisplay: document.getElementById("confidencePercentageDisplay"),
    confidenceBarFill: document.getElementById("confidenceBarFill"),

    // Probability Bars
    probPositiveVal: document.getElementById("probPositiveVal"),
    probPositiveFill: document.getElementById("probPositiveFill"),
    probNegativeVal: document.getElementById("probNegativeVal"),
    probNegativeFill: document.getElementById("probNegativeFill"),

    // Technical Processed Text
    cleanTextViewport: document.getElementById("cleanTextViewport"),
    tokensFlexGrid: document.getElementById("tokensFlexGrid"),

    // System Status Readouts
    apiStatusDot: document.getElementById("apiStatusDot"),
    apiStatusText: document.getElementById("apiStatusText"),
    latencyBadge: document.getElementById("latencyBadge"),

    // Portfolio Social Links
    linkedinLink: document.getElementById("linkedinLink"),
    githubLink: document.getElementById("githubLink"),
    footerLinkedin: document.getElementById("footerLinkedin"),
    footerGithub: document.getElementById("footerGithub"),
  };

  // Wire configurable social portfolio URLs
  if (els.linkedinLink && LINKEDIN_URL) {
    els.linkedinLink.href = LINKEDIN_URL;
  }
  if (els.githubLink && GITHUB_URL) {
    els.githubLink.href = GITHUB_URL;
  }
  if (els.footerLinkedin && LINKEDIN_URL) {
    els.footerLinkedin.href = LINKEDIN_URL;
  }
  if (els.footerGithub && GITHUB_URL) {
    els.footerGithub.href = GITHUB_URL;
  }
}

// ==========================================================================
// System Health Monitoring (GET /health)
// ==========================================================================
async function refreshSystemStatus() {
  const result = await checkBackendHealth();
  state.apiConnected = result.connected;

  if (els.apiStatusDot && els.apiStatusText) {
    if (result.connected) {
      els.apiStatusDot.className = "status-dot-indicator";
      els.apiStatusText.textContent = "API ONLINE";
    } else {
      els.apiStatusDot.className = "status-dot-indicator offline";
      els.apiStatusText.textContent = "API OFFLINE";
    }
  }

  if (els.latencyBadge && result.latencyMs !== undefined) {
    els.latencyBadge.textContent = `${result.latencyMs}ms LATENCY`;
  }
}

// ==========================================================================
// Character Count & Input Handlers
// ==========================================================================
function updateCharCounter() {
  if (!els.reviewInput || !els.charCounter) return;
  const count = els.reviewInput.value.length;
  els.charCounter.textContent = `${count} / 5000`;
}

function handleExampleClick(e) {
  const key = e.currentTarget.getAttribute("data-example-key");
  const sample = EXAMPLE_REVIEWS[key];
  if (!sample || !els.reviewInput) return;

  hideError();
  els.reviewInput.value = sample;
  updateCharCounter();
  els.reviewInput.focus();
}

function handleClear() {
  if (els.reviewInput) {
    els.reviewInput.value = "";
    updateCharCounter();
    els.reviewInput.focus();
  }
  hideError();
  resetResultView();
}

// ==========================================================================
// Error Panel Handling
// ==========================================================================
function showError(message) {
  if (!els.errorPanel || !els.errorMessage) return;
  els.errorMessage.textContent = message;
  els.errorPanel.style.display = "block";
  els.errorPanel.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function hideError() {
  if (!els.errorPanel) return;
  els.errorPanel.style.display = "none";
}

// ==========================================================================
// Result View Rendering
// ==========================================================================
function resetResultView() {
  if (els.resultStandbyView) els.resultStandbyView.style.display = "block";
  if (els.resultActiveView) els.resultActiveView.style.display = "none";
  state.latestResult = null;
}

function renderPredictionResult(data) {
  state.latestResult = data;

  // Swap standby placeholder with active result
  if (els.resultStandbyView) els.resultStandbyView.style.display = "none";
  if (els.resultActiveView) els.resultActiveView.style.display = "block";

  const isPositive = data.sentiment.toLowerCase() === "positive";
  const posPct = (data.probabilities.positive * 100).toFixed(1);
  const negPct = (data.probabilities.negative * 100).toFixed(1);
  const confPct = (data.confidence * 100).toFixed(1);

  // 1. Prominent Sentiment Classification Banner
  if (els.sentimentHeroBanner) {
    els.sentimentHeroBanner.className = `sentiment-hero-banner ${isPositive ? "positive" : "negative"}`;
  }
  if (els.sentimentHeadlineHuge) {
    els.sentimentHeadlineHuge.textContent = isPositive ? "POSITIVE" : "NEGATIVE";
  }
  if (els.sentimentStatusPill) {
    els.sentimentStatusPill.textContent = isPositive 
      ? `VERIFIED // ${posPct}% FAVORABLE` 
      : `VERIFIED // ${negPct}% ADVERSE`;
  }

  // 2. Large Confidence Score & Animated Bar
  if (els.confidencePercentageDisplay) {
    els.confidencePercentageDisplay.textContent = `${confPct}%`;
  }
  if (els.confidenceBarFill) {
    els.confidenceBarFill.className = `confidence-bar-fill ${isPositive ? "positive" : "negative"}`;
    els.confidenceBarFill.style.width = "0%";
    requestAnimationFrame(() => {
      els.confidenceBarFill.style.width = `${confPct}%`;
    });
  }

  // 3. Probability Distribution Bars
  if (els.probPositiveVal) els.probPositiveVal.textContent = `${posPct}%`;
  if (els.probNegativeVal) els.probNegativeVal.textContent = `${negPct}%`;

  if (els.probPositiveFill) {
    els.probPositiveFill.style.width = "0%";
    requestAnimationFrame(() => {
      els.probPositiveFill.style.width = `${posPct}%`;
    });
  }

  if (els.probNegativeFill) {
    els.probNegativeFill.style.width = "0%";
    requestAnimationFrame(() => {
      els.probNegativeFill.style.width = `${negPct}%`;
    });
  }

  // 4. Preprocessed Text & Tokens Readout
  if (els.cleanTextViewport) {
    els.cleanTextViewport.textContent = data.clean_text || "(No residual tokens after stopwords removal)";
  }

  if (els.tokensFlexGrid) {
    els.tokensFlexGrid.innerHTML = "";
    const tokens = (data.clean_text || "").split(/\s+/).filter(Boolean);

    if (tokens.length === 0) {
      const emptySpan = document.createElement("span");
      emptySpan.className = "token-pill-badge";
      emptySpan.textContent = "[NO RESIDUAL TOKENS]";
      els.tokensFlexGrid.appendChild(emptySpan);
    } else {
      tokens.forEach((tok) => {
        const span = document.createElement("span");
        span.className = "token-pill-badge";
        span.textContent = tok;
        els.tokensFlexGrid.appendChild(span);
      });
    }
  }

  // 5. Update Latency telemetry if returned
  if (els.latencyBadge && data.latencyMs !== undefined) {
    els.latencyBadge.textContent = `${data.latencyMs}ms LATENCY`;
  }
}

// ==========================================================================
// Prediction Trigger
// ==========================================================================
async function runAnalysis() {
  if (state.isAnalyzing) return;

  const rawText = els.reviewInput?.value || "";
  if (!rawText.trim()) {
    showError("Please enter or paste a customer review before analyzing.");
    els.reviewInput?.focus();
    return;
  }

  hideError();
  state.isAnalyzing = true;

  // Set Loading UI state (Disable button, show ANALYZING..., show geometric loader)
  if (els.analyzeBtn) els.analyzeBtn.disabled = true;
  if (els.analyzeBtnText) els.analyzeBtnText.textContent = "ANALYZING...";
  if (els.geometricLoader) els.geometricLoader.style.display = "inline-flex";

  try {
    const result = await predictSentiment(rawText);
    renderPredictionResult(result);
  } catch (err) {
    showError(err.message || "Failed to process review sentiment. Please verify the API connection.");
  } finally {
    state.isAnalyzing = false;
    if (els.analyzeBtn) els.analyzeBtn.disabled = false;
    if (els.analyzeBtnText) els.analyzeBtnText.textContent = "ANALYZE REVIEW →";
    if (els.geometricLoader) els.geometricLoader.style.display = "none";
  }
}

// ==========================================================================
// Event Listeners & Initialization
// ==========================================================================
function bindEvents() {
  // Live input character count
  if (els.reviewInput) {
    els.reviewInput.addEventListener("input", updateCharCounter);

    // Ctrl+Enter or Cmd+Enter trigger
    els.reviewInput.addEventListener("keydown", (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
        e.preventDefault();
        runAnalysis();
      }
    });
  }

  // Primary buttons
  if (els.analyzeBtn) {
    els.analyzeBtn.addEventListener("click", runAnalysis);
  }

  if (els.clearBtn) {
    els.clearBtn.addEventListener("click", handleClear);
  }

  // Example chips
  if (els.exampleBtns) {
    els.exampleBtns.forEach((btn) => {
      btn.addEventListener("click", handleExampleClick);
    });
  }
}

// Initialize on DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  initDomReferences();
  bindEvents();
  updateCharCounter();
  refreshSystemStatus();

  // Periodic health heartbeat (every 10 seconds)
  setInterval(refreshSystemStatus, 10000);

  // URL test parameter hook for automated verification
  const urlParams = new URLSearchParams(window.location.search);
  const testKey = urlParams.get("test");
  if (testKey && EXAMPLE_REVIEWS[testKey]) {
    if (els.reviewInput) {
      els.reviewInput.value = EXAMPLE_REVIEWS[testKey];
      updateCharCounter();
    }
    setTimeout(runAnalysis, 250);
  }
});
