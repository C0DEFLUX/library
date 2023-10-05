import {useEffect, useState} from "react";
import Header from "../Header";
import {BiTrashAlt, BiSolidEditAlt} from 'react-icons/bi'
import {useNavigate} from "react-router-dom";

function Home(){

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    let token = localStorage.getItem('token')

    const navigate = useNavigate();

    const fetchData = () => {
        fetch('http://localhost/api/book-list')
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setLoading(false);
            })
            .catch((error) => {
                console.log('Error fetching data:', error)
                setLoading(false);
            }

        )
            console.log(data)
    }

    useEffect(() => {
        fetchData()
    }, [])

    const handleDelete = (id) => {
        setLoading(true);
        fetch(`http://localhost/api/remove-book/${id}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    // If the delete request is successful, re-fetch the data
                    fetchData();
                    console.log('Success')
                } else {
                    console.log('Delete request failed');
                    setLoading(false);
                }
            })
            .catch((error) => {
                console.error('Error deleting item:', error);
                setLoading(false);
            });
        }
    async function routerAuth() {

        let cleanData = {token}

        let response = await fetch('http://localhost/api/admin-auth', {
            method: 'POST',
            body: JSON.stringify(cleanData),
            headers: {
                "Content-Type": 'application/json',
                "Accept": 'application/json'
            }
        })

        response = await response.json()

        if(response.status === 403) {
            navigate('/admin')
        }

        if(document.getElementById('admin-loader')) {
            document.getElementById('admin-loader').style.display = "none";
        }
    }

    //Run function everytime the link is /dashboard
    useEffect( () => {
        routerAuth();
    }, [])

    function openEdit(id) {

        navigate(`edit/${id}`)

    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-2 lg:p-10 gap-4">
            <Header/>
            <div className="table-wrapper container bg-secondary flex-grow p-4 rounded-md flex flex-col">
                {loading ? (
                    <div className="flex-grow w-full flex justify-center items-center">
                        <div className="lds-facebook">
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>
                    </div>
                ):(
                <table className="w-full">
                    <tbody>
                        <tr className="border-b-[1px] border-border">
                            <th className="admin-th">#</th>
                            <th className="admin-th">Title</th>
                            <th className="admin-th">Author</th>
                            <th className="admin-th">Date Added</th>
                            <th className="admin-th">Reserved</th>
                            <th className="admin-th">Reserved for</th>
                            <th className="admin-th">Actions</th>
                        </tr>
                        {data.map((item, count) => (
                            <tr key={item.id} className="text-text hover:bg-tablehover hover:table-shadow rounded-2xl">
                                <td className="admin-td">{count + 1}</td>
                                <td className="admin-td">{item.title}</td>
                                <td className="admin-td">{item.author}</td>
                                <td className="admin-td">{item.created_at}</td>
                                <td className="admin-td">
                                    {item.reserved === 0 ? <p className="text-[red]">No</p> : <p className="text-[green]">Yes</p>}
                                </td>
                                <td className="admin-td">{item.reserve_time}</td>
                                <td className="admin-td">
                                    <div className="flex gap-2">
                                        <button onClick={()=> openEdit(item.id)} ><BiSolidEditAlt className="text-text opacity-40 text-xl hover:opacity-100"/></button>
                                        <button onClick={() => handleDelete(item.id)}>
                                            <BiTrashAlt className="text-text opacity-40 text-xl hover:text-[red] hover:opacity-100"/>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                )}
            </div>
        </div>
    )
}

export default Home