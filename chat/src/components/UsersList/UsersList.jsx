import React, { useEffect, useState } from 'react'
import axios from 'axios'

const UsersList = () => {
  const [users, setUsers] = useState([])

  const getUsers = async () => {
    const allUsers = (await axios.get('http://localhost:3001/users')).data
    setUsers(allUsers)
  }

  const openDialog = async (id) => {
    const a = await axios.post('http://localhost:3001/dialogues', {
      myId: 1,
      targetId: id
    })
    console.log(a)
  }

  useEffect(() => {
    getUsers()
  }, [])

  return (
        <div className='wrapper'>
            <div>
                {users.map((item, i) =>
                    <div key={i} style={{ padding: '10px' }} onClick={() => {
                      openDialog(item._id)
                    }}>
                        {item.name}
                    </div>
                )}
            </div>
        </div>
  )
}

export default UsersList
