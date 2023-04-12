import { useEffect, useState } from 'react'
import {BsThreeDots} from 'react-icons/bs'


const ThreeDotsMenu = ({setIsEditing, setIsReplying, setCommentId, commentId, comment, setComment}: 
    {setIsEditing:Function, setIsReplying:Function, setCommentId:Function, commentId:number, comment: 
        {
            propertyId: number,
            userId: number,
            relatedComment: number,
            comment1: string,
            createdAt: Date,
            score: number
        }, setComment:Function}
    ) => {

    const editingComment = async () => {
        setIsEditing(true)
        setIsReplying(false)
        setCommentId(commentId)

        try {
            await fetch('https://localhost:7272/api/Comment/' + commentId)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                setComment(data);
                console.log("datos para editar:", data)
            })
        } catch (e) {

        }
    }

    const removeComment = () => {

    }

    

    return(
        <div className="dropdown align-self-start">
            <div className="btn btn-secondary btn-sm dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                <BsThreeDots/>
            </div>
            <ul className="dropdown-menu dropdown-menu-light">
                <li><a className="dropdown-item" href="#comment" onClick={() => editingComment()}>Editar</a></li>
                <li><a className="dropdown-item" href="#comment" onClick={() => removeComment()}>Eliminar</a></li>
            </ul>
        </div>
    )
}

export default ThreeDotsMenu;