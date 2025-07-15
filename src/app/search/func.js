export const generateQueryParams = (base = '', query) => {
    let _query = ''
    Object.keys(query).forEach(key => {
        if (Array.isArray(query[key]) && query[key].length > 1) {
            query[key].forEach((val) => {
                _query += `&${key}=${val}`
            })
        } else {
            _query += `&${key}=${query[key]}`
        }
    })
    return _query.split(base).join('')
}