export function renameHandler(id, type) {
  console.log(id, type);

  const renameForm = document.getElementById(
    `rename-form-container-${type}-${id}`,
  );

  if (renameForm.classList.contains("hidden")) {
    // Step 1: Remove hidden and visually show the modal
    renameForm.classList.remove("hidden");
    renameForm.classList.add("flex", "opacity-0", "scale-90");

    // Step 2: Queue transition classes after visibility change
    requestAnimationFrame(() => {
      renameForm.classList.add("opacity-100", "scale-100");
      renameForm.classList.remove("opacity-0", "scale-90");
    });
  } else {
    // Step 1: Transition out by removing visible animation classes
    renameForm.classList.remove("opacity-100", "scale-100");
    renameForm.classList.add("opacity-0", "scale-90");

    // Step 2: Wait for the animation to finish, then hide it completely
    setTimeout(() => {
      renameForm.classList.add("hidden");
      renameForm.classList.remove("flex");
    }, 200); // Tailwind's `duration-200`
  }

  // Add a one-time event listener for clicks outside the modal
  document.addEventListener("click", handleClickOutside);

  function handleClickOutside(e) {
    if (
      !renameForm.contains(e.target) &&
      !e.target.closest(`[data-toggle-rename="${type}-${id}"]`)
    ) {
      renameForm.classList.remove("opacity-100", "scale-100");
      renameForm.classList.add("opacity-0", "scale-90");

      setTimeout(() => {
        renameForm.classList.add("hidden");
        renameForm.classList.remove("flex");
      }, 200);

      // Clean up the event listener
      document.removeEventListener("click", handleClickOutside);
    }
  }
}
