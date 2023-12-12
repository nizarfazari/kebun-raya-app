// will change to react-query
import { useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

/**
 * Simplify axios client-side data fetching
 *
 * @param {AxiosRequestConfig} axiosParams Params for the request
 * @returns {AxiosResponse}  The response from the API
 * @returns {Boolean}  is loading
 * @returns {Error|null}  error
 */
export default function useAxios(axiosParams) {
  const [response, setResponse] = useState(undefined)
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const isMountedRef = useRef(false)
  const router = useRouter() // re-fetch when locale changes

  const fetchData = async params => {
    try {
      const result = await axios.request(params)
      if (isMountedRef.current) {
        setResponse(result.data)
      }
    } catch (error) {
      if (isMountedRef.current) {
        setError(error)
      }
    } finally {
      if (isMountedRef.current) {
        setIsLoading(false)
      }
    }
  }

  useEffect(() => {
    isMountedRef.current = true
    fetchData(axiosParams)
    return () => {
      isMountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router])

  return { response, isLoading, error }
}
