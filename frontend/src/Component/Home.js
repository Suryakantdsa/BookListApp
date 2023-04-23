import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Home() {
    const [bookList, getAllbookList] = useState([])
    const navigate=useNavigate()
    useEffect(() => {
        getAllbook()
    }, [])
    console.log(bookList)
    const getAllbook = async () => {
        let result = await fetch("https://booklistapp-c8hj.onrender.com/home", {
            // headers:{
            //     authorizatiion:JSON.parse(localStorage.getItem("token"))
            // }
        })
        result = await result.json()
        getAllbookList(result)

    }
    
    const handleLogout = () => {
        localStorage.clear()
        navigate("/signin")
    }
    return (
        <div className='home-book'>
            <nav>
                <Link to={'/home'}>
                <h1>Book List</h1>
                </Link>
                <button onClick={()=>handleLogout()}>Logout</button>
            </nav>
            <div className='add-book-btn'>
                <Link to={"/addbook"}>
                <button>+Add New Book</button>
                </Link>
            </div>
            <div className="Allbook">
                {
                   bookList.length>0? bookList.map((book) => {
                        return (
                            <div className="single-book" key={book._id}>
                                <Link to={`/home/${book._id}`}>
                                <img src="./bookfront.jpg" alt="coverpage" />
                                <p 
                                style={{color:"blue"}}
                                >{book.title}</p>
                                <p
                                style={{color:"gray"}}
                                >{book.author}</p>
                                <p
                                style={{color:"white"}}
                                
                                >{book.bookDesc}</p>
                                </Link>
                            </div>
                        )
                    }):
                    <h1 >no book are available</h1>
                }


            </div>

        </div>
    )
}

export default Home