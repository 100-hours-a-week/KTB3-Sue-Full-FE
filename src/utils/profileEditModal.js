function showProfileEditMenus(){
    // 프로필 수정 모달
    const menus = document.querySelector(".user-profile-edit-modal")
    menus.classList.remove('hidden')
}

function hideProfileEditMenus(){
    const menus = document.querySelector(".user-profile-edit-modal")
    menus.classList.add('hidden')
}

function goToUserInfoEdit(){
    window.location = '/src/pages/userInfoEdit.html'
}

function goToUserPasswordEdit(){
    window.location = '/src/pages/userPasswordEdit.html'
}

function logout(){
    localStorage.removeItem('user')
    window.location = '/index.html'
}


document.addEventListener('DOMContentLoaded', () => {
    const profileEditContainer = document.querySelector(".user-profile-container")

    profileEditContainer.addEventListener('mouseenter', showProfileEditMenus)
    profileEditContainer.addEventListener('mouseleave', hideProfileEditMenus)

    const userInfoEditMenu = document.querySelector('#user-info-edit-menu')
    userInfoEditMenu.addEventListener('click', goToUserInfoEdit)

    const userPasswordEditMenu = document.querySelector('#user-password-edit-menu')
    userPasswordEditMenu.addEventListener('click', goToUserPasswordEdit)

    const logoutMenu = document.querySelector('#logout-menu')
    logoutMenu.addEventListener('click', logout)

})