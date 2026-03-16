<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/2a7fa751-5459-48b4-920b-f15e8c958b40

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Create `.env.local` from [.env.example](./.env.example)
3. Set `OPENAI_API_KEY` in `.env.local`
4. Run the app:
   `npm run dev`

## Security-first deployment

The OpenAI key now runs only on the server side through `/api/chat` and `/api/translate`.
Do not expose `VITE_OPENAI_API_KEY` in the browser build.

### Recommended publish target

This project is prepared for Vercel with:

- [vercel.json](./vercel.json)
- [api/chat.ts](./api/chat.ts)
- [api/translate.ts](./api/translate.ts)

### Production environment variable

Set this on your hosting platform:

- `OPENAI_API_KEY`

### Publish on Vercel

1. Import the project into Vercel
2. Add the environment variable `OPENAI_API_KEY`
3. Deploy

The static app will be served from `dist/` and the OpenAI requests will go through the serverless functions.

### Exact Vercel setup

1. Push this project to GitHub
2. Open [Vercel](https://vercel.com/)
3. Click `Add New` > `Project`
4. Import the GitHub repository
5. In `Environment Variables`, add:
   `OPENAI_API_KEY=your_real_key`
6. Keep these defaults:
   `Framework Preset: Vite`
   `Build Command: npm run build`
   `Output Directory: dist`
7. Click `Deploy`

### After deploy

1. Open the deployed URL
2. Test one normal message in chat
3. Test translation
4. Confirm there is no OpenAI key exposed in browser source or client env

### Optional CLI deploy

1. Install Vercel CLI:
   `npm i -g vercel`
2. In the project folder, run:
   `vercel`
3. Add the production secret:
   `vercel env add OPENAI_API_KEY`
4. Redeploy:
   `vercel --prod`
