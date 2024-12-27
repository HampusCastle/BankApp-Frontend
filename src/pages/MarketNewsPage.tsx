import MarketTrends from "../components/MarketTrends";
import FinancialNews from "../components/FinancialNews";

const MarketNewsPage = () => (
  <div className="bg-gray-900 text-white min-h-screen p-8">
    <h1 className="text-3xl font-bold text-purple-400 mb-6 text-center">BankApp - Financial Information</h1>
    <div className="space-y-8">
      <MarketTrends />
      <FinancialNews />
    </div>
  </div>
);

export default MarketNewsPage;