import { useState } from "react";
import axios from "axios";

export const useSendData = () => {
    const [data, setData] = useState<object | null>(null)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState(false);

    const sendData = async (baseURL: string, data: object) => {
        try {
            setIsLoading(true)
            setError(null);
            const response = await axios.post(baseURL, data);
            if (response && response.data) {
                setData(response.data.data);
                setSuccess(true);
            }
        } catch (error: any) {
            setSuccess(false);
            if (error.response) {
                console.log(error.response.data.message);
                setError(error.response.data.message || "Server error occurred.")
            } else if (error.request) {
                console.log(error.request)
                setError('No response from server. Please try again later.')
            }
            else {
                console.log(error.message);
                setError('An unexpected error occurred.');
            }
        } finally {
            setIsLoading(false);
        }
    }

    return { data, isLoading, success, error, sendData }
}