export async function like(post_id, user_id){
    const likeButton = document.querySelector('#likePostButton')
    
    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    try{
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id })
        })

        if(!response.ok){
            alert('좋아요 실패')
            return
        }

        const data = await response.json()
        console.log(data)

        const likeData = data.data

        console.log(`likeData: ${likeData}`)

        likeButton.style.backgroundColor = "#878080";

        increaseLikeCount()
        
        likeButton.dataset.mode = 'unlike'
    } catch(error){
        console.log(`like error ${error}`)
    }
}

export async function unlike(post_id, user_id){
    const likeButton = document.querySelector('#likePostButton')

    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ user_id })
        })

        if(!response.ok){
            alert('unlike error')
            return
        }

        const unlikeResponse = await response.json()

        const unlikeData = unlikeResponse.data
        
        console.log(`unlike: ${unlikeData}`)

        likeButton.style.backgroundColor = "#D9D9D9"

        decreaseLikeCount()

        likeButton.dataset.mode = 'like'
    } catch (error){
        console.log(`unlike error ${error}`)
    }
}

export async function getLikeCount(post_id){

    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}/likes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            alert('like count error')
            return
        }

        const likeCountRespoonse = await response.json()

    } catch(error){
        console.log(`get like count error ${error}`)
    }
}

export async function checkLike(post_id, user_id){
    console.log(post_id)
    console.log(user_id)
    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }

    try {
        const response = await fetch(`http://localhost:8080/api/posts/${post_id}/likes/check?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })

        if(!response.ok){
            alert('좋아요 여부 체크 실패')
            return
        }

        const likeCheckData = await response.json()

        const isLiked = likeCheckData.data

        console.log(isLiked)
        return isLiked

    } catch (error){
        console.log(`like check error ${error}`)
    }
}

function increaseLikeCount(){
    const likeCount = document.querySelector('#post-like-count')
    const currentCount = Number(likeCount.textContent)
    likeCount.textContent = (currentCount + 1).toString()
}

function decreaseLikeCount(){
    const likeCount = document.querySelector('#post-like-count')
    const currentCount = Number(likeCount.textContent)
    likeCount.textContent = (currentCount - 1).toString()
}