'use client';
import * as React from 'react';

const DropMenu = React.forwardRef(({ className, type, label = '', ...props }, ref) => {

  const [isOpen, setIsOpen] = React.useState(false);

  const handleOnSelect = (option) => {
    
    // Handle option selection
    setIsOpen(false);
  }

  return (
    <div>
      {label && (
        <label className='mb-2 block text-sm font-medium leading-none' htmlFor={label}>
          {label}
        </label>
      )}
      <div className='w-full relative'>
        <div className='flex relative items-center'>
          <input
            type={type}
            onFocus={() => setIsOpen(true)}
            className={`flex h-10 w-full rounded-md border border-secondary/10 outline-none ring-0 border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`
            }
            ref={ref}
            {...props}
          />
          <span className='absolute text-xs text-gray-400 right-3 top-3'>
            ▼
          </span>
        </div>
        <div className={`absolute z-10 w-full bg-background border border-secondary/10 mt-1 rounded-md max-h-60 overflow-y-auto ${isOpen ? 'block' : 'hidden'}`}>
          <ul className='w-full'>
            <li onClick={() => handleOnSelect()} className='px-3 py-2 hover:bg-foreground-800 cursor-pointer'>Option 1</li>
            <li onClick={() => handleOnSelect()} className='px-3 py-2 hover:bg-foreground-800 cursor-pointer'>Option 2</li>
            <li onClick={() => handleOnSelect()} className='px-3 py-2 hover:bg-foreground-800 cursor-pointer'>Option 3</li>
          </ul>
        </div>
      </div>
      <div className='w-full relative'>
      </div>
      <div className='w-full relative'>

      </div>
    </div>
  );
});
DropMenu.displayName = 'DropMenu';

export { DropMenu };
