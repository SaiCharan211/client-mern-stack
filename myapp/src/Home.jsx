import axios from "axios";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "./Url";

function Home() {
  const navigate=useNavigate()
 axios.defaults.withCredentials=true;
  const handleLogout=()=>{
    axios.get(`${baseUrl}logout`)
    .then(res=>{
      if(res.data.status){
        navigate('/login',{replace:true})
        
      }
    }).catch(err=>{
      console.log(err)
    })
  }

  return <div style={{textAlign:"center"}}>
    <div>
    <h1>Home</h1>
    </div>
    
    <div className="">
      <Link to='/dashboard' className="btn btn-primary " style={{color:'white',textDecoration:'none'}} >Dashboard</Link>
      <button className="btn btn-secondary  m-2" onClick={handleLogout}>Logout</button>
    </div>
  </div>;
}

export default Home;
