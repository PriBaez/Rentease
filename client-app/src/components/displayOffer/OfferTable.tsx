import { useEffect, useState } from "react"
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

const OfferTable = ({propertyId}:{propertyId:number}) => {
    const [offers, setOffers] = useState([] as any [])
    const [users, setUsers] = useState([] as any [])

    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7272/api/Offer/myOffers/' + propertyId),
            fetch('https://localhost:7272/api/User'),
           
        ])
        .then(([resOffers, resUsers]) => 
        Promise.all([resOffers.json(), resUsers.json()]))

        .then(([dataOffers, dataUsers]) => {
            setOffers(dataOffers);
            setUsers(dataUsers);
            console.log("fetch data")
        })
        .catch((err) => {
            console.log(err.message);
        })

    }, [propertyId])

    const formatUsers = (userId:number) => {
        return users.find(x => x.id === userId)
    }

    return(
        <table className="table table-striped table-hover m-2">
             <thead>
                <tr>
                <th scope="col">Nombre</th>
                <th scope="col" className="d-none d-lg-table-cell">Email</th>
                <th scope="col" className="d-none d-lg-table-cell">Telefono</th>
                <th scope="col">Oferta</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {offers.map((offer, index) => {
                    return(
                        <tr key={index}>
                            <td>{formatUsers(offer.userId)["name"]}</td>
                            <td className="d-none d-lg-table-cell">{formatUsers(offer.userId)["email"]}</td>
                            <td className="d-none d-lg-table-cell">{formatUsers(offer.userId)["phone"]}</td>
                            <td>{offer.quantity}</td>
                            <td className="d-flex">
                                <button className="d-inline-block btn btn-success btn-sm me-2"><AiOutlineCheck/><p className='d-inline-block d-none d-lg-block'>Aceptar</p></button>
                                <button className="d-inline-block btn btn-danger btn-sm"><AiOutlineClose/><p className='d-inline-block d-none d-lg-block'>Rechazar</p></button>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OfferTable;