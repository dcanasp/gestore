const verify=async()=>{
  if(localStorage.getItem('token')!=undefined){
    let infoToken;
    let url = 'http://localhost:3000'+'/decodeToken/';
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

const logout = () =>{
  window.localStorage.removeItem('token');
  window.location.replace("http://localhost:1234/index.html");
  return;
}

verify()

document.getElementById("logOut").addEventListener("click", logout);    