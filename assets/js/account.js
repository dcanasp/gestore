const change = async() =>{

    

}

const edit = async() =>{

    let data= {
        user_id: Number(),
        username: String(),
        email: String()
    }

    try{
        let url = "http://localhost:3000/editUser/";
        let datos;
        const x = await fetch(url, {
          method: "POST",
          mode: "cors",
          cache: "no-cache",
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify(data)
        })
          .then((response) =>  texto=response.text())
          .then((data) => (datos = data));
          console.log(texto)
          window.location.reload();
      }catch(e){
    
      }

}

const verify=async()=>{
    if(localStorage.getItem('token')==undefined){
      window.location.replace("http://localhost:1234/");
    }
  }
  
  const logout = () =>{
    window.localStorage.removeItem('token');
    window.location.replace("http://localhost:1234/index.html");
    return;
  }

verify();

document.getElementById("logOut").addEventListener("click", logout); 

document.getElementById("change").addEventListener("click", change); 

document.getElementById("edit").addEventListener("click", edit); 
