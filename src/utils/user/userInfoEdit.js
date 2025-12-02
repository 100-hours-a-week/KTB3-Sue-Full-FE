let newProfileimage;

let passNicknameForm = false

function showToastMessage(){
    const toastMessage = document.querySelector(".toast-message-container")
    
    toastMessage.classList.remove('hidden')
    setTimeout(()=>{
        toastMessage.classList.add('hidden')
    }, 1000)
}

document.addEventListener('DOMContentLoaded',()=>{
    const editButton = document.querySelector('.user-info-edit-submit-button')
    editButton.addEventListener('click', (e) => {
        e.preventDefault()
        showToastMessage()
    })

    const stored = localStorage.getItem('user')

    console.log(stored)
    const userInfo = JSON.parse(stored)

    const profileImage = document.querySelector('.user-info-profile-image')

    console.log(userInfo)

    const profileImageUrl = userInfo.profileImage
    console.log(profileImageUrl)
    if(profileImageUrl){
        profileImage.src = `https://focus-place-profile-image.s3.ap-northeast-2.amazonaws.com/${profileImageUrl}`
        profileImage.style.display = 'block'
    }

    const email = userInfo.email
    console.log(email)
    const emailText = document.querySelector('#user-info-email')
    emailText.textContent = email

    const nickname = userInfo.nickname
    console.log(nickname)
    const nicknameInput = document.querySelector('#user-info-nickname')
    nicknameInput.placeholder = nickname

})

const userInfoEditButton = document.querySelector(".user-info-edit-submit-button")
userInfoEditButton.addEventListener('click', userInfoEdit)

const nicknameInput = document.querySelector('#user-info-nickname')

nicknameInput.addEventListener('focusout', (e) => {
    e.preventDefault()

    passNicknameForm = checkNickname(nicknameInput.value.trim())

})

const profileImageEditContainer= document.querySelector('.user-info-edit-profile-image-container')

profileImageEditContainer.addEventListener('click',()=>{
    const profileImageInput = document.querySelector('#user-info-profile-image-input')

    profileImageInput.click()
})

const profileImageInput = document.querySelector('#user-info-profile-image-input')
    
profileImageInput.addEventListener('change', async (e) => {

    const profileImagePreview = document.querySelector('.user-info-profile-image')

    const selectedFile = e.target.files[0]

    if(!selectedFile) {
        profileImageInput.value = null
        return
    } else {
        const imageUrl = URL.createObjectURL(selectedFile)
        console.log(imageUrl)
        profileImagePreview.src = imageUrl
        newProfileimage = imageUrl
        console.log(newProfileimage)
        return
    }
})

// 원래 이미지 삭제 하고 추가하게 하기
async function userInfoEdit(){

    const stored = localStorage.getItem('user')

    console.log(stored)
    const userInfo = JSON.parse(stored)

    const user_id = userInfo.id
    
    const currentNickname = nicknameInput.placeholder
    const newNickname = nicknameInput.value.trim()
    const currentProfileImage = userInfo.profileImage
    const newProfileImage = profileImageInput.files[0]

    const formData = new FormData()
    formData.append("user_id", user_id)
    formData.append("currentNickname", currentNickname)
    formData.append("newNickname", newNickname)
    formData.append("currentProfileImage", currentProfileImage)
    formData.append("newProfileImage", newProfileImage)

    console.log(formData)
    try{
        const response = await fetch(`http://localhost:8080/api/accounts/userinfo`, {
            method: 'PUT',
            body: formData
        })

        if(!response.ok){
            alert(`회원 정보 수정 실패`)
            return
        }
        
        const updateData = await response.json()

        const profile = updateData.data

        console.log(profile)

        localStorage.setItem("user", JSON.stringify({
            id: userInfo.id,
            email: userInfo.email,
            nickname: profile.nickname,
            profileImage: profile.profileImage
        }))

    }catch(error){
        console.log(`user info edit error ${error}`)
    }

}

async function checkNickname(nickname){

    document.querySelectorAll('.user-info-nickname-helper-text').forEach(el => el.remove())

    if(nickname.split(' ').length > 1){
        noticeHelperMessage('*띄어쓰기를 없애주세요.', 'user-info-nickname', '68%')
        return false
    }

    if(nickname === ""){
        noticeHelperMessage('*닉네임을 입력해주세요.', 'user-info-nickname', '68%')
        return false
    }

    if(nickname.length > 11){
        noticeHelperMessage('*닉네임은 최대 10자 까지 작성 가능합니다.', 'user-info-nickname', '68%')
        return false
    }

    if(nickname !== nicknameInput.placeholder){
        try{
            const response = await fetch('http://localhost:8080/api/accounts/nickname', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nickname })
            })

            if(!response.ok){
                alert(`nickname check fail`)
                return false
            }

            const data = await response.json()
            const isConflict = data.data

            console.log(isConflict)

            if(isConflict){
                noticeHelperMessage(`*중복된 닉네임입니다.`, 'user-info-nickname', '68%')
                return false
            }
        }catch(error){
            console.log(`nickname check error ${error}`)
        }
    }
    return true
}

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