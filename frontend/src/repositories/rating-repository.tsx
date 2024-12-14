export async function getRatingSummary(storyId: string) {
  return fetch(`${import.meta.env.VITE_API_URL}/api/rate/summary/story/${storyId}`, {
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
  })
}