import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

function AddnewBook() {
    const [title, getTitle] = useState("")
    const [isbn, getIsbn] = useState("")
    const [author, getAuthor] = useState("")
    const [desc, getDesc] = useState("")
    const [time, getTime] = useState("")
    const [publisher, getPublisher] = useState("")
    const navigate = useNavigate()
    const handleAddbook = async () => {
        if (title && desc && author && isbn && author && publisher) {
            let time = new Date().toLocaleString()
            getTime(time)
            fetch("https://booklistapp-c8hj.onrender.com/addbook",
                {
                    method: "post",
                    body: JSON.stringify({
                        title: title, bookDesc: desc,
                        publiseTime: time,
                        isbn: isbn,
                        author: author,
                        publiser: publisher
                    })
                    , headers: {
                        "Content-Type": "application/json"

                    }
                })
                .then(resp => resp.json())
                .then((data) => {
                    console.log(data)
                    if (data) {
                        navigate("/home")
                    }
                    console.log(data)
                })
                .catch(err => console.log(err))

        }else{
            alert("Please add all book details")
        }
    }

    return (
        <div>
            <div className="box add-book ">
                <Link to={"/home"}>
                <button id='home-redirect'>Show Book list</button>
                </Link>
                <div className="inputTag">
                    <h1>Add Book</h1>
                    <p>Create new Book</p>

                    <input type="text" placeholder='Title of the book'
                        value={title}
                        onChange={(e) => { getTitle(e.target.value) }}

                    />

                    <input type="text" placeholder='ISBN'
                        value={isbn}
                        onChange={(e) => { getIsbn(e.target.value) }}
                    />
                    <input type="text" placeholder='Author'
                        value={author}
                        onChange={(e) => { getAuthor(e.target.value) }}
                    />
                    <input type="text" placeholder='Describe this book'
                        value={desc}
                        onChange={(e) => { getDesc(e.target.value) }}
                    />
                    <input type="text" placeholder='publish date'
                        value={time}
                        onChange={(e) => { getTime(e.target.value) }}
                    />
                    <input type="text" placeholder='publisherof this book'
                        value={publisher}
                        onChange={(e) => { getPublisher(e.target.value) }}
                    />
                    <button onClick={handleAddbook}>Submit</button>
                </div>
            </div>
        </div>
    )
}

export default AddnewBook