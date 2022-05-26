import {useEffect, useState} from "react";


export default function useDelayed (value) {
    const [delayedValue, setValue] = useState(value)
    useEffect(()=>{
        const id = setTimeout(()=> setValue(value), 500)
        return () => clearTimeout(id)
    }, [value])
    return delayedValue
}