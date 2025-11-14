function loginFormValidation(){
    const email = document.getElementsByName("email")

    console.log(email);
}

const loginForm = document.querySelector(".login-form")
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = document.getElementsByName("email")

    console.log(email.value);

})