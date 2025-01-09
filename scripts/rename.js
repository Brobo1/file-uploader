let isRename = true;

function renameHandler(folderId) {
  const renameForm = document.getElementById(`rename-form${folderId}`);
  isRename = !isRename;
  if (isRename) {
    renameForm.style.display = "none";
  } else renameForm.style.display = "block";
}
