import { noticeHelperMessage, checkEmail, checkPassword, checkPasswordConfirm, checkNickname } from "./formValidation.js"
import { removeTempProfileImage, uploadProfileImage } from "./profileImageProcess.js"
import { supabase } from "./storage/supabase.js"

const form = document.querySelector('.signup-form')

const profileImageInputDiv = document.querySelector('.signup-profile-image-div')
const profileImageInput = document.querySelector('#signup-profile-image-input')
let profileImageFilePath

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

profileImageInput.addEventListener('input', async (e) => {
    e.preventDefault()

    const profileImagePreview = document.querySelector('.signup-profile-image')
    const plusText = document.querySelector('.signup-profile-image-div p')

    const selectedFile = e.target.files[0]

    // storage temp에 저장
    
    if(!selectedFile){
        profileImagePreview.src = ''
        profileImagePreview.style.display = 'none'
        plusText.style.display = 'block'
        profileImageInput.value = null
        noticeHelperMessage('*프로필 사진을 추가해주세요.', 'profile-image-label', null)
        return 
    }

    const {imageUrl, filePath} = await uploadProfileImage(selectedFile)

    profileImageFilePath = filePath

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

    passEmailForm = checkEmail(emailInput.value.trim())
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

    try {
        const response = await fetch('http://localhost:8080/accounts/user', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password, passwordConfirm, nickname, profileImageFilePath})
        })

        if(!response.ok){
            alert('회원가입 실패')
            return
        }

        const signupData = await response.json()

        console.log(signupData)

        const { data, error } = await supabase.storage.from(`profile-image`).move(`temp/${profileImageFilePath}`,`${signupData.data.user_id}/${profileImageFilePath}` )
        console.log(data)
        
        if(error){
            console.error(error)
            console.log('fail to move image to feed_id from temp')
            removeTempProfileImage(profileImageFilePath)
        }
        
         console.log('feed image move to feed from temp')

        window.location.href = 'http://localhost:5501/index.html'

    } catch(error){
        console.error(error)
        removeTempProfileImage(profileImageFilePath)
    }

    profileImageFilePath = null
}