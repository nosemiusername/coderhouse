export const isAdmin = (req: any) => {
    if (req["auth-token"]) {
        return 1;
    } else {
        return 0;
    }
    
}