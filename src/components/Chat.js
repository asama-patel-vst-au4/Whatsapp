
import '../css/chat.css'
import { useState , useEffect} from 'react'
import { Avatar , IconButton } from '@material-ui/core'
import SearchOutlined from '@material-ui/icons/SearchOutlined'
import AttachFile from '@material-ui/icons/AttachFile'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import MicIcon from '@material-ui/icons/Mic'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import { useParams } from 'react-router'
import db from '../firebase'
import { useStateValue } from '../StateProvider'
import firebase from 'firebase/compat/app';
import 'firebase/firestore'

const Chat = () => {
    const { roomId } = useParams()
    const [seed , setSeed] = useState('')
    const [input , setInput] = useState('')
    const [roomName , setRoomName] = useState('')
    const [messages , setMessages] = useState([])
    const[{ user } , dispatch] = useStateValue()

    useEffect(()=>{
        if(roomId){
        db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
           setRoomName(snapshot.data().name)  
        ))

        db.collection('rooms').doc(roomId).collection('messages')
        .orderBy('timestamp' , 'asc').onSnapshot(snapshot => (
            setMessages( snapshot.docs.map(doc => 
                doc.data()
            ))
        ))
        }

    }, [roomId])

    useEffect(() => {
       setSeed( Math.floor(Math.random () * 333))
    }, [roomId])

    const sendMessage = (e) =>{
        e.preventDefault();
        db.collection('rooms').doc(roomId).collection('messages').add({
            message: input,
            name: user.displayName,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        })

        setInput('')
    }

    return (
        <div className='chat'>
            <div className="chat__header"> 
             <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
               
                <div className="chat__headerInfo">
                    <h3>{roomName}</h3>
                    <p> Last seen {" "}
                        {new Date(
                            messages[messages.length - 1]?.
                            timestamp?.toDate()
                        ).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}</p>
                </div>
                
                <div className="chat__headerRight">
                <IconButton> 
                 <SearchOutlined />
                 </IconButton>
                 <IconButton>
                 <AttachFile />
                 </IconButton>
                 <IconButton>
                 <MoreVertIcon />
                 </IconButton>
                </div>
            </div>

            <div className="chat__body">
            {messages.map((message) => (
                
                 <p className={`chat__message  ${message.name === user.displayName
                  && "chat__receiver"}`}>
                 <span className='chat__name'>{message.name}</span>
                    {message.message}
                 <span className="chat__timestamp">{new Date(message.timestamp?.toDate()).toLocaleString("en-US", {timeZone: 'Asia/Kolkata'})}</span>
                     </p>
                
            ))}
           </div>

            <div className="chat__footer">
                
                <InsertEmoticonIcon />
                <form>
                    <input value={input} onChange={(e) => setInput(e.target.value)} type="text"  placeholder='Type a message ..'/>
                    <button onClick={sendMessage}>Send a Message</button>
                </form>
                <MicIcon />
               
            </div>
        </div>
    )
}

export default Chat
