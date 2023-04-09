import "./Carousel.css"

const Carousel = ({images}:{images: any []}) => {
    return(
    <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="true">
        <div className="carousel-indicators">
            {images.map((x, index) => {
                return index === 0 ?  
                <button type="button" data-bs-target="#carouselExampleIndicators" 
                data-bs-slide-to={index} className="active" aria-current="true" aria-label={`Slide i ${index + 1}`}></button>
                :
                <button type="button" data-bs-target="#carouselExampleIndicators" 
                data-bs-slide-to={index} aria-label={`Slide i ${index + 1}`}></button>
        
            })}
        
        
        </div>
        <div className="carousel-inner">
           
            { images.map((img, index) => {
                return index === 0 ? 
                <div key={index} className="carousel-item active">
                    <img src={`data:image/jpeg;base64,${img.image}`} className="card-img-top" alt="..."/>
                </div>
                :
                <div key={index} className="carousel-item">
                    <img src={`data:image/jpeg;base64,${img.image}`} className="card-img-top" alt="..."/>
                </div>
                
            })}
                
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
        </button>
    </div>
    )
}

export default Carousel;