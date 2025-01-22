import { loadingHandler } from "./loading.js";
import { deleteHandler } from "./delete.js";
import { fileHandler } from "./file.js";
import { Alpine } from "alpinejs";
import { renameHandler } from "./rename.js";
import { updateBrowserURL } from "./util/urlUpdate";

window.deleteHandler = deleteHandler;
window.fileHandler = fileHandler;
window.renameHandler = renameHandler;

window.Alpine = Alpine;
Alpine.start();

updateBrowserURL();

document.addEventListener("DOMContentLoaded", () => {
  loadingHandler();
});
