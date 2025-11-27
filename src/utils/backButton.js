document.addEventListener('DOMContentLoaded', () => {
    const back = document.querySelector('.backButton')
    if(back){
        back.addEventListener('click', () => {
            console.log(back)
            history.back()
        })
    }
})