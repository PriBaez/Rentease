import { useEffect, useState } from "react";

const MyOffers = ({userId}:{userId:number}) => {

    const [offers, setOffers]  = useState([] as any [])
    const [users, setUsers]  = useState([] as any [])
    const [properties, setProperties]  = useState([] as any [])
    
    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7272/api/Offer'),
            fetch('https://localhost:7272/api/User'),
            fetch('https://localhost:7272/api/Property'),
            ])
        .then(([resOffers, resUsers, resProperties]) => Promise.all([
            resOffers.json(), resUsers.json(), resProperties.json()]))
        .then(([dataOffers, dataUsers, dataProperties]) => {
            setOffers(dataOffers);
            setUsers(dataUsers);
            setProperties(dataProperties)
        })
        .catch((err) => {
            console.log(err.message);
        })
    }, [])

    const getUsers = (userId:number) => {
        var user = users.filter(user => user.id === userId)
        const name = user.map((u, index) => u.name)
        return name
    }

    const getPropertyTitle = (propertyId:number) => {
        var property = properties.filter(property => property.id === propertyId)
        const title = property.map((u, index) => u.titulo)
        return title
    }

    return(
        <div className="card m-5">
            <div className="card-body">
                <h5 className="card-title">Mis ofertas</h5>
                    <table className="table table-hover">
                    <thead>
                        <tr>
                        <th scope="col">Oferta #</th>
                        <th scope="col">Propiedad</th>
                        <th scope="col">Dueño</th>
                        <th scope="col">Cantidad ofertada</th>
                        <th scope="col">Estado</th>
                        </tr>
                    </thead>
                    <tbody>
                        {offers.map((offer, index) => {
                            return(
                                offer.userId === userId ? 
                                (
                                    <tr key={index} className={offer.status === true && offer.isAccepted === false ? "text-info":
                                    offer.status === false && offer.isAccepted === true ? "text-success":"text-danger"}>
                                        <th scope="row">{offer.id}</th>
                                        <td>{getPropertyTitle(offer.propertyId)}</td>
                                        <td>{getUsers(offer.userId)}</td>
                                        <td>{offer.quantity}</td>
                                        <td>{offer.status === true && offer.isAccepted === false ? "Pendiente":
                                        offer.status === false && offer.isAccepted === true ? "Aceptada":"Rechazada"}</td>
                                    </tr> 
                                )
                                :
                                (null)
                            )
                        
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default MyOffers;