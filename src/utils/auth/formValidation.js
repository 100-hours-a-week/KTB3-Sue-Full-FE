export function noticeHelperMessage(message, selector, top){
    const helperText = document.createElement('p')

    document.querySelectorAll(`.${selector}-helper-text`).forEach(el => el.remove())

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

export async function checkEmail(email, duplicateCheck){
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

    if(duplicateCheck){
        try{
            const response = await fetch("http://localhost:8080/api/accounts/email", {
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
    }
    return true
}

export function checkPassword(password){

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

export function checkPasswordConfirm(password, passwordConfirm){

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

export async function checkNickname(nickname){

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
        const response = await fetch("http://localhost:8080/api/accounts/nickname", {
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