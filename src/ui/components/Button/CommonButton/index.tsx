import React from 'react'

type CommonButtonType = {
  label: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  disabled?: boolean
  className?: string
}

const CommonButton: React.FC<CommonButtonType> = ({
  label,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 bg-brand-violet text-white rounded-md 
        border border-transparent outline-none 
        hover:bg-brand-orange-light font-semibold transition-all duration-300 ease-in-out
        disabled:cursor-not-allowed ${className}`}
    >
      {label}
    </button>
  )
}

export default CommonButton
