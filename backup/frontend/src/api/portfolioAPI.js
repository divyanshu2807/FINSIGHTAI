// src/api/portfolioAPI.js



const API_URL = "https://finsightai-1.onrender.com/api/portfolio";


const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return token
    ? {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
};

// ✅ Get portfolio (holdings)
export const getPortfolio = async () => {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  const data = await res.json();
  // VirtualMoney.js uses: const { data } = await getPortfolio();
  return { data };
};

// ✅ Buy stock
export const buyStock = async (payload) => {
  // payload = { symbol, qty, price }
  const res = await fetch(`${API_URL}/buy`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to buy stock");
  }

  const data = await res.json();
  return { data };
};

// ✅ Sell stock
export const sellStock = async (payload) => {
  // payload = { symbol, qty, price }
  const res = await fetch(`${API_URL}/sell`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Failed to sell stock");
  }

  const data = await res.json();
  return { data };
};
