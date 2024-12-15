export async function getAllChapterByStoryId(storyId: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/chapter/list/${storyId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}

export async function getChapter(chapterId: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/chapter/detail/${chapterId}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        credentials: 'include',
    })
}
