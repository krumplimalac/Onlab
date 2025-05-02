import React, { useRef, useEffect, useState, useContext } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { UserContext } from '../../App';

export default function ChatRoom({ userMessages, sendMessage, loadMessages } : 
    { userMessages:{senderId:string,text:string}[], sendMessage: (message:string, time:Date) => {}, loadMessages: (quantity:number)=>{}} ){
    const messagesEndRef = useRef<null | HTMLDivElement>(null);
    const user = useContext(UserContext);
    const [message, setMessage] = useState('');
    const [oldMessageButtonCounter, setOldMessageButtonCounter] = useState(1);
    const [dontScroll, setDontScroll] = useState(false);

    const handleSend = () => {
        if (message.trim()) {
            let currentTime = new Date;
            sendMessage(message, currentTime);
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
        if(!dontScroll){
            scrollToBottom();
        }
        setDontScroll(false);
    }, [userMessages]);

    return (
        <Container disableGutters sx={{background: '#000000', paddingTop: '2rem'}}>
            <Container disableGutters sx={{display: 'flex', justifyContent: 'center'}}>
                <KeyboardArrowUpIcon fontSize='large' onClick={() => {setOldMessageButtonCounter(oldMessageButtonCounter+1);loadMessages(oldMessageButtonCounter+1);setDontScroll(true)}} sx={{backgroundColor: '#222222', borderRadius: 8, transition: '0.5s', '&:hover': {padding: '0.3rem', backgroundColor: '#444444'}}}/>
            </Container>
            {userMessages.map((msg, index) => (
                <Container maxWidth={false} key={index} sx={{display: 'flex', flexDirection: 'column'}} >
                    { msg.senderId == user.id ? 
                    <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <Typography align={'left'} sx={{textWarp: 'balance', wordWrap: 'break-word',maxWidth: '16rem', backgroundColor: '#222222', borderRadius: 4, padding: 1, margin: 0.5}}>
                            {msg.text}
                        </Typography>
                    </Container>
                    :
                    <Container sx={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-start'}}>
                        <Typography align={'left'} sx={{textWarp: 'balance', wordWrap: 'break-word', maxWidth: '16rem', backgroundColor: '#444444', borderRadius: 4, padding: 1, margin: 0.5}}>
                            {msg.text}
                        </Typography>
                    </Container>
                    }
                </Container>
            ))}
            <div ref={messagesEndRef} />
            <Container maxWidth={false} sx={{padding: '2rem', display: 'flex', background: '#181818', marginTop: '2rem'}}>
                <TextField 
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyPress}
                    sx={{flexGrow: 10, background: '#FFFFFF', borderRadius: '4px'}}
                    >
                </TextField>
                <Button variant='contained' onClick={handleSend} sx={{flexGrow: 1, backgroundColor: '#444444'}}>
                    <SendIcon fontSize='large' />
                </Button>
            </Container>
        </Container>
    );
};

