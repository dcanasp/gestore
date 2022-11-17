
const verify=async()=>{
    let infoToken;
    let url = 'http://localhost:3000/decodeToken/';
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
}

verify()