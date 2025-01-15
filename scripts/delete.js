async function deleteHandler(id, type) {
  try {
    const res = await fetch(`/folder/${type}/${id}/delete`, {
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
    console.error(`Error deleting ${type}`, err);
  }
}
