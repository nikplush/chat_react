import React, {
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'
import { useSelector } from 'react-redux'
import classNames from 'classnames'
import axios from 'axios'
import debounce from 'lodash.debounce'
import Input from 'rsuite/Input'
import ArrowLeftLineIcon from '@rsuite/icons/ArrowLeftLine'
import UserIcon from '../../modules/UserIcon/UserIcon'
import { IconButton } from 'rsuite'
import { useLocation } from 'react-router-dom/cjs/react-router-dom'
import { socket } from '../../../utils/sockets'
import { EVENTS } from '../../../constants/sockets'
import { PATH } from '../../../constants/api_paths'
import './Dialog.css'
import { useHistory } from 'react-router-dom'

const Dialog = () => {
  const history = useHistory()
  const { search } = useLocation()
  const myId = localStorage.getItem('userId')
  const query = new URLSearchParams(search)
  const targetId = query.get('targetId')
  const ref = useRef()
  const users = useSelector(state => state.users.users)
  const [userIndex, setUserIndex] = useState(null)
  const [flag, setFlag] = useState(false)
  const [typingFlag, setTypingFlag] = useState(false)
  const [userWrite, setUserWrite] = useState(false)
  const [messages, setMessages] = useState([])
  const [dialogId, setDialogId] = useState()
  const targetUser = users[userIndex]

  useEffect(() => {
    getMessages()
    socket.on(EVENTS.SEND_MESSAGE, (data) => {
      addNewMessage(data.message)
    })

    socket.on(EVENTS.START_TYPING, () => {
      setUserWrite(true)
    })

    socket.on(EVENTS.END_TYPING, () => {
      setUserWrite(false)
    })
  }, [])

  useEffect(() => {
    if (!userIndex) {
      const targetUserIndex = users.findIndex(item => item._id === targetId)
      if (targetUserIndex > -1) {
        setUserIndex(targetUserIndex)
      }
    }
  }, [users])

  useEffect(() => {
    if (flag) {
      ref.current.scrollTop = ref.current.scrollHeight
      setFlag(false)
    }
  }, [flag])

  const getMessages = async () => {
    try {
      const dialogMessages = await axios.post(PATH.GET_DIALOG, { myId, targetId })
      const { messages, dialogId } = dialogMessages.data
      setDialogId(dialogId)
      setMessages(messages)
      setFlag(true)
    } catch (e) {
      console.log('LOOG', e)
    }
  }

  const sendMessage = (e) => {
    setTypingFlag(true)
    debounceRequest(targetId)
    if (e.charCode === 13 && e.target.value) {
      socket.emit(EVENTS.SEND_MESSAGE, { authorId: myId, dialogId, text: e.target.value })
      e.target.value = ''
      socket.emit(EVENTS.END_TYPING, targetId)
      setTypingFlag(false)
    }
  }

  useEffect(() => {
    if (typingFlag) socket.emit(EVENTS.START_TYPING, targetId)
  }, [typingFlag])

  const addNewMessage = (message) => {
    setMessages((currentMessages) => [...currentMessages, message])
    setFlag(true)
  }

  const request = debounce(value => {
    socket.emit(EVENTS.END_TYPING, value)
    setTypingFlag(false)
  }, 2000)

  const redirectToUser = () => {
    history.push('/users')
  }

  const debounceRequest = useCallback(value => request(value), [])
  return (
        <div className='dialog-wrapper'>
             {targetUser &&
                <div className='message-title'>
                  <IconButton
                      icon={<ArrowLeftLineIcon/>}
                      size="lg"
                      className='icon-button'
                      onClick={redirectToUser}
                  />
                  <UserIcon userName={targetUser.userName} isOnline={targetUser.online} color={'wheat'}/>
                </div>
             }
            <div className='messages-wrapper' ref={ref}>
                {messages.map(item =>
                    <div
                        className={classNames('message-container', { my: item.authorId === myId })}
                        key={item._id}
                    >
                        <div className='message'>
                            {item.text}
                        </div>
                    </div>
                )}
            </div>
            <div className='input-wrapper'>
                {userWrite &&
                    <>
                        {targetUser.userName} writing...
                    </>
                }
                <Input placeholder="Enter you message" onKeyPress={sendMessage}/>
            </div>
        </div>
  )
}

export default Dialog
