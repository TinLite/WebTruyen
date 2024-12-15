export async function login(email: string, password: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: email, password }),
        credentials: 'include',
    })
}

// export async function logout() {
//     return fetch(`${import.meta.env.VITE_API_URL}/api/auth/logout`, {
//         method: 'POST',
//         credentials: 'include',
//     })
// }

export async function register(username: string, email: string, displayname: string, password: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/users/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, displayname, password }),
        credentials: 'include',
    })
}
