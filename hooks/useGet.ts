import { useEffect, useRef, useState } from 'react'
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import { useRouter } from 'next/router'

interface AxiosParams {
    url: string;
    // Add other properties if needed
}

interface ApiResponse<T> {
    response: T | undefined;
    isLoading: boolean;
    error: Error | null;
}

export default function useGet(axiosParams: AxiosParams): ApiResponse<any> {
    const [response, setResponse] = useState<any>(undefined)
    const [error, setError] = useState<Error | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const isMountedRef = useRef<boolean>(false)
    const router = useRouter() // re-fetch when locale changes

    const fetchData = async (params: AxiosParams) => {
        try {
            const result = await axios.get(`http://127.0.0.1:8000/api${params.url}`)
            if (isMountedRef.current) {
                setResponse(result.data)
            }
        } catch (error : any) {
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
