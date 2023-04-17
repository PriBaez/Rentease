import {AiFillStar, AiOutlineStar} from "react-icons/ai"
import "./StarRating.css"

const StarRating = ({rating, setRating}:{rating:number, setRating:Function}) => {
    
    const handleChange = (score:number) => {
        setRating(score)
  
    }
    
    return(
        <div className="star-rating d-flex fit-content">
      {[...Array(5)].map((star, index) => {        
       index += 1;
       return (
         <div
           key={index}
           className="mb-1"
           onClick={() => handleChange(index)}
         >
           <span className="star">{(index <= rating) ? <AiFillStar/>: <AiOutlineStar/> }</span>
         </div>
       );
      })}     
    </div>
    )
}

export default StarRating;