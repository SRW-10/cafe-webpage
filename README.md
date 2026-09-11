# Soulful Treats Cafe
A small pink-and-white cafe website made with plain HTML,CSS and local media files.

## Start the site
Open this file in a browser:

`first-page/first page.html`
The welcome image is displayed in a vertical scroll frame.

## Project structure
```text
cafe/
|- first-page/
|  |- first page.html
|  |- first page.jpg
|  `- style1.css
|- main page/
|  |- app.js
|  `- style.css
|  |- menu page.html
|  |- soulfultreats.html
|  |- startpage1.html
|  |- startpage1.txt
|  |- startpage2.html
|  |- virtual tour.html
|  |- cafeee.jpg
|  |- imageee.jpg
|  |- khana.jpg
|  |- menu.jpg
|  |- ofiice.gif
|  |- stars animation.gif
|  |- virtual tour.mp4
|  `- winnie the pooh.gif
```
## Main pages
- `first-page/first page.html`: opening page and entry point.
- `main page/startpage2.html`: login-style entry page with client-side validation.
- `main page/soulfultreats.html`: cafe home, menu preview, reviews, contact form, and virtual-tour link.
- `main page/menu page.html`: full menu page.
- `main page/virtual tour.html`: video tour page.
- `main page/startpage1.html`: alternate visitor form.
- `main page/app.js`: smooth navigation, sticky-page interactions, opening-hours status, theme switching, countdown, form feedback, persistent browser reviews, image previews, photo carousels, and menu search.
- `main page/style.css`: shared styles and page-specific rules selected by each page's body class.
- The home and menu pages use horizontally scrollable photo cards. The full menu includes live search and suggestion buttons.
- Reservations and reviews are client-side demonstrations. Reviews are saved in the current browser with `localStorage`; no server receives form data.

## Notes
- The pages use relative paths so they can be opened locally from this folder.
- The contact and login forms use browser-side JavaScript only; they do not send data to a server.
- `startpage1.html` and `startpage1.txt` contain older references to images stored on another computer. Replace those paths with local filenames if those alternate pages are used.
- No web server or package installation is required; these are static HTML files.
