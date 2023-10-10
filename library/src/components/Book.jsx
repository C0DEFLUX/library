import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Header from "./Header";
import {userAuth} from "./userAuth";

function Book() {
    const params = useParams()
    const [data, setData] = useState('')
    const [description, setDescription] = useState('')
    const [author, setAuthor] = useState('')
    const [title, setTitle] = useState('')
    const [image, setImage] = useState('')
    const [reserved, setReserved] = useState('')
    const [reservedFor, setReservedFor] = useState('')
    const token = localStorage.getItem('token')
    const [isAuth, setIsAuth] = useState('')
    const [bookId, setBookId] = useState('')
    const [userName, setUserName] = useState('')
    const [uid, setUid] = useState('')
    const [time, setTime] = useState('')
    const [timePopUp, setTimePopUp] = useState(false)


    // console.log(params.id)

    async function findByToken(token) {

        let cleanData = { token };

        let response = await fetch('http://localhost/api/find-by-token', {
            method: 'POST',
            body: JSON.stringify(cleanData),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });
        response = await response.json();

        setUserName(response.username)
        setUid(response.id)

    }

    const fetchData = () => {
        fetch(`http://localhost/api/single-book-data/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setBookId(data.id)
                setAuthor(data.author)
                setTitle(data.title)
                setDescription(data.description)
                setImage(data.image)
                setReserved(data.reserved)
                setReservedFor(data.reserve_time)
            })
            .catch((error) => {
                    console.log('Error fetching data:', error)
                }
            )
    }


    async function checkUserAuthentication() {
        try {
            // Replace with your token value
            const isAuthenticated = await userAuth(token);

            // Use the isAuthenticated value here
            if (isAuthenticated) {
                setIsAuth('true')
                findByToken(token)

            } else {
                setIsAuth('false')
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleTime = () => {

        setTimePopUp(true)

    }

    const handleReserve = async (id, uid) => {

        let cleanData = { id, uid };

        let response = await fetch('http://localhost/api/reserve-book', {
            method: 'POST',
            body: JSON.stringify(cleanData),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        });
        response = await response.json();

        console.log(response)

    }

    useEffect(()=> {
        fetchData()
        checkUserAuthentication()
    }, [])

    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-2 lg:p-10 gap-4">
            <Header/>
            <div className="book-wrapper container flex-grow flex flex-col gap-8 lg:flex-row">
                <div className="book-image-box w-100 lg:w-1/2">
                    <img className="object-cover h-full rounded-xl" src={image} alt=""/>
                </div>
                <div className="flex flex-col lg:w-1/2 gap-8">
                    <div className="bg-secondary text-text h-1/10 flex gap-1 rounded-xl p-4">
                        <span className="font-bold">{title}</span>
                        <span>by</span>
                        {author}
                    </div>
                    <div className="bg-secondary text-text flex-grow flex gap-1 rounded-xl p-4">
                        <p>{description}</p>
                    </div>
                    <div className="flex gap-8 ">
                        <div className="bg-secondary text-text flex gap-1 items-center justify-center rounded-xl p-4 w-full">
                            {reserved === 0 ? <p className="text-[green]">Available</p> : <p className="text-[red]">Reserved</p>}
                        </div>

                        { isAuth === 'true' ?
                            <button onClick={handleTime} className="w-full bg-accent rounded-xl text-text">
                                RESERVE
                            </button>
                            :
                            <button disabled className="w-full bg-accent rounded-xl text-text">
                                LOGIN  TO RESERVE
                            </button>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book