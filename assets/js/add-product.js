const createNew= async() =>{


    let url = 'http://localhost:3000/SELLER/createProduct/';
    let datos;
    const x = await fetch(url, {
        method : "POST",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
        }}).then(response => response.json()).then(data => datos=data);
        
}

document.getElementById('new').addEventListener('click',createNew,false)