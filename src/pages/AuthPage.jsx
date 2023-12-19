import { signInWithPopup } from "firebase/auth"
import { auth } from "../firebase/config"
import { provider } from "../firebase/config"

const AuthPage = ({setIsAuth}) => {

const handleLogin = () => {

    /* giriş yap butonuna tıklanıldığında: */
    signInWithPopup(auth,provider)    
    .then((res) => {
        /* oturumun zaten açık olduğu durumları farke tmek için local e token i kaydederiz. */
        localStorage.setItem("TOKEN" , res.user.refreshToken);
        
        /* kullancı yetkisini true ya çektik */
        setIsAuth(true);
    })
    .catch((err) => console.log(err))
}
    return (
    <div className='container'>
        <div className='auth'>
        <h1 >Chat Odası</h1>
        <p>Devam etmek için giriş yapın</p>
        <button onClick={handleLogin}>
            <img src="https://cdn-icons-png.flaticon.com/512/2991/2991148.png"/>
            <span>Google ile Giriş yap</span>
        </button>
        </div>
    </div>
  )
}

export default AuthPage