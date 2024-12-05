// rename.js
function toggleRenameForm(folderId) {
  const form = document.getElementById(`rename-form-${folderId}`);
  const button = document.getElementById(`rename-btn-${folderId}`);

  if (form.style.display === "none") {
    form.style.display = "block";
    button.style.display = "none"; // Hide the rename button
  } else {
    form.style.display = "none";
    button.style.display = "block"; // Show the rename button
  }
}
