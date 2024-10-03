import React, { InputHTMLAttributes } from 'react'

type CommonInputProps = InputHTMLAttributes<HTMLInputElement> & {
  type: 'text' | 'email' | 'password' | 'number' | 'date' | 'tel' | 'url'
  value: string | number | undefined
}

const CommonInput: React.FC<CommonInputProps> = ({
  type,
  value,
  className = '',
  ...props
}) => {
  return (
    <input
      className={`px-4 py-2 w-full rounded-full border border-gray-300 bg-transparent 
        focus:outline-brand-orange-light outline-none focus:ring-offset-4 
        focus:outline-offset-0 focus:ring-2 focus:ring-brand focus:border-transparent ${className}`}
      type={type}
      value={value}
      {...props}
    />
  )
}

export default CommonInput
