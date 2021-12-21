import './Card.css'

export const Card = ({children, title, className}) => (
    <div className='card-wrapper className'>
        { title && <div className='card-title'>{title}</div>}
        {children}
    </div>
)

