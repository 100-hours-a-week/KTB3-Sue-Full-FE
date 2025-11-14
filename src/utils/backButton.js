document.addEventListener('DOMContentLoaded', () => {
    const back = document.querySelector('.backButton')
    back.addEventListener('click', () => {
        history.back()
    })
})