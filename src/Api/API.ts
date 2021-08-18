import { useState, useEffect } from 'react'
import authHeader from '../services/auth-header'

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

const GetArticlesCount = (url: any) => {
    const [data3, setData] = useState([])
    const [isPending3, setIsPending] = useState(true)
    const [error3, setError] = useState(null)

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
                setData(data.articlesCount)
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

    return { data3, isPending3, error3 }
}

const FetchArticleData = (url: any) => {
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
                setData(data.article)
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

const FetchUsers = (url: any) => {
    const [data2, setData] = useState([])
    const [isPending2, setIsPending] = useState(true)
    const [error2, setError] = useState(null)
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    useEffect(() => {
        const abortCont = new AbortController()

        fetch(url, {
            method: 'GET',
            signal: abortCont.signal,
            headers: {
                Authorization: 'Bearer ' + user.user.token
            }
        })
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

const exportApiFetchs = {
    FetchData,
    FetchTagsData,
    getSearchedText,
    FetchArticlesBySlugData,
    FetchArticleData,
    GetArticlesCount,
    FetchUsers
}

export default exportApiFetchs
