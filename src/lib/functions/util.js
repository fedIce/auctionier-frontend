import crypto from 'crypto';


export const generate_crumbs = (data) => {
    const crumbs = [
        {
            title: "Home",
            link: "/",
            description: "Auctionier home page"
        }
    ]

    if (data?.category) {
        crumbs.push({
            title: data.category.category_name,
            link: `/category/${data.category.slug}`,
            description: data.category.description
        })
    }

    if (data?.title) {
        crumbs.push({
            title: data.title,
            link: `/category/${data.category.slug}/${data.slug}`,
            description: data.description
        })
    }

    return crumbs
}

export const NO_SCROLL = "[&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']"


const BASE62 = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

export function base62Encode(buffer) {
    let num = BigInt('0x' + buffer.toString('hex'));
    let result = '';

    while (result.length < 5) {
        result = BASE62[num % 62n] + result;
        num = num / 62n;
    }

    return result;
}

export function getShortCode(input) {
    const hash = crypto.createHash('sha256').update(input).digest();
    return base62Encode(hash);
}

export const numberWithCommas = (x) => {
    return x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export const timeExpired = (time) => {
    return new Date(time) < new Date()
}

export const closedForBidding = (data) => {
    return data?.top_biddder ? data.top_biddder : data.bid_id?.top_biddder ?? false
}