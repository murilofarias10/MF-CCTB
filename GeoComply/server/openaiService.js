const OpenAI = require("openai");

let openaiClient = null;

function getClient() {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("Missing OPENAI_API_KEY in .env file.");
    }
    openaiClient = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openaiClient;
}

const SYSTEM_PROMPT = `You are an analyst monitoring Reddit posts related to the U.S. iGaming industry (sports betting, online gambling, poker, daily fantasy sports).

Your task is to classify each Reddit post and assess its severity.

Classification categories:
1. "Geolocation error" – Post describes a problem where the user cannot access a service due to location detection, GPS issues, VPN blocks, state restrictions, or geo-fencing errors.
2. "App bug" – Post describes a technical malfunction: crashes, freezes, login failures, payment errors, UI glitches, or any software defect.
3. "User confusion" – Post shows a user misunderstanding how a feature works, asking how to do something, or confused about rules/promotions.
4. "Other not relevant" – Post is a general discussion, strategy talk, bet sharing, celebration, or anything unrelated to a technical issue.

Alert levels:
- "HIGH" – Geolocation errors or critical app bugs that prevent users from accessing paid services.
- "MEDIUM" – Non-critical bugs, repeated user confusion, or posts with multiple complaints.
- "LOW" – Minor issues, general confusion, or non-technical posts.

Respond ONLY with valid JSON in this exact format (no extra text):
{
  "classification": "<one of the four categories above>",
  "alert_level": "<HIGH|MEDIUM|LOW>",
  "reason": "<one concise sentence explaining your decision>"
}`;

/**
 * Classify a single Reddit post using OpenAI.
 * @param {{ title: string, text: string, subreddit: string }} post
 * @returns {{ classification: string, alert_level: string, reason: string }}
 */
async function classifyPost(post) {
  const client = getClient();

  const userMessage = `Subreddit: r/${post.subreddit}
Title: ${post.title}
Body: ${post.text ? post.text.slice(0, 1000) : "(no body text)"}`;

  const response = await client.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userMessage },
    ],
    temperature: 0.2,
    max_tokens: 200,
  });

  const raw = response.choices[0].message.content.trim();

  // Parse the JSON response from OpenAI
  const parsed = JSON.parse(raw);

  // Validate expected fields are present
  if (!parsed.classification || !parsed.alert_level) {
    throw new Error(`Unexpected OpenAI response format: ${raw}`);
  }

  return parsed;
}

/**
 * Classify all unanalyzed posts in the provided array.
 * Processes in batches to avoid rate limits.
 * @param {Array} posts - All posts from reddit_posts.json
 * @param {Function} onProgress - Callback(current, total) for progress updates
 * @returns {{ updated: Array, stats: Object }}
 */
async function analyzePosts(posts, onProgress) {
  const unanalyzed = posts.filter((p) => !p.classification);
  const total = unanalyzed.length;

  if (total === 0) {
    return { updated: posts, stats: { analyzed: 0, skipped: posts.length } };
  }

  let analyzed = 0;
  let errors = 0;

  for (const post of unanalyzed) {
    try {
      const result = await classifyPost(post);
      post.classification = result.classification;
      post.alert_level = result.alert_level;
      post.reason = result.reason;
      post.analyzed_at = new Date().toISOString();
      analyzed++;
    } catch (err) {
      console.warn(`  Could not classify post ${post.id}: ${err.message}`);
      post.classification = "Other not relevant";
      post.alert_level = "LOW";
      post.reason = "Classification failed – defaulting to low priority.";
      post.analyzed_at = new Date().toISOString();
      errors++;
    }

    if (onProgress) onProgress(analyzed + errors, total);

    // Small delay between API calls to respect rate limits
    await new Promise((r) => setTimeout(r, 200));
  }

  const stats = {
    analyzed,
    errors,
    skipped: posts.length - total,
    total_posts: posts.length,
  };

  return { updated: posts, stats };
}

module.exports = { analyzePosts, classifyPost };
