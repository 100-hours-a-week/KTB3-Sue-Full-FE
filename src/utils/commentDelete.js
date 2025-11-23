import { showCommentDeleteModal, hideCommentDeleteModal } from "./modal.js"

let currentDeleteCommentId = null

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('comment-delete-button')) {
        const wrapper = e.target.closest('.comment-container') 
        const comment_id = wrapper.dataset.id

        currentDeleteCommentId = comment_id
        console.log(currentDeleteCommentId)

        showCommentDeleteModal()
    }
})

document.querySelector(`#comment-modal-confirm-button`)
    .addEventListener('click', () => {
    if(!currentDeleteCommentId) return
    deleteComment(currentDeleteCommentId)
})

async function deleteComment(comment_id){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')
    
    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try{
        const response = await fetch(`http://localhost:8080/posts/${post_id}/comments/${currentDeleteCommentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id })
        })

        if(!response.ok){
            alert('댓글 삭제 실패')
            return
        }

        hideCommentDeleteModal()
        const deleteData = await response.json()

        console.log(deleteData.data)

        const deleteComment = document.querySelector(`.comment-container[data-id="${comment_id}"]`)
        deleteComment.remove()

        decreaseCommentCount()
    } catch(error){
        console.log(`comment delete error ${error}`)
    }
}

function decreaseCommentCount(){
    const commentCount = document.querySelector('#post-comment-count')
    const currentCount = Number(commentCount.textContent)
    commentCount.textContent = (currentCount - 1).toString()
}