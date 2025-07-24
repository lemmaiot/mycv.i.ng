// Example: Validate link availability via fetch
const testURL = "https://mycv.i.ng"; // or dynamically from input/query

fetch(testURL, { method: 'HEAD', mode: 'no-cors' })
  .then(response => {
    // In 'no-cors' mode, you can't access status directly, assume success
    console.log("Link seems okay.");
  })
  .catch(error => {
    // Redirect to error page on fetch failure
    window.location.href = "error.html";
  });
