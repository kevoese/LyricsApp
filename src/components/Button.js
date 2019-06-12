import React from 'react'

const Button = ({children, handleClick, customClass}) => {
  return (
   <button onClick={handleClick} className={`btn btn-outline-primary${(customClass) ? customClass : ''}`} type="submit" id="button-addon2">{children || 'Button'}</button>
  )
}

export default Button;
