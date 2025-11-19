function showPostDeleteModal(){
    const modal = document.querySelector("#post-delete-modal")
    modal.classList.remove('hidden');
}

function hidePostDeleteModal(){
    const modal = document.querySelector('#post-delete-modal')
    modal.classList.add('hidden')
}

export function showCommentDeleteModal(){
    const modal = document.querySelector("#comment-delete-modal")
    modal.classList.remove('hidden')
}

export function hideCommentDeleteModal() {
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