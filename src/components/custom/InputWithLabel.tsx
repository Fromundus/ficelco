import React from 'react'
import { Label } from '../ui/label';
import { Input } from '../ui/input';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string,
    containerClassName?: string;
    labelClassName?: string;
    inputClassName?: string;
}

const InputWithLabel = ({ label, containerClassName, labelClassName, inputClassName, ...props }: InputProps) => {
  return (
    <div className={`flex flex-col gap-2 ${containerClassName}`}>
        <Label htmlFor={props.id} className={labelClassName}>
            {label}
        </Label>
        <Input
            className={inputClassName}
            {...props}
        />
    </div>
  )
}

export default InputWithLabel
