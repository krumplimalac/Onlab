import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useContext, useEffect, useState } from "react";
import ChatRoom from "../components/Chat/ChatRoom";
import { Button, Container, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import { UserContext } from "../App";
import Loading from "../components/Loading";
import { Message } from "@mui/icons-material";

interface Message {
    sender: string,
    text: string
}

export default function Chat() {
    const user = useContext(UserContext);
    const [connection, setConnection] = useState<HubConnection>();
    const [userMessages, setUserMessages] = useState<Message[]>([]);
    const [receiverName, setReceiverName] = useState(user.role != 'Admin' ? 'Admin' : '');
    const [chatName, setChatName] = useState('');
    const [chats, setChats] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [userName, setUserName] = useState(user.role ==  'Admin' ? 'Admin' : user.email);
    const [allMessages, setAllMessages] = useState<Message[][]>([]);

    useEffect(() => {
        setUserName(user.role ==  'Admin' ? 'Admin' : user.email);
        setReceiverName(user.role != 'Admin' ? 'Admin' : '');
        const connectionVar = new HubConnectionBuilder()
            .withUrl("https://localhost:7061/chat")
            .configureLogging(LogLevel.Information)
            .build();
        async function connectHub() {
            setLoading(true);
            await connectionVar.start();
            setConnection(connectionVar);
            if (user.role == 'Admin') {
                connectionVar.invoke('GetChats');
                connectionVar.on("ReceiveChats", (chats:string[]) => {
                setChats(chats);
                });
                /*chats.map((chat) => (
                    chat != 'Admin' ?
                        connectionVar.invoke('JoinChatRoom',chat)
                        : null
                ))*/
            } else {
                setChatName(user.email);
                await connectionVar.invoke('JoinChatRoom',user.email);
            }
            setLoading(false);
        };
        connectHub();
        console.log(userName);
        console.log(user.email);
        return () => {
            setConnection(undefined);
            connectionVar.stop();
        };
    },[])

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", (sender:string, text:string) => {
                setUserMessages(prevMessages => [...prevMessages, { sender, text }]);
            });
            connection.on("LoadMessages", (messages:Message[]) => {
                messages.reverse();
                setUserMessages(messages);
            });
            connection.onclose(() => {
                console.log("Connection closed");
            });
        }
    },[connection]);

    const sendMessage = async (message:string, time:string) => {
        if (connection) {
            await connection.invoke("SendMessage", chatName, userName, receiverName, message, time);
        }
    };


    return(
        <Container disableGutters maxWidth={false} >
            <Container disableGutters={false}>
                {loading ? (
                    <Loading/>
                ) : (
                    chatName == '' ? (
                        <Container disableGutters sx={{display: 'flex',padding: '2rem', flexDirection: 'column',backgroundColor: '#30343A'}}>
                            {chats.filter((chat)=>( chat != 'Admin')).map((chat,i)=>(
                                <Container disableGutters maxWidth='md' component={Button} onClick={() => {connection?.invoke('JoinChatRoom',chat);setChatName(chat);setReceiverName(chat)}} key={i}
                                         sx={{borderRadius: 4, background: '#111111', padding: '2rem', margin: '2rem', display: 'flex', justifyContent: 'flex-start'}}>
                                    <PersonIcon sx={{background: '#FFFFFF', borderRadius: 4, padding: 0.5, margin: 0.5}}/>
                                    <Typography>
                                        {chat}
                                    </Typography>
                                </Container>
                            ))}
                        </Container>
                    ) : (
                        <Container>
                            {user.role == 'Admin' ? (
                                <Button onClick={() => setChatName('')}>VISSZA</Button>
                            ) : null } 
                            <ChatRoom userMessages={userMessages} userName={userName} sendMessage={sendMessage}/>
                        </Container>
                    )
                )}
            </Container>
        </Container>
    )
}