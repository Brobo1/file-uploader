import { loadingHandler } from "./loading.js";
import { deleteHandler } from "./delete.js";
import { fileHandler } from "./file.js";
import { Alpine } from "alpinejs";

window.deleteHandler = deleteHandler;
window.fileHandler = fileHandler;
window.Alpine = Alpine;
Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
  loadingHandler();
});
