export function loadingHandler() {
  let loader = document.getElementById("loading-wheel");
  window.addEventListener("submit", () => {
    loader.classList.remove("hidden");
  });
}
