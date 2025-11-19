export async function like(post_id, user_id){
    const likeButton = document.querySelector('#likePostButton')
    try{
        const response = await fetch(`http://localhost:8080/posts/${post_id}/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
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

        // 좋아요 수 조회해서 렌더링하기? or 자동 리렌더링?
        likeButton.style.backgroundColor = "#ACA0EB"

        const likeCount = document.querySelector("#likeCount")

        checkLike(post_id, user_id)
        location.reload()
    } catch(error){
        console.log(`like error ${error}`)
    }
}

export async function unlike(post_id, user_id){
    const likeButton = document.querySelector('#likePostButton')

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}/likes`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
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

        checkLike(post_id, user_id)

        location.reload()

    } catch (error){
        console.log(`unlike error ${error}`)
    }
}

export async function getLikeCount(post_id){

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}/likes`, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            alert('like count error')
            return
        }

        const likeCountRespoonse = await response.json()

        // const likeCount = 
    } catch(error){
        console.log(`get like count error ${error}`)
    }
}

export async function checkLike(post_id, user_id){
    const likeButton = document.querySelector('#likePostButton')

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}/likes/check?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            alert('좋아요 여부 체크 실패')
            return
        }

        const likeCheckData = await response.json()
        console.log(likeCheckData)
        const isLiked = likeCheckData.data

        if(isLiked){
            likeButton.style.backgroundColor = "#ACA0EB"
        } else {
            likeButton.style.backgroundColor = "#D9D9D9"
        }

        return isLiked
    } catch (error){
        console.log(`like check error ${error}`)
    }
}