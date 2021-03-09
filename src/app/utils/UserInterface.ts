interface UserReturn {
    id: string,
    name: string,
    email: string,
    password?: string; // the password can be `undefined`
}

interface UserToInsert {
    name: string,
    email: string,
    password: string
}

export {
    UserReturn,
    UserToInsert
};