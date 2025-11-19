const commentInput = document.querySelector('#comment-write-content')
let fillCommentContent = false


commentInput.addEventListener('focusout', (e) => {
    if(commentInput.value.trim() !== ""){
        fillCommentContent = true
        changeButtonColor()
    }
})

const commentSubmitButton = document.querySelector('.comment-form-submit')
function changeButtonColor(){
    if(fillCommentContent){
        commentSubmitButton.style.backgroundColor = "#7F6AEE"
    } else {
        commentSubmitButton.style.backgroundColor = "#ACA0EB"
    }
}
commentSubmitButton.addEventListener('click', async(e) => {
    e.preventDefault()
    if(!fillCommentContent){
        return
    }

    await write()
    location.reload()
})



async function write(){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    const content = commentInput.value.trim()

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}/comments`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ user_id, content })
        })

        if(!response.ok){
            alert('댓글 작성 실패')
            return
        }

        const commentData = await response.json()
        const comment = commentData.commentData
        console.log(comment)

        // 댓글 리스트 재로딩
    } catch(error){
        console.log(`commet write error ${error}`)
    }

}