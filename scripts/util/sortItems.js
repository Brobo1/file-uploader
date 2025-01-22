exports.sortItems = (items, sortBy, sortDir) => {
  let folders = items.subFolders;
  let files = items.files;

  if (!sortBy) {
    return;
  }

  folders.sort((a, b) => {
    let colA = a[sortBy];
    let colB = b[sortBy];

    if (sortBy === "name") {
      colA = colA.toLowerCase();
      colB = colB.toLowerCase();
      if (sortDir === "desc") {
        return colA.localeCompare(colB, "en");
      } else {
        return colB.localeCompare(colA, "en");
      }
    } else if (sortBy === "createdAt") {
      return sortDir === "asc" ? colB - colA : colA - colB;
    }
  });

  files.sort((a, b) => {
    let colA = a[sortBy];
    let colB = b[sortBy];

    if (sortBy === "name") {
      colA = colA.toLowerCase();
      colB = colB.toLowerCase();
      return sortDir === "desc"
        ? colA.localeCompare(colB, "en")
        : colB.localeCompare(colA, "en");
    } else if (sortBy === "createdAt") {
      return sortDir === "asc" ? colB - colA : colA - colB;
    } else if (sortBy === "size") {
      colA = parseInt(colA);
      colB = parseInt(colB);
      return sortDir === "asc" ? colB - colA : colA - colB;
    }
  });
};
