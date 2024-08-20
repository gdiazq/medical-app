export function getCookie(name) {
    const cookieString = document.cookie;
    const cookieArray = cookieString.split('; ');
  
    for (let cookie of cookieArray) {
        const [cookieName, cookieValue] = cookie.split('=');
        if (cookieName === name) {
            return cookieValue;
        }
    }
  
    return null;
}