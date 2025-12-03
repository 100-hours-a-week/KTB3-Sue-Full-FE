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

        console.log(response)

        const authHeader = response.headers.get("Authorization")
        console.log("authHeader:", authHeader) // "Bearer xxxxx" 나와야 함

        if (!authHeader) {
        console.error("Authorization 헤더 없음")
        return
        }

        const token = authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader

        localStorage.setItem("accessToken", token)

        const data = await response.json()
        console.log(data)

        console.log(1)
        loadUserInfo()

        // const user = data.data

        // console.log(header)
        // console.log(user)

        // localStorage.setItem("user", JSON.stringify({
        //     id: user.user_id,
        //     email: user.email,
        //     nickname: user.nickname,
        //     profileImage: user.profileImage
        // }))

        // console.log(localStorage.getItem("user"))
        // window.location.href = 'http://localhost:5501/src/pages/posts.html'
    } catch(error){
        console.error(error)
    }

    
})

async function loadUserInfo(){
    const token = localStorage.getItem("accessToken")

    if (!token) {
        console.error("토큰 없음 - 로그인 먼저 필요")
        // 필요하면 로그인 페이지로
        window.location.href = "http://localhost:5501/src/pages/login.html"
        return
    }

    console.log("stored token:", token)


    try{
        const response = await fetch(`http://localhost:8080/api/accounts/me`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        })


        if (!response.ok) {
            console.error("유저 정보 가져오기 실패:")
            return
        }

        console.log(response)
        const body = await response.json()
        console.log("GET /api/accounts/me body:", body)

        const user = body.data

        // 여기서 화면에 뿌리면 됨
        console.log("현재 로그인 유저:", user)

        // 필요하면 localStorage 갱신
        localStorage.setItem("user", JSON.stringify({
            id: user.user_id,
            email: user.email,
            nickname: user.nickname,
            profileImage: user.profileImage
        }))

        window.location.href = 'http://localhost:5501/src/pages/posts.html'
    } catch (error) {
    console.error("요청 에러:", error)
  }
}
