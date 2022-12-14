import { useEffect, useCallback, useRef } from 'react'

export const debounce = (func: Function, waitFor: number) => {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: any) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => func(...args), waitFor)
  }
}

export function useDebounce(fn: Function, delay: number) {
  const memoizedCallback = useCallback(fn, [])
  const debouncedFn = useRef(debounce(memoizedCallback, delay))

  useEffect(() => {
    debouncedFn.current = debounce(memoizedCallback, delay)
  }, [memoizedCallback, debouncedFn, delay])

  return debouncedFn.current
}

export const useDidMountEffect = (fn: Function, dependencies: Array<any>) => {
  const didMountRef = useRef(false)

  useEffect(() => {
    if (didMountRef.current) fn()
    else didMountRef.current = true
  }, dependencies)
}
