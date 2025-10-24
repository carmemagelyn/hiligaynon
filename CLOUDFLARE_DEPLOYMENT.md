# Cloudflare Workers Deployment Instructions

## Method 1: Using API Token (Recommended)

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click "Create Token"
3. Choose "Edit Cloudflare Workers" template
4. Set the API token as environment variable:
   ```bash
   export CLOUDFLARE_API_TOKEN="your_token_here"
   ```
5. Deploy:
   ```bash
   wrangler deploy --name hiligaynon
   ```

## Method 2: Manual Login

If the OAuth login fails, try:
```bash
wrangler auth login
```

Then deploy with:
```bash
wrangler deploy
```

## Your Target URL
Your app will be available at: **hiligaynon.carmemagelyn.workers.dev**

## Environment Variables Needed
After deployment, set these in the Cloudflare Dashboard:
- `VITE_AWS_ACCESS_KEY_ID` (for speech synthesis)
- `VITE_AWS_SECRET_ACCESS_KEY` (for speech synthesis)
- `VITE_AWS_REGION` (for speech synthesis)
- `VITE_PEXELS_API_KEY` (for image search)