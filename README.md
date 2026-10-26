# Shrikrish — Portfolio

A personal portfolio for software engineering, applied AI, and dependable systems. Built as a fast, responsive static site with a custom editorial visual identity.

## Run locally

Open `index.html` in a browser, or start a local server:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Contact form

The form uses [FormSubmit](https://formsubmit.co/) to deliver messages to the portfolio email address. On the first submission, FormSubmit sends a verification email to activate the form. Confirm it before relying on the form to receive messages.

## Publish with GitHub Pages

1. Push this project to a GitHub repository.
2. In the repository, open **Settings → Pages**.
3. Select **Deploy from a branch**, then choose `main` and `/ (root)`.
4. Save. GitHub Pages will show the published URL in the Pages settings.

## Project files

- `index.html` — portfolio content and page structure
- `styles.css` and `contact.css` — responsive design, diagrams, and form styling
- `script.js` — mobile navigation, current year, scroll reveals, and form confirmation

There is no build step or package installation. The display typefaces are loaded from Google Fonts; system fallbacks are included.
