import { useState } from "react";
import "./App.css";

const suggestions = [
  "Explain APIs in simple words.",
  "Give me three tips to learn programming.",
  "What can I build with JavaScript?",
];

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function askAI(event) {
    event.preventDefault();

    if (!question.trim()) {
      setError("Please enter a question first.");
      return;
    }

    setLoading(true);
    setError("");
    setAnswer("");

    try {
      const response = await fetch("/api/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question: question.trim() }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Something went wrong.");
      }

      setAnswer(data.answer);
    } catch (err) {
      setError(
        err.message || "Could not connect to the AI server."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="app">
      <header className="topbar">
        <a className="brand" href="/">
          <span className="brand-icon">✳</span>
          <span>mindspace<span className="brand-dot">.</span></span>
        </a>

        <span className="status">
          <span className="status-dot" />
          AI assistant
        </span>
      </header>

      <section className="hero">
        <span className="eyebrow">YOUR PERSONAL AI ASSISTANT</span>

        <h1>
          Curiosity starts
          <br />
          with a <span>question.</span>
        </h1>

        <p className="intro">
          Ideas, explanations, or help figuring things out.
          <br />
          Ask anything and let's explore it together.
        </p>

        <form className="chat-card" onSubmit={askAI}>
          <label htmlFor="question">WHAT'S ON YOUR MIND?</label>

          <textarea
            id="question"
            rows="4"
            value={question}
            onChange={(event) => setQuestion(event.target.value)}
            placeholder="Ask me anything..."
          />

          <div className="card-footer">
            <span className="hint">✦ Powered by Gemini AI</span>

            <button type="submit" disabled={loading}>
              {loading ? "Thinking..." : "Ask AI"}
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </form>

        {error && <p className="error">{error}</p>}

        {loading && (
          <div className="loading">
            <span className="loader" />
            Thinking about your question...
          </div>
        )}

        {answer && (
          <section className="answer-card">
            <div className="answer-heading">
              <span className="answer-icon">✳</span>
              <div>
                <strong>Your answer</strong>
                <span>Generated just for you</span>
              </div>
            </div>

            <div className="answer-text">{answer}</div>
          </section>
        )}

        <div className="suggestions">
          <span>NEED AN IDEA?</span>

          {suggestions.map((item) => (
            <button
              className="suggestion"
              key={item}
              type="button"
              onClick={() => {
                setQuestion(item);
                setError("");
              }}
            >
              {item}
            </button>
          ))}
        </div>
      </section>

      <footer>
        Built with curiosity <span>♥</span> · React · Node.js · Gemini
      </footer>
    </main>
  );
}

export default App;