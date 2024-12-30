import { useEffect, useState } from "react"

interface UseQueryPops<DataTye = unknown> {
    queryFn: (params?: Record<string, string>) => Promise<DataTye>
    params?: Record<string, string>
}

function useQuery<DataTye>({queryFn, params}: UseQueryPops<DataTye>) {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<{message: string}>()
    const [data, setData] = useState<DataTye>()

    useEffect(() => {
        (async () => {
            setIsLoading(true)
            try {
                const data = await queryFn(params)
                setData(data)
            } catch (error) {
                setError({message: 'Error'})
            }
            setIsLoading(false)
        })()
    }, [params])

    return {
        isLoading, data, error
    }
}

export default useQuery