export const ConfirmationOfTick = ({setTickModal, setTick}) => {

    return <section className="confirmation">
        <div className="modal">
            <div className="overlay">
            <div className="modal-content">
         {setTick.boulderName} has been added to your tick list!

        <button className=".close-modal" onClick={(e) => setTickModal(false)}>Close</button>
        </div>
        </div>
        </div>
    </section>
}