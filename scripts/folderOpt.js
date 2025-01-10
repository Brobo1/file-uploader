function folderButtonHandlerOver(folderId) {
  const renameBtn = document.getElementById(
    `folder-options-buttons${folderId}`,
  );
  renameBtn.style.display = "flex";
}

function folderButtonHandlerOut(folderId) {
  const renameBtn = document.getElementById(
    `folder-options-buttons${folderId}`,
  );
  renameBtn.style.display = "none";
}
