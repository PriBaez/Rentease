import { Fragment } from "react"

const BtnPagination = ({totalCards, cardperPage, setCurrentPage, currentPage, setCurrentCards}:
    {totalCards:number, cardperPage:number, setCurrentPage:Function, 
        currentPage:number, setCurrentCards:Function}) => {
    
    let pages = []

    for(let i = 1; i<= Math.ceil(totalCards/cardperPage); i++)
    {
        pages.push(i)
    }

    const previousPage = () => {
       var page =  currentPage > 1 ?  setCurrentPage(currentPage - 1): null
       setCurrentCards()
       return page
    }

    const nextPage = () => {
        var page = currentPage < Math.ceil(totalCards/cardperPage) ? 
        setCurrentPage(currentPage + 1): null
        setCurrentCards()
        return page
    }

    return(
        <div className="position-sticky align-self-end mt-3">
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                    <button className="page-link text-muted" tabIndex={-1} aria-disabled="true" 
                    onClick={() => previousPage()}>Previous</button>
                    </li>
                {
                    pages.map((page, index) => {
                        return(
                            <Fragment key={index}>
                                <li className={`page-item ${page === currentPage ? "active" : ""}`} >
                                    <button className="page-link" onClick={() => setCurrentPage(page)}>{page}</button>
                                </li>         
                            </Fragment>
                        )
                    })
                }
                    <li className="page-item">
                    <button className="page-link" onClick={() => nextPage()}>Next</button>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default BtnPagination;