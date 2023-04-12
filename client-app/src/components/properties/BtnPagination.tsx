import { Fragment } from "react"

const BtnPagination = ({totalCards, cardperPage, setCurrentPage, currentPage}:
    {totalCards:number, cardperPage:number, setCurrentPage:Function, currentPage:number}) => {
    
    let pages = []

    for(let i = 1; i<= Math.ceil(totalCards/cardperPage); i++)
    {
        pages.push(i)
    }

    return(
        <div>
            <nav aria-label="...">
                <ul className="pagination">
                    <li className="page-item">
                    <a className="page-link text-muted" tabIndex={-1} aria-disabled="true" 
                    onClick={() => currentPage > 1 ? 
                    setCurrentPage(currentPage - 1): null}>Previous</a>
                    </li>
                {
                    pages.map((page, index) => {
                        return(
                            <Fragment key={index}>
                                <li className={`page-item ${page === currentPage ? "active" : ""}`} >
                                    <a className="page-link" onClick={() => setCurrentPage(page)}>{page}</a>
                                </li>         
                            </Fragment>
                        )
                    })
                }
                    <li className="page-item">
                    <a className="page-link" onClick={() =>   currentPage < Math.ceil(totalCards/cardperPage) ? 
                                        setCurrentPage(currentPage + 1): null}>Next</a>
                    </li>
                </ul>
            </nav>
        </div>
    )
}

export default BtnPagination;