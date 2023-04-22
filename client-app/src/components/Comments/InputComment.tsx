import {BiSend} from 'react-icons/bi'


const InputComment = ({propertyId, usuarioId, rating, setResCommentOk, 
   setResCommentFail, isReplying, setIsReplying, isEditing, setIsEditing, 
   relatedCommentId, setComment, commentId, comment}:
    {propertyId:number, usuarioId:number, rating:number, setResCommentOk:Function,
    setResCommentFail:Function, isReplying:boolean, setIsReplying:Function, isEditing:boolean,
    setIsEditing:Function, relatedCommentId:number, setComment:Function, commentId:number, comment:{
        propertyId: number,
        userId: number,
        relatedComment: number,
        comment1: string,
        createdAt: Date,
        score: number
    }}) => {
   
    const initialComment = {
        propertyId: 0,
        userId: 0,
        relatedComment: 0,
        comment1: "",
        createdAt: new Date(),
        score: 0
    }

    
    const isCommentDisabled = comment.comment1.length === 0;

    const handleComment = (event: any) => {
        const { name, value } = event.target;
        setComment({...comment, [name]:value})
    }

    const handlePost = async(e: any) => {
        e.preventDefault();
        const commentValue = {
            id: 0,
            propertyId: propertyId,
            userId: usuarioId,
            relatedComment: relatedCommentId,
            comment1: comment.comment1,
            createdAt: new Date(),
            score: rating
        }

        try {
            let res = await fetch('https://localhost:7272/api/Comment', {
            method: 'POST',
            headers:  {'Content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(commentValue)  
            })
            
            if(res.ok) {
                setResCommentOk(true)
                setIsEditing(false)
                setIsReplying(false)
                setTimeout(() => {
                    setComment(initialComment)
                    setResCommentOk(false)
                  }, 3000);
               
            }
            else {
                setResCommentFail(true)
                setTimeout(() => {
                    setResCommentFail(false)
                  }, 3000);
            }
            
        } catch (error) {
            console.log("error in post comment", error)
        }
    }

    const handlePut = async (e:any) => {
        e.preventDefault();
        const commentUpdateValue = {
            id: commentId,
            propertyId: propertyId,
            userId: usuarioId,
            relatedComment: comment.relatedComment,
            comment1: comment.comment1,
            createdAt: comment.createdAt,
            score: rating
        }
        
       
        try {
            let res = await fetch('https://localhost:7272/api/Comment/' + commentId, {
            method: 'PUT',
            headers:  {'Content-type':'application/json; charset=UTF-8'},
            body: JSON.stringify(commentUpdateValue)  
            })
            
            if(res.ok) {
                setResCommentOk(true)
                setIsEditing(false)
                setIsReplying(false)
                setComment(initialComment)
                setTimeout(() => {
                    setResCommentOk(false)
                  }, 3000);
               
            }
            else {
                setResCommentFail(true)
                setTimeout(() => {
                    setResCommentFail(false)
                  }, 3000);
            }
            
            
        } catch (error) {
            console.log("error in post comment", error)
        }
    }

    return(
        <div className="row mb-5">
            <div className="col">
                <form onSubmit={isEditing ? handlePut : handlePost}>
                <div className="d-flex flex-start align-items-center">
                    <textarea className="form-control me-1" placeholder="Escribe tu comentario aqui"
                    name="comment1" onChange={handleComment} value={comment.comment1} rows={3}/>
                    <button type="submit" className="btn btn-secondary" disabled={isCommentDisabled}><BiSend className="send-icon"/></button>
                </div>
                </form>
            </div>
        </div>
    )
}

export default InputComment;