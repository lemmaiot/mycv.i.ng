// Get the current path (removes starting/ending slashes)
const path = window.location.pathname.replace(/^\/+|\/+$/g, '');

// If the path is not empty and is not "index.html", redirect to error page
if (path && path !== 'index.html') {
  window.location.href = '/error.html';
}
