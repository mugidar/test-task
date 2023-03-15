import { useState } from "react";

export default function useInput (initValue) {
    const [value, setValue] = useState(initValue)

    const onChange =({target}) => {
        setValue(target.value)
    }

    return {
        value, onChange
    }
}