document.addEventListener('DOMContentLoaded', () => {
    const stored = localStorage.getItem('user')

    console.log(stored)
    const userInfo = JSON.parse(stored)

    const profileImage = document.querySelector('.user-profile-image')

    console.log(userInfo)

    const profileImageUrl = userInfo.profileImage
    if(profileImageUrl){
        profileImage.src = `http://localhost:8080/upload/profileImage/${profileImageUrl}`
        profileImage.style.display = 'block'

    }
})