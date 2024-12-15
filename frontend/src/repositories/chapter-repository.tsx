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

export async function createChapter(storyId: string, title: string, content: string, chapterNumber: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/chapter/create`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ StoryId: storyId, Title: title, Content: content, ChapterNumber: chapterNumber }),
        credentials: 'include',
    })
}

export async function updateChapter(chapterId: string, storyId: string, data: { Title?: string, Content?: string, ChapterNumber?: string }) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/chapter/${chapterId}/update/story/${storyId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
        credentials: 'include',
    })
}

export async function deleteChapter(chapterId: string, storyId: string) {
    return fetch(`${import.meta.env.VITE_API_URL}/api/chapter/delete/${chapterId}/story/${storyId}`, {
        method: 'DELETE',
        credentials: 'include',
    })
}