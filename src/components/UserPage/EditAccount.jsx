import { useEffect, useState } from "react";

export default function EditAccount() {
  const [userInfo, setUserInfo] =useState({})
  
  useEffect(()=>{
    const data = JSON.parse(localStorage.getItem('user'))
    setUserInfo(data)
  }, [])
  
  return (
    <>
      {userInfo.email}
      <br/>
      {userInfo.name}
    </>
  )
}