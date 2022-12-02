const verify=async()=>{
  if(localStorage.getItem('token')!=undefined){
    let infoToken;
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    if(infoToken.rol!=3){
      window.location.replace("http://localhost:1234/");
    }
  }else{
    window.location.replace("http://localhost:1234/index.html/");
  }
}

const search =async()=>{

    let email = document.getElementById('busqueda').value;
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//ADMIN/getUserUnique/?email='+email;
    const x = await fetch(url, {
        method : "GET",
        mode: 'cors',
        cache: 'no-cache',
        headers: {
            'Authorization': 'Bearer '+localStorage.getItem('token')
          }
        }).then(response => response.text()).then(data => user=data);
    if(response != 'Algo salio mal'){
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

}

const remove = async() =>{

    let user_id = window.localStorage.getItem('userRemove');
    if(user_id!=undefined){
        let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000//deleteUser/?user_id='+user_id;
        let user;
        const x = await fetch(url, {
            method : "POST",
            mode: 'cors',
            cache: 'no-cache',
            headers: {
                'Authorization': 'Bearer '+localStorage.getItem('token')
              }
            }).then(response => response.text());
        if(response != 'Algo salio mal'){
           window.alert('Usuario eliminado');
           window.location.reload(); 
        }
    }
    

}

const logout = () =>{
  window.localStorage.removeItem('token');
  window.location.replace("http://localhost:1234/index.html");
  return;
}

verify();

document.getElementById("logOut").addEventListener("click", logout);    
document.getElementById('search').addEventListener('click', search, false);
document.getElementById('eliminar').addEventListener('click', remove, false);