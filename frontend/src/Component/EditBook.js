import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

function EditBook() {
    const [title, getTitle] = useState("")
    const [isbn, getIsbn] = useState("")
    const [author, getAuthor] = useState("")
    const [desc, getDesc] = useState("")
    const [time, getTime] = useState("")
    const [publisher, getPublisher] = useState("")
    // const [bookInfo, getInfo] = useState([])

    const params = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        getbookToUpdate()
    },[])
    const getbookToUpdate = async () => {
        console.log(params)
        let result = await fetch(`https://booklistapp-c8hj.onrender.com/editbook/${params.id}`)
        result = await result.json()
        if (result) {
            console.log(result)
            getTitle(result.title)
            getAuthor(result.author)
            getIsbn(result.isbn)
            getPublisher(result.publiser)
            getTime(result.publiseTime)
            getDesc(result.bookDesc)

        }
    }
    const handleUpdateBook = async () => {
        let result = await fetch(`https://booklistapp-c8hj.onrender.com/editbook/${params.id}`, {
            method: "put",
            body: JSON.stringify({
                title: title,
                bookDesc: desc,
                publiseTime: time,
                isbn: isbn,
                author: author,
                publiser: publisher
            }),
            headers: {
                "Content-Type": "application/json"
            }
        });
        result = await result.json()
        console.log(result)

        navigate("/home")


    }



    return (
        <div className="box add-book">
             <Link to={"/home"}>
                <button id='home-redirect'>Show Book list</button>
                </Link>
            <div className="inputTag">
                <h1>Edit Book</h1>
                <p>Update book's info</p>
                <label htmlFor="title">
                    Title
                </label>
                <input id='title' type="text" placeholder='Title of the book'
                    value={title}
                    onChange={(e) => getTitle(e.target.value)}
                />
                <label htmlFor="isbn">
                    ISBN
                </label>
                <input id='isbn' type="text" placeholder='ISBN'
                    value={isbn}
                    onChange={(e) => getIsbn(e.target.value)}
                />
                <label htmlFor="author">
                    Author
                </label>
                <input id='author' type="text" placeholder='Author'
                    value={author}
                    onChange={(e) => getAuthor(e.target.value)}
                />
                <label htmlFor="desc">
                    Describe this book

                </label>
                <input id='desc' type="text" placeholder='Describe this book'
                    value={desc}
                    onChange={(e) => getDesc(e.target.value)}
                />
                <label htmlFor="date">
                    Publish date
                </label>
                <input id='date' type="text" placeholder='publish date'
                    value={time}
                    onChange={(e) => getTime(e.target.value)}
                />
                <label htmlFor="publisher">
                    Publisher
                </label>
                <input id='publisher' type="text" placeholder='publisher of this book'
                    value={publisher}
                    onChange={(e) => getPublisher(e.target.value)}
                />
                <button onClick={()=>handleUpdateBook()}>Submit</button>
            </div>
        </div>
    )
}

export default EditBook