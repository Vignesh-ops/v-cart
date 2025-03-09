import React, { useState, useContext } from 'react';
import DataContext from "../context/DataContext";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { Link } from 'react-router-dom';
import useAxiaosFetch from '../hooks/useAxiaosFetch';

const Allusers = () => {
    const uid = localStorage.getItem("loggeduid") || "";
    const { URL } = useContext(DataContext);
    const { data, isLoading, fetchError } = useAxiaosFetch(`${URL}/users?user_id=${uid}`);

    const Users = data || []; // Ensure Users is always an array

    // Track the selected user
    const [selectedUser, setSelectedUser] = useState(null);

    return (
        <div className='all-users'>
            {Users.map((user) => {
                const isActive = selectedUser === user.id; // Check if user is selected
                const displayName = user.id == uid ? "You" : user.username; // Change name to "You" if it's the logged-in user
                const disablepointer = user.id == uid ? true : false;
                return (
                    <Link
                        to={`/chat/${user.id}`}
                        state={{ Users }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            gap: "10px",
                            textDecoration: "none",
                            color: isActive ? "white" : "inherit", // Adjust link color
                            pointerEvents: disablepointer ? "none" : ''
                        }}
                    >
                        <ListItemButton
                            key={user.id}
                            onClick={() => setSelectedUser(user.id)}
                            sx={{
                                backgroundColor: isActive ? "#1976d2" : "transparent", // Highlight selected user
                                color: isActive ? "white" : "black",
                                borderRadius: "5px",
                                mb: 1
                            }}
                        >

                            {/* User Image Placeholder */}
                            <img
                                src={user.image || require("../images/placeholder.png")}
                                alt={user.username}
                                style={{
                                    width: "40px",
                                    height: "40px",
                                    borderRadius: "50%",
                                    border: isActive ? "2px solid white" : "none"
                                }}
                            />
                            <ListItemText primary={displayName} />
                        </ListItemButton>
                    </Link>

                );
            })}
        </div>
    );
}

export default Allusers;
