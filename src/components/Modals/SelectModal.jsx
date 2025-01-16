import { useState } from "react"

function SelectModal ({setLoading , allColors , setSelectedColors , selectedColors}) {
    const [open , setOpen] = useState();

    return (
        <div onClick={() => setOpen()} className="select select-bordered select-sm w-full max-w-xs">Seleccionar</div>
    )
}

export default SelectModal