import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useContext } from 'react';
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



  useEffect(() => {
    const connectWebSocket = () => {
      ws.current = new WebSocket(`${URL}/ws?user_id=${userID}`);
      ws.current.onopen = () => console.log('Connected to WebSocket server');

      ws.current.onmessage = (event) => {
        try {
          const msg = JSON.parse(event.data);
          setMessages(prev => [...prev, msg]); // Store entire object
        } catch (error) {
          alert('err pharsing msg')
          console.error('Error parsing message:', error);
        }
      };

      ws.current.onclose = () => {
        console.log('Disconnected from server, reconnecting in 3s...');
        setTimeout(connectWebSocket, 3000);
      };

      ws.current.onerror = (error) => {
        console.error('WebSocket error:', error);
      };
    };

    connectWebSocket();
    return () => ws.current?.close();
  }, [userID]);

  const sendMessage = () => {
    if (input.trim() !== '' && ws.current?.readyState === WebSocket.OPEN) {
      const messageData = { user_id: userID, content: input };
      ws.current.send(JSON.stringify(messageData));
      setMessages(prev => [...prev, messageData]); // Add message to UI immediately
      setInput('');
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Chat Room</h2>
      <div style={{ height: '300px', border: '1px solid #ccc', padding: '1rem', overflowY: 'auto' }}>
        {messages.map((msg, index) => (
          <div key={index} style={{ marginBottom: '0.5rem' }}>
            <strong>User {msg.user_id}:</strong> {msg.content}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <input 
        type="text" 
        value={input} 
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => { if (e.key === 'Enter') sendMessage(); }}
        style={{ width: '80%', marginRight: '0.5rem' }}
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default ChatRoom;
