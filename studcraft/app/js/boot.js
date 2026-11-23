// The app, its worker, and its key handling only start in a top-level window.
if (document.documentElement.classList.contains('unframed')) import('./app.js');
