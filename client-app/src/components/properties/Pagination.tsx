import { Fragment, useState } from "react"
import Properties from "./Properties";
import BtnPagination from './BtnPagination';
import Spinner from "../spinner/Spinner";


const PaginationProperties = () => {
    const [properties, setProperties] = useState([] as any[]);
    
    const [currentPage, setCurrentPage] = useState(1)
    const [cardsperPage, setCardsperPage] = useState(8)


    const lastCardIndex = currentPage * cardsperPage
    const firstCardIndex = lastCardIndex - cardsperPage
    const currentCards = properties.slice(firstCardIndex, lastCardIndex)


    return(
        <Fragment>
                <div className="d-flex flex-column">
                    {/* <Properties properties={currentCards} setProperties={setProperties} /> */}
                    
                    <div className="mt-5 mb-3 align-self-center">
                        <BtnPagination totalCards={properties.length} cardperPage={cardsperPage}
                        setCurrentPage={setCurrentPage} currentPage={currentPage}/>
                    </div>
                </div>
            
        </Fragment>
    )
}

export default PaginationProperties;

