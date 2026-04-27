const API_URL = import.meta.env.VITE_API_URL;

export const callBackend = async () => {
  const res = await fetch(API_URL);

  if (!res.ok) {
    throw new Error("API request failed");
  }

  return res.json();
};