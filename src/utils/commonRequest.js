export async function commonTokenRequest(url, method = 'GET', body = null){
    const token = localStorage.getItem("accessToken")
    if(!token){
        alert('token not fount')
        return
    }
    
    const options = {
        method,
        headers: {
            "Content-Type": "application/json",
            'Content-Type': 'application/json'
        },
    };

    if (body) {
        options.body = JSON.stringify(body);
    }

    try {
        const response = await fetch(url, options);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return await response.json();
    } catch (error) {
        console.error('요청 실패:', error);
        throw error;
    }
}