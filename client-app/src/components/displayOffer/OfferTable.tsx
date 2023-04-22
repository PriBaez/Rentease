import { useEffect, useState } from "react"
import {AiOutlineCheck, AiOutlineClose} from "react-icons/ai"

const OfferTable = ({propertyId, setOk, setFail, sellerId}:{propertyId:number, setOk:Function, setFail:Function, sellerId:number}) => {
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
        })
        .catch((err) => {
            console.log(err.message);
        })

    }, [propertyId])

    const formatUsers = (userId:number) => {
        return users.find(x => x.id === userId)
    }


    const handleAccept = async (e:any, offerId:number, userId:number, quantity:number) => {
        e.preventDefault()

        const inputValue =  {
            id: offerId,
            propertyId: propertyId,
            userId: userId,
            quantity: quantity,
            status: false,
            isAccepted: true
        }

        console.log("value accepted", inputValue)
        try {
            let res = await fetch('https://localhost:7272/api/Offer/' + offerId, {
            method: 'PUT',
            headers:  {'Content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(inputValue)  
            })
            
            if(res.ok) {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                  }, 3000);
               
            }
            else {
                setFail(true)
                setTimeout(() => {
                    setFail(false)
                  }, 3000);
            }
        } catch (error:any) {
            console.log()
        }


        const offerAcceptedValue =  {
            id: offerId,
            sellerId:userId,
            renterId: userId,
            quantity: quantity,
            status: false,
            isAccepted: true
        }

        try {
            let res = await fetch('https://localhost:7272/api/OfferAccepted', {
            method: 'PUT',
            headers:  {'Content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(inputValue)  
            })
            
            if(res.ok) {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                  }, 3000);
               
            }
            else {
                setFail(true)
                setTimeout(() => {
                    setFail(false)
                  }, 3000);
            }
        } catch (error:any) {
            console.log()
        }
    }

    const handleReject = async (event:any, offerId:number, userId:number, quantity:number) => {
        event.preventDefault()

        const inputValue =  {
            id: offerId,
            propertyId: propertyId,
            userId: userId,
            quantity: quantity,
            status: false,
            isAccepted: false
        }

        console.log("value rejected", inputValue)
        try {
            let res = await fetch('https://localhost:7272/api/Offer/' + offerId, {
            method: 'PUT',
            headers:  {'Content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(inputValue)  
            })
            
            if(res.ok) {
                setOk(true)
                setTimeout(() => {
                    setOk(false)
                  }, 3000);
               
            }
            else {
                setFail(true)
                setTimeout(() => {
                    setFail(false)
                  }, 3000);
            }
        } catch (error:any) {
            console.log()
        }
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
                        <tr key={index} className={offer.status === true && offer.isAccepted === false ? "text-info":
                        offer.status === false && offer.isAccepted === true ? "text-success":"text-danger"}>
                            <td>{formatUsers(offer.userId)["name"]}</td>
                            <td className="d-none d-lg-table-cell">{formatUsers(offer.userId)["email"]}</td>
                            <td className="d-none d-lg-table-cell">{formatUsers(offer.userId)["phone"]}</td>
                            <td>{offer.quantity}</td>
                            {offer.status === true && offer.isAccepted === false? 
                                (<td className="d-flex">
                                <button className="d-inline-block btn btn-success btn-sm me-2"
                                onClick={(event) => handleAccept(event, offer.id, offer.userId, offer.quantity)}>
                                    <AiOutlineCheck/>
                                    <p className='d-inline-block d-none d-lg-block'>Aceptar</p>
                                </button>
                                <button className="d-inline-block btn btn-danger btn-sm"
                                onClick={(event) => handleReject(event, offer.id, offer.userId, offer.quantity)}>
                                    <AiOutlineClose/>
                                    <p className='d-inline-block d-none d-lg-block'>Rechazar</p>
                                </button>
                                </td>)
                            : offer.status === false && offer.isAccepted === true ? 
                            <p className="text-success">Aceptada</p>:<p className="text-danger">Rechazada</p>
                            }
                        </tr>
                    )
                })}
            </tbody>
        </table>
    )
}

export default OfferTable;