/**
 * Crawlers commonly used for AI model training / bulk scraping.
 * robots.txt is voluntary — pair with Cloudflare bot rules for stronger blocking.
 * @see https://developers.cloudflare.com/fundamentals/reference/bots/
 */
export const AI_TRAINING_BOTS = [
  "GPTBot", // OpenAI training
  "Google-Extended", // Google Gemini training (does not affect Google Search)
  "anthropic-ai",
  "ClaudeBot",
  "Bytespider", // ByteDance
  "CCBot", // Common Crawl
  "cohere-ai",
  "Diffbot",
  "FacebookBot",
  "meta-externalagent",
  "Applebot-Extended", // Apple AI training (does not affect Apple Search)
  "PerplexityBot",
  "Amazonbot",
  "YouBot",
  "Omgilibot",
  "ImagesiftBot",
  "AI2Bot",
  "TimpiBot",
  "webzio-extended",
] as const;
