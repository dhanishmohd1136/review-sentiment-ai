/**
 * Review//Analyzer • API Service
 * Centralized client for communicating with the FastAPI Sentiment Analysis backend.
 */

export const API_BASE_URL = (
  import.meta.env?.VITE_API_URL || "http://localhost:8000"
).replace(/\/$/, "");

// Portfolio Social URL Placeholders (Configurable)
export const LINKEDIN_URL = "https://www.linkedin.com/in/LINKEDIN_URL";
export const GITHUB_URL = "https://github.com/dhanishmohd1136/review-sentiment-ai";

/**
 * Check backend service health status.
 * @returns {Promise<{ connected: boolean, status?: string, latencyMs?: number, error?: string }>}
 */
export async function checkBackendHealth() {
  const start = performance.now();
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 3500);

    const response = await fetch(`${API_BASE_URL}/health`, {
      method: "GET",
      headers: {
        "Accept": "application/json",
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - start);

    if (response.ok) {
      const data = await response.json();
      return {
        connected: true,
        status: data.status || "healthy",
        latencyMs,
      };
    }

    return {
      connected: false,
      status: `HTTP ${response.status}`,
      latencyMs,
      error: `Server responded with HTTP ${response.status}`,
    };
  } catch (err) {
    const latencyMs = Math.round(performance.now() - start);
    return {
      connected: false,
      status: "offline",
      latencyMs,
      error: err.name === "AbortError" ? "Connection timed out" : (err.message || "Network error"),
    };
  }
}

/**
 * Predict sentiment for a given customer review text.
 * @param {string} text - Review text to classify.
 * @returns {Promise<{ sentiment: string, confidence: number, probabilities: { negative: number, positive: number }, clean_text: string, latencyMs: number }>}
 */
export async function predictSentiment(text) {
  if (!text || typeof text !== "string" || !text.trim()) {
    throw new Error("Review text cannot be empty. Please enter text to analyze.");
  }

  const trimmedText = text.trim();
  const start = performance.now();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    const response = await fetch(`${API_BASE_URL}/api/v1/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
      },
      body: JSON.stringify({ text: trimmedText }),
      signal: controller.signal,
    });

    clearTimeout(timeoutId);
    const latencyMs = Math.round(performance.now() - start);

    if (!response.ok) {
      let errorDetail = `HTTP ${response.status}`;
      try {
        const errorJson = await response.json();
        if (errorJson.detail) {
          errorDetail = typeof errorJson.detail === "string" 
            ? errorJson.detail 
            : JSON.stringify(errorJson.detail);
        }
      } catch (_) {
        // Fall back to status text
        errorDetail = response.statusText || errorDetail;
      }
      throw new Error(`Inference engine error: ${errorDetail}`);
    }

    const result = await response.json();

    // Verify response structure
    if (!result || typeof result !== "object" || !result.sentiment) {
      throw new Error("Invalid response format received from prediction backend.");
    }

    return {
      sentiment: String(result.sentiment).toLowerCase(),
      confidence: Number(result.confidence ?? 0),
      probabilities: {
        positive: Number(result.probabilities?.positive ?? 0),
        negative: Number(result.probabilities?.negative ?? 0),
      },
      clean_text: String(result.clean_text ?? ""),
      latencyMs,
    };
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Inference request timed out after 8 seconds. The server might be busy or restarting.");
    }
    throw err;
  }
}
