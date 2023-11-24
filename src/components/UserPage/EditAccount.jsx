import { getUser } from "../../api/userpage"
import * as jwt_decode from 'jwt-decode';
import { useEffect, useState } from "react";

export default function EditAccount() {
  const [userId, setUserId] = useState('')
  const [userInfo, setUserInfo] = useState({})
  const token = localStorage.getItem('token')

  return (
    <>
      
    </>
  )
}