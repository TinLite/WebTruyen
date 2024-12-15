export function addToBookmark(storyId: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/follows/add/${storyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
export function removeFromBookmark(storyId: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/follows/remove/${storyId}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
export function listBookmarkedStory() {
    return fetch(`${import.meta.env.VITE_API_URL}/api/follows/list`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}