import { useEffect, useState } from "react";
import {
  Copy,
  Check,
  ExternalLink,
  Link as LinkIcon,
  Trash2,
  Zap,
} from "lucide-react";

const URLShortener = () => {
  const [shortenLink, setShortenLink] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<
    Array<{ original: string; short: string; id: string }>
  >([]);

  const shortIoApi = import.meta.env.VITE_SHORTIO_API;
  const domain = import.meta.env.VITE_SHORTIO_DOMAIN;

  // Load history from localStorage
  useEffect(() => {
    const savedHistory = localStorage.getItem("urlHistory");
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  // Save history to localStorage
  useEffect(() => {
    localStorage.setItem("urlHistory", JSON.stringify(history));
  }, [history]);

  const handleShorten = async () => {
    if (!inputVal) {
      setError("Please enter a URL");
      return;
    }

    // Basic URL validation
    try {
      new URL(inputVal);
      setError("");
    } catch (_) {
      setError("Please enter a valid URL");
      return;
    }

    setIsLoading(true);

    try {
      const res = await fetch("https://api.short.io/links", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization: shortIoApi,
        },
        body: JSON.stringify({
          allowDuplicates: false,
          originalURL: inputVal,
          ttl: 0,
          domain: domain,
        }),
      });

      if (!res.ok) {
        throw new Error(`Failed to shorten link: ${res.statusText}`);
      }

      const data = await res.json();
      setShortenLink(data.shortURL);

      // Add to history
      const newEntry = {
        original: inputVal,
        short: data.shortURL,
        id: Math.random().toString(36).substring(2, 9),
      };
      setHistory([newEntry, ...history]);
      setInputVal("");
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to shorten URL. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isCopied) {
      navigator.clipboard.writeText(shortenLink);
      const timer = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isCopied, shortenLink]);

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem("urlHistory");
  };

  const deleteItem = (id: string) => {
    const updatedHistory = history.filter((item) => item.id !== id);
    setHistory(updatedHistory);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10">
          <div className="flex items-center justify-center mb-4">
            <div className="bg-cyan-500/10 p-3 rounded-full">
              <Zap className="h-10 w-10 text-cyan-400" />
            </div>
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">
            URL <span className="text-cyan-400">Shortener</span>
          </h1>
          <p className="text-cyan-200">
            Shorten your long URLs quickly and easily
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Section */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-cyan-500/20">
            <div className="space-y-4">
              <div className="flex flex-col gap-3">
                <input
                  type="text"
                  placeholder="Paste a link to shorten it"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  className="px-4 py-3 bg-gray-700 text-white border border-cyan-500/30 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 outline-none transition placeholder-gray-400"
                  disabled={isLoading}
                  onKeyPress={(e) => e.key === "Enter" && handleShorten()}
                />
                <button
                  onClick={handleShorten}
                  disabled={isLoading}
                  className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium rounded-lg hover:from-cyan-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition flex items-center justify-center disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-t-2 border-r-2 border-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <Zap className="w-5 h-5 mr-2" />
                      Shorten URL
                    </>
                  )}
                </button>
              </div>
              {error && (
                <p className="text-red-400 text-sm flex items-center mt-1">
                  {error}
                </p>
              )}
            </div>

            {shortenLink && (
              <div className="mt-6 p-4 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                <p className="text-cyan-300 font-medium mb-2 flex items-center">
                  <LinkIcon className="h-4 w-4 mr-2" /> Your URL has been
                  shortened!
                </p>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                  <a
                    href={shortenLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 font-medium truncate flex-grow hover:text-cyan-300 transition flex items-center gap-1"
                  >
                    {shortenLink} <ExternalLink className="h-4 w-4" />
                  </a>
                  <button
                    onClick={() => setIsCopied(true)}
                    className="px-4 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 rounded-lg hover:bg-cyan-500/20 transition flex items-center gap-2"
                  >
                    {isCopied ? (
                      <>
                        <Check className="h-4 w-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="h-4 w-4" /> Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* History Section */}
          <div className="bg-gray-800 rounded-xl shadow-2xl p-6 border border-purple-500/20 overflow-hidden">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-white">
                Shortened URLs
              </h2>
              {history.length > 0 && (
                <button
                  onClick={clearHistory}
                  className="text-sm text-purple-400 hover:text-purple-300 transition flex items-center gap-1"
                >
                  <Trash2 className="h-4 w-4" /> Clear All
                </button>
              )}
            </div>

            {history.length === 0 ? (
              <div className="text-center py-12 text-gray-400">
                <div className="flex justify-center mb-4">
                  <div className="bg-purple-500/10 p-4 rounded-full">
                    <LinkIcon className="h-8 w-8 text-purple-400" />
                  </div>
                </div>
                <p>Your shortened URLs will appear here</p>
              </div>
            ) : (
              <div className="space-y-4 max-h-96 overflow-y-auto pr-2">
                {history.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 bg-gray-700/50 rounded-lg border border-purple-500/20 group hover:border-purple-500/40 transition"
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-grow">
                        <a
                          href={item.short}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-cyan-400 font-medium hover:text-cyan-300 transition flex items-center gap-1 mb-1"
                        >
                          {item.short} <ExternalLink className="h-3 w-3" />
                        </a>
                        <p className="text-gray-400 text-sm truncate mb-2">
                          {item.original.length > 50
                            ? item.original.slice(0, 50) + "..."
                            : item.original}
                        </p>
                      </div>
                      <button
                        onClick={() => deleteItem(item.id)}
                        className="text-gray-500 hover:text-red-400 transition p-1 opacity-0 group-hover:opacity-100"
                        aria-label="Delete"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(item.short);
                        setIsCopied(true);
                      }}
                      className="text-xs text-cyan-400 hover:text-cyan-300 transition flex items-center gap-1"
                    >
                      <Copy className="h-3 w-3" /> Copy URL
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default URLShortener;
