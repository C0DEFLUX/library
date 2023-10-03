import {useState} from "react";
import Header from "../Header";

function Add() {

    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [mainImg, setMainImg] = useState('')

    const handleChange = (file) => {
        setMainImg(file[0])
    }

    async function submitData(e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('title', title)
        formData.append('author', author)
        formData.append('description', description)
        formData.append('image', mainImg)

        let response = await fetch('http://localhost/api/add-book', {
            method: 'POST',
            body: formData,
        })
        response = await response.json()

        console.log(response)
    }

    return (
        <div>
            <Header/>
            <form className="flex flex-col gap-4 w-[20rem] p-4" onSubmit={submitData}>
                <input
                    className="bg-neutral-300"
                    value={title}
                    type="text"
                    name="title"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Book Title"
                />
                <input
                    className="bg-neutral-300"
                    value={author}
                    type="text"
                    name="title"
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="Book Author"
                />
                <input
                    className="bg-neutral-300"
                    value={description}
                    type="text"
                    name="description"
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Book Description "
                />
                <input
                    className="bg-neutral-300"
                    type="file"
                    name="image"
                    id="image"
                    onChange={e => handleChange(e.target.files)}
                    placeholder="Produkta nosaukums"
                />
                <button type="submit" className="admin-btn" onClick={submitData}>Send</button>
            </form>
        </div>
    )
}

export default Add