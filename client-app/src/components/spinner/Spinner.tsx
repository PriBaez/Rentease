import "./Spinner.css"
const Spinner = () => {
    return(
    <div className="d-flex vh-100 bg-light justify-content-center align-items-center">
        <div className="spinner-border text-dark" role="status">
            <span className="visually-hidden">Loading...</span>
        </div>
    </div>
    )
}

export default Spinner;