import '../Map/MapDisplay.css'
import { useState } from 'react'
import { CragList } from '../Crags/CragList'
export const CragListButton = () => {
    const [modal, setModal] = useState(false)

    const toggleModal = () => {
        setModal(!modal)
    }

    return <>
    <button className="cragButton" onClick={() => {toggleModal() }}>View List of Boulderfields</button>

    {modal && <CragList setModal={setModal} />}
    </>
}