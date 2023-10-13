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