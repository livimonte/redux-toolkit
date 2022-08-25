import React, { memo } from 'react'

type StarProps = {
  active?: boolean
}

interface StarIconProps {
  isActive: boolean
}

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: React.ReactNode
}

export const Button = ({ className, children, ...rest }: ButtonProps) => (
  <button
    type="button"
    className={`rounded py-1 px-4 transition bg-white hover:bg-slate-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-zinc-600 focus:ring-offset-slate-500 disabled:opacity-40 disabled:bg-white disabled:text-zinc-500 ${className}`}
    {...rest}>
    {children}
  </button>
)

export const ButtonPagination = ({ className, children, ...rest }: ButtonProps) => (
  <button
    type="button"
    className={`rounded py-1 px-4 transition-colors bg-white hover:bg-slate-500 hover:text-white disabled:opacity-40 disabled:bg-white disabled:text-zinc-500 ${className}`}
    {...rest}>
    {children}
  </button>
)

export const Star = memo(({ active }: StarProps) => {
  const starClass = `w-5 h-5 transition active:text-gray-500 ${
    active ? 'text-yellow-400' : 'text-gray-300'
  }`

  return (
    <svg
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      className={starClass}>
      <title>Star</title>
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
    </svg>
  )
})

export const Loading = () => (
  <div className="w-full max-w-7xl min-w-[360px] px-5 py-5">
    <div className="border border-slate-500 shadow rounded-md p-4">
      <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-slate-200 h-10 w-10"></div>
        <div className="flex-1 space-y-6 py-1">
          <div className="h-2 bg-slate-200 rounded"></div>
          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-4">
              <div className="h-2 bg-slate-200 rounded col-span-2"></div>
              <div className="h-2 bg-slate-200 rounded col-span-1"></div>
            </div>
            <div className="h-2 bg-slate-200 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
)

export const LoadingIcon = () => (
  <svg
    className="animate-spin h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24">
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
)

export const StarIcon = ({ isActive }: StarIconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000" viewBox="0 0 256 256">
    <rect width="256" height="256" fill="none" />
    <path
      d="M132.4,190.7l50.4,32c6.5,4.1,14.5-2,12.6-9.5l-14.6-57.4a8.7,8.7,0,0,1,2.9-8.8l45.2-37.7c5.9-4.9,2.9-14.8-4.8-15.3l-59-3.8a8.3,8.3,0,0,1-7.3-5.4l-22-55.4a8.3,8.3,0,0,0-15.6,0l-22,55.4a8.3,8.3,0,0,1-7.3,5.4L31.9,94c-7.7.5-10.7,10.4-4.8,15.3L72.3,147a8.7,8.7,0,0,1,2.9,8.8L61.7,209c-2.3,9,7.3,16.3,15,11.4l46.9-29.7A8.2,8.2,0,0,1,132.4,190.7Z"
      fill={isActive ? '#facc15' : '#000'}
      stroke={isActive ? '#facc15' : '#000'}
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="16"></path>
  </svg>
)
