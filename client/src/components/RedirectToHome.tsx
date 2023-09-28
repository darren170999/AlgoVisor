import{ FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const RedirectToHome: FC = () => {
    const navigate = useNavigate();
    
    useEffect(() => {
        const timeoutId = setTimeout(() => {
        navigate('/home', {replace: true});
        }, 3000);

        return () => {
        clearTimeout(timeoutId);
        };
    }, []);

    return (
        <div>
        <p>Redirecting in 3 seconds...</p>
        </div>
    );
};

export default RedirectToHome;
