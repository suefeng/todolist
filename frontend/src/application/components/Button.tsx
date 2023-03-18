import React from 'react'
import MuiButton from '@mui/material/Button'

type Props = {
  children: string,
}

const Button = ({ children, ...props }: Props) => {
  return (
    <MuiButton
      {...props}
      className="inline-flex justify-center rounded-md bg-indigo-600 py-2 px-3 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
    >{children}</MuiButton>
  )
}

export default Button;