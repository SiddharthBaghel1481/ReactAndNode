import { toast } from 'react-toastify';

export const handleSuccess = (msg) => {
    toast.success(msg, {
        positon: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}

export const handleError = (msg) => {
    toast.error(msg, {
        positon: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
    })
}