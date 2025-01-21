import { loadingHandler } from "./loading.js";
import { deleteHandler } from "./delete.js";
import { fileHandler } from "./file.js";
import { Alpine } from "alpinejs";
import { renameHandler } from "./rename.js";

window.deleteHandler = deleteHandler;
window.fileHandler = fileHandler;
window.renameHandler = renameHandler;

window.Alpine = Alpine;
Alpine.start();

document.addEventListener("DOMContentLoaded", () => {
  loadingHandler();
});
