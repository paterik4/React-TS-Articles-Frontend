import { useState, useEffect } from 'react'

const FetchData = (url: any) => {
    const [data, setData] = useState([])
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()

        fetch(url, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    // error coming back from server
                    throw Error('could not fetch the data for that resource')
                }
                return res.json()
            })
            .then((data) => {
                setIsPending(false)
                setData(data.articles)
                setError(null)
                return data
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false)
                    setError(err.message)
                }
            })

        // abort the fetch
        return () => abortCont.abort()
    }, [url])

    return { data, isPending, error }
}

const FetchTagsData = (url: any) => {
    const [data2, setData] = useState([])
    const [isPending2, setIsPending] = useState(true)
    const [error2, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()

        fetch(url, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    // error coming back from server
                    throw Error('could not fetch the data for that resource')
                }
                return res.json()
            })
            .then((data) => {
                setIsPending(false)
                setData(data)
                setError(null)
                return data
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false)
                    setError(err.message)
                }
            })

        // abort the fetch
        return () => abortCont.abort()
    }, [url])

    return { data2, isPending2, error2 }
}

const FetchArticlesBySlugData = (url: any) => {
    const [data2, setData] = useState([])
    const [isPending2, setIsPending] = useState(true)
    const [error2, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController()

        fetch(url, { signal: abortCont.signal })
            .then((res) => {
                if (!res.ok) {
                    // error coming back from server
                    throw Error('could not fetch the data for that resource')
                }
                return res.json()
            })
            .then((data) => {
                setIsPending(false)
                setData(data)
                setError(null)
                return data
            })
            .catch((err) => {
                if (err.name === 'AbortError') {
                    console.log('fetch aborted')
                } else {
                    // auto catches network / connection error
                    setIsPending(false)
                    setError(err.message)
                }
            })

        // abort the fetch
        return () => abortCont.abort()
    }, [url])

    return { data2, isPending2, error2 }
}

const getSearchedText = () => {
    return JSON.parse(localStorage.getItem('searchText')!)
}

const exportApiFetchs = {
    FetchData,
    FetchTagsData,
    getSearchedText,
    FetchArticlesBySlugData
}

export default exportApiFetchs