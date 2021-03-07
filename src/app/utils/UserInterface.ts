interface UserInterface {
    id: string,
    email: string,
    password?: string; // the password can be `undefined`
}

export default UserInterface;