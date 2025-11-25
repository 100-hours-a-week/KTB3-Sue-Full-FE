document.addEventListener('DOMContentLoaded', () => {
    loadPosts()
})

async function loadPosts(){
    try {
        const page = 0
        const size = 10
        const response = await fetch(`http://localhost:8080/posts?page=${page}&size=${size}`, {
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

function renderPosts(posts){
    const container = document.querySelector('#post-list-container')
    
    const fragment = new DocumentFragment()

    posts.forEach(post => {
        console.log(post)
        const div = document.createElement('div')
        div.className = 'post'

        div.addEventListener('click', () => {
            localStorage.setItem("postId", post.post_id)
            window.location.href = `/src/pages/postDetail.html?post_id=${post.post_id}`
        })

        let profileImageHtml = ''

        if(post.authorProfileImage){
            profileImageHtml = `
            <img src="http://localhost:8080/upload/profileImage/${post.authorProfileImage}" class="author-profile-image">
            `
        } else {
            profileImageHtml = `
                <div clss="author-profile-image"></div>
            `
        }

        let createdDate = ``
        let createdTime = ``
        if(post.createdAt){
            const [createdDateData, createdTimeData] = post.createdAt.split('T')
            console.log(createdDateData)
            console.log(createdTimeData)

            const createdDateSplit = createdDateData.split('-')
            createdDate = createdDateData
            createdTime = createdTimeData.split('.')[0]
            const [year, month, day] = createdDateSplit
        }

        div.innerHTML = `
            <p class="post-title">${post.title}</p>
            <div class="post-info-list">
                <div class="post-info">
                    <p>좋아요 ${post.likeCount}</p>
                    <p>댓글 ${post.commentCount}</p>
                    <p>조회수 ${post.watch}</p>
                </div>
                <p class="post-write-date">${createdDate} ${createdTime}</p>
            </div>
            <hr class="bar" />
            <div class="author-info">
                ${profileImageHtml}
                <p class="author-nickname">${post.authorNickname}</p>
            </div>
        `

        fragment.appendChild(div)
    })

    container.appendChild(fragment)
}
