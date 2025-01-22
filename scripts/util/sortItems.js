exports.sortItems = (items, sortBy, sortDir) => {
  if (!sortBy) return;

  const compareName = (nameA, nameB) => {
    const lowerA = nameA.toLowerCase();
    const lowerB = nameB.toLowerCase();
    return sortDir === "desc"
      ? lowerA.localeCompare(lowerB, "en")
      : lowerB.localeCompare(lowerA, "en");
  };

  const compareDate = (dateA, dateB) => {
    return sortDir === "desc" ? dateA - dateB : dateB - dateA;
  };

  const compareSize = (sizeA, sizeB) => {
    const numA = parseInt(sizeA);
    const numB = parseInt(sizeB);
    return sortDir === "desc" ? numA - numB : numB - numA;
  };

  const compareItems = (itemA, itemB) => {
    const valueA = itemA[sortBy];
    const valueB = itemB[sortBy];
    if (sortBy === "name") {
      return compareName(valueA, valueB);
    } else if (sortBy === "createdAt") {
      return compareDate(valueA, valueB);
    } else if (sortBy === "size") {
      return compareSize(valueA, valueB);
    }
  };

  items.subFolders.sort(compareItems);
  items.files.sort(compareItems);
};
