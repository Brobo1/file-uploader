function renameHandler(id, type) {
  console.log(id, type);
  const renameForm = document.getElementById(
    `rename-form-container-${type}-${id}`,
  );
  if (renameForm.classList.contains("hidden")) {
    renameForm.classList.remove("hidden");
    renameForm.classList.add("flex");
  } else {
    renameForm.classList.add("hidden");
    renameForm.classList.remove("flex");
  }

  document.addEventListener("click", handleClickOutside);

  function handleClickOutside(e) {
    if (!renameForm.contains(e.target)) {
      renameForm.classList.add("hidden");
      renameForm.classList.remove("flex");
      document.removeEventListener("click", handleClickOutside); // Clean up listener
    }
  }
}
