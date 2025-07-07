export const use_post = async ({ url, data = null, include_credentials = true, options = {} }) => {

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
        }

        if (data) {
            body['body'] = JSON.stringify(data)
        }


        const result = await fetch(url, body)

        if (result.ok) {
            const json = await result.json()
            resolve(json)
        } else {
            console.error(result.status, result.statusText)
            reject({
                error: result.status,
                message: result.statusText
            })
        }


    })
}

export const use_get = async ({ url, include_credentials = true, options = {} }) => {

    const body = {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        ...options
    }

    if (include_credentials) {
        body['credentials'] = 'include'
    }



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

