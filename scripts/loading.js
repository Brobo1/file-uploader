export function loadingHandler() {
  const loader = document.getElementById("loading-wheel");
  // Hide loader initially
  loader.classList.add("hidden");

  // 1) Show loader on form submissions
  document.querySelectorAll("form").forEach((form) => {
    form.addEventListener("submit", () => {
      loader.classList.remove("hidden");
    });
  });

  // 2) Show loader on link clicks that lead to a new page
  const anchorSelector = "[data-id='load']";
  document.querySelectorAll(anchorSelector).forEach((anchor) => {
    anchor.addEventListener("click", () => {
      loader.classList.remove("hidden");
    });
  });

  // 3) Hide loader once the page fully loads
  window.addEventListener("DOMContentLoaded", () => {
    loader.classList.add("hidden");
  });
}
