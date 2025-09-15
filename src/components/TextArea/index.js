import * as React from 'react';


const TextArea = React.forwardRef(
  ({ className, label='', ...props }, ref) => {
    return (
      <div>
        {label && (
          <label className='mb-2 block text-sm font-medium leading-none' htmlFor={label}>
            {label}
          </label>
        )}
        <textarea
          className={`flex min-h-[80px] ring-0 outline-none border-secondary/10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
TextArea.displayName = 'TextArea';

export { TextArea }
