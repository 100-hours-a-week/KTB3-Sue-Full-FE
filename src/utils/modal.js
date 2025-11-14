function showPostDeleteModal(){
    const modal = document.querySelector("#post-delete-modal")
    modal.classList.remove('hidden');
}

function hidePostDeleteModal(){
    const modal = document.querySelector('#post-delete-modal')
    modal.classList.add('hidden')
}

function showCommentDeleteModal(){
    const modal = document.querySelector("#comment-delete-modal")
    modal.classList.remove('hidden')
}

function hideCommentDeleteModal() {
    const modal = document.querySelector("#comment-delete-modal")
    modal.classList.add('hidden')
}

document.addEventListener('DOMContentLoaded', () => {
    const deletePostButton = document.querySelector('#post-delete-button')
    deletePostButton.addEventListener('click', showPostDeleteModal )

    const closePostModalButton = document.querySelector('#post-modal-close-button')
    closePostModalButton.addEventListener('click', hidePostDeleteModal )

    const deleteCommentButton = document.querySelector('#comment-delete-button')
    deleteCommentButton.addEventListener('click', showCommentDeleteModal)

    const closeCommentModalButton = document.querySelector('#comment-modal-close-button')
    closeCommentModalButton.addEventListener('click', hideCommentDeleteModal)
})
