import { BsTrash } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

///Want to change and add this to the edit form. Then user clicks to edit, and is given the option. better UI 

export const UserDeleteButton = ({send, getSends}) => {

    const navigate = useNavigate()

    return <button onClick={() => {
        fetch(`http://localhost:8088/UserSendList/${send.id}`, {
            method: "DELETE"
        })
            .then(() => {
                getSends()
            })
    }} className="send_delete"><BsTrash /></button>
}
