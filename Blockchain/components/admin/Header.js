import React from 'react'

const Header= (props)=>{
      return(
            <div>
                  <h1 className='text-center font-weight-bold text-dark'>{props.titulo}</h1>
            </div>
      )
}
export default Header;