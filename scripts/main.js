import { loadingHandler } from "./loading.js";
import { deleteHandler } from "./delete.js";
import { fileHandler } from "./file.js";

window.deleteHandler = deleteHandler;
window.fileHandler = fileHandler;

document.addEventListener("DOMContentLoaded", () => {
  loadingHandler();
});
