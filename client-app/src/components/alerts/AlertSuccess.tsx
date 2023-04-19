
const AlertSucces = ({message}:{message:string}) => {
    return(
        <div className="alert alert-success position-fixed mt-2">
            {message}
        </div>
    )
}

export default AlertSucces;