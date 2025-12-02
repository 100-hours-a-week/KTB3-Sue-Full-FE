document.addEventListener('DOMContentLoaded', () => {
    loadPostData()
})

async function loadPostData(){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    console.log(post_id)

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            alert(`게시글 정보 불러오기 실패`)
            return
        }

        const postData = await response.json()
        console.log(postData)
        const post = postData.data

        renderPostData(post)
    } catch(error){
        console.log(`load post error ${error}`)
    }
}

function renderPostData(post){

    const div = document.createElement('div')
    div.className = "post-data"


    const titleInput = document.querySelector('#post-update-title-input')
    titleInput.value = post.title

    const contentInput = document.querySelector('#post-update-content-input')
    contentInput.value = post.content

    const postImageText = document.querySelector("#post-update-file-span")
    if(post.images){
        postImageText.textContent = post.images[0].image_url

    } else {
        postImageText.value = '파일을 선택해주세요.'
    }

}


const postUpdateFileButton = document.querySelector('#post-update-file-button')
postUpdateFileButton.addEventListener('click', () => {
    const fileInput = document.querySelector("#post-update-image")
    fileInput.click()
})

const fileInput = document.querySelector("#post-update-image")
fileInput.addEventListener('change', (e) => {
    const selectedFile = e.target.files[0]

    const fileSpan = document.querySelector('#post-update-file-span')

    if(selectedFile){
        fileSpan.textContent = selectedFile.name
    }
})

const postUpdateSubmitButton = document.querySelector('.submitButton')
postUpdateSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()

    update()
})

async function update() {
    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const author_id = userInfo.id

    const titleInput = document.querySelector("#post-update-title-input")
    const contentInput = document.querySelector("#post-update-content-input")
    const newImageInput = document.querySelector("#post-update-image")

    const title = titleInput.value.trim()
    const content = contentInput.value.trim()
    const images = newImageInput.files
    const postType = "FREE"

    console.log(author_id)
    console.log(title)
    console.log(content)
    console.log(images)
    console.log(postType)

    const formData = new FormData()
    formData.append("author_id", author_id)
    formData.append("title", title)
    formData.append("content", content)
    for(let i = 0; i < images.length; i++){
        formData.append("newImages", images[i])
    }
    formData.append("postType", postType)

    console.log(formData)

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}`, {
            method: 'PATCH',
            body: formData
        })

        if(!response.ok){
            alert('게시글 수정 실패')
            return
        }

        const updateData = await response.json()

        const updatePost = updateData.data

        window.location.href="http://localhost:5501/src/pages/posts.html"

    } catch(error){
        console.log(`update post error ${error}`)
    }


}