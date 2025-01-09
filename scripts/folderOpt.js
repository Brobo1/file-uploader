function folderButtonHandler(folderId) {
  const btnContainer = document.getElementById(
    `folder-button-container${folderId}`,
  );
  const renameBtn = document.createElement("button");
  renameBtn.id = "rename-btn";

  console.log(btnContainer);
}
