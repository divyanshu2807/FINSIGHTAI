import sys
import json
import joblib
import yfinance as yf
import pandas as pd
import os

# 1️⃣ Command-line se stock symbol lena (default: TCS.NS)
if len(sys.argv) > 1:
    ticker = sys.argv[1]
else:
    ticker = "TCS.NS"

# 2️⃣ Fix: Always use absolute model path (important for Node backend)
base_dir = os.path.dirname(os.path.abspath(__file__))
model_path = os.path.join(base_dir, "stock_predictor.pkl")

# 3️⃣ Trained model load karna
model = joblib.load(model_path)

# 4️⃣ Latest data fetch karna
data = yf.download(ticker, period="3mo", interval="1d")  # 👈 3 months safer window
data['MA7'] = data['Close'].rolling(7).mean()
data['MA14'] = data['Close'].rolling(14).mean()
data['MA50'] = data['Close'].rolling(50).mean()
data.dropna(inplace=True)

# ⚠️ Check if data empty ho gaya
if data.empty or len(data) < 1:
    print(json.dumps({"error": "Not enough data for prediction"}))
    sys.exit()

# 5️⃣ Last row features lena
latest = data[['Open', 'High', 'Low', 'Close', 'Volume', 'MA7', 'MA14', 'MA50']].tail(1)

# 6️⃣ Prediction karna
predicted_close = model.predict(latest)[0]
current_close = float(data['Close'].iloc[-1])
trend = "UP" if predicted_close > current_close else "DOWN"
confidence = round(abs((predicted_close - current_close) / current_close) * 100, 2)

# 7️⃣ Output JSON me print karna
result = {
    "ticker": ticker,
    "predicted_close": round(float(predicted_close), 2),
    "current_close": round(float(current_close), 2),
    "trend": trend,
    "confidence": confidence
}

print(json.dumps(result))
