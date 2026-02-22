# Deployment Guide: Vercel Setup

This document walks you through the steps to successfully deploy the AI Resume Analyzer to Vercel and configure the necessary API keys.

## Prerequisites

Before starting, ensure that your application code is pushed to a Git repository on GitHub, GitLab, or Bitbucket.

## 1. Required API Keys

This application uses the Google Gemini API to power the AI Resume analysis, ATS parsing, job matching, and bullet rewriting. 

You need exactly **one API key**:
- **`GEMINI_API_KEY`**: Get this by visiting the [Google AI Studio](https://aistudio.google.com/app/apikey) and generating a new API key. The free tier works perfectly for starting out.

## 2. Deploying to Vercel

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and log in.
2. Click **Add New...** -> **Project**.
3. Locate the repository containing the `AI Resume Analyzer` and click **Import**.
4. In the **Configure Project** section, give your project a name or leave the default.
5. Expand the **Environment Variables** section.
6. Add the following entry:
   - **Name**: `GEMINI_API_KEY`
   - **Value**: `paste_your_gemini_api_key_here`
7. Click **Deploy**.

Vercel will automatically detect that this is a Next.js application, install the dependencies using the `package.json`, and run the build command.

## 3. Project Configuration Included

The project already contains the necessary `vercel.json` file which overrides default serverless function limits for Vercel Hobby tier usage up to 60 seconds.

Similarly, the Next.js API Routes (`app/api/*/route.ts`) have been configured to use the **Edge Runtime** setting `export const maxDuration = 45;` and `export const runtime = 'edge';`. This accommodates the potentially longer initial latency from AI generation streams and circumvents standard Vercel serverless function request timeouts.

## Next Steps

Once the deployment completes automatically on Vercel:
- Visit the generated Vercel domain to test your deployed AI Resume Analyzer.
- Use the **Analytics** tab in Vercel to turn on free web analytics directly since the `@vercel/analytics` module has already been instrumented into the application `layout.tsx`.
