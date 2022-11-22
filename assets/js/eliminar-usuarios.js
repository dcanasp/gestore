let user;

const search =async()=>{

    let email = document.getElementById('busqueda').value;
    let url = 'http://localhost:3000/ADMIN/getUserUnique/?email='+email;
    
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        }).then(response => response.json()).then(data => user=data);
    document.getElementById('name').value=user.username;
    document.getElementById('email').value=user.email;
    if(user.rol==1){
        document.getElementById('rol').value='Comprador';
    }else{
        document.getElementById('rol').value='Vendedor';
    }
    return user;

}

const remove = async() =>{

    let user_id = await search().user_id;
    console.log(user_id);
    if(user_id!=undefined){
        let url = 'http://localhost:3000/deleteUser/?user_id='+user_id;
        console.log(url);
        let user;
        const x = await fetch(url, {
            method : "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
              }
            }).then(response => response.json());
    }
    console.log("LLEGUE")

}

document.getElementById('search').addEventListener('click', search, false);
document.getElementById('eliminar').addEventListener('click', remove, false);