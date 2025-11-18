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

profileImageInput.addEventListener('input', (e) => {
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

async function checkEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    document.querySelectorAll('.email-input-helper-text').forEach(el => el.remove())
    
    if(email === ""){
        // *이메일을 입력해주세요.'
        noticeHelperMessage('*이메일을 입력해주세요.' , 'email-input', '100%')
        return false
    }

    if(!emailRegex.test(email)){
        noticeHelperMessage('*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)', 'email-input', '100%')
        return false
    }

    try{
        const response = await fetch("http://localhost:8080/accounts/email", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email })
        })

        if(!response.ok){
            alert('email check fail')
            return false
        }

        const data = await response.json()
        console.log(data)
        const isConflict = data.data

        console.log(isConflict)
        if(isConflict){
            noticeHelperMessage('*중복된 이메일입니다.', 'email-input', '100%')
            return false
        }

    } catch(error){
        console.log(`email check error ${error}`)
    }
    return true
}

function checkPassword(password){

    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/

    
    document.querySelectorAll('.password-input-helper-text').forEach(el => el.remove())

    if(password === ""){
        noticeHelperMessage('*비밀번호를 입력해주세요.', 'password-input', '100%')
        return false
    }

    if((!pass.test(password)) || password.length < 8 || password.length > 20){
        noticeHelperMessage(`
            *비밀번호는 8자 이상, 20자 이하이며, 
            대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.`
            , 'password-input', '100%')
        return false
    }

    return true
}

function checkPasswordConfirm(password, passwordConfirm){

    document.querySelectorAll('.passwordConfirm-input-helper-text').forEach(el => el.remove())

    if(passwordConfirm === ""){
        noticeHelperMessage('*비밀번호를 한번더 입력해주세요', 'passwordConfirm-input', '100%')
        return false
    }

    if(password !== passwordConfirm){
        noticeHelperMessage('*비밀번호가 다릅니다.', 'passwordConfirm-input', '100%')
        return false
    }

    return true
}

async function checkNickname(nickname){

    document.querySelectorAll('.nickname-input-helper-text').forEach(el => el.remove())

    if(nickname.split(' ').length > 1){
         noticeHelperMessage('*띄어쓰기를 없애주세요.', 'nickname-input', '100%')
         return false
    }

    if(nickname === ""){
        noticeHelperMessage('*닉네임을 입력해주세요.', 'nickname-input', '100%')
        return false
    }

    if(nickname.length > 11){
        noticeHelperMessage('*닉네임은 최대 10자 까지 작성 가능합니다.', 'nickname-input', '100%')
        return false
    }

    try{
        const response = await fetch("http://localhost:8080/accounts/nickname", {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nickname })
        })

        if(!response.ok){
            alert('nickname check fail')
            return false
        }

        const data = await response.json()
        console.log(data)
        const isConflict = data.data

        console.log(isConflict)
        if(isConflict){
            noticeHelperMessage('*중복된 닉네임입니다.', 'nickname-input', '100%')
            return false
        }

    } catch(error){
        console.log(`nickname check error ${error}`)
    }

    return true

}

function changeButtonColor(){
    if(passProfileImageForm &&passEmailForm && passPasswordForm && passPasswordConfirm && passNicknameForm){
        signupButton.style.backgroundColor = '#7F6AEE'
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
        const response = await fetch('http://localhost:8080/accounts/user', {
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