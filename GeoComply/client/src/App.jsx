import React, { useState, useEffect, useCallback } from "react";
import { getPosts, fetchRedditPosts, analyzeWithAI, getStats } from "./api";
import KpiCards from "./components/KpiCards";
import PostsTable from "./components/PostsTable";
import Filters from "./components/Filters";
import UsMap from "./components/UsMap";
import ActionButtons from "./components/ActionButtons";
import Toast from "./components/Toast";

const SUBREDDITS = [
  "onlinegambling",
  "sportsbetting",
  "poker",
  "gamblingaddiction",
  "sportsbook",
];

const CLASSIFICATIONS = [
  "Geolocation error",
  "App bug",
  "User confusion",
  "Other not relevant",
];

const ALERT_LEVELS = ["HIGH", "MEDIUM", "LOW"];

export default function App() {
  const [posts, setPosts] = useState([]);
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState({ fetch: false, analyze: false, refresh: false });
  const [toast, setToast] = useState(null);
  const [filters, setFilters] = useState({
    subreddit: "",
    classification: "",
    alert_level: "",
    search: "",
  });

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const loadData = useCallback(async () => {
    try {
      const [postsRes, statsRes] = await Promise.all([getPosts(), getStats()]);
      setPosts(postsRes.posts || []);
      setStats(statsRes.stats || null);
    } catch (err) {
      showToast("Failed to load data from server. Is the backend running?", "error");
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const handleFetch = async () => {
    setLoading((l) => ({ ...l, fetch: true }));
    try {
      const result = await fetchRedditPosts();
      showToast(
        `Fetched ${result.new_posts} new posts from ${SUBREDDITS.length} subreddits.`,
        "success"
      );
      await loadData();
    } catch (err) {
      showToast(
        err.response?.data?.error || "Reddit fetch failed. Check your API credentials.",
        "error"
      );
    } finally {
      setLoading((l) => ({ ...l, fetch: false }));
    }
  };

  const handleAnalyze = async () => {
    setLoading((l) => ({ ...l, analyze: true }));
    try {
      const result = await analyzeWithAI();
      showToast(result.message || "Analysis complete.", "success");
      await loadData();
    } catch (err) {
      showToast(
        err.response?.data?.error || "AI analysis failed. Check your OpenAI API key.",
        "error"
      );
    } finally {
      setLoading((l) => ({ ...l, analyze: false }));
    }
  };

  const handleRefresh = async () => {
    setLoading((l) => ({ ...l, refresh: true }));
    try {
      await loadData();
      showToast("Dashboard refreshed.", "info");
    } finally {
      setLoading((l) => ({ ...l, refresh: false }));
    }
  };

  // Apply all active filters to the posts list
  const filteredPosts = posts.filter((post) => {
    if (filters.subreddit && post.subreddit !== filters.subreddit) return false;
    if (filters.classification && post.classification !== filters.classification) return false;
    if (filters.alert_level && post.alert_level !== filters.alert_level) return false;
    if (
      filters.search &&
      !post.title.toLowerCase().includes(filters.search.toLowerCase()) &&
      !post.text?.toLowerCase().includes(filters.search.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      {/* Header */}
      <header className="bg-slate-900 border-b border-slate-800 px-6 py-4">
        <div className="max-w-screen-2xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              GC
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">GeoComply iGaming Monitor</h1>
              <p className="text-xs text-slate-400">Reddit intelligence dashboard</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse inline-block" />
            {stats ? `${stats.total_posts} posts tracked` : "Loading..."}
          </div>
        </div>
      </header>

      <main className="max-w-screen-2xl mx-auto px-6 py-6 space-y-6">
        {/* Action Buttons */}
        <ActionButtons
          loading={loading}
          onFetch={handleFetch}
          onAnalyze={handleAnalyze}
          onRefresh={handleRefresh}
        />

        {/* KPI Cards */}
        <KpiCards stats={stats} />

        {/* Map + Filters row */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          <div className="xl:col-span-2">
            <UsMap posts={posts} />
          </div>
          <div>
            <Filters
              filters={filters}
              setFilters={setFilters}
              subreddits={SUBREDDITS}
              classifications={CLASSIFICATIONS}
              alertLevels={ALERT_LEVELS}
              resultCount={filteredPosts.length}
              totalCount={posts.length}
            />
          </div>
        </div>

        {/* Posts Table */}
        <PostsTable posts={filteredPosts} />
      </main>

      {/* Toast Notification */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
