export async function routerAuth(navigate ,token) {

    let cleanData = { token };

    let response = await fetch('http://localhost/api/admin-auth', {
        method: 'POST',
        body: JSON.stringify(cleanData),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });

    response = await response.json();

    if (response.status === 403) {
        navigate('/admin');
    }
}
// import {useNavigate} from "react-router-dom";

// export async function routerAuth(token) {
//     const navigate = useNavigate()
//     let cleanData = { token };
//
//     try {
//         let response = await fetch('http://localhost/api/admin-auth', {
//             method: 'POST',
//             body: JSON.stringify(cleanData),
//             headers: {
//                 'Content-Type': 'application/json',
//                 Accept: 'application/json',
//             },
//         });
//
//         response = await response.json();
//
//         // Token is not valid
//         if (response.status === 403) {
//             navigate('/admin')
//         }
//
//
//     } catch (error) {
//         console.error('Authentication error:', error);
//         return false;
//     }
//
// }