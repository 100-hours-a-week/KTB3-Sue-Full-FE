const commentInput = document.querySelector('#comment-write-content')
let fillCommentContent = false


commentInput.addEventListener('focusout', (e) => {
    if(commentInput.value.trim() !== ""){
        fillCommentContent = true
        changeButtonColor()
    }
})

const commentUpdateButton = document.querySelector('#comment-update-confirm-button')

commentUpdateButton.addEventListener('click', () => {
    const comment_id = commentUpdateButton.dataset.id
    const comment_content = document.querySelector('#comment-write-content').value.trim()

    updateComment(comment_id, comment_content)
})

function changeButtonColor(){
    if(fillCommentContent){
        commentUpdateButton.style.backgroundColor = "#7F6AEE"
    } else {
        commentUpdateButton.style.backgroundColor = "#ACA0EB"
    }
}


export function changeWriteButton(comment_id){
    const commentWriteButton = document.querySelector('#comment-write-confirm-button')
    commentWriteButton.classList.add('hidden')  

    const commentUpdateButton = document.querySelector('#comment-update-confirm-button')
    commentUpdateButton.classList.remove('hidden')
    commentUpdateButton.dataset.id = comment_id

}

function changeUpdateButton(){
    const commentUpdateButton = document.querySelector('#comment-update-confirm-button')
    commentUpdateButton.classList.add('hidden')

    const commentWriteButton = document.querySelector('#comment-write-confirm-button')
    commentWriteButton.classList.remove('hidden')
}


export function initCommentWriteInput(content){
    const commentWriteForm = document.querySelector('#comment-write-content')
    commentWriteForm.value = content
}

async function updateComment(comment_id, content){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')
    
    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try{
        const response = await fetch(`http://localhost:8080/posts/${post_id}/comments/${comment_id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, content })
        })

        if(!response.ok){
            alert('댓글 수정 실패')
            return
        }

        const commentUpdateData = await response.json()
        const commentUpdate = commentUpdateData.data

        console.log(commentUpdate)

        changeUpdateButton()
        initCommentWriteInput("")
        location.reload()
    } catch(error){
        console.log(`comment update error ${error}`)
    }
}