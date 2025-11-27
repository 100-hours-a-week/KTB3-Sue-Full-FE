export function renderPosts(posts){
    const container = document.querySelector('#post-list-container')
    
    const fragment = new DocumentFragment()

    posts.forEach(post => {
        console.log(post)
        const div = document.createElement('div')
        div.className = 'post'
        div.dataset.postId = post.post_id

        div.addEventListener('click', () => {
            // showPostDetailModal(div.dataset.postId)
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

        let postImageHtml = ''

        if(post.images && post.images.length > 0){
            postImageHtml = `
                <img src="http://localhost:8080/upload/postImage/${post.images[0].image_url}" class="post-image" alt="error">
            `  
        }

        div.innerHTML = `
            <p class="post-title">${post.title}</p>
            <p class="post-content-summary">${post.content.substring(0, 10)}</p>
            ${postImageHtml}
            <div class="post-info-list">
                <div class="post-info">
                    <p>좋아요 ${post.likeCount}</p>
                    <p>댓글 ${post.commentCount}</p>
                    <p>조회수 ${post.watch}</p>
                </div>
            </div>
            <div class="author-info">
                ${profileImageHtml}
                <p class="author-nickname">${post.authorNickname}</p>
                <p class="post-write-date">${createdDate} ${createdTime}</p>
            </div>
        `

        fragment.appendChild(div)
    })

    container.appendChild(fragment)
}