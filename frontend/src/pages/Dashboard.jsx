import { useState } from "react";

export default function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);

  const callBackend = async () => {
    setLoading(true);
    setError(null);
    setResponse(null);

    try {
      const res = await fetch(import.meta.env.VITE_API_URL);

      if (!res.ok) {
        throw new Error("Failed to reach backend");
      }

      const data = await res.json();
      setResponse(data.message);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard">
      <h2>Dashboard</h2>
      <p>Backend connectivity test</p>

      <button onClick={callBackend} disabled={loading}>
        {loading ? "Calling..." : "Call Backend"}
      </button>

      {response && (
        <p style={{ color: "#22c55e", marginTop: "15px" }}>
          ✅ {response}
        </p>
      )}

      {error && (
        <p style={{ color: "#ef4444", marginTop: "15px" }}>
          ❌ {error}
        </p>
      )}
    </div>
  );
}