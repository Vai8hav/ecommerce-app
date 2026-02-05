# Deployment Guide

This project is a Create React App (SPA). Use the instructions below to deploy on either Vercel or Netlify.

## Vercel
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Vercel, click **New Project** and import the repo.
3. Confirm the build settings:
   - Build Command: `npm run build`
   - Output Directory: `build`
4. Deploy.

The included `vercel.json` ensures SPA rewrites to `index.html`.

## Netlify
1. Push this repo to GitHub/GitLab/Bitbucket.
2. In Netlify, click **Add new site** → **Import an existing project**.
3. Confirm the build settings:
   - Build Command: `npm run build`
   - Publish Directory: `build`
4. Deploy.

The included `netlify.toml` sets the build and SPA redirect to `index.html`.
