
import '../css/sidebar.css'
import { Avatar, IconButton} from '@material-ui/core'
import DonutlargeIcon from '@material-ui/icons/DonutLarge'
import Chat from '@material-ui/icons/Chat'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import { SearchOutlined } from '@material-ui/icons'
import SidebarChat from './SidebarChat'
import { useState , useEffect} from 'react'
import db from '../firebase'
import { useStateValue } from '../StateProvider'

const Sidebar = () => {
    const [{ user } , dispatch] = useStateValue();
    const [rooms , setRooms] = useState([]);
    //Retrieving collection and data of each user from db
    //Snapshot is like on any change it will giveus back that change
    useEffect(() => {
       const unsubscribe = db.collection('rooms').onSnapshot(snapshot => (
            setRooms(snapshot.docs.map(doc =>(
                {
                    id:doc.id,
                    data:doc.data()
                }
            )
            ))
       ))
       return () => {
           unsubscribe();
       }
      //passing empty array so that it will reload only first time not again  
    }, [])

    return (
        <div className='sidebar'>
            <div className="sidebar__header">
            <Avatar src={user?.photoURL}/>
             <div className="sidebar__headerRight">
                 <IconButton> 
                 <DonutlargeIcon />
                 </IconButton>
                 <IconButton>
                 <Chat />
                 </IconButton>
                 <IconButton>
                 <MoreVertIcon />
                 </IconButton>
             </div>
            </div>
            <div className="sidebar__search">
                <div className="sidebar__searchContainer">
                <SearchOutlined />
                 <input type="text" placeholder='Search or Start a new chat ..' />
                </div>    
           </div>
                <div className="sidebar__chats">
                   <SidebarChat addNewChat />
                   {/* passing data got from db and maping through every single data */}
                   {(rooms.map(room => (
                       <SidebarChat key={room.id} id={room.id} 
                       name={room.data.name} />
                   )))}
                </div>
            

        </div>
    )
}

export default Sidebar
