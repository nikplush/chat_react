import React from 'react'
import { useHistory } from 'react-router-dom/cjs/react-router-dom'
import classNames from 'classnames'
import { Button } from 'rsuite'
import axios from 'axios'
import { stringToHslColor } from '../../../../../utils/helper/userAvatar'
import './Users.css'
import { useSelector } from 'react-redux'

const Users = () => {
  const history = useHistory()
  const myId = localStorage.getItem('userId')
  const users = useSelector(state => state.users.users)

  const openDialog = async (targetId) => {
    try {
      const dialog = await axios.post('http://localhost:3001/dialogues', { myId, targetId })
      history.push(`dialogues/?id=${dialog.data._id}`)
    } catch (e) {
      console.log('LOOG', e)
    }
  }

  return (
        <div className='users-wrapper'>
            {users.map(item =>
                <div key={item._id} style={{ margin: '10px 10px 0 10px' }}>
                    <div className='user-title'>
                        <div style={{ display: 'flex' }}>
                            <div style={{ display: 'flex', position: 'relative' }}>
                                <div
                                    style={{ background: stringToHslColor(item.userName) }}
                                    className='user-icon'
                                >
                                    {item.userName[0]}
                                </div>
                                <div className={classNames('status', { online: item.online, offline: !item.online })}/>
                            </div>
                            <div className='user-name'>{item.userName} {item._id === myId ? '(it`s me)' : ''}</div>
                        </div>
                        <div>
                            <div>
                                <Button
                                    appearance="primary"
                                    type="submit"
                                    onClick={() => { openDialog(item._id) }}
                                >OPEN DIALOG</Button>
                            </div>
                        </div>
                    </div>
                    <div>

                    </div>
                </div>
            )}
        </div>
  )
}

export default Users
