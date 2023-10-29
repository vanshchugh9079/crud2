import React, { useState } from 'react'

export default function Post() {
    let [name, setname] = useState("")
    let [email, setemail] = useState("")
    let [password, setpassword] = useState("")
    let[messege,setmessege]=useState("")
    let nvalue=document.getElementById("username")
    let nmail=document.getElementById("exampleInputEmail1")
    let npassword=document.getElementById("exampleInputPassword1")
    // function defenation
    let send = () => {
        let alreadyexist=false
        fetch("http://localhost:1337/api/detailsall")
        .then((res)=>{
         return res.json()
        })
        .then((data)=>{
            console.log(data);
             data.data.map((cv)=>{
               if(cv.attributes.Name===name|| cv.attributes.email===email)
               {
                    alreadyexist=true
                    setmessege("username or email is already exist")
                    return ;
               }
             })
        })       
        .catch((err)=>{
          console.log(err+"this is error");
        })
        if(!alreadyexist)
        {
            fetch("http://localhost:1337/api/detailsall", {
                method: "POST",
                headers: {
                    'accept': 'application/json',
                    'Content-Type':'application/json'
                },
                body:
                JSON.stringify(
                    {
                        "data": {
                            "Name": name,
                            "email": email,
                            "Password": password
                        }
                    }
                )
            }).then((res)=>{
              return res.json()
            }).then((data)=>{
                console.log(nmail.value);
                if(nmail.value!=null && nvalue.value!=null && npassword.value!=null)
                {
                    setmessege("your account has been successfull created")
                }
                else{
                    setmessege("plese enter full details")
                }
              console.log(data);
            }).catch((err)=>{
               console.log(err);
            })
          
        }
    }
    return (
        <form>
            <div className="mb-3">
                <label htmlFor="usename" className="form-label">Username</label>
                <input type="text" className="form-control" id="username" onChange={(e) => {
                    setname(e.target.value)
                }} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" onChange={(e) => {
                    setemail(e.target.value)
                }} />
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" onChange={(e) => {
                    setpassword(e.target.value)
                }} />
            </div>
            <button type="button" className="btn btn-primary" onClick={() => {
                send()
            }}>Submit</button>
            <p className="text-danger">{messege}</p>
        </form>
    )
}
