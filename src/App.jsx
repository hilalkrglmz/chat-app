import { signInWithPopup } from "firebase/auth"
import { provider } from "./firebase/config"
import { auth } from "./firebase/config"
import AuthPage from "./pages/AuthPage"
import { useState } from "react"
import RoomPage from "./pages/RoomPage"
import ChatPage from "./pages/ChatPage"


const App = () => {

const [isAuth, setIsAuth] = useState(localStorage.getItem("TOKEN"))
const [room,setRoom] = useState(null)
/* yetkisi yoksa giriş sayfasına yönlendir */

if(!isAuth){
  return <AuthPage setIsAuth={setIsAuth}/>
}

/* yetkisi varsa oda seçme sayfasına yönlendir */
return (
    <div className="container">
    {

    /* oda varsa sohbet bileşeni oda yoksa oda seçme ekranı */
    room ? <ChatPage room={room} setRoom={setRoom}/> 
    
    : <RoomPage setRoom={setRoom} setIsAuth={setIsAuth}/> 
    }
    
    
    </div>
  )
}

export default App