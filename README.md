# Kasanely

Kasanely is a static HTML tool for visually comparing two web pages or local HTML files.

It runs in the browser without a build step. Open `index.html`, enter URLs or choose local HTML files, then compare them side by side, as an overlay, with a swipe handle, or with difference blending.

## Features

- Compare two URLs side by side
- Load local `.html` / `.htm` files from your machine
- Japanese / English UI switch
- Overlay comparison with swipe mode
- Difference view with adjustable opacity
- Preset viewport sizes for mobile, tablet, and desktop
- Adjustable full-page height
- Vertical position adjustment for both sides
- Horizontal position adjustment for the right side
- Sticky settings and position adjustment panels
- Basic-auth URL generation for simple protected pages
- No install, no build, no backend

## Usage

1. Open `index.html` in your browser.
2. For each side, either enter a URL or choose a local HTML file.
3. Select the viewport size and page height.
4. Choose side-by-side or overlay mode.
5. In overlay mode, use swipe or difference display.
6. Use the position controls to align the two pages.

You can also serve the folder locally:

```bash
python -m http.server 4173
```

Then open:

```text
http://127.0.0.1:4173/index.html
```

## Local HTML Files

Local HTML files are loaded through the browser's file picker and displayed as temporary `blob:` URLs.

This avoids requiring a local server for simple static HTML checks. The selected file is not uploaded anywhere and is only used inside your current browser session.

Notes:

- Linked assets inside the selected HTML may not load if their paths depend on a specific server or folder structure.
- Browser security rules still apply.
- If your page depends on API calls, routing, modules, or local assets, serving the folder with a local server is usually more reliable.

## Basic Authentication

Because Kasanely is a static browser-only tool, it cannot attach arbitrary `Authorization` headers to iframe requests.

When Basic authentication is enabled, Kasanely creates a URL in this form:

```text
https://user:pass@example.com/
```

Some browsers or target sites may reject userinfo URLs. Credentials are not stored by Kasanely, but they are included in the iframe URL while the page is loaded, so use this only in a trusted environment.

## iframe Limitations

Some sites cannot be displayed in Kasanely because they block iframe embedding with headers such as:

- `X-Frame-Options`
- `Content-Security-Policy: frame-ancestors`

Those restrictions are enforced by the browser. A static HTML tool cannot bypass them. For those cases, a server-side proxy or a different testing setup is required.

## Repository Structure

```text
.
├── index.html
├── static/
│   ├── app.js
│   ├── styles.css
│   ├── llms.txt
│   └── robots.txt
└── README.md
```

## License

Add your preferred license before wider redistribution.
