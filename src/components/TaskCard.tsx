import deleteIcon from "../assets/delete.png";
import { Tag, TagContent } from "./Tag";

type TaskCardProps = {
    title:string
    tags:Tag[]
    handleDelete: () => void
    index:number
    setActiveCard: React.Dispatch<React.SetStateAction<null>>
}

const TaskCard = ({ title, tags, handleDelete, index, setActiveCard}: TaskCardProps) => {

    const selectTag = (tagName:Tag) => {
        // You can implement logic here for selecting a tag if needed
        console.log(`Selected tag: ${tagName}`);
    };

    return (
        <article className='task_card flex gap-3 items-center mt-6' 
        draggable onDragStart={()=> setActiveCard(index)} onDragEnd={()=>setActiveCard(null)} >
            <p className='task_text'>{title}</p>

            <div className='task_card_bottom_line flex gap-2 items-center'>
                <div className='task_card_tags'>
                    {tags.map((tag, index) => (
                        <TagContent key={index} tagName={tag.text} selected selectTag={selectTag} />
                    ))}
                </div>
                <div
                    className='task_delete'
                    onClick={handleDelete}>
                    <img src={deleteIcon} className='delete_icon' alt='' width={20} height={20} />
                </div>
            </div>
        </article>
    );
};

export default TaskCard;
