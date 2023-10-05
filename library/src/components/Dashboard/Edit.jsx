import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import Header from "../Header";

function Edit(){

    const [data, setData] = useState('')

    const params = useParams()

    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [mainImg, setMainImg] = useState('')
    const [response, setResponse] = useState('')
    const [popup, setPopUp] = useState(false)
    const [message, setMessage] = useState('')

    const handleChange = (file) => {
        setMainImg(file[0])
    }

    const closePopup = () => {
        setPopUp(false)
    }

    const fetchData = () => {
        fetch(`http://localhost/api/update-book-data/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setResponse(data)
                setAuthor(data.author)
                setTitle(data.title)
                setDescription(data.description)
            })
            .catch((error) => {
                    console.log('Error fetching data:', error)
                }
            )
    }


    useEffect(()=> {
        fetchData()
    }, [])

    async function submitData(e) {
        e.preventDefault()
        const formData = new FormData()

        formData.append('title', title)
        formData.append('author', author)
        formData.append('description', description)
        formData.append('image', mainImg)

        let response = await fetch(`http://localhost/api/update-book/${params.id}`, {
            method: 'POST',
            body: formData,
        })
        response = await response.json()

        console.log(response)
       if(response.status === 200) {
           setPopUp(true)
           setMessage(response.message)
            document.getElementById('title-err').innerHTML = ''
            document.getElementById('author-err').innerHTML = ''
            document.getElementById('image-err').innerHTML = ''
            document.getElementById('desc-err').innerHTML = ''


        }
        if(response.status === 403) {
            document.getElementById('title-err').innerHTML = ''
            document.getElementById('title-err').append(response.message.title)

            document.getElementById('author-err').innerHTML = ''
            document.getElementById('author-err').append(response.message.author)

            document.getElementById('image-err').innerHTML = ''
            document.getElementById('image-err').append(response.message.image)

            document.getElementById('desc-err').innerHTML = ''
            document.getElementById('desc-err').append(response.message.desc)
        }
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-2 lg:p-10 gap-4">
            <Header/>
            {popup === true ?
                <div className="popup-wrapper flex flex-col gap-4 bg-secondary border-background rounded-xl border-2 p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-text">{message}</h1>
                    <button onClick={closePopup} className="text-text bg-accent p-2 rounded-xl">Close</button>
                </div>
                :
                ''
            }
            <form className="flex gap-6 w-full container flex-grow" onSubmit={submitData}>
                <div className="flex gap-6 flex-col w-1/2 flex-grow">
                    <div className="bg-secondary p-6 h-1/3 rounded-xl flex flex-col gap-2">
                        <label className="text-text opacity-40">Book Title</label>
                        <input
                            className="bg-tablehover flex-grow text-text outline-none rounded-xl p-2"
                            value={title}
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <span className="text-red" id="title-err"></span>
                    </div>
                    <div className="bg-secondary h-1/3 rounded-xl flex flex-col gap-2 p-6">
                        <label className="text-text opacity-40">Book Author</label>
                        <input
                            className="bg-tablehover flex-grow rounded-xl outline-none p-2 text-text"
                            value={author}
                            type="text"
                            name="title"
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                        <span className="text-red" id="author-err"></span>
                    </div>
                    <div className="bg-secondary p-4 h-2/3 rounded-xl">
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <img className="h-[15rem]" src={response.image} alt=""/>
                            <div className="flex flex-col gap-1">
                                <label className="block text-sm font-medium text-text opacity-40"
                                       htmlFor="image">Upload file</label>
                                <input
                                    className="block w-full text-sm text-text border border-tablehover rounded-lg cursor-pointer focus:outline-none"
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={e => handleChange(e.target.files)}
                                />
                            </div>
                            <div className="w-full pt-2">
                                <span className="text-red" id="image-err"></span>
                            </div>
                        </div>

                    </div>
                </div>
                <div className="w-1/2 flex gap-6 flex-col">
                    <div className="bg-secondary p-6 h-4/5 rounded-xl flex flex-col gap-2">
                        <label className="text-text opacity-40">Book Description</label>
                        <textarea
                            className="bg-neutral-300 w-full flex-grow rounded-xl p-2 bg-tablehover text-text outline-none resize-none"
                            value={description}
                            name="description"
                            onChange={(e) => setDescription(e.target.value)}
                        />
                        <span className="text-red" id="desc-err"></span>
                    </div>
                    <div className="bg-secondary p-6 h-1/5 rounded-xl flex items-center justify-center">
                        <button type="submit" className="bg-accent w-full h-full rounded-xl text-text font-bold" onClick={submitData}>SAVE EDIT</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Edit