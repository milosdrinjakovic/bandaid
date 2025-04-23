'use client'
import React, { ReactElement } from "react"

type ButtonProps = {
  onClick?: () => void
  icon?: ReactElement
  iconPosition?: "left" | "right"
  label?: string
  className?: string
}

export const PrimaryButton = (props: ButtonProps) => {
  const { onClick, label } = props;

  return (
    <button
      type="submit"
      onClick={onClick}
      className="bg-purple-700 text-white hover:bg-purple-400 hover:text-stone-900 duration-300 min-w-36 px-4 rounded h-10"
    >
      {label}
    </button>
  )
}

export const SecondaryButton = (props: ButtonProps) => {
  const { onClick, label } = props;

  return (
    <button
      className="bg-stone-400 text-white hover:bg-stone-500 hover:text-stone-900 duration-300 rounded px-4 min-w-36 h-10"
      onClick={onClick}
    >
      {label}
    </button>
  )
}

export const TertiaryButton = React.forwardRef<HTMLButtonElement, ButtonProps>(({ ...props }, ref) => {


  const { onClick, icon, iconPosition, label, className } = props;

  return (
    <button
      ref={ref}
      onClick={onClick}
      className={`${className} bg-slate-950 hover:bg-slate-800 text-white px-4 py-2 rounded-lg shadow-lg border-2 border-white`}
    >
      <div className={`flex flex-row gap-2 justify-center ${iconPosition === "left" ? "flex-row-reverse" : ""}`}>
        {label}
        {icon}
      </div>
    </button>
  )
}
)

export const AddButton = (props: ButtonProps) => {
  const { onClick, icon } = props;

  return (
    <div className="cursor-pointer absolute right-16 bottom-10 md:right-32 md:bottom-20 bg-purple-700 text-white hover:bg-white hover:text-stone-900 duration-300 border-2 border-white rounded-full w-16 h-16 flex justify-center">
      <button onClick={onClick}>{icon}</button>
    </div>
  )
}

export const CoolButton = (props: ButtonProps) => {
  
  const { onClick, label, icon, iconPosition, className } = props;

  return (
    <button
      className={`${className} bg-gradient-to-r from-purple-700 via-purple-500 to-orange-400 duration-300 hover:text-stone-900 rounded px-4 min-w-36 h-10`}
      onClick={onClick}
    >
       <div className={`flex flex-row gap-2 justify-center ${iconPosition === "left" ? "flex-row-reverse" : ""}`}>
        {label}
        {icon}
      </div>
    </button>
  )

}