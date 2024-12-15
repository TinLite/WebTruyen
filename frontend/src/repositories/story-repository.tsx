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


export async function listUpdatedChapterStory() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/newchapter/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
}

export async function listNewStory() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/newchapter/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
}

export async function listHighestRatingStory() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/rating/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
}

export async function getStoryDetail(id: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/detail/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
}

export async function getStoriesCreatedByMe() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/my/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  })
}

export async function createStory(data: { title: string, description: string }) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
}

export async function updateStory(id: string, data: { title: string, description: string }) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/update/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(data),
  })
}

export async function updateStoryCover(id: string, coverFile: File) {
  const formData = new FormData();
  formData.append("files", coverFile);
  return fetch(`${import.meta.env.VITE_API_URL}/api/story/update/${id}`, {
    method: "PATCH",
    credentials: "include",
    body: formData,
  })
}