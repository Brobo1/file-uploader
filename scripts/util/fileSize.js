exports.fileSizeShortener = (folder) => {
  const units = ["B", "KB", "MB", "GB"];
  const files = folder.files;
  if (!files.length) {
    return folder;
  }
  for (const file of files) {
    let size = parseInt(file.size);

    let unitIndex = 0;
    while (size >= 1024 && unitIndex < units.length - 1) {
      size /= 1024;
      unitIndex++;
    }
    file.size = `${size.toFixed(2)} ${units[unitIndex]}`;
  }
};
