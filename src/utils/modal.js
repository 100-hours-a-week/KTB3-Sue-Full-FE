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

export function initPostModalEvents(){
    const deletePostButton = document.querySelector('#post-delete-button')
    if(deletePostButton)
        deletePostButton.addEventListener('click', showPostDeleteModal )

    const closePostModalButton = document.querySelector('#post-modal-close-button')
    if(closePostModalButton)
        closePostModalButton.addEventListener('click', hidePostDeleteModal )

}

export function initCommentModalEvents(){
    const deleteCommentButton = document.querySelector('#comment-delete-button')
    if(deleteCommentButton)
        deleteCommentButton.addEventListener('click', showCommentDeleteModal)

    const closeCommentModalButton = document.querySelector('#comment-modal-close-button')
    if(closeCommentModalButton)
        closeCommentModalButton.addEventListener('click', hideCommentDeleteModal)
}
