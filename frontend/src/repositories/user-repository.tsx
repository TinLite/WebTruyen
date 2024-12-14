export async function adminUpdateUser(id: string, data: any) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/admin/update/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(data),
    }
  );
  return res.json();
}

export async function listUser() {
  return fetch(`${import.meta.env.VITE_API_URL}/api/users/list`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  }).then((res) => {
    if (res.ok) return res.json();
  });
}

export async function getProfile(id: string = "me") {
  return fetch(
    `${import.meta.env.VITE_API_URL}/api/users/profile/${id}/detail`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  ).then((res) => {
    if (res.ok) return res.json();
  });
}
export async function lockUser(id: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/lock/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!res.ok) {
    return res.json();
  }
}
export async function unlockUser(id: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/unlock/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!res.ok) {
    return res.json();
  }
}
export async function deleteUser(id: string) {
  const res = await fetch(
    `${import.meta.env.VITE_API_URL}/api/users/delete/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  if (!res.ok) {
    return res.json();
  }
}
