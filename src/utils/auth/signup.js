import { noticeHelperMessage, checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from "./formValidation.js"

const form = document.querySelector('.signup-form')

const profileImageInputDiv = document.querySelector('.signup-profile-image-div')
const profileImageInput = document.querySelector('#signup-profile-image-input')

const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const passwordConfirmInput = document.querySelector('#passwordConfirm-input')
const nicknameInput = document.querySelector('#nickname-input')

const signupButton = document.querySelector('.signupButton')

let passProfileImageForm = false
let passEmailForm = false
let passPasswordForm = false
let passPasswordConfirm = false
let passNicknameForm = false

document.addEventListener('DOMContentLoaded', (e)=>{
    e.preventDefault()

    if(profileImageInput.files.length === 0){
        noticeHelperMessage('*프로필 사진을 추가해주세요.', 'profile-image-label', null)
    }

})

profileImageInputDiv.addEventListener('click', (e) => {
    profileImageInput.click()
})

profileImageInput.addEventListener('change', (e) => {
    e.preventDefault()

    const profileImagePreview = document.querySelector('.signup-profile-image')
    const plusText = document.querySelector('.signup-profile-image-div p')

    const selectedFile = e.target.files[0]
    
    if(!selectedFile){
        profileImagePreview.src = ''
        profileImagePreview.style.display = 'none'
        plusText.style.display = 'block'
        profileImageInput.value = null
        noticeHelperMessage('*프로필 사진을 추가해주세요.', 'profile-image-label', null)
        return 
    }

    const imageUrl = URL.createObjectURL(selectedFile)
    profileImagePreview.src = imageUrl
    profileImagePreview.style.display = 'block'
    plusText.style.display = 'none'
    if(document.querySelector('.profile-image-label-helper-text')) 
        document.querySelector('.profile-image-label-helper-text').remove()

    passProfileImageForm = true
    changeButtonColor()
})

emailInput.addEventListener('focusout', (e) => {

    if(emailInput.value.trim() === ""){
        noticeHelperMessage('*이메일을 입력해주세요', 'email-input', '100%')
        return
    }

    passEmailForm = checkEmail(emailInput.value.trim(), true)
    changeButtonColor()
})

passwordInput.addEventListener('focusout', (e) => {

    passPasswordForm = checkPassword(passwordInput.value.trim())
    changeButtonColor()
})

passwordConfirmInput.addEventListener('focusout', (e) => {

    passPasswordConfirm = checkPasswordConfirm(passwordInput.value.trim(), passwordConfirmInput.value.trim())
    changeButtonColor()
})

nicknameInput.addEventListener('focusout', (e) => {

    passNicknameForm = checkNickname(nicknameInput.value.trim())
    changeButtonColor()
})

function changeButtonColor(){
    if(passProfileImageForm &&passEmailForm && passPasswordForm && passPasswordConfirm && passNicknameForm){
        signupButton.style.backgroundColor = '#635A5A'
    }
}


signupButton.addEventListener('click', async (e) => {
        e.preventDefault()
        signup()
})

async function signup(){
 
    if(!passProfileImageForm && passEmailForm && passPasswordForm && passPasswordConfirm && passNicknameForm){
        return
    }

    console.log('click')

    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()
    const passwordConfirm = passwordConfirmInput.value.trim()
    const nickname = nicknameInput.value.trim()

    console.log(email)
    console.log(password)
    console.log(passwordConfirm)
    console.log(nickname)

    const formData = new FormData()
    formData.append("email", email)
    formData.append("password", password)
    formData.append("passwordConfirm", passwordConfirm)
    formData.append("nickname", nickname)
    formData.append("profileImage", profileImageInput.files[0])


    console.log(formData)


    try {
        const response = await fetch('http://localhost:8080/api/accounts/user', {
            method: "POST",
            body: formData
        })

        if(!response.ok){
            alert('회원가입 실패')
            return
        }

        const data = await response.json()

        console.log(data)

        window.location.href = 'http://localhost:5501/index.html'

    } catch(error){
        console.error(error)
    }
}