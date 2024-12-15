export function createHistory(storyId: string, chapterId: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/history/create/story/${storyId}/chapter/${chapterId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export function listHistory() {
    return fetch(`${import.meta.env.VITE_API_URL}/api/history/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}