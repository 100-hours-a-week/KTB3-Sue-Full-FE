document.addEventListener('click', (e) => {
    if (e.target.classList.contains('comment-update-button')) {
        const wrapper = e.target.closest('.comment-container') 
        const comment_id = wrapper.dataset.id

        const comment_content = wrapper.querySelector('.comment-content').textContent

        initCommentWriteInput(comment_content)

        changeUpdateMode(comment_id)
    }
})

function changeWriteMode(){
    const commentSubmitButton = document.querySelector('#comment-submit-button')
    commentSubmitButton.dataset.action = 'write'
    commentSubmitButton.textContent = '댓글 작성'
    commentSubmitButton.dataset.id = null
}

function changeUpdateMode(comment_id){
    const commentSubmitButton = document.querySelector('#comment-submit-button')
    commentSubmitButton.dataset.action = 'update'
    commentSubmitButton.textContent = '댓글 수정'
    commentSubmitButton.dataset.id = comment_id
}


export function initCommentWriteInput(content){
    const commentWriteForm = document.querySelector('#comment-write-content')
    commentWriteForm.value = content
}

export async function update(comment_id, content){
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

        changeWriteMode()
        initCommentWriteInput("")
    } catch(error){
        console.log(`comment update error ${error}`)
    }
}