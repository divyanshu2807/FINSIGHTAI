import yfinance as yf
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_absolute_error
import joblib

# 1️⃣ Stock symbol
ticker = "TCS.NS"  # You can change this to any stock like "RELIANCE.NS", "INFY.NS", etc.

# 2️⃣ Download last 1 year of data
print(f"\n📥 Downloading stock data for {ticker}...")
data = yf.download(ticker, period="1y", interval="1d")

# 3️⃣ Feature engineering
data['MA7'] = data['Close'].rolling(7).mean()
data['MA14'] = data['Close'].rolling(14).mean()
data['MA50'] = data['Close'].rolling(50).mean()
data.dropna(inplace=True)

# 4️⃣ Prepare features (X) and target (y)
X = data[['Open', 'High', 'Low', 'Close', 'Volume', 'MA7', 'MA14', 'MA50']]
y = data['Close'].shift(-1)  # next day close price
X = X[:-1]
y = y[:-1]

# 5️⃣ Split into train and test sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, shuffle=False)

# 6️⃣ Train Random Forest Model
print("\n🚀 Training model...")
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# 7️⃣ Evaluate
preds = model.predict(X_test)
mae = mean_absolute_error(y_test, preds)
print(f"\n✅ Model trained successfully!")
print(f"📉 Mean Absolute Error: {mae:.2f}")

# 8️⃣ Save model
joblib.dump(model, "stock_predictor.pkl")
print("\n💾 Model saved as 'stock_predictor.pkl' in ml folder.")

# 9️⃣ Predict next day close
latest = X.tail(1)
predicted_close = model.predict(latest)[0]
current_close = float(data['Close'].iloc[-1])
trend = "UP" if predicted_close > current_close else "DOWN"

print(f"\n🔮 Predicted next close: {predicted_close:.2f}")
print(f"📈 Current close: {current_close:.2f}")
print(f"📊 Predicted trend: {trend}")
