# Secure Authentication Setup

## What is already in the repository

The public site now has an authentication boundary, a login page, and an admin-area shell. Those pages deliberately do not pretend to provide real security on their own.

## Why an external provider is required

GitHub Pages serves static HTML, CSS, JavaScript, and image files. A visitor can inspect every public file sent to their browser. Therefore a password embedded in JavaScript, a hidden admin link, or a localStorage flag cannot securely protect a private page.

For real private access, the project should use one of these architectures:

1. **Cloudflare Access in front of a protected admin hostname/path.** This keeps the existing static publishing workflow while enforcing identity at the edge.
2. **A real authentication provider plus a backend/serverless API.** The backend must enforce authorization for any private data. The browser should receive only short-lived access tokens and should never contain a provider secret.

## Recommended project split

- Public site: `https://buddybootz.com/`
- Private admin: a separately protected hostname such as `https://admin.buddybootz.com/`
- Public newsletter/waitlist: Formspree or a dedicated email service
- Private content/data: backend storage with server-side authorization

## Credentials and tokens

Never commit provider client secrets, API secrets, private keys, refresh tokens, or passwords into this repository.

Public browser configuration may include a provider's public client identifier when the provider explicitly documents it as safe for browser use. Secrets belong in the provider dashboard or server-side environment variables.

## Current state

`auth-config.js` intentionally reports `provider: 'not-configured'`. The admin page therefore remains disabled until a real provider is connected. That is safer than deploying a fake password wall.
