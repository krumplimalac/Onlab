import React, { useRef, useEffect, useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';

export default function ChatRoom({ userMessages, userName, sendMessage } : { userMessages:{sender:string,text:string}[], userName:string, sendMessage: (message:string, time:string) => {}} ){
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const [message, setMessage] = useState('');
    
    const handleSend = () => {
        if (message.trim()) {
            let currentTime = new Date;
            sendMessage(message, currentTime.toString());
            setMessage('');
        }
    };

    const handleKeyPress = (e : React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };


    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [userMessages]);

    return (
        <Container disableGutters sx={{background: '#000000'}}>
            <Container sx={{background: '#181818'}}>
                <Typography>
                    Chat
                </Typography>
            </Container>
            {userMessages.map((msg, index) => (
                <Container maxWidth={false} key={index} sx={{display: 'flex', flexDirection: 'column'}} >
                    { msg.sender == userName ? 
                    <Container sx={{display: 'flex', flexDirection: 'row'}}>
                        <Container sx={{flexGrow: 2}}></Container>
                        <Typography align={'right'} sx={{backgroundColor: '#222222', borderRadius: 4, padding: 1, flexGrow: 2, margin: 0.5}}>
                            {msg.text}
                        </Typography>
                    </Container>
                    :
                    <Container sx={{display: 'flex', flexDirection: 'row'}}>
                        <Typography align={'left'} sx={{backgroundColor: '#444444', borderRadius: 4, padding: 1,  flexGrow: 6, margin: 0.5}}>
                            {msg.text}
                        </Typography>
                        <Container sx={{flexGrow: 1}}></Container>
                    </Container>
                    }
                </Container>
            ))}
            <div ref={messagesEndRef} />
            <Container maxWidth={false} sx={{padding: '2rem', display: 'flex', background: '#181818', marginTop: 3}}>
                <TextField 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    sx={{flexGrow: 10, background: '#FFFFFF', borderRadius: '4px'}}
                    >
                </TextField>
                <Button onClick={handleSend} sx={{flexGrow: 1}}>
                    SEND
                </Button>
            </Container>
        </Container>
    );
};

