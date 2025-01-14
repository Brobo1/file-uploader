function renameHandler(folderId) {
  const renameForm = document.getElementById(
    `rename-form-container${folderId}`,
  );
  if (renameForm.classList.contains("hidden")) {
    renameForm.classList.remove("hidden");
    renameForm.classList.add("flex");
  } else {
    renameForm.classList.add("hidden");
    renameForm.classList.remove("flex");
  }

  document.addEventListener("click", handleClickOutside);

  function handleClickOutside(event) {
    if (!renameForm.contains(event.target)) {
      renameForm.classList.add("hidden");
      renameForm.classList.remove("flex");
      document.removeEventListener("click", handleClickOutside); // Clean up listener
    }
  }
}
