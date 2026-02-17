import { AxiosError } from "axios";
import { ErrorResponseModel } from "@/model/error_response_model";

export default function errorApiMapper(error: AxiosError): ErrorResponseModel {

    const data = error.response?.data as { message: string };


    
    if (error.response?.status === 401) {
        return {
            success: false,
            error: data.message
        };
    }
    if (error.response?.status === 400) {
        return {
            success: false,
            error: data.message
        };
    }
    if (error.response?.status === 500) {
        return {
            success: false,
            error: data.message
        };
    }
    if (error.response?.status === 404) {
        return {
            success: false,
            error: "Resource not found"
        };
    }

    return {
        success: false,
        error: "An error occurred"
    };
}

