import { useEffect} from "react";
import {AiFillStar, AiOutlineStar} from "react-icons/ai"


const StarRatingEdit = ({rating, setRating, commentRating}:
    {rating:number, setRating:Function, commentRating:number}) => {
    
    const handleChange = (score:number) => {
        setRating(score)
    }

    useEffect(() => {
        setRating(commentRating)
    }, [])
    
    return(
        <div className="star-rating d-flex ">
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

export default StarRatingEdit;