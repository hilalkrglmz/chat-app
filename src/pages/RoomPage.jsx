import React from 'react'

const RoomPage = ({setIsAuth, setRoom}) => {

    /* OTURUMU KAPAT */
    const logout = () => {

        /* state i günceller */
        setIsAuth(false)

        /* sayfa yenilendiğimnde yeniden roompage e yönlendirilmemek içi
        localstorage ta da durumu güncelle */

        localStorage.removeItem("TOKEN")
    }


    /* odaya gir */
    const handleSubmit = (e) => {
      e.preventDefault();
      /* oda ismini inputtan al */
      const roomName = e.target[0].value;

      /* state i güncelle */
      setRoom(roomName);

    }
  return (
    <form  onSubmit={handleSubmit} className='room-page'>
        <h1>Chat Odası</h1>
        <p>Hangi Odaya Girmek İstiyorsunuz?</p>
        <input type="text" />
        <button type='submit'>Odaya Gir</button>
        <button type='button' onClick={logout}>Çıkış Yap</button>
    </form>
  )
}

export default RoomPage