import classNames from "classnames";
import axios from "axios";
import {useLocation} from "react-router-dom/cjs/react-router-dom";
import {useCallback, useEffect, useRef, useState} from "react";
import Input from 'rsuite/Input';
import {socket} from "../../../utils/sockets";
import {stringToHslColor} from "../../../utils/helper/userAvatar";
import debounce from "lodash.debounce";
import './Dialog.css'

const Dialog = () => {
    let {search} = useLocation();
    const myId = localStorage.getItem('userId')
    const query = new URLSearchParams(search);
    const dialogId = query.get('id');
    const ref = useRef()
    const [messages, setMessages] = useState([])
    const [targetUser, setTargetUser] = useState()
    const [flag, setFlag] = useState(false)
    const [typingFlag, setTypingFlag] = useState(false)
    const [userWrite, setUserWrite] = useState(false)

    const request = debounce(value => {
        socket.emit('endTyping', value)
        setTypingFlag(false)
    }, 2000);

    const debounceRequest = useCallback(value => request(value), []);

    const getMessages = async () => {

        const dialogMessages = await axios.get(`http://localhost:3001/dialogues/messages`, {params: {dialogId}})
        const {messages, users} = dialogMessages.data
        setMessages(messages)
        setTargetUser(users.find(item => item._id !== myId))
        setFlag(true)

    }

    const sendMessage = (e) => {
        setTypingFlag(true)
        debounceRequest(targetUser._id)
        if (e.charCode === 13 && e.target.value) {
            socket.emit('sendMessage', {authorId: myId, dialogId, text: e.target.value})
            e.target.value = ''
            socket.emit('endTyping', targetUser._id)
            setTypingFlag(false)
        }
    }

    useEffect(()=>{
        if (typingFlag){
            socket.emit('startTyping', targetUser._id)
        }
    },[typingFlag])


    const addNewMessage = (message) => {
        setMessages((currentMessages) => [...currentMessages, message])
        setFlag(true)
    }

    useEffect(() => {
        getMessages()
        socket.on('sendMessage', (data) => {
            if (data.dialogId === dialogId) {
                addNewMessage(data.message)
            }
        })

        socket.on('statTyping', () => {
            setUserWrite(true)
        })

        socket.on('endTyping', () => {
            setUserWrite(false)
        })
    }, [])

    useEffect(() => {
        if (flag) {
            ref.current.scrollTop = ref.current.scrollHeight
            setFlag(false)
        }
    }, [flag])

    return (
        <div className='dialog-wrapper'>
            {targetUser &&
                <div className='message-title'>
                    <div
                        style={{background: stringToHslColor(targetUser.userName)}}
                        className='user-icon'
                    >
                        {targetUser.userName[0]}
                    </div>
                    <div style={{color: 'wheat'}}>{targetUser.userName}</div>
                </div>
            }
            <div className='messages-wrapper' ref={ref}>
                {messages.map(item =>
                    <div
                        className={classNames('message-container', {my: item.authorId === myId})}
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
