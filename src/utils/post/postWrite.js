let fillPostTitle = false
let fillPostContent = false

const postTitleInput = document.querySelector('#post-write-title')
postTitleInput.addEventListener('focusout', (e) => {
    if(postTitleInput.value !== ""){
        fillPostTitle = true
        changeButtonColor()
    } else {
        fillPostTitle = false
        changeButtonColor()
    }
})

const postContentInput = document.querySelector('#post-write-content')
postContentInput.addEventListener('focusout', (e) => {
    if(postContentInput.value.trim() !== ""){
        fillPostContent = true
        changeButtonColor()
    } else {
        fillPostContent = false
        changeButtonColor()
    }
})

const postWriteFileButton = document.querySelector('#post-write-file-button')

postWriteFileButton.addEventListener('click', () => {
    const fileInput = document.querySelector('#post-write-image')
    fileInput.click()
})

const fileInput = document.querySelector('#post-write-image')
fileInput.addEventListener('change', (e) => {
    if(e.target.files.length > 3){
        noticeHelperMessage('*이미지는 최대 3개까지 첨부 가능합니다.', 'post-write-image', '76%')
    }
    const selectedFile = e.target.files[0]

    const fileSpan = document.querySelector('#post-write-file-span')
    
    if(selectedFile){
        console.log(selectedFile)
        fileSpan.textContent = selectedFile.name
    }
})

const postWriteSubmitButton = document.querySelector('#post-write-submit-button')
postWriteSubmitButton.addEventListener('click', (e) => {
    e.preventDefault()
    console.log('click')
    if(fillPostTitle && fillPostContent){
        // 게시글 작성 api
        write()
    } else {
        noticeHelperMessage('*제목, 내용을 모두 작성해주세요.', 'post-write-content', '66%')
    }
})

function noticeHelperMessage(message, selector, top){
    const helperText = document.createElement('p')

    helperText.textContent = message
    helperText.className = `${selector}-helper-text`
    helperText.style.fontSize = '12px'
    helperText.style.fontWeight = '400'
    helperText.style.color = '#FF0000'
    helperText.style.maxWidth = '355px' 
    helperText.style.margin = '0'
    helperText.style.padding = '0'
    helperText.style.position = 'absolute'
    helperText.style.top = top

    const parent = document.querySelector(`#${selector}`)
    parent.after(helperText)
}


function changeButtonColor(){
    const postWriteSubmitButton = document.querySelector('#post-write-submit-button')
    if(fillPostTitle && fillPostContent){
        postWriteSubmitButton.style.backgroundColor = '#635A5A'
    } else {
        postWriteSubmitButton.style.backgroundColor = '#878080'
    }
}

async function write(){
    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const author_id = userInfo.id

    const title = postTitleInput.value.trim()
    const content = postContentInput.value.trim()
    const images = fileInput.files
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
    for (let i = 0; i < images.length; i++) {
    formData.append("images", images[i]);   // ✔ 파일 하나씩 append
    }
    formData.append("postType", postType)

    console.log(formData)

    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    try {
        const response = await fetch('http://localhost:8080/api/posts', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })

        if(!response.ok){
            alert('게시글 작성 실패')
            return
        }

        const data = await response.json()
        console.log(data)

        const postData = data.data

        console.log(`postData: ${postData}`)

        window.location.href = 'http://localhost:5501/src/pages/posts.html'
    } catch(error){
        console.error(error)
    }

}