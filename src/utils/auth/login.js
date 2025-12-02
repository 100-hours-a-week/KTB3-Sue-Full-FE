import { noticeHelperMessage, checkEmail, checkPassword } from "./formValidation.js"

const form = document.querySelector('#login-form')
const emailInput = document.querySelector('#email-input')
const passwordInput = document.querySelector('#password-input')
const loginButton = document.querySelector('.loginButton')
const signupLink = document.querySelector('.goToSignUp')

let passEmailForm = false
let passPasswordForm = false


// login form validation

emailInput.addEventListener('change', (e)=>{
    e.preventDefault()

    passEmailForm = checkEmail(emailInput.value.trim(), false)
})

passwordInput.addEventListener('change', (e) => {
    e.preventDefault()

    passPasswordForm = checkPassword(passwordInput.value.trim())
})

form.addEventListener('change', (e) => {
    e.preventDefault()

    if(passEmailForm && passPasswordForm){
        loginButton.style.backgroundColor = "#635A5A"
    }
})

// signupLink.addEventListener('click', (e) => {
//     e.preventDefault()

//     route()
// })

// login api

loginButton.addEventListener('click', async (e) => {
    e.preventDefault()
    
    const email = emailInput.value.trim()
    const password = passwordInput.value.trim()

    console.log(email)
    console.log(password)

    try {
        const response = await fetch('http://localhost:8080/api/accounts', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, password })
        })

        if(!response.ok){
            noticeHelperMessage(`*아이디와 비밀번호를 확인해주세요.`
            , 'password-input','110%')
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
