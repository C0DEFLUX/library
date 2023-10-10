import {useEffect, useState} from "react";
import AdminHeader from "../AdminHeader";
import {useNavigate} from "react-router-dom";
import {routerAuth} from "../auth";

function Add() {

    useEffect( () => {
        routerAuth(navigate ,token);
    }, [])

    let token = localStorage.getItem('admin-token')

    const navigate = useNavigate();

    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [mainImg, setMainImg] = useState('')
    const [popup, setPopUp] = useState(false)
    const [message, setMessage] = useState('')

    const [error, setError] = useState({
        title: '',
        desc: '',
        author: '',
        image: ''
    })

    useEffect(() => {
    }, [error]);

    const handleChange = (file) => {
        setMainImg(file[0])
    }

    async function submitData(e) {
        e.preventDefault();
        const formData = new FormData();

        formData.append('title', title);
        formData.append('author', author);
        formData.append('description', description);
        formData.append('image', mainImg);

        let response = await fetch('http://localhost/api/add-book', {
            method: 'POST',
            body: formData,
        });

        response = await response.json();

        if (response.status === 200) {
            setPopUp(true);
            setMessage(response.message);
            setTitle('');
            setAuthor('');
            setDescription('');
            setMainImg('');
        } else if (response.status === 403) {
            setError(response.error);
        }
    }

    useEffect( () => {
        routerAuth(navigate ,token);
    }, [])

    const closePopup = () => {
        setPopUp(false)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-2 lg:p-10 gap-4">
            <AdminHeader/>
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
                        {error.title && (
                            <span className="text-red">{error.title}</span>
                        )}
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
                        {error.author && (
                            <span className="text-red">{error.author}</span>
                        )}
                    </div>
                    <div className="bg-secondary p-4 h-2/3 rounded-xl">
                        <div className="flex flex-col items-center justify-center w-full h-full">
                            <label htmlFor="image" className="flex flex-col items-center justify-center w-full h-full border-2 border-tablehover border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                    <svg className="w-8 h-8 mb-4 text-text opacity-40" aria-hidden="true"
                                         xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"
                                              strokeWidth="2"
                                              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                                    </svg>
                                    <p className="mb-2 text-sm text-text opacity-40"><span
                                        className="font-semibold text-text">Click to upload</span> or drag and drop</p>
                                    <p className="text-xs text-text opacity-40">PNG, JPG, JPEG</p>
                                </div>
                                <input
                                    className="bg-neutral-300"
                                    type="file"
                                    name="image"
                                    id="image"
                                    onChange={e => handleChange(e.target.files)}
                                    hidden
                                />
                            </label>
                            <div className="w-full pt-2">
                                {error.image && (
                                    <span className="text-red">{error.image}</span>
                                )}
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
                        {error.desc && (
                            <span className="text-red">{error.desc}</span>
                        )}
                    </div>
                    <div className="bg-secondary p-6 h-1/5 rounded-xl flex items-center justify-center">
                        <button type="submit" className="bg-accent w-full h-full rounded-xl text-text font-bold" onClick={submitData}>ADD BOOK</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default Add