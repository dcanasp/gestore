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
    if(user.estado==1){
        document.getElementById('name').value=user.username;
        document.getElementById('email').value=user.email;
        if(user.rol==1){
            document.getElementById('rol').value='Comprador';
        }else{
            document.getElementById('rol').value='Vendedor';
        }
        console.log(user);
        window.localStorage.setItem('userRemove',user.user_id );
    }

}

const remove = async() =>{


    //NO DELETE UPDATE CON EMAIL 

    let user_id = window.localStorage.getItem('userRemove');
    if(user_id!=undefined){
        let url = 'http://localhost:3000/deleteUser/?user_id='+user_id;
        let user;
        const x = await fetch(url, {
            method : "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
              }
            }).then(response => response.text());
    }
    window.alert('Usuario eliminado');

}

document.getElementById('search').addEventListener('click', search, false);
document.getElementById('eliminar').addEventListener('click', remove, false);