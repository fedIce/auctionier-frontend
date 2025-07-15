

export const use_post = async ({ url, data = null, include_credentials = true, options = {}, token = null }) => {

    return await new Promise(async (resolve, reject) => {

        const body = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            ...options
        }

        if (include_credentials) {
            body['credentials'] = 'include'
            if (token) body.headers['Authorization'] = `Bearer ${token}`;
        }

        if (data) {
            body['body'] = JSON.stringify(data)
        }

        
        const result = await fetch(url, body)
        
        console.log('Headers: ', body.headers, result)
        
        if (result.ok) {
            const json = await result.json()
            resolve(json)
        } else {
            reject({
                error: result.status,
                message: result.statusText,
                json: await result.json()
            })
        }


    })
}

export const use_patch = async ({ url, data = null, include_credentials = true, options = {}, token = null }) => {

    return await new Promise(async (resolve, reject) => {

        const body = {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            ...options
        }

        if (include_credentials) {
            body['credentials'] = 'include'
            if (token) body.headers['Authorization'] = `Bearer ${token}`;
        }

        if (data) {
            body['body'] = JSON.stringify(data)
        }

        
        const result = await fetch(url, body)
        
        console.log('Headers: ', body.headers, result)
        
        if (result.ok) {
            const json = await result.json()
            resolve(json)
        } else {
            reject({
                error: result.status,
                message: result.statusText,
                json: await result.json()
            })
        }


    })
}

export const use_get = async ({ url, include_credentials = true, options = {}, token = null }) => {

    const body = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    }

    if (include_credentials) {
        body['credentials'] = 'include'
        if (token) body.headers['Authorization'] = `Bearer ${token}`;
    }


    console.log({ headers: body.headers, token, url })

    return await new Promise(async (resolve, reject) => {
        const result = await fetch(url, body)

        if (result.ok) {
            const json = await result.json()
            resolve(json)
        } else {

            reject({
                error: result.status,
                message: result.statusText
            })
        }
    })
}

export const use_del = async ({ url, include_credentials = true, options = {}, token = null }) => {

    const body = {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    }

    if (include_credentials) {
        body['credentials'] = 'include'
        if (token) body.headers['Authorization'] = `Bearer ${token}`;
    }


    console.log({ headers: body.headers, token, url })

    return await new Promise(async (resolve, reject) => {
        const result = await fetch(url, body)

        if (result.ok) {
            const json = await result.json()
            resolve(json)
        } else {

            reject({
                error: result.status,
                message: result.statusText
            })
        }
    })
}

