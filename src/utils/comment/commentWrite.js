export async function write(content){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    console.log(user_id)
    try {
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id, content })
        })

        if(!response.ok){
            alert('댓글 작성 실패')
            return
        }

        const commentData = await response.json()
        const commentResponse = commentData.data

        console.log(commentResponse)
        writeCommentRender(commentResponse)
        increaseCommentCount()
    } catch(error){
        console.log(`commet write error ${error}`)
    }

}

function writeCommentRender(comment){
    const container = document.querySelector('.comment-list-container')

    const div = document.createElement('div')
    div.className = 'comment-container'
    div.dataset.id = comment.id

    let profileImageHtml = ''

    if(comment.user_profileImage){
        profileImageHtml = `
         <img src="https://focus-place-profile-image.s3.ap-northeast-2.amazonaws.com/${comment.user_profileImage}" class="comment-author-profile-image">
        `
    } else {
        profileImageHtml = `
            <div clss="comment-author-profile-image"></div>
        `
    }

    let createdDate = ``
    let createdTime = ``
        
    if(comment.createdAt){
        const [createdDateData, createdTimeData] = comment.createdAt.split('T')

        createdDate = createdDateData
        createdTime = createdTimeData.split('.')[0]
    }

    const myCommentEditButton = `
             <div class="comment-edit-container">
                <button class="comment-update-button">수정</button>
                <button class="comment-delete-button">삭제</button>
            </div>
        `

    div.innerHTML = `
        <div class="comment-display-container">
            <div class="comment-info-container">
                ${profileImageHtml}
                 <p class="comment-author-nickname" id="${comment.user_id}">${comment.user_nickname}</p>
                 <p class="comment-write-date">${createdDate} ${createdTime}</p>
            </div>
            <p class="comment-content">${comment.content}</p>
        </div> 
        ${myCommentEditButton}  
        `

    container.prepend(div)
}

function increaseCommentCount(){
    const commentCount = document.querySelector('#post-comment-count')
    const currentCount = Number(commentCount.textContent)
    commentCount.textContent = (currentCount + 1).toString()
}