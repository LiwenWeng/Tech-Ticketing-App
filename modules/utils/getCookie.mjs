export function getCookie(key) {
    const cookies = document.cookie.split("; ");
    for (const cookie of cookies) {
        const [k, v] = cookie.split("=");
        if (k === key) {
            return v;
        }
    }
    return null;
}
