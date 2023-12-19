import { addDoc, collection, onSnapshot, serverTimestamp, query, where, orderBy} from "firebase/firestore";
import { auth } from "../firebase/config"
import { db } from "../firebase/config";
import { useEffect, useState } from "react";
import Message from "../components/Message";

const ChatPage = ({setRoom, room}) => {
    const [messages, setMessages] =useState([])

    /* koleksiyonun referansını alma */

    const messagesCol = collection(db, "messages");

    /* filtreleme ayarları oluşturma */
    const queryOptions = query(messagesCol, 
        where("room", "==", room),
        orderBy("createdAt",'asc')
        );

const handleSubmit = async (e) => {
    e.preventDefault();
    const text = e.target[0].value;
    
    /* veri tabanına yeni doküman ekler */
await addDoc(messagesCol, {
    text,
    room,
    author:{
        name: auth.currentUser.displayName,
        uid:auth.currentUser.uid,
        photo:auth.currentUser.photoURL,
    },
    createdAt:serverTimestamp(),
});

/* formu sıfırla */
e.target.reset();
};

/* verilere abone olma */
useEffect(() => {
    /* anlık olarak kolleksiyon değişimlerini izleyip
    koleksiyon her değiştiğinde verdiğimiz function çalıştırır */
    
    const unsub = onSnapshot(queryOptions, (snapshot) => {

        /* geçici bir diziye aktardım */
    const tempMsg = [];
    snapshot.docs.forEach((doc) => tempMsg.push(doc.data()))
    
    /* geçici dizideki verileri state e aktarır. */
    setMessages(tempMsg)
    })

    /* kullanıcı bileşenden ayrılınca aboneliği sonlandırır */
    return () => unsub();
}, [])


    return (
    <div className='chat-page'>
        <header>
            <p>{auth?.currentUser?.displayName}</p>
            <p>{room}</p>
            <button onClick={()=> setRoom(null)}>Farklı Odaya geç</button>
        </header>
        <main>
             {messages.map((data, i) => (
                <Message data={data} key={i}/>
            ))} 
        </main>
        <form onSubmit={handleSubmit}>
            <input type="text" required  placeholder='mesaj yazınız...'/>
            <button>Gönder</button>
        </form>
    </div>
  )
}

export default ChatPage