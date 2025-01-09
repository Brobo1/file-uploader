function folderButtonHandlerOver(folderId) {
  const renameBtn = document.getElementById(
    `folder-options-buttons${folderId}`,
  );
  renameBtn.style.display = "flex";
  console.log("over");
}

function folderButtonHandlerOut(folderId) {
  const renameBtn = document.getElementById(
    `folder-options-buttons${folderId}`,
  );
  renameBtn.style.display = "none";
  console.log("out");
}
