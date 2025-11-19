import { initCommentDeleteConfirmButton } from "./commentDelete.js"
import { changeWriteButton, initCommentWriteInput } from "./commentUpdate.js"
import { showCommentDeleteModal, hideCommentDeleteModal } from "./modal.js"

document.addEventListener('DOMContentLoaded', () => {
    loadComments()
    
    const closeCommentModalButton = document.querySelector('#comment-modal-close-button')
    if(closeCommentModalButton)
        closeCommentModalButton.addEventListener('click', hideCommentDeleteModal)
})


document.addEventListener('click', (e) => {

    if (e.target.classList.contains('comment-update-button')) {
        const wrapper = e.target.closest('.comment-container') 
        const comment_id = wrapper.dataset.id

        const comment_content = wrapper.querySelector('.comment-content').textContent

        initCommentWriteInput(comment_content)

        changeWriteButton(comment_id, comment_content)
    }

    if (e.target.classList.contains('comment-delete-button')) {
        const wrapper = e.target.closest('.comment-container') 
        const comment_id = wrapper.dataset.id

        console.log(comment_id)

        initCommentDeleteConfirmButton(comment_id)

        showCommentDeleteModal()
    }

})

async function loadComments() {
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try{
        const response = await fetch(`http://localhost:8080/posts/${post_id}/comments?page=0&size=10&direction=desc`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            alert('댓글 목록 조회 실패')
            return
        }

        const commentData = await response.json()
        const commentList = commentData.data.content

        renderCommentList(commentList, user_id)

    } catch(error){
        console.log(`load comment list error ${error}`)
    }

}

function renderCommentList(commentList, user_id){
    const container = document.querySelector('.comment-list-container')

    commentList.forEach(comment => {
        const div = document.createElement('div')
        div.className = 'comment-container'
        div.dataset.id = comment.id

        console.log(comment)

        let profileImageHtml = ''

        if(comment.user_profileImage){
            profileImageHtml = `
            <img src="http://localhost:8080/upload/profileImage/${comment.user_profileImage}" class="comment-author-profile-image">
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

        let myCommentEditButton = ''
        if(user_id === comment.user_id){
            console.log*(user_id)
            console.log(comment.user_id)
            myCommentEditButton = `
                <div class="comment-edit-container">
                    <button class="comment-update-button">수정</button>
                    <button class="comment-delete-button">삭제</button>
                </div>
            `
        }

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

        container.appendChild(div)

    })
}

