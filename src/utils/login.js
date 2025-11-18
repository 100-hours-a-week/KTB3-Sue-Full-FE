const form = document.querySelector('#login-form')
const emailInput = document.querySelector('#email')
const passwordInput = document.querySelector('#password')
const loginButton = document.querySelector('.loginButton')

let passEmailForm = false
let passPasswordForm = false


// login form validation

emailInput.addEventListener('change', (e)=>{
    e.preventDefault()

    passEmailForm = checkEmail(emailInput.value.trim())
})

passwordInput.addEventListener('change', (e) => {
    e.preventDefault()

    passPasswordForm = checkPassword(passwordInput.value.trim())
})

form.addEventListener('change', (e) => {
    e.preventDefault()

    if(passEmailForm && passPasswordForm){
        loginButton.style.backgroundColor = "#7F6AEE"
    }
})

function checkEmail(email){
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    document.querySelectorAll('.email-helper-text').forEach(el => el.remove())
    
    if(email === ""){
        // *이메일을 입력해주세요.'
        noticeHelperMessage('*이메일을 입력해주세요.' , 'email')
        return false
    }

    if(!emailRegex.test(email)){
        noticeHelperMessage('*올바른 이메일 주소 형식을 입력해주세요. (예: example@example.com)', 'email')
    }
    

    return true
}

function checkPassword(password){

    const pass = /^(?=.*?[A-Za-z])(?=.*?[0-9])(?=.*?[!@~]).{8,20}$/
    
    document.querySelectorAll('.password-helper-text').forEach(el => el.remove())

    if(password === ""){
        noticeHelperMessage('*비밀번호를 입력해주세요.', 'password')
        return false
    }

    if(!pass.test(password) || password.length < 8 || password.length > 20){
        noticeHelperMessage(`
            *비밀번호는 8자 이상, 20자 이하이며, 
            대문자, 소문자, 숫자, 특수문자를 각각 최소 1개 포함해야 합니다.`
            , 'password')
    }

    return true
}

function noticeHelperMessage(message, selector){
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
    helperText.style.top = '110%'

    const parent = document.querySelector(`#${selector}`)
    parent.after(helperText)
}


// login api

loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    console.log(email)
    console.log(password)

    try {
        const response = await fetch('http://localhost:8080/accounts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        if(!response.ok){
            noticeHelperMessage(`*아이디와 비밀번호를 확인해주세요.`
            , 'password')
            return
        }

        const data = await response.json()
        const user = data.data

        console.log(user)

        localStorage.setItem("user", JSON.stringify({
            id: user.user_id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage
        }))

        console.log(localStorage.getItem("user"))
        window.location.href = 'http://localhost:5501/src/pages/posts.html'
    } catch(error){
        console.error(error)
    }

    
})
