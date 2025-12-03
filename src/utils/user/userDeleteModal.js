document.addEventListener('DOMContentLoaded', (e) => {
    e.preventDefault()

    const userDeleteButton = document.querySelector('.user-delete-button')
    userDeleteButton.addEventListener('click', showUserDeleteModal)

    const userDeleteModalCloseButton = document.querySelector('#user-modal-close-button')
    userDeleteModalCloseButton.addEventListener('click', hideUserDeleteModal)

    const userDeleteConfirmButton = document.querySelector('#user-delete-modal-confirm-button')

    userDeleteConfirmButton.addEventListener('click', ()=>{
        hideUserDeleteModal()
        userDelete()
    })
})

function showUserDeleteModal(){
    const modal = document.querySelector('#user-delete-modal')
    modal.classList.remove('hidden')
}

function hideUserDeleteModal(){
    const modal = document.querySelector('#user-delete-modal')
    modal.classList.add('hidden')
}


async function userDelete(){
    const stored = localStorage.getItem('user')

    console.log(stored)
    const userInfo = JSON.parse(stored)

    const user_id = userInfo.id

    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    try {
        const response = await fetch(`http://localhost:8080/api/accounts/${user_id}`, {
            method: 'DELETE',
            headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            alert(`회원 탈퇴 실패`)
            return
        }

        const data = await response.json()

        const userResponse = data.data

        localStorage.removeItem('user')

        window.location.href = '/index.html'
    } catch(error){
        console.log(`user delete error ${error}`)
    }
}
