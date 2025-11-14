function showProfileEditMenus(){
    // 프로필 수정 모달
    const menus = document.querySelector(".user-profile-edit-modal")
    menus.classList.remove('hidden')
}

function hideProfileEditMenus(){
    const menus = document.querySelector(".user-profile-edit-modal")
    menus.classList.add('hidden')
}

document.addEventListener('DOMContentLoaded', () => {
    const profileEditContainer = document.querySelector(".user-profile-container")

    profileEditContainer.addEventListener('mouseenter', showProfileEditMenus)
    profileEditContainer.addEventListener('mouseleave', hideProfileEditMenus)
})