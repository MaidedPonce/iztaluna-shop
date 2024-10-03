import { ReactNode, useState } from 'react'

type AccordionProps = {
  title: ReactNode
  children: ReactNode
}

const Accordion = ({ title, children }: AccordionProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleAccordion = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className='overflow-hidden bg-white shadow-md rounded-xl'>
      <div
        className='flex items-center justify-between px-4 py-6 overflow-auto border-l-4 border-solid cursor-pointer border-brand'
        onClick={toggleAccordion}
      >
        <h2 className='text-lg font-semibold'>{title}</h2>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : ''
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            viewBox='0 0 24 24'
            fill='currentColor'
            className='size-6'
          >
            <path
              fillRule='evenodd'
              d='M11.47 7.72a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06L12 9.31l-6.97 6.97a.75.75 0 0 1-1.06-1.06l7.5-7.5Z'
              clipRule='evenodd'
            />
          </svg>
        </span>
      </div>
      {isOpen && <>{children}</>}
    </div>
  )
}

export default Accordion
