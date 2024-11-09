import { useState } from "react"

type onDropProps = {
    onDrop: () => void
}

export const DropArea = ({onDrop}:onDropProps) => {

    const [showDrop, setShowDrop] = useState<boolean>(false)
    return (
        <section
            onDragEnter={() => setShowDrop(true)}
            onDragLeave={() => setShowDrop(false)}
            onDrop={()=> {
                onDrop()
                setShowDrop(false)
            }}
            onDragOver={(e)=> e.preventDefault()}
            className={showDrop ? "drop_area" : "hide_drop"}
            >
            <h1>Drop Here</h1>
        </section>
    )
}

