const verify=async()=>{
  if(localStorage.getItem('token')!=undefined){
    let infoToken;
    let url = 'http://ec2-52-91-104-218.compute-1.amazonaws.com:3000'+'/decodeToken/';
    const x = await fetch(url, {
      method : "GET",
      mode: 'cors',
      cache: 'no-cache',
      headers: {
        'Authorization': 'Bearer '+localStorage.getItem('token')
      }}
      ).then(response => response.json()).then(data => infoToken=data);
    if(infoToken.rol!=3){
      window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
    }
  }else{
    window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
  }
}

const logout = () =>{
  window.localStorage.removeItem('token');
  window.location.replace("http://ec2-52-91-104-218.compute-1.amazonaws.com:1234/");
  return;
}

verify()

document.getElementById("logOut").addEventListener("click", logout);    