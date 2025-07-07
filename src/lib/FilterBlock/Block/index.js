'use client'
import { useRouter, useSearchParams } from "next/navigation";
import CheckBox from "../../../components/CheckBox";

export const Block = ({ title, data,query }) => {

    const searchParams = useSearchParams();
    const router = useRouter();

    const onSelectFilter = async (key, value) => {
        const params = new URLSearchParams(searchParams.toString());
        let a = params.toString();
        if (value) {
            if (a.includes(`${key}=${value}`)) {
                a = a.split('&').filter(param => !param.includes(`${key}=${value}`)).join('&');
                // params.delete(key);
            } else {
                a = a.replace(/&$/, '').replace(/^\?/, '') + `&${key}=${value}`;
                // params.append(key, value);
            }
            // Adds a new history entry
            router.push(`?${a}`);
        }
    }

    // const queryParams = Object.fromEntries(query);
    
    return (
        <div className='w-full py-4'>
            <div className='flex items-center my-2 lg:my-4 space-x-2'>
                <h1 className='font-semibold text-lg capitalize'>{title.split('_').join(" ")}</h1>
            </div>
            <div className='flex flex-col space-y-2'>
                {
                    data?.map((item, i) => {
                        const t = `${title == 'reserve_price' ? String(item._id) : item.slug || item.condition} (${item.count})`
                        return (
                            <CheckBox onSelect={onSelectFilter} legend={title} key={i} title={t} />
                        )
                    })
                }
            </div>
        </div>
    )
}