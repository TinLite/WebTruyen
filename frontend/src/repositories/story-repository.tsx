export async function listStory() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => res.json());
}
