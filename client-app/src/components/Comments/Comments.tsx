import { Fragment, useEffect, useState } from "react";
import "./Comments.css"
import { BiUserCircle } from 'react-icons/bi'
import {BsReply} from 'react-icons/bs'
import { format } from "date-fns";
import InputComment from "./InputComment";
import ThreeDotsMenu from './ThreeDotsMenu';
import InputRootComment from "./InputRootComment";
import StarRating from "../starRating/StarRating";
import StarRatingEdit from "../starRating/StarRatingEdit";


const Comments = ({propertyId, usuarioInfo}:{propertyId:string, usuarioInfo:{
    id: number, name: string, email: string, phone: string
    }}) => {
 
    const [users, setUsers] = useState([] as any[])
    const [comments, setComments] = useState([] as any[])
   
    const [resCommentOk, setResCommentOk] = useState(false)
    const [resCommentFail, setResCommentFail] = useState(false)
    const [isEditing, setIsEditing] = useState(false)
    const [isReplying, setIsReplying] = useState(false)

    const [rootCommentId, setRootCommentId] = useState<number>(0);
    const [rating, setRating] = useState(0)

    const [rmComment, setRmComment] = useState(false)

    const [comment, setComment] = useState({
        propertyId: 0,
        userId: 0,
        relatedComment: 0,
        comment1: "",
        createdAt: new Date(),
        score: rating
    })

    
   
    const initialComment = {
        propertyId: 0,
        userId: 0,
        relatedComment: 0,
        comment1: "",
        createdAt: new Date(),
        score: 0
    }

    const rootComment = comments.filter(comment => comment.relatedComment === 0 && 
        comment.propertyId === parseInt(propertyId));

    const getReplies = (commentId:number) => {
        return comments.filter(c => c.relatedComment === commentId)
        .sort((a,b) =>  new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    }

    const replyComment = (relatedCommentId:number) => {
        setIsReplying(true)
        setIsEditing(false)
        setRating(0)
        setComment(initialComment)
        setRootCommentId(relatedCommentId)
    }
   
    useEffect(() => {
        Promise.all([
            fetch('https://localhost:7272/api/Comment'),
            fetch('https://localhost:7272/api/User'),
            ])
        .then(([resComment, resUser]) => Promise.all([resComment.json(), resUser.json()]))
        .then(([commentdata, userData]) => {
            setComments(commentdata);
            setUsers(userData);
        })
        .catch((err) => {
            console.log(err.message);
        })
    }, [comments])

    return( 
        <Fragment>
            <div className="container my-5 py-5">
                {resCommentOk ? 
                    <div className="alert alert-success" role="alert">
                    Comentario agregado exitosamente!
                    </div> : null
                }

                { resCommentFail && usuarioInfo.id !== 0 ?
                    <div className="alert alert-danger" role="alert">
                        Su comentario no pudo ser agregado, por favor trate de nuevo en unos instantes.
                    </div> : null
                }

                { resCommentFail && usuarioInfo.id === 0 ?
                    <div className="alert alert-warning" role="alert">
                        Debes estar logeado para poder comentar esta publicacion
                    </div>
                    : null
                }
            <div className="row d-flex justify-content-center">
            <div className="col-md-12 col-lg-10 col-xl-8">
                <div className="card">
                <div className="card-body p-4">
                    <h4 className="text-start mb-4 pb-2">Comentarios</h4>
                        <InputRootComment propertyId={parseInt(propertyId)} usuarioId={usuarioInfo.id} 
                        setResCommentFail={setResCommentFail} setIsEditing={setIsEditing} setIsReplying={setIsReplying} 
                        setResCommentOk={setResCommentOk} relatedCommentId={0} 
                        score={rating} setComment={setComment} comment={comment} commentId={0}/>
                        {(isEditing === false) && (isReplying === false) && (comment.comment1.length > 0) ? 
                        <StarRating 
                            rating={rating} 
                            setRating={setRating} />
                            :
                        null}

                { rmComment ?
                    <div className="alert alert-success" role="alert">
                        Comentario eliminado exitosamente
                    </div> : null
                }
                { rmComment === false ?
                    <div className="alert alert-danger" role="alert">
                        su Comentario no pudo ser eliminado
                    </div> : null
                }
                        {/* <img className="rounded-circle shadow-1-strong me-3 avatar"
                            src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(10).webp" alt="avatar" /> */}
                            { rootComment.length > 0 ?
                                rootComment.map((ct, index) => {
                                    return (
                                        <div key={index} className="row" id="comment">
                                            <div className="col">
                                                <div className="d-flex flex-start">
                                                            
                                                    <div className="rounded-circle me-3 avatar">
                                                            <BiUserCircle className="avatar" /> 
                                                    </div>
                                                    <div className="flex-grow-1 flex-shrink-1 mb-3">
                                                        <div>
                                                        <div className="d-flex justify-content-between align-items-center">
                                                            <p className="mb-1">
                                                                {users.map((user, index) => {
                                                                    return(user.id === ct.userId ? 
                                                                        user.name : null)
                                                                })}
        
                                                                <span className="small"> - el {format(new Date(ct.createdAt), "dd/MM/yyyy")}</span>
                                                                <a href={"#comment/" + ct.id} onClick={() => replyComment(ct.id)} className="reply-link ms-3"><BsReply/><span className="small"> reply</span></a>
                                                            </p>

                                                            {ct.userId === usuarioInfo.id ?
                                                                                    <ThreeDotsMenu rmComment={rmComment} setRmComment={setRmComment} setIsEditing={setIsEditing} 
                                                                                    setIsReplying={setIsReplying} setCommentId={setRootCommentId} commentId={ct.id}
                                                                                    comment={comment} setComment={setComment}/>
                                                                                    : null  
                                                            }                                                        
                                                        </div>
                                                        <p className="small mb-0">
                                                            {ct.comment1}
                                                        </p>
                                                        </div>   
                                                        { (isEditing && ct.id === rootCommentId) &&
                                                        (<InputComment propertyId={parseInt(propertyId)} usuarioId={usuarioInfo.id} 
                                                        rating={rating} setResCommentFail={setResCommentFail} setResCommentOk={setResCommentOk} 
                                                        isReplying={isReplying} setIsReplying={setIsReplying} isEditing={isEditing} 
                                                        setIsEditing={setIsEditing}relatedCommentId={rootCommentId} 
                                                        setComment={setComment} comment={comment} commentId={ct.id}/>)
                                                        }
                                                        {(isEditing && ct.id === rootCommentId) && 
                                                        (comment.comment1.length > 0) ? 
                                                        <StarRatingEdit rating={rating} commentRating={comment.score} setRating={setRating}/>
                                                        :
                                                        null}

                                                        { (isReplying && ct.id === rootCommentId) &&
                                                        (<InputComment propertyId={parseInt(propertyId)} usuarioId={usuarioInfo.id} 
                                                        rating={rating} setResCommentFail={setResCommentFail} setResCommentOk={setResCommentOk} 
                                                        isReplying={isReplying} setIsReplying={setIsReplying} isEditing={isEditing} 
                                                        setIsEditing={setIsEditing}relatedCommentId={rootCommentId} 
                                                        setComment={setComment} comment={comment} commentId={ct.id}/>)}
                                                        {(isReplying && ct.id === rootCommentId) && 
                                                        (comment.comment1.length > 0) ? 
                                                        <StarRating rating={rating} setRating={setRating}/>
                                                        :
                                                        null}
                                                        
                                                        { (getReplies(ct.id).length > 0) ?
                                                            getReplies(ct.id).map((reply, index) => {
                                                                return(
                                                                <div key={index} id="comment" className="row mt-3 reply-to">
                                                                    <div className="d-flex flex-start">
                                                                    <a href={"#comment"} className="me-3">
                                                                    <div className="rounded-circle shadow-1-strong me-3 avatar">
                                                                        <BiUserCircle className="avatar" />
                                                                    </div>
                                                                    </a>
            
                                                                    <div className="flex-grow-1 flex-shrink-1 fit-content">
                                                                        <div>
                                                                            <div className="d-flex justify-content-between align-items-start">
                                                                                <p className="mb-1">
                                                                                {users.map((user, index) => {
                                                                                    return(user.id === reply.userId ? 
                                                                                        user.name : null)
                                                                                })} 
                                                                                    <span className="small me-3"> - el {format(new Date(reply.createdAt), "dd/MM/yyyy")}</span>
                                                                                    <a href="#reply-to" onClick={() => replyComment(reply.id)} className="reply-link"><BsReply/><span className="small"> reply</span></a>
                                                                                </p>
                                                                                    {reply.userId === usuarioInfo.id ?
                                                                                    <ThreeDotsMenu rmComment={rmComment} setRmComment={setRmComment} 
                                                                                    setIsEditing={setIsEditing} setIsReplying={setIsReplying} 
                                                                                    setCommentId={setRootCommentId} commentId={reply.id}
                                                                                    comment={comment} setComment={setComment}/>
                                                                                    : null  
                                                                                    }
                                                                            </div>
                                                                            <p className="small mb-0">
                                                                                {reply.comment1}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                    { isReplying && reply.id === rootCommentId &&
                                                                        (<InputComment propertyId={parseInt(propertyId)} usuarioId={usuarioInfo.id} 
                                                                        rating={rating} setResCommentFail={setResCommentFail} setResCommentOk={setResCommentOk} 
                                                                        isReplying={isReplying} setIsReplying={setIsReplying} isEditing={isEditing} 
                                                                        setIsEditing={setIsEditing}relatedCommentId={rootCommentId} 
                                                                        setComment={setComment} comment={comment} commentId={reply.id}/>)
                                                                    }
                                                                    {(isReplying && reply.id === rootCommentId) && 
                                                                    (comment.comment1.length > 0) ? 
                                                                    <StarRating rating={rating} setRating={setRating}/>
                                                                    :
                                                                    null}

                                                                    { isEditing && reply.id === rootCommentId &&
                                                                        (<InputComment propertyId={parseInt(propertyId)} usuarioId={usuarioInfo.id} 
                                                                        rating={rating} setResCommentFail={setResCommentFail} setResCommentOk={setResCommentOk} 
                                                                        isReplying={isReplying} setIsReplying={setIsReplying} isEditing={isEditing} 
                                                                        setIsEditing={setIsEditing}relatedCommentId={rootCommentId} 
                                                                        setComment={setComment} comment={comment} commentId={reply.id}/>)
                                                                    }
                                                                    {(isEditing && reply.id === rootCommentId) && 
                                                                    (comment.comment1.length > 0) ? 
                                                                    <StarRatingEdit rating={rating} commentRating={comment.score} setRating={setRating}/>
                                                                    :
                                                                    null}
                                                                </div>
                                                                
                                                                
                                                                )})      
                                                            :   
                                                            null
                                                            } 
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        )         
                                    }) 
                                :
                                <p className="text-center">Aun no hay comentarios</p>
                            }
                </div>
                </div>
            </div>
            </div>
        </div>
      </Fragment>               
    );
}

export default Comments;