export async function userAuth(token) {

    let cleanData = { token };

    let response = await fetch('http://localhost/api/verify-token', {
        method: 'POST',
        body: JSON.stringify(cleanData),
        headers: {
            "Content-Type": 'application/json',
            "Accept": 'application/json'
        }
    });

    response = await response.json();

    if (response.status === 403) {
        return false
    }
    return true
}