export function updateBrowserURL() {
  const forbiddenSegments = ["/create-folder", "/upload-file"]; // Add other action routes if needed
  const currentPath = window.location.pathname;

  forbiddenSegments.forEach((segment) => {
    if (currentPath.includes(segment)) {
      const updatedURL = currentPath.replace(segment, "");
      window.history.replaceState(null, "", updatedURL);
    }
  });
}
