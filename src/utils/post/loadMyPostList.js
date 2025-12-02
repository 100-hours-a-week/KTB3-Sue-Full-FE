import { renderPosts } from "./renderPosts.js"

document.addEventListener('DOMContentLoaded', () => {
    loadMyPosts()

    const postWriteButton = document.querySelector('.write-post-button')
    if(postWriteButton){
        postWriteButton.addEventListener('click', (e) => {
            e.preventDefault()

            window.location.href = "/src/pages/postWrite.html"
        })
    }
})

async function loadMyPosts(){
    const urlParams = new URLSearchParams(window.location.search)
    const user_id = urlParams.get('user_id')

    console.log(user_id)

    try {
        const page = 0
        const size = 10
        const response = await fetch(`http://localhost:8080/api/posts/author/${user_id}?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if(!response.ok){
            aler(`게시물 목록 불러오기 실패`)
            return
        }

        const postsData = await response.json()
        console.log(postsData)
        const postList = postsData.data.content
        console.log(postList)

        renderPosts(postList)

    } catch(error){
        console.log(`load posts error ${error}`)
    }
}
