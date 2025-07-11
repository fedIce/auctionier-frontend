import { use_post } from ".."


export const login_user = async ({ email, password }) => {
    const user = await use_post({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/login`,
        data: { email, password }
    })

    if (user.error) {
        throw new Error("LOGIN ERROR: " + user.message);
    }
    return user
}

export const signout_user = async ({ token = null }) => {
    try {
        return await use_post({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/logout`, token })
    } catch (e) {
        throw new Error("SIGNOUT ERROR", e)
    }
}

export const register_user = async ({ fullname, email, password }) => {
    const user = await use_post({
        url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users`,
        data: { fullname, email, password, confirm_password: password }
    })

    if (user.error) {
        throw new Error("REGISTER ERROR: " + user.message);
    }
    return user
}

export const refresh_user_token = async () => {
    return await use_post({ url: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/users/refresh-token` })
}