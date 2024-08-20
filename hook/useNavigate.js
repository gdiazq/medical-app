import { useCallBack } from 'react';

export function useNavigate() {
    const navigate = useCallBack((path) => {
        if(path) {
            window.location.href = path;
        }
    }, []);
    return navigate;
}