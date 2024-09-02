import  { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const RefreshHandler = ({ setIsAuthenticate }) => {
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (localStorage.getItem('token')) {
            setIsAuthenticate(true);
            if (location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup') {
                navigate('/dashboard', { replace: false })
            }
        }
    }, [location,navigate,setIsAuthenticate])
    return null;
}

export default RefreshHandler