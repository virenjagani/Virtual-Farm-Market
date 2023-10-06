import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { CLEAR_MESSAGE_ERROR_CHANGE_PASSWORD } from '../../Redux/Reducers/handlePasswordReducer';

function Dashboard() {
  const setPassword = useSelector((state) => state.setPassword);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(()=>{
    if(setPassword?.message === `Password changed successfully`){
      //Toast for success password change
      dispatch({type:CLEAR_MESSAGE_ERROR_CHANGE_PASSWORD, payload:`message`})
    }
  },[setPassword?.message])

  return (
    <div>
      Dashboard
    </div>
  )
}

export default Dashboard
