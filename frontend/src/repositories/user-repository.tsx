export async function listUser() {
    return fetch(`${import.meta.env.VITE_API_URL}/api/users/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => {
        if (res.ok)
            return res.json()
    });
}

export async function getProfile(id: string = "me") {
    return fetch(`${import.meta.env.VITE_API_URL}/api/users/profile/${id}/detail`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: "include"
    }).then((res) => {
        if (res.ok)
            return res.json()
    });
}