export async function listUser() {
    return fetch(`${import.meta.env.VITE_API_URL}/api/users/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => res.json());
}