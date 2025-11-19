import { initPostModalEvents } from "./modal.js";
import { checkLike, like, unlike } from "./likePost.js";
import { deletePost } from "./postDelete.js";

let currentLikeState = false;  // 좋아요 여부 저장

document.addEventListener('DOMContentLoaded', () => {
    loadPost()
})

const deletePostConfirmButton = document.querySelector('#post-delete-confirm-button')
deletePostConfirmButton.addEventListener('click', deletePost)


async function checkPostingByUser(post_id, user_id){

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}/check?user_id=${user_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            alert(`게시물 작성여부 확인 실패`)
            return
        }

        const checkData = await response.json()
        const isWritten = checkData.data

        return isWritten

    } catch(error){
        console.log(`check posting written by user error ${error}`)
    }
}

async function loadPost(){
    const urlParams = new URLSearchParams(window.location.search)
    const post_id = urlParams.get('post_id')

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    try {
        const response = await fetch(`http://localhost:8080/posts/${post_id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })

        if(!response.ok){
            alert(`게시글 정보 불러오기 실패`)
            return
        }

        const postData = await response.json()
        console.log(postData)
        const post = postData.data

        const isWritten = await checkPostingByUser(post_id, user_id)

        console.log(isWritten)


        renderPost(post, isWritten)
    } catch(error){
        console.log(`load post error ${error}`)
    }
}

function renderPost(post, isWritten){
    const container = document.querySelector('.post-card-container')

    const div = document.createElement('div')
    div.className = 'post-card'

    let profileImageHtml = ''

    if(post.authorProfileImage){
        profileImageHtml = `
            <img src="http://localhost:8080/upload/profileImage/${post.authorProfileImage}" class="author-profile-image">
            `
    } else {
        profileImageHtml = `
            <div class="author-profile-image"></div>
            `
    }

    let myPostButton = ''
    if(isWritten){
        myPostButton = `
            <div class="post-update-button-container">
                <button id="post-update-button" onclick='window.location="/src/pages/postUpdate.html?post_id=${post.post_id}"'>수정</button>
                <button id="post-delete-button">삭제</button>
            </div>
        `
    }
    // post author_id 가져오기

    let postImageHtml = ''

    if(post.images && post.images.length > 0){
        console.log(post.images[0].image_url)
        postImageHtml = `
            <img src="http://localhost:8080/upload/postImage/${post.images[0].image_url}" class="post-image-img" alt="error">
        `  
    }  

    let createdDate = ``
    let createdTime = ``
        
    if(post.createdAt){
        const [createdDateData, createdTimeData] = post.createdAt.split('T')

        const createdDateSplit = createdDateData.split('-')
        createdDate = createdDateData
        createdTime = createdTimeData.split('.')[0]
        const [year, month, day] = createdDateSplit
    }

    div.innerHTML = `
        <p class="post-title">${post.title}</p>
        <div class="post-write-info">
            ${profileImageHtml}
            <p class="author-nickname">${post.authorNickname}</p>
            <p class="post-write-date">${createdDate} ${createdTime}</p>
            ${myPostButton}
        </div>
        <hr class="bar"/>
        ${postImageHtml}
        <div class="post-content">${post.content}</div>
        <div class="post-info-container">
            <div class="post-info-card" id="likePostButton">
                <p id="likeCount">${post.likeCount}</p>
                <p>좋아요수</p>
            </div>
            <div class="post-info-card">
                <p>${post.watch}</p>
                <p>조회수</p>
            </div>
            <div class="post-info-card">
                <p>${post.commentCount}</p>
                <p>댓글</p>
            </div>
        </div>
    `

    container.appendChild(div)

    const likeButton = document.querySelector('#likePostButton')
    console.log(likeButton)

    const urlParams = new URLSearchParams(window.location.search);
    const post_id = urlParams.get('post_id');

    const stored = localStorage.getItem('user')
    const userInfo = JSON.parse(stored)
    const user_id = userInfo.id

    checkLike(post_id, user_id).then(data => {
        currentLikeState = data
    })
    console.log(currentLikeState)
 
    likeButton.addEventListener('click', () => {
        if(currentLikeState){
            unlike(post_id, user_id)
        } else {
            like(post_id, user_id)
        }
    }) 

    initPostModalEvents()
}
