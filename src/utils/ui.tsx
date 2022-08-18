import React from 'react'

type ButtonPaginationProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  className?: string
  children: React.ReactNode
}

export const ButtonPagination = ({ className, children, ...rest }: ButtonPaginationProps) => (
  <button
    type="button"
    className={`bg-white rounded py-1 px-4 disabled:opacity-40 disabled:bg-white disabled:text-zinc-500 hover:bg-slate-500 hover:text-white ${className}`}
    {...rest}>
    {children}
  </button>
)

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
    className='animate-spin h-5 w-5 text-white'
    xmlns='http://www.w3.org/2000/svg'
    fill='none'
    viewBox='0 0 24 24'
  >
    <circle
      className='opacity-25'
      cx='12'
      cy='12'
      r='10'
      stroke='currentColor'
      strokeWidth='4'
    ></circle>
    <path
      className='opacity-75'
      fill='currentColor'
      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
    ></path>
  </svg>
);
