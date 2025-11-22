// src/services/walletService.js


const API_URL = "https://finsightai-1.onrender.com/api/wallet";

const getAuthHeaders = (token) => {
  const authToken = token || localStorage.getItem("token");
  return authToken
    ? {
        Authorization: `Bearer ${authToken}`,
        "Content-Type": "application/json",
      }
    : { "Content-Type": "application/json" };
};

// ✅ Get wallet details
// VirtualMoney.js uses: const data = await getWallet(token);
export const getWallet = async (token) => {
  const res = await fetch(API_URL, {
    method: "GET",
    headers: getAuthHeaders(token),
  });

  if (!res.ok) {
    throw new Error("Failed to fetch wallet");
  }

  const data = await res.json();
  return data;
};

// ✅ Add or withdraw money
// VirtualMoney.js uses: await updateWallet(token, "Withdraw" | "Deposit", total)
export const updateWallet = async (token, type, amount) => {
  const res = await fetch(`${API_URL}/transaction`, {
    method: "POST",
    headers: getAuthHeaders(token),
    body: JSON.stringify({ type, amount }),
  });

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Wallet update failed");
  }

  const data = await res.json();
  return data;
};
