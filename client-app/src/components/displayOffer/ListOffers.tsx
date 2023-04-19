import OfferTable from "./OfferTable";
import "./ListOffers.css"

const ListOffers = ({propertyId}:{propertyId:number}) => {
    return(
        <div className="modal modal-lg" id="modalOffers" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex={-1} 
            aria-labelledby="staticBackdropLabel">
            <div className="modal-dialog  modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="staticBackdropLabel">Ofertas de esta propiedad</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body">
                    <OfferTable propertyId={propertyId} />
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary">Understood</button>
                </div>
                </div>
            </div>
        </div>
    )
}

export default ListOffers;