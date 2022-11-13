export const getUser = async () => {
    const response = await fetch("http://localhost:3001/auth/login/success", {
        method: "GET",
        credentials: "include",
        headers: {
            "Content-Type": "application/json",
            "Acccess-Control-Allow-Origin": true,
        },
    });
    const user = (await response.json()).user;
    return user;
};
