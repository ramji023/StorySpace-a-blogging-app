import axios from "axios";
import { useState, useEffect } from "react";

export const useFetchData = <T>(baseURL: string) => {
    const [data, setData] = useState<T | null>(null);
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false);
    const fetchData = async () => {
        try {
            setIsLoading(true);
            setError(null);
            // await new Promise((resolve) => setTimeout(resolve, 10000));
            const response = await axios.get(baseURL);
            if (response && response.data) {
                // console.log(typeof response.data);
                setData(response.data.data)
                setSuccess(true);
            }
        } catch (err: any) {
            console.log(err);
            setSuccess(false);
            if (err.response) {
                setError(err.response.data.message); // Handle error response
            } else if (err.request) {
                setError("No response received from server.");
            } else {
                setError(err.message);
            }
        } finally {
            setIsLoading(false);
        }
    }
    useEffect(() => {
        fetchData()
    }, [baseURL])

    return { data, isLoading, error, success, fetchData }
}