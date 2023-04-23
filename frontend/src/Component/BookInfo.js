import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function BookInfo() {

    const params = useParams()
    const navigate = useNavigate()
    const [bookInfo, getInfo] = useState([])
    useEffect(() => {
        getbookToUpdate()
    }, [])
    const getbookToUpdate = async () => {
        console.log(params.id)
        let result = await fetch(`https://booklistapp-c8hj.onrender.com/home/${params.id}`)
        result = await result.json()
        if (result) {
            getInfo(result)
            console.log(bookInfo)
        }
    }
    const handleDeleteAbook=async()=>{
        let result=await fetch(`https://booklistapp-c8hj.onrender.com/home/${params.id}`,
        {
            method:"delete"
        }
        )
        result=await result.json()
        if(result){
            navigate("/home")
        }
    }

    return (
        <div className='book-info'>
             <Link to={"/home"}>
                <button id='home-redirect'>Show Book list</button>
                </Link>
            <div className="table">
                
                <h1>Book's Record</h1>
                <p>View Book's info</p>
                <table>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Title</td>
                            <td>{bookInfo.title}</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Author</td>
                            <td>{bookInfo.author }</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td>ISBN</td>
                            <td>{ bookInfo.isbn}</td>
                        </tr>
                        <tr>
                            <td>4</td>
                            <td>Publisher</td>
                            <td>{bookInfo.publiser}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Publish date</td>
                            <td>{bookInfo.publiseTime}</td>
                        </tr>
                        <tr>
                            <td>5</td>
                            <td>Desription</td>
                            <td>{bookInfo.bookDesc}</td>
                        </tr>
                    </tbody>
                </table>
                <div className="btn">
                
                    <button id='delete' onClick={()=>handleDeleteAbook()}>Delete book</button>
                    <Link to={`/editbook/${params.id}`}>
                   <button id='edit'>Edit book</button>
                    </Link>
                   
                </div>
            </div>


        </div>
    )
}

export default BookInfo