type SwitchType = {
  isChecked: boolean
  onChange: () => void
  disabled?: boolean
}

const CommonSwitch = ({
  isChecked,
  onChange,
  disabled = false,
}: SwitchType) => {
  return (
    <>
      <label className='flex items-center cursor-pointer select-none'>
        <div className='relative'>
          <input
            type='checkbox'
            checked={isChecked}
            onChange={onChange}
            className='sr-only'
            disabled={disabled}
          />
          <div
            className={`box block h-8 w-14 rounded-full ${
              isChecked ? 'bg-brand' : 'bg-brand-gray'
            }`}
          ></div>
          <div
            className={`absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white transition ${
              isChecked ? 'translate-x-full' : ''
            }`}
          ></div>
        </div>
      </label>
    </>
  )
}

export default CommonSwitch
