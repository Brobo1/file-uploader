async function deleteFolderHandler(folderId) {
  try {
    const res = await fetch(`/folder/${folderId}/delete`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data.message);
      location.reload();
    }
  } catch (err) {
    console.error("Error deleting folder", err);
  }
}

async function deleteFileHandler(folderId, fileId) {
  try {
    const res = await fetch(`/folder/${folderId}/delete-file/${fileId}`, {
      method: "delete",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (res.ok) {
      const data = await res.json();
      console.log(data.message);
      location.reload();
    }
  } catch (err) {
    console.error("Error deleting folder", err);
  }
}
