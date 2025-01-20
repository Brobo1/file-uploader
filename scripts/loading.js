export function loadingHandler() {
  const loader = document.getElementById("loading-wheel");

  document.addEventListener("click", (e) => {
    const isNavElem = (elem) => elem.closest("a[href]");
    if (isNavElem(e.target)) {
      loader.classList.remove("hidden");
    }
  });

  window.addEventListener("DOMContentLoaded", () => {
    loader.classList.add("hidden");
  });
}
