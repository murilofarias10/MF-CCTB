# GeoComply iGaming Reddit Monitor

A full-stack dashboard that monitors Reddit posts related to the U.S. iGaming industry, classifies them using OpenAI GPT, and displays alerts with a US map visualization.

## Architecture

```
GeoComply/
├── server/                   # Node.js + Express backend
│   ├── server.js             # Express app & API routes
│   ├── redditService.js      # Reddit API integration
│   ├── openaiService.js      # OpenAI classification
│   ├── reddit_posts.json     # Local data store (auto-created)
│   └── .env                  # API credentials (fill in yours)
└── client/                   # React + Vite + Tailwind frontend
    └── src/
        ├── App.jsx            # Main dashboard
        ├── api.js             # API client
        └── components/
            ├── KpiCards.jsx   # Top KPI metrics
            ├── PostsTable.jsx # Posts data table with pagination
            ├── Filters.jsx    # Subreddit/classification/alert filters
            ├── UsMap.jsx      # US map with complaint hotspots
            ├── ActionButtons.jsx
            └── Toast.jsx
```

## Setup

### 1. Get API credentials

> **No Reddit API key needed!** Posts are fetched via pre-configured RSS feeds from [FetchRSS](https://fetchrss.com).

**OpenAI API (required for AI classification):**
1. Go to https://platform.openai.com/api-keys
2. Create a new secret key

### 2. Configure the server

```bash
cd server
# Edit .env and set your OPENAI_API_KEY
```

### 3. Start the backend

```bash
cd server
npm install
npm run dev    # or: npm start
# Server runs on http://localhost:5000
```

### 4. Start the frontend

```bash
cd client
npm install
npm run dev
# Dashboard opens at http://localhost:3000
```

## API Endpoints

| Method | Path | Description |
|--------|------|-------------|
| GET | `/posts` | Retrieve all stored posts |
| GET | `/stats` | Get KPI aggregates |
| POST | `/fetch` | Pull fresh posts from Reddit |
| POST | `/analyze` | Classify posts with OpenAI |
| DELETE | `/posts/clear` | Clear all stored posts |

## Dashboard Features

- **Fetch Reddit Posts** – Pulls the latest posts from 8 iGaming subreddits
- **Analyze with AI** – Sends unanalyzed posts to GPT-4o-mini for classification
- **Refresh Dashboard** – Reloads data without re-fetching
- **KPI Cards** – Total posts, geo issues, HIGH alerts, subreddits monitored
- **US Map** – Shows geolocation complaint hotspots across iGaming states
- **Posts Table** – Filterable, paginated table with expandable AI reasoning
- **Filters** – Filter by subreddit, classification, alert level, or keyword

## Classification Categories

| Category | Alert Levels |
|----------|-------------|
| Geolocation error | HIGH / MEDIUM |
| App bug | HIGH / MEDIUM / LOW |
| User confusion | MEDIUM / LOW |
| Other not relevant | LOW |

## Monitored Subreddits (via FetchRSS)

`r/onlinegambling` · `r/sportsbetting` · `r/poker` · `r/gamblingaddiction` · `r/sportsbook`
