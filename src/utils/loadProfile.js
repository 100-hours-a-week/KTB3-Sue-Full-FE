document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('user')

    console.log(stored)
    const userInfo = JSON.parse(stored)

    const profileImage = document.querySelector('.user-info-profile-image')

    console.log(userInfo)

    const profileImageUrl = userInfo.profileImage
    if(profileImageUrl){
        profileImage.src = `http://localhost:8080/upload/profileImage/${profileImageUrl}`
        profileImage.style.display = 'block'

    }

    const nickname = document.querySelector('#user-info-nickname')
    const nicknameData = userInfo.nickname
    if(nicknameData){
        nickname.textContent = nicknameData
    }
})

const userProfileImageContainer = document.querySelector('.user-info-profile-image')
userProfileImageContainer.addEventListener('click', (e) => {
    e.preventDefault()

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    window.location.href = `/src/pages/myPage.html?user_id=${user_id}`
})