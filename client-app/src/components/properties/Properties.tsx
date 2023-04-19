import { Fragment, useEffect, useState } from 'react';
import format from 'date-fns/format';
import "./Properties.css"
import { NavLink } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import BtnPagination from '../pagination/BtnPagination';


const Properties = () => {
    
    let indexImg = 0
    let currenPost = 0
    const [loading, setLoading] = useState(false)
    const [images, setImages] = useState([] as any[]);
    const [propertyAttributes, setPropertyAttributes] = useState([] as any[])
    const [attributes, setAttributes] = useState([] as any[])

    const [allProperties, setAllProperties] = useState([] as any[])
    const [properties, setProperties] = useState([] as any[]);
    
    const [currentPage, setCurrentPage] = useState(1)
    const cardsperPage:number = 8


    const lastCardIndex = currentPage * cardsperPage
    const firstCardIndex = lastCardIndex - cardsperPage
    
    const currentCards = allProperties.slice(firstCardIndex, lastCardIndex)
    
    const setCurrentCards = () => {
        setProperties(currentCards)
    }    

    useEffect(() => {
        try {
            setLoading(true)
            sortByDate()
            setProperties(currentCards)

        } catch (error) {
            
        } finally {
            setLoading(false)
        }
    }, [currentPage])

    useEffect(() => {
        setLoading(true)
        Promise.all([
            fetch('https://localhost:7272/api/Property'),
            fetch('https://localhost:7272/api/PropertiesImage'),
            fetch('https://localhost:7272/api/PropertiesAttribute'),
            fetch('https://localhost:7272/api/Attribute'),
        ])
        .then(([resProperty, resImage, resPropertyAttribute, resAttributes]) => 
        Promise.all([resProperty.json(), resImage.json(), resPropertyAttribute.json(),
                    resAttributes.json()]))
        .then(([dataProperty, dataImage, dataPropertyAttributes, dataAttributes]) => {
            setAllProperties(dataProperty);
            setImages(dataImage);
            setPropertyAttributes(dataPropertyAttributes)
            setAttributes(dataAttributes)
        })
        .catch((err) => {
            console.log(err.message);
        })
        .finally(() => {
            sortByDate()
            setLoading(false)
        })
    }, []);

    useEffect(() => {
        try {
            setLoading(true)
            sortByDate()
            setCurrentCards()
        
        } catch (error:any) {
            console.log(error.message)
            
        } finally {   
            setLoading(false)
        }
        
    }, [allProperties])

    const sortByDate = () => {
        return allProperties.sort((a,b) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const getAttributes = (id:number):any [] => {
       
        let propertyAttribute = propertyAttributes.filter(attr => attr.propertyId === id)
        let attributeFormatted = propertyAttribute.map((pAttr) => {    
                return attributes.map((attr, index) => {
                return pAttr.idAttribute === attr.id ?
                <p key={index}>{attr.description} {pAttr.quantity}</p>: null
            })
        })

        return attributeFormatted;
    }

    return(
       <Fragment>
            {loading === false ? 
            (<div className='d-flex row row-cols-lg-4 gx-5 mx-2 justify-content-center'>
                {properties.map((properties, index) => {
                return(
                    <div className="col mb-4" key={index}>
                        <NavLink to={'/properties/details/' + properties.id} 
                                className="card card-properties h-100 mt-4 ms-auto shadow-lg">
                                { 
                                images.map((i) => {

                                        if(i.propertyId === properties.id && indexImg < 1)
                                        {
                                            indexImg++
                                            currenPost = properties.id
                                            return( <img src={`data:image/jpeg;base64,${i.image}`} key={index} className="card-img-top" alt="..."/>)
                                        
                                        } else if (currenPost !== properties.id)
                                        {
                                            indexImg = 0
                                            return(null)
                                        }
                                        return null
                                    }
                                )}
                                <div className="card-body">
                                    <h5 className="card-title">{properties.titulo}</h5>
                                    
                                        {getAttributes(properties.id).map((pAttr, index) => {
                                           
                                            return(   
                                               <div key={index} className='col'>
                                                <div className='row'>
                                                    {pAttr}
                                                    
                                                </div>
                                               </div>
                                            )
                                        })}
                                    <hr/>
                                    <p className="card-text"><small className="text-muted">publicado el {format(new Date(properties.createdAt), 'dd/MM/yyyy hh:mm a')}</small></p>
                                </div>
                        </NavLink>
                    </div>
                )
                    
            })}
                <div className="row justify-content-center align-items-end mt-auto mb-3">
                    <BtnPagination 
                        totalCards={allProperties.length} 
                        cardperPage={cardsperPage}
                        setCurrentPage={setCurrentPage} 
                        currentPage={currentPage}
                        setCurrentCards={setCurrentCards}
                        />
                </div>
            </div> )
            : <Spinner/>}
        </Fragment>
    )
}

export default Properties;