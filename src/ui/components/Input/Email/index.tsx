import React, { useState } from 'react'
import CommonInput from '../CommonInput/CommonInput'

const EmailInput: React.FC<
  Omit<React.ComponentProps<typeof CommonInput>, 'type'>
> = ({ value, id, required, autoComplete, onChange, placeholder }) => {
  const [focus, setFocus] = useState(false)
  const inputClass = focus ? 'text-brand' : 'text-gray-400'

  return (
    <div className='relative flex items-center'>
      <CommonInput
        type='email'
        value={value}
        id={id}
        required={required}
        autoComplete={autoComplete}
        onChange={onChange}
        placeholder={placeholder}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
      />
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        strokeWidth='1.5'
        stroke='currentColor'
        className={`size-6 absolute right-8 ${inputClass}`}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M16.5 12a4.5 4.5 0 1 1-9 0 4.5 4.5 0 0 1 9 0Zm0 0c0 1.657 1.007 3 2.25 3S21 13.657 21 12a9 9 0 1 0-2.636 6.364M16.5 12V8.25'
        />
      </svg>

      {/* <FaEnvelope className={`absolute right-8 ${inputClass}`} /> */}
    </div>
  )
}

export default EmailInput
