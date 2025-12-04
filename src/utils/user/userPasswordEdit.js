let passPasswordForm = false
let passPasswordConfirmForm = false


function showToastMessage(){
    const toastMessage = document.querySelector(".toast-message-container")
    
    toastMessage.classList.remove('hidden')
    setTimeout(()=>{
        toastMessage.classList.add('hidden')
    }, 1000)
}

document.addEventListener('DOMContentLoaded',()=>{

})

const passwordInput = document.querySelector('#user-password-input')
const passwordConfirmInput = document.querySelector('#user-password-confirm-input')


passwordInput.addEventListener('focusout', (e) => {

    passPasswordForm = checkPassword(passwordInput.value.trim())
})

passwordConfirmInput.addEventListener('focusout', (e) => {
    
    passPasswordConfirmForm = checkPasswordConfirm(passwordInput.value.trim(), passwordConfirmInput.value.trim())
})

const passwordEditButton = document.querySelector('.user-password-edit-submit-button')
passwordEditButton.addEventListener('click', (e) => {
    e.preventDefault()


})

function checkPassword(password){

    const pass = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,20}$/

    
    document.querySelectorAll('.user-password-input-helper-text').forEach(el => el.remove())

    if(password === ""){
        noticeHelperMessage('*비밀번호를 입력해주세요.', 'user-password-input', '43%')
        return false
    }

    if((!pass.test(password)) || password.length < 8 || password.length > 20){
        noticeHelperMessage(`
            *비밀번호는 8자 이상, 20자 이하이며, 
            대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.`
            , 'user-password-input', '43%')
        return false
    }

    return true
}

function checkPasswordConfirm(password, passwordConfirm){

    document.querySelectorAll('.user-password-confirm-input-helper-text').forEach(el => el.remove())

    if(passwordConfirm === ""){
        noticeHelperMessage('*비밀번호를 한번더 입력해주세요', 'user-password-confirm-input', '53%')
        return false
    }

    if(password !== passwordConfirm){
        noticeHelperMessage('*비밀번호가 다릅니다.', 'user-password-confirm-input', '53%')
        return false
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

const editButton = document.querySelector('.user-password-edit-submit-button')

editButton.addEventListener('click', (e) => {
    e.preventDefault()
    editPassword()
})

async function editPassword(){

    if(!(passPasswordForm && passPasswordConfirmForm)){
        return
    }

    const stored = localStorage.getItem('user')

    const userInfo = JSON.parse(stored)

    const user_id = userInfo.id

    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    const newPassword = passwordInput.value.trim()
    const newPasswordConfirm = passwordConfirmInput.value.trim()

    try {
        const response = await fetch(`http://localhost:8080/api/accounts/${user_id}/password`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ newPassword, newPasswordConfirm })
        })

        if(!response.ok){
            alert('비밀번호 변경 실패')
            return
        }

        const data = await response.json()

        const userInfoResponse = data.data

        console.log(userInfoResponse)

        showToastMessage()
        
    } catch(error){
        console.log(`user password edit error ${error}`)
        return
    }
}