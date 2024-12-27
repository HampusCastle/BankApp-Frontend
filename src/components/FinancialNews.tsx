/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { fetchFinancialNews } from "../services/marketNewsApi";
import BackButton from "./BackButton";

const FinancialNews = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError("");
      try {
        const data = await fetchFinancialNews();
        setNews(data);
      } catch {
        setError("Error fetching news");
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  return (
    <div className="bg-gray-900 p-4 rounded shadow-md">
      <BackButton />
      <h2 className="text-xl font-semibold text-purple-400 mb-4">Latest Financial News</h2>
      {loading && <p className="text-gray-400">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {news.length > 0 ? (
        <ul className="space-y-4">
          {news.map((article, index) => (
            <li key={index} className="bg-gray-700 p-4 rounded-md shadow-md">
              <h3 className="font-semibold text-lg">{article.title}</h3>
              <p className="text-sm">{article.description}</p>
              <a
                href={article.url}
                className="text-blue-500 hover:text-blue-400"
                target="_blank"
                rel="noopener noreferrer"
              >
                Read more
              </a>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400">No news available.</p>
      )}
    </div>
  );
};

export default FinancialNews;