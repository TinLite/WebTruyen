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
export async function createComment(
  storyId: string,
  chapterId: string,
  comment: { content: string }
) {
  return fetch(
    `${
      import.meta.env.VITE_API_URL
    }/api/comments/create/story/${storyId}/chapter/${chapterId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(comment),
    }
  );
}
export async function listCommentByChapter(storyId: string, chapterId: string) {
  return fetch(
    `${
      import.meta.env.VITE_API_URL
    }/api/comments/list/story/${storyId}/chapter/${chapterId}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
}
export async function likeComment(commentId: string) {
  return fetch(
    `${import.meta.env.VITE_API_URL}/api/comments/like/${commentId}`,
    {
      method: "POST",
      credentials: "include",
    }
  );
}
export async function unlikeComment(commentId: string) {
  return fetch(
    `${import.meta.env.VITE_API_URL}/api/comments/unlike/${commentId}`,
    {
      method: "DELETE",
      credentials: "include",
    }
  );
}
