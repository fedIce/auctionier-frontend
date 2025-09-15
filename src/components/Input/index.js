import * as React from 'react';

// const Input = React.forwardRef(({ className, type, label = '', ...props }, ref) => {
//   return (
//     <div>
//       {label && (
//         <label className='mb-2 block text-sm font-medium leading-none' htmlFor={label}>
//           {label}
//         </label>
//       )}
//       <input
//         type={type}
//         className={`flex h-10 w-full rounded-md border border-secondary/10 outline-none ring-0 border-input bg-background px-3 py-2 text-base file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`
//         }
//         ref={ref}
//         {...props}
//       />
//     </div>
//   );
// });
// Input.displayName = 'Input';

// export { Input };


import { useState } from 'react';

const Input = React.forwardRef(({
  type = 'text', // 'currency' | 'textarea' | 'credit-card' | 'phone' | 'text'
  label = 'Input',
  placeholder = '',
  value,
  onChange,
}, ref) => {
  const [inputValue, setInputValue] = useState(value || '');

  const formatValue = (val) => {
    if (type === 'currency') {
      const cleaned = val.replace(/[^\d]/g, '');
      const number = parseFloat(cleaned) / 100;
      return number.toLocaleString('de-DE', {
        style: 'currency',
        currency: 'EUR',
      });
    }

    if (type === 'credit-card') {
      return val
        .replace(/\D/g, '')
        .substring(0, 16)
        .replace(/(.{4})/g, '$1 ')
        .trim();
    }

    if (type === 'phone') {
      const digits = val.replace(/\D/g, '').substring(0, 10);
      const parts = [];
      if (digits.length > 0) parts.push('(' + digits.substring(0, 3));
      if (digits.length >= 4) parts.push(') ' + digits.substring(3, 6));
      if (digits.length >= 7) parts.push('-' + digits.substring(6, 10));
      return parts.join('');
    }

    return val;
  };

  const handleChange = (e) => {
    const raw = e.target.value;
    const formatted = formatValue(raw);
    setInputValue(formatted);
    onChange && onChange(formatted);
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      {type === 'textarea' ? (
        <textarea
          className="w-full border border-gray-300 bg-background rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder={placeholder}
          rows="4"
          value={inputValue}
          onChange={handleChange}
        />
      ) : (
        <input
          type="text"
          className="w-full border border-gray-300 bg-background rounded-md px-3 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          placeholder={placeholder}
          value={inputValue}
          onChange={handleChange}
        />
      )}
    </div>
  );
});

Input.displayName = 'Input';

export { Input };