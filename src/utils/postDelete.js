export async function deletePost(){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id })
        })

        if(!response.ok){
            alert('게시글 삭제 실패')
            return
        }

        const deleteData = await response.json()

        const daletePost = deleteData.deleteData

        window.location.href = "http://localhost:5501/src/pages/posts.html"
    } catch(error){
        console.log(`delete post error ${error}`)
    }
}