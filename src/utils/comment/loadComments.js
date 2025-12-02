import { hideCommentDeleteModal } from "../modal.js"
import { write } from "./commentWrite.js"
import { update } from "./commentUpdate.js"

let fillCommentContent = false

document.addEventListener('DOMContentLoaded', () => {
    loadComments()
    
    const closeCommentModalButton = document.querySelector('#comment-modal-close-button')
    if(closeCommentModalButton)
        closeCommentModalButton.addEventListener('click', hideCommentDeleteModal)
})

async function loadComments() {
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try{
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}/comments?page=0&size=10&direction=desc`, {
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

    const fragment = new DocumentFragment()

    commentList.forEach(comment => {
        const div = document.createElement('div')
        div.className = 'comment-container'
        div.dataset.id = comment.id

        console.log(comment)

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

        fragment.appendChild(div)

    })

    container.appendChild(fragment)
}


const commentButton = document.querySelector('#comment-submit-button')
const commentInput = document.querySelector('#comment-write-content')
commentButton.addEventListener('click', (e) => {
    const comment_content = commentInput.value.trim()

    console.log(e.target.dataset.action)
    if(e.target.dataset.action === 'write'){
        write(comment_content)
        commentInput.value = ""
        fillCommentContent = false
        changeButtonColor()
    } else {
        const comment_id = e.target.dataset.id
        update(comment_id, comment_content)
    }
})

commentInput.addEventListener('focusout', (e) => {
    if(commentInput.value.trim() !== ""){
        fillCommentContent = true
        changeButtonColor()
    }
})

function changeButtonColor(){
    if(fillCommentContent){
        commentButton.style.backgroundColor = "#635A5A"
    } else {
        commentButton.style.backgroundColor = "#878080"
    }
}