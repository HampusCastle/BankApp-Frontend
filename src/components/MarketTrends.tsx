/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { fetchMarketTrends } from "../services/marketNewsApi";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/24/outline";
import BackButton from "./BackButton";

const MarketTrends = () => {
  const [symbol, setSymbol] = useState<string>("");
  const [marketData, setMarketData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const getMarketTrendsData = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchMarketTrends({ symbol });
      setMarketData(data);
    } catch {
      setError("Error fetching market trends");
    } finally {
      setLoading(false);
    }
  };

  const quickSymbols = ["AAPL", "IBM", "GOOG", "MSFT", "AMZN"];

  const handleQuickSymbolClick = (symbol: string) => {
    setSymbol(symbol);
    getMarketTrendsData();
  };

  const formatPrice = (value: string) => (value ? parseFloat(value).toFixed(2) : "N/A");

  const formatChangePercent = (value: string) =>
    value ? parseFloat(value.replace("%", "")).toFixed(2) + "%" : "N/A";

  const getTrendIcon = (trend: string) => {
    if (trend === "The market has gone up today!") {
      return <ChevronUpIcon className="w-6 h-6 text-green-500" />;
    } else if (trend === "The market has gone down today.") {
      return <ChevronDownIcon className="w-6 h-6 text-red-500" />;
    }
    return null;
  };

  return (
    <div className="bg-gray-900 p-4 rounded shadow-md">
      <BackButton />
      <h2 className="text-xl font-semibold text-purple-400 mb-4">Market Trends</h2>
      <div className="flex gap-4 mb-4">
        {quickSymbols.map((symbol) => (
          <button
            key={symbol}
            onClick={() => handleQuickSymbolClick(symbol)}
            className="px-4 py-2 bg-gray-700 hover:bg-purple-500 rounded-lg text-white transition"
          >
            {symbol}
          </button>
        ))}
      </div>
      <input
        type="text"
        value={symbol}
        onChange={(e) => setSymbol(e.target.value)}
        placeholder="Enter stock symbol (e.g., AAPL)"
        className="px-4 py-2 bg-gray-700 rounded-lg text-white placeholder-gray-400 mb-4"
      />
      <button
        onClick={getMarketTrendsData}
        className="px-4 py-2 bg-purple-500 hover:bg-purple-400 rounded-lg text-white transition mb-4"
      >
        Get Market Trend
      </button>
      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {marketData && (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <div className="flex items-center gap-2">
            <p className="font-semibold">{marketData.trend}</p>
            {getTrendIcon(marketData.trend)}
          </div>
          <p>
            <span className="font-semibold">Price:</span> {formatPrice(marketData.price)}
          </p>
          <p>
            <span className="font-semibold">Change:</span> {formatChangePercent(marketData.changePercent)}
          </p>
        </div>
      )}
    </div>
  );
};

export default MarketTrends;