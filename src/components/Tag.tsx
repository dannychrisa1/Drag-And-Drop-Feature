
export type Tag = {
    text:string
}

type TagProps = {
    tagName: string
    selectTag: (tag: Tag) => void;
    selected: boolean;
}

export const TagContent = ({ tagName, selectTag, selected }: TagProps) => {


    const tagStyle:any = {
        HTML: { backgroundColor: "#fda821" },
        CSS: { backgroundColor: "#15d4c8" },
        JavaScript: { backgroundColor: "#ffd12c" },
        React: { backgroundColor: "#4cdafc" },
        default: { backgroundColor: "#f9f9f9" },
    };   

    return (
        <button
            type='button'
            className='tag'
            style={selected ? tagStyle[tagName] : tagStyle.default}
            onClick={() => selectTag({text:tagName})}>
            {tagName}
        </button>
    )
}