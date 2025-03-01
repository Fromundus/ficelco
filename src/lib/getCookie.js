const getCookie = () => {        
    const xsrfToken = document.cookie.split('; ')
        .find(row => row.startsWith('XSRF-TOKEN='))
        ?.split('=')[1];

    return decodeURIComponent(xsrfToken);
}

export default getCookie;