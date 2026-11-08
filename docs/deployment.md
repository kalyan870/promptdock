# Deployment & Production Architecture

PromptDock 5.0 is hosted on Vercel's Global Edge Network with custom HTTP security headers and immutable asset caching.

## Vercel Configuration (`vercel.json`)

```json
{
  "version": 2,
  "outputDirectory": ".",
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

## Production Deployment Command

```bash
vercel deploy --prod --yes
```

- Production URL: `https://promptdock-eight.vercel.app`
