
import '../css/sidebarChat.css'
import { Avatar } from '@material-ui/core'
import { useState , useEffect} from 'react'
import db from '../firebase'
import { Link } from 'react-router-dom'

const SidebarChat = ( { id , name ,addNewChat} ) => {
    const [messages , setMessages] = useState([])
    const [seed , setSeed] = useState('')
    //Getting random avatar function
    useEffect(() => {
       setSeed( Math.floor(Math.random () * 333))
    }, [])


    useEffect(()=>{
        if(id){
            db.collection('rooms')
            .doc(id)
            .collection('messages')
            .orderBy('timestamp','desc')
            .onSnapshot((snapshot) =>
            setMessages(snapshot.docs.map((doc) => (
                doc.data()
            ))) )
        }
    }, [id])
    //getting chatname from user and pushing chat name to db as room name
    const createChat = () =>{
        const roomName = prompt('Please enter name for room');
        if (roomName) {
            db.collection('rooms').add({
                name:roomName,
            })
        }
    }

    return !addNewChat ? (
        <Link to={`/rooms/${id}`}>
        <div className='sidebarChat'>
            {/* api for getting random avatar everytime page loads */}
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
            <div className="sidebarChat__info">
                {/* Retrieving name from sidebar component passed here as props */}
                <h2>{name}</h2>
                <p>{messages[0]?.message}</p>
            </div>
        </div>
        </Link>
    ) :
    (
        <div onClick={createChat} className='sidebarChat'>
                <h2>Add New Chat-Room</h2>
        </div>
    )
}

export default SidebarChat
