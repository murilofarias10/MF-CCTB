import React from "react";

const cards = [
  {
    key: "total_posts",
    label: "Total Posts Scanned",
    icon: "📡",
    color: "blue",
    description: "All Reddit posts fetched",
  },
  {
    key: "geolocation_issues",
    label: "Geolocation Issues",
    icon: "📍",
    color: "purple",
    description: "Posts flagged as geo errors",
  },
  {
    key: "high_alerts",
    label: "HIGH Alerts",
    icon: "🚨",
    color: "red",
    description: "Critical issues requiring action",
  },
  {
    key: "subreddits_monitored",
    label: "Subreddits Monitored",
    icon: "🔭",
    color: "cyan",
    description: "Active subreddit channels",
  },
  {
    key: "analyzed_posts",
    label: "Analyzed Posts",
    icon: "🤖",
    color: "green",
    description: "Posts classified by AI",
  },
  {
    key: "unanalyzed_posts",
    label: "Pending Analysis",
    icon: "⏳",
    color: "amber",
    description: "Posts awaiting AI review",
  },
];

const colorMap = {
  blue: "border-blue-500/30 bg-blue-500/10 text-blue-400",
  purple: "border-purple-500/30 bg-purple-500/10 text-purple-400",
  red: "border-red-500/30 bg-red-500/10 text-red-400",
  cyan: "border-cyan-500/30 bg-cyan-500/10 text-cyan-400",
  green: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
  amber: "border-amber-500/30 bg-amber-500/10 text-amber-400",
};

const valueColorMap = {
  blue: "text-blue-300",
  purple: "text-purple-300",
  red: "text-red-300",
  cyan: "text-cyan-300",
  green: "text-emerald-300",
  amber: "text-amber-300",
};

export default function KpiCards({ stats }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
      {cards.map((card) => (
        <div
          key={card.key}
          className={`rounded-xl border p-4 ${colorMap[card.color]} flex flex-col gap-2`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xl">{card.icon}</span>
          </div>
          <div className={`text-3xl font-bold ${valueColorMap[card.color]}`}>
            {stats ? (stats[card.key] ?? 0).toLocaleString() : "—"}
          </div>
          <div>
            <div className="text-sm font-medium text-slate-200">{card.label}</div>
            <div className="text-xs text-slate-500 mt-0.5">{card.description}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
