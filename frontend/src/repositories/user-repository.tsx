export async function listUser() {
    return fetch(`${process.env.VITE_API_URL}/users/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    }).then((res) => res.json());
}