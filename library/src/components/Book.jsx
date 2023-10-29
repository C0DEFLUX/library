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
    const [time, setTime] = useState('')
    const [timePopUp, setTimePopUp] = useState(false)
    const [dateErr, setDateErr] = useState('')
    let uid = ''
    const [toms, setToms] = useState('')


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

        console.log(response)

        uid = response.uid

        localStorage.setItem('user_id', uid);

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
                console.log(data.author)
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

    const closeTime = () => {
        setTimePopUp(false)
    }

    const handleReserve = async (id) => {

        if(time.length > 0) {

            let uid = localStorage.getItem('user_id')

            let cleanData = { id, uid, time};

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

            if(response.status === 403) {
                setDateErr(response.message)
            }

            if(response.status === 200) {
                setTimePopUp(false)
                window.location.reload()
            }

        }

    }
    function getToday() {
        const today = new Date();
        today.setDate(today.getDate() + 2);
        const year = today.getFullYear();
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const day = String(today.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() + 1);

    function formatDate(date) {
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    }

    useEffect(()=> {
        fetchData()
        checkUserAuthentication()
        findByToken()
    }, [])

    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-2 gap-4">
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
                            <div>
                                <button onClick={handleTime} className="w-full bg-accent rounded-xl py-4 px-10 text-text">
                                    RESERVE
                                </button>
                            </div>
                            :
                            <a href="/login" className="w-full bg-accent rounded-xl text-text flex items-center justify-center">
                                LOGIN  TO RESERVE
                            </a>
                        }
                        {timePopUp === true && isAuth === 'true' && reserved === 0 && (
                            <div className="flex flex-col gap-4 rounded-xl bg-secondary border-background border-2 p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <input
                                    value={time}
                                    type="date"
                                    name="time"
                                    onChange={(e) => setTime(e.target.value)}
                                    min={getToday()}
                                    max={formatDate(maxDate)}
                                />
                                {dateErr && (
                                    <span className="text-red">{dateErr}</span>
                                )}
                                <div className="flex gap-4">
                                    <button className="bg-accent text-text p-4 rounded-xl" onClick={() => handleReserve(bookId)}>Reserve</button>
                                    <button className="bg-background text-text p-4 rounded-xl" onClick={closeTime}>Close</button>
                                </div>
                            </div>
                            )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Book