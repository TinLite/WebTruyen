export async function adminLockStory(id: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/story/admin/lock/${id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  return res.json();
}
export async function listStory() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) return res.json();
  });
}
