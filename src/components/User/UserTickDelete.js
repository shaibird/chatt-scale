import { BsTrash } from 'react-icons/bs'
import { GiTripleLock } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

///Want to change and add this to the edit form. Then user clicks to edit, and is given the option. better UI 

export const UserTickDelete = ({tick, getTicks}) => {

    const navigate = useNavigate()

    return <button onClick={() => {
        fetch(`http://localhost:8088/UserTickList/${tick.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getTicks()
            })
    }} className="tick_delete"><BsTrash /></button>
}