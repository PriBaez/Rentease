

const AlertFail = ({message}:{message:string}) => {
    return(
        <div className="alert alert-danger position-fixed mt-2">
            {message}
        </div>
    )
}

export default AlertFail;