import Header from "./Header";
import {useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function MyBooks() {

    const [data, setData] = useState([])
    const [loading, setLoading] = useState(true);

    const params = useParams()

    const fetchData = () => {
        fetch(`http://localhost/api/reserved-book-list/${params.id}`)
            .then((response) => response.json())
            .then((data) => {
                setData(data)
                setLoading(false);
                console.log(data)

            })
            .catch((error) => {
                console.log('Error fetching data:', error)
                setLoading(false);
            }
        )
    }
    useEffect(()=> {
        fetchData()
    }, [])

    return (
        <div className="min-h-screen bg-background flex flex-col gap-4 items-center">
            <Header/>
            {loading ? (
                <div className="flex-grow w-full flex justify-center items-center">
                    <div className="lds-facebook">
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                </div>
            ):(
                <div className="book-catalog-wrapper container flex-grow grid grid-rows-2 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
                    {/*{data.map((item) => (*/}
                    {/*    console.log(item)*/}
                    {/*))}*/}


                        {/*// <div className="group h-[25rem] bg-accent relative">*/}
                        {/*//     <img className="object-cover h-full w-full" src={item.image} alt="" />*/}
                        {/*//     <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-background h-1/2 flex justify-start items-end">*/}
                        {/*//         <div className="flex justify-between w-full flex-wrap items-center">*/}
                        {/*//             <p className="text-text">{item.title}</p>*/}
                        {/*//             <div className="text-text">*/}
                        {/*//                 {item.reserved === 0 ? (*/}
                        {/*//                     <p className="p-2 bg-green rounded-xl">Available</p>*/}
                        {/*//                 ) : (*/}
                        {/*//                     <p className="p-2 bg-red rounded-xl">Reserved</p>*/}
                        {/*//                 )}*/}
                        {/*//             </div>*/}
                        {/*//         </div>*/}
                        {/*//     </div>*/}
                        {/*//     <div className="info-card absolute top-0 w-full h-full bg-hover opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">*/}
                        {/*//         <div className="flex flex-col gap-4">*/}
                        {/*//*/}
                        {/*//         </div>*/}
                        {/*//     </div>*/}
                        {/*// </div>*/}
                    {/*// ))}*/}
                </div>
            )}
        </div>
    )
}

export default MyBooks