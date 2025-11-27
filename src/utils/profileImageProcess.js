import { supabase } from "./storage/supabase.js"
import { v4 as uuidv4 } from "https://esm.sh/uuid@9.0.0";

export async function uploadProfileImage(file){

    const ext = file.name.split('.').pop()
    const filePath = `${uuidv4()}.${ext}`

    const { data, error } = await supabase
    .storage
    .from('profile-image')
    .upload(`temp/${filePath}`, file, {
        cacheControl: '3600',
        upsert: true
    })

    if(error){
        console.log(error)
        removeTempProfileImage(profileImageFilePath)
        alert('프로필 미리보기 업로드 실패')
    }

    console.log(`temp file upload!: ${filePath}`)
    
    const {data: urlData} = supabase.storage.from(`profile-image`).getPublicUrl(`temp/${filePath}`)
        
    const imageUrl = urlData.publicUrl

    return {imageUrl, filePath }
}


export async function removeTempProfileImage(filePath) {

    console.log(`storage file path: ${imageUrl}`)

    const { error } = await supabase.storage.from(`feed-images`).remove([`${supabaseId}/temp/${uploadImageFilePath[i]}`])
    
    if(error){
        console.log(`temp image remove error: ${error.message}`)
    }
    
    console.log('image 삭제 완료')
        
    if(fileInputRef.current !== null){
        fileInputRef.current.value = ''
    }
}