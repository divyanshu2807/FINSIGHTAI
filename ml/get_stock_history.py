import sys
import json
import yfinance as yf
import pandas as pd

# 1️⃣ Ticker from command-line
if len(sys.argv) > 1:
    ticker = sys.argv[1]
else:
    ticker = "TCS.NS"

# 2️⃣ Fetch last 10 days stock data
data = yf.download(ticker, period="10d", interval="1d")

# 3️⃣ Handle no data case
if data.empty:
    print(json.dumps({"error": "No data found"}))
    sys.exit()

# 4️⃣ Convert to JSON-friendly format
history = []
for i, row in data.iterrows():
    history.append({
        "date": i.strftime("%Y-%m-%d"),
        "close": round(float(row["Close"]), 2)
    })

# 5️⃣ Print result (Node.js will read this)
print(json.dumps({"ticker": ticker, "history": history}))
