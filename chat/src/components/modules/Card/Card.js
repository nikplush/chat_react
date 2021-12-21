import React from 'react'
import PropTypes from 'prop-types'
import './Card.css'

export const Card = ({ children, title, className }) => (
    <div className='card-wrapper className'>
        { title && <div className='card-title'>{title}</div>}
        {children}
    </div>
)

Card.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string,
  className: PropTypes.string
}
