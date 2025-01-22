export function fileHandler(folderId) {
  const uploadForm = document.getElementById(
    `upload-form-container${folderId}`,
  );

  if (uploadForm.classList.contains("hidden")) {
    // Step 1: Show the modal with transitions
    uploadForm.classList.remove("hidden");
    uploadForm.classList.add("flex", "opacity-0", "scale-90");

    // Step 2: Trigger the fade-in and grow effect
    requestAnimationFrame(() => {
      uploadForm.classList.add("opacity-100", "scale-100");
      uploadForm.classList.remove("opacity-0", "scale-90");
    });
  } else {
    // Step 1: Begin the fade-out and shrink effect
    uploadForm.classList.remove("opacity-100", "scale-100");
    uploadForm.classList.add("opacity-0", "scale-90");

    // Step 2: After animation, hide the modal
    setTimeout(() => {
      uploadForm.classList.add("hidden");
      uploadForm.classList.remove("flex");
    }, 300); // Matches Tailwind's `duration-300`
  }
}
