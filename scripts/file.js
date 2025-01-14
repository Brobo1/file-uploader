function fileHandler(folderId) {
  const uploadForm = document.getElementById(
    `upload-form-container${folderId}`,
  );
  if (uploadForm.classList.contains("hidden")) {
    uploadForm.classList.remove("hidden");
    uploadForm.classList.add("flex");
  } else {
    uploadForm.classList.add("hidden");
    uploadForm.classList.remove("flex");
  }

  // document.addEventListener("click", handleClickOutside);
  //
  // function handleClickOutside(e) {
  //   if (!uploadForm.contains(e.target)) {
  //     uploadForm.classList.add("hidden");
  //     uploadForm.classList.remove("flex");
  //     document.removeEventListener("click", handleClickOutside); // Clean up listener
  //   }
  // }
}
