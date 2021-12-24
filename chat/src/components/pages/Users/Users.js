import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import { Button } from 'rsuite'
import UserIcon from '../../modules/UserIcon/UserIcon'
import './Users.css'
import {getUsers} from "../../../store/slaices/users";

const Users = () => {
  const history = useHistory()
  const myId = localStorage.getItem('userId')
  const users = useSelector(getUsers)
  const filteredUser = users.filter(user => user._id !== myId)

  const openDialog = async (targetId) => {
    history.push(`dialog/?targetId=${targetId}`)
  }

  return (
        <div className='users-wrapper'>
            {filteredUser.map(item =>
                <div key={item._id} style={{ margin: '10px 10px 0 10px' }}>
                    <div className='user-title'>
                        <UserIcon userName={item.userName} isOnline={item.online}/>
                        <div>
                            <div>
                                <Button
                                    appearance="primary"
                                    type="submit"
                                    onClick={() => {
                                      openDialog(item._id)
                                    }}
                                >
                                    OPEN DIALOG
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
  )
}

export default Users
