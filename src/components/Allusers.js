import React from 'react'
import { useContext } from 'react'
import DataContext from "../context/DataContext";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import useAxiaosFetch from '../hooks/useAxiaosFetch'

const Allusers = () => {
    let loggeduid = ''
    const uid = localStorage.getItem("loggeduid");
    if(uid){
        loggeduid = uid
    }

    const {URL} = useContext(DataContext)
    const { data, isloading, fetchError } = useAxiaosFetch(`${URL}/users?user_id=${loggeduid}`);
    console.log(data,'uid****',loggeduid);
    const Users = data

    return (
        <div className=''>
            {Users.map((user) => (<ListItemButton key={user.id}  >
               <Link to={`/chat/${user.id}`} ><ListItemText primary={user.username} /></Link> 
            </ListItemButton>
            ))}
        </div>
    )
}

export default Allusers