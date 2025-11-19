import { hideCommentDeleteModal } from "./modal.js"

export function initCommentDeleteConfirmButton(comment_id){
    const deleteConfirmButton = document.querySelector(`#comment-modal-confirm-button`)
    deleteConfirmButton.addEventListener('click', () => {
        deleteComment(comment_id)
    })
}

async function deleteComment(comment_id){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')
    
    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try{
        const response = await fetch(`http://localhost:8080/posts/${post_id}/comments/${comment_id}`, {
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

        const deleteData = await response.json()
        const deleteComment = deleteData.data
        console.log(deleteData)
        console.log(deleteComment)

        hideCommentDeleteModal()
        location.reload()
    } catch(error){
        console.log(`comment delete error ${error}`)
    }
}