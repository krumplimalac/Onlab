import { HubConnection, HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { useContext, useEffect, useState } from "react";
import ChatRoom from "../components/Chat/ChatRoom";
import { Button, Container, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from "../App";
import Loading from "../components/Loading";
import { Message } from "@mui/icons-material";

interface Message {
    senderId: string,
    //senderId: string,
    text: string,
    //receiver: string,
    //receiverId: string
}

interface backendMessage {
    sender: string,
    senderId: string,
    text: string,
    receiver: string,
    receiverId: string
}

const backendMessageToMessage = (msg:backendMessage):Message => {
    var message = {
        senderId: msg.senderId,
        text: msg.text
    }
    return message;
}

export default function Chat() {
    const user = useContext(UserContext);
    const [connection, setConnection] = useState<HubConnection>();
    const [userMessages, setUserMessages] = useState<Message[]>([]);
    const [receiverName, setReceiverName] = useState(user.role != 'Admin' ? 'hunyadyzsombor@gmail.com' : '');
    const [receiverId, setReceiverId] = useState('');
    const [chatId, setChatId] = useState('');
    const [chats, setChats] = useState<string[][]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setReceiverName(user.role != 'Admin' ? 'hunyadyzsombor@gmail.com' : '');
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
                connectionVar.on("ReceiveChats", (ch:string[][]) => {
                setChats(ch);
                });
            } else {
                setChatId(user.id);
                connectionVar.invoke('GetAdminId');
                connectionVar.on('SendAdminId', (id:string) => {
                    setReceiverId(id);
                })
                console.log('JOIN');
                await connectionVar.invoke('JoinChatRoom',user.id);
            }
            setLoading(false);
        };
        connectHub();
        return () => {
            setConnection(undefined);
            connectionVar.stop();
        };
    },[])

    useEffect(() => {
        if (user.role == 'Admin'){
            chats.filter((chat)=>( chat[1] != 'hunyadyzsombor@gmail.com')).map((chat) => {
                console.log("JOIN");
                connection?.invoke('JoinChatRoom',chat[0])});
        }
    },[chats])

    useEffect(() => {
        if (connection) {
            connection.on("ReceiveMessage", (senderId:string, text:string) => {
                setUserMessages(prevMessages => [...prevMessages, { senderId, text }]);
                if (user.role == 'Admin'){
                    connection.invoke('GetChats');
                }
            });
            connection.on("LoadMessages", (messages:backendMessage[]) => {
                messages.reverse();
                let msgs : Message[] = [];
                messages.map((m) => {
                    msgs.push(backendMessageToMessage(m))
                })
                setUserMessages(msgs);
            });
            connection.on("ReceiveChats", (chats:string[][]) => {
                setChats(chats);
                });
            connection.onclose(() => {
                console.log("Connection closed");
            });
        }
    },[connection]);

    const sendMessage = async (message:string, time:Date) => {
        if (connection) {
            await connection.invoke("SendMessage", chatId, user.id, receiverId, message, time);
        }
    };

    const loadMessages = async (quantity:number) => {
        if(connection){
            connection.invoke('LoadMessages',chatId,quantity);
        }
    }

    return(
        <Container disableGutters maxWidth={false} >
            <Container disableGutters={false}>
                {loading ? (
                    <Loading/>
                ) : (
                    chatId == '' ? (
                        <Container disableGutters sx={{display: 'flex',padding: '2rem', flexDirection: 'column', alignItems: 'center',backgroundColor: '#30343A'}}>
                            {chats.filter((chat)=>( chat[1] != 'hunyadyzsombor@gmail.com')).map((chat,i)=>(
                                <Container disableGutters maxWidth='md' onClick={() => {connection?.invoke('JoinChatRoom',chat[0]),setChatId(chat[0]);setReceiverName(chat[1]);setReceiverId(chat[0])}} key={i}
                                         sx={{borderRadius: 4, background: '#111111', padding: '1rem', margin: '2rem',
                                            display: 'flex', justifyContent: 'flex-start',
                                            transition: '0.5s',
                                            '&:hover':{backgroundColor:'#282828'}}}>
                                    <PersonIcon fontSize="large" sx={{background: '#444444', borderRadius: 8, padding: 1, margin: 0.5}}/>
                                    <Container disableGutters sx={{display: 'flex', flexDirection: 'column', alignItems: 'flex-start', paddingLeft: 1, maxWidth: 'inherit'}}>
                                            <Typography variant='h5' sx={{fontWeight: 'bold'}}>
                                                {chat[1]}
                                            </Typography>
                                            <Typography sx={{textOverflow: "ellipsis",overflow: 'clip',maxWidth: '16rem'}}>
                                                {chat[3] == user.id ? 'Te: ' : ''}{chat[2]}
                                            </Typography>
                                    </Container>
                                </Container>
                            ))}
                        </Container>
                    ) : (
                        <Container>
                            <Container disableGutters sx={{background: '#181818', display: 'flex', alignItems: 'center'}}>
                                {user.role == 'Admin' ? (
                                    <Button variant='contained' onClick={() => setChatId('')} sx={{backgroundColor: '#444444', padding: '1.5rem'}}>
                                        <ArrowBackIcon fontSize="large"/>
                                    </Button>
                                ) : null }
                                <Typography variant="h4" padding={'0.5rem'}>
                                    {receiverName}
                                </Typography>
                            </Container> 
                            <ChatRoom userMessages={userMessages} sendMessage={sendMessage} loadMessages={loadMessages}/>
                        </Container>
                    )
                )}
            </Container>
        </Container>
    )
}