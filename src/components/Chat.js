import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { TextField, Button, Paper, Typography, Box } from '@mui/material';
import useAxiaosFetch from '../hooks/useAxiaosFetch';
import { useLocation } from "react-router-dom";
const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const ws = useRef(null);
  const messagesEndRef = useRef(null);
  const { id } = useParams();
  const userID = Number(id);
  const URL = window.location.hostname === "localhost"
    ? "ws://localhost:8080"
    : "wss://server-54vw.onrender.com";
  
  const MAINURL = window.location.hostname === "localhost"
    ? "http://localhost:8080"
    : "https://server-54vw.onrender.com";

  const uid = localStorage.getItem("loggeduid");
  const { data } = useAxiaosFetch(`${MAINURL}/messages?user_id=${id}&from_id=${uid}`);
  const location = useLocation();
  const Users = location.state?.Users || []; 
  
  const userMap = Users.reduce((acc, user) => {
    acc[user.id] = user.username;
    return acc;
  }, {});
let isCurrentUser = 0
  useEffect(() => {
    if (data && Array.isArray(data)) {
       isCurrentUser = data.some(dat => dat.from_id == uid); // Checks if any message is from the current user

      setMessages(data);
    }
  }, [data]);


  const showNotification = (msg) => {
    if (Notification.permission === "granted") {
      new Notification(userMap[msg.user_id] || "New Message", {
        body: msg.content,
        icon: "/chat-icon.png" // Optional: Add an icon
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          new Notification(userMap[msg.user_id] || "New Message", {
            body: msg.content,
            icon: "/chat-icon.png"
          });
        }
      });
    }
  };

  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  

useEffect(() => {
  const connectWebSocket = () => {
    ws.current = new WebSocket(`${URL}/ws?user_id=${userID}&from_id=${uid}`);
console.log(isCurrentUser,'currentusr')
    ws.current.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        setMessages(prev => [...prev, msg]);

        // Show notification if the message is from another user
        if (msg.user_id !== Number(uid)) {
          showNotification(msg);
        } else{
          isCurrentUser = true

        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    ws.current.onclose = () => setTimeout(connectWebSocket, 3000);
  };

  connectWebSocket();
  return () => ws.current?.close();
}, [userID]);

  // const sendMessage = () => {
  //   if (input.trim() !== '' && ws.current?.readyState === WebSocket.OPEN) {
  //     const messageData = { user_id: userID, content: input };
  //     ws.current.send(JSON.stringify(messageData));
  //     setMessages(prev => [...prev, messageData]);
  //     setInput('');
  //   }
  // };

  const sendMessage = () => {
    if (input.trim() !== '' && ws.current?.readyState === WebSocket.OPEN) {
      const messageData = { user_id: Number(uid), content: input }; // Fix: Use logged-in user's ID
      ws.current.send(JSON.stringify(messageData));
      setMessages(prev => [...prev, messageData]); // Add message to UI immediately
      setInput('');
    }
  };
  

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);


  return (
    <Paper elevation={3} sx={{ maxWidth: 500, mx: 'auto', my: 4, p: 2, borderRadius: 2 }}>
      <Typography variant="h6" color="#1976d2" align="center" gutterBottom>
        Chat Room
      </Typography>
      <Box className='muiboxcustom' sx={{ height: 300, overflowY: 'auto', bgcolor: '#f5f5f5', p: 2, borderRadius: 2 }}>
        {messages.map((msg, index) => (
        <Box 
        key={index} 
        sx={{ 
          mb: 1, 
          p: 1, 
          bgcolor: msg.from_id === Number(uid) || isCurrentUser ? '#1976d2' : '#e3f2fd', 
          color: msg.from_id === Number(uid) || isCurrentUser ? 'white' : 'black', 
          borderRadius: 1, 
          maxWidth: '80%', 
          alignSelf: msg.from_id === Number(uid) || isCurrentUser ? 'flex-end' : 'flex-start', 
          display: 'inline-block' 
        }}
      >
        <Typography variant="body2" fontWeight="bold">
          {userMap[msg.from_id] || userMap[msg.user_id]}
        </Typography>
        <Typography variant="body1">{msg.content}</Typography>
      </Box>
      
        ))}
        <div ref={messagesEndRef} />
      </Box>
      <Box display="flex" mt={2}>
        <TextField
          fullWidth
          variant="outlined"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
          placeholder="Type a message..."
        />
        <Button variant="contained" color="primary" sx={{ ml: 1 }} onClick={sendMessage}>
          Send
        </Button>
      </Box>
    </Paper>
  );
};

export default ChatRoom;
