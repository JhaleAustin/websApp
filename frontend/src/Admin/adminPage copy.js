import React, { Fragment, useEffect, useState } from 'react'  
import axios from 'axios'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const AdminPage = () => {
  const[users,setUsers] =  useState([])

  const[plantType,setType] =  useState()
  
  const[height,setHeight] =  useState()

  useEffect(()=>{
    axios.get('http://localhost:3001/getUser')
    .then((users)=>{
        setUsers(users.data)
    }).catch(err => console.log(err))
  },[])


  const submit =()=>{
    axios.post('http://localhost:3001/createUser',{plantType,height})
    .then((users)=>{
        console.log(users)
    }).catch(err => console.log(err))
  }
    return (
         <div>
            {
             users.map(users=>{
return <div>
    <h3>{users.plantType}</h3>
    <h3>{users.height}</h3>
</div>
           })    
            }

            <br/>
            <input type="text" onChange={(e)=>setType(e.target.value)}/>
            <input type="number" onChange={(e)=>setHeight(e.target.value)}/>
            <button onClick={submit}>dfddfdf</button>
          
           </div>

    )
}

export default AdminPage