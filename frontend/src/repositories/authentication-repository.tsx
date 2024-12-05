export async function login(email: string, password: string) {
    return fetch(`${process.env.VITE_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
    }).then((res) => res.json());
}

export async function register(name: string, email: string, sdt: string, password: string) {
    return fetch(`${process.env.VITE_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, sdt, password }),
        credentials: 'include',
    }).then((res) => res.json());
}