export async function login(email: string, password: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    }).then((res) => {
        if (res.ok)
            return res.json()
    });
}

export async function register(name: string, email: string, sdt: string, password: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, sdt, password }),
        credentials: 'include',
    }).then((res) => {
        if (res.ok)
            return res.json()
    });
}