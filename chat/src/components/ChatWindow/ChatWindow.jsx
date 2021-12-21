import {useEffect, useRef, useState} from "react";
import './ChatWindow.css'
import classNames from "classnames";
import socketClient  from "socket.io-client";

const mock = [
    {
        id: 0,
        isYouMessage: true,
        text: 'Hi'
    },
    {
        id: 1,
        isYouMessage: false,
        text: 'Hello'
    }
]

const socket = socketClient ('http://localhost:3001');

const ChatWindow = () => {
    const [messages, setMessages] = useState(mock)
    const [scrollFlag, setScrollFlag] = useState(false)
    const messagesWrapperRef = useRef()

    const myId

    useEffect(() => {
        if (scrollFlag) {
            messagesWrapperRef.current.scrollTop = Number.MAX_SAFE_INTEGER
            setScrollFlag(false);
        }
    }, [scrollFlag])

    const sendMessage = (e) => {
        if (e.key === 'Enter' && e.target.value) {
            setMessages(
                [...messages, {
                id: 3,
                isYouMessage: true,
                text: e.target.value
            }])
            socket.emit('sendMessage', { message: e.target.value, autor: , dialogId: 1 } )
            e.target.value = ''
            setScrollFlag(true);
        }
    }

    return (
        <div className='wrapper page-wrapper'>
            <div className='messages-wrapper' ref={messagesWrapperRef}>
                {
                    messages.map((item, i) =>
                        <div key={i} className={classNames('message-wrapper', {
                            left: item.isYouMessage,
                            right: !item.isYouMessage
                        })}>
                            <div>{item.text}</div>
                        </div>
                    )
                }
            </div>
            <div className='input-wrapper'>
                <div className={'input_wap'}>
                    <input type='text' className='message-input input-style' onKeyPress={sendMessage}
                           placeholder='Enter your message'/>
                </div>
            </div>
        </div>
    )
}

export default ChatWindow
