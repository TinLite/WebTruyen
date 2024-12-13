export async function listComment() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/comments/listall`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) return res.json();
  });
}
export async function listCount() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/comments/count`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) return res.json();
  });
}
export async function deleteComment(id: string) {
  return fetch(
    `${import.meta.env.VITE_API_URL}/api/comments/admin/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => res.json());
}
