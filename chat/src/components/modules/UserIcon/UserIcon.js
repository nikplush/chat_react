import classNames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import { stringToHslColor } from '../../../utils/helper/userAvatar'
import './UserIcon.css'

const UserIcon = ({ userName, isOnline, color = '#575757' }) => {
  return (
        <div style={{ display: 'flex' }}>
            <div style={{ display: 'flex', position: 'relative' }}>
                <div
                    style={{ background: stringToHslColor(userName) }}
                    className='user-icon'
                >
                    {userName[0]}
                </div>
                <div className={classNames('status', { online: isOnline, offline: !isOnline })}/>
            </div>
            <div className='user-name' style={{ color }}>{userName}</div>
        </div>
  )
}

UserIcon.propTypes = {
  userName: PropTypes.string,
  isOnline: PropTypes.bool,
  color: PropTypes.string
}

export default UserIcon
