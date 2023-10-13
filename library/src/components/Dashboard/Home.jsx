import {useEffect, useState} from "react";
import AdminHeader from "../AdminHeader";
import {BiTrashAlt, BiSolidEditAlt} from 'react-icons/bi'
import {useNavigate} from "react-router-dom";
import {routerAuth} from "../auth";

function Home(){



    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);
    const [showConfirm, setShowConfirm] = useState(false)
    const [deleteId, setDeleteId] = useState(null)

    let token = localStorage.getItem('admin-token')
    const navigate = useNavigate();

    useEffect( () => {
        routerAuth(navigate ,token);
    }, [])

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
    }

    useEffect(() => {
        fetchData()
        // window.location.reload();

    }, [])

    //Open the confirmation modal and set the id
    const handleDelete = (id) => {
        setShowConfirm(true);
        setDeleteId(id);
    };

    //If confirm is pressed get the set id and do the delete function
    const confirmDelete = () => {
        setLoading(true);
        fetch(`http://localhost/api/remove-book/${deleteId}`, {
            method: 'DELETE',
        })
            .then((response) => {
                if (response.status === 200) {
                    // If the delete request is successful, re-fetch the data
                    fetchData();
                } else {
                    setLoading(false);
                }
                setLoading(false);
                setShowConfirm(false);
                setDeleteId(null);
            })
            .catch((error) => {
                setLoading(false);
                setShowConfirm(false);
                setDeleteId(null);
            });
        }

    //Cancel the delete
    const cancelDelete = () => {
        setShowConfirm(false);
        setDeleteId(null);
    };

    function openEdit(id) {
        navigate(`edit/${id}`)
    }

    return (
        <div className="min-h-screen bg-background flex flex-col items-center p-2 lg:p-10 gap-4">
            {showConfirm && (
                <div className="popup-wrapper flex flex-col gap-4 bg-background border-background rounded-xl border-2 p-10 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-text">Are you sure you want to delete?</h1>
                    <div className="flex justify-center gap-4">
                        <button onClick={confirmDelete} className="text-text bg-accent p-2 rounded-xl">Delete</button>
                        <button onClick={cancelDelete} className="text-text bg-primary p-2 rounded-xl">Close</button>
                    </div>
                </div>
                )}
            <AdminHeader/>
            <div className="table-wrapper overflow-y-scroll container bg-secondary flex-grow p-4 rounded-md flex flex-col">
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
                            <th className="admin-th">Reserved till</th>
                            <th className="admin-th">Reserved by</th>
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
                                <td className="admin-td">{item.user}</td>
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