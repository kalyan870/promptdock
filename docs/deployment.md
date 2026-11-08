# Deployment & Production Architecture

PromptDock 7.2 is deployed on Vercel's Global Edge Network, serving compiled React 19 + TypeScript assets from `dist/` with immutable asset caching and custom security headers.

## Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "outputDirectory": "dist",
  "cleanUrls": true,
  "headers": [
    {
      "source": "/images/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/assets/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    },
    {
      "source": "/(.*)",
      "headers": [
        { "key": "X-Content-Type-Options", "value": "nosniff" },
        { "key": "X-Frame-Options", "value": "DENY" },
        { "key": "X-XSS-Protection", "value": "1; mode=block" }
      ]
    }
  ]
}
```

## Production Deployment Workflow

```bash
# 1. Run full validation pipeline
npm run validate

# 2. Deploy to Vercel production
vercel deploy --prod --yes
```

- Production URL: [https://promptdock-eight.vercel.app](https://promptdock-eight.vercel.app)
- GitHub Repository: [https://github.com/kalyan870/promptdock](https://github.com/kalyan870/promptdock)
