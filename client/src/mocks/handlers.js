import { rest } from 'msw';

export const API_URL = 'https://localhost:7195/user'
export const defaultUsers = [{email: 'test1@gmail.com'}, {email: 'test2@gmail.com'}]
export const threeUsers = [{email: 'test1@gmail.com'}, {email: 'test2@gmail.com'}, {email: 'test3@gmail.com'}]

export const setGetUser = (resolver) => rest.get(API_URL, resolver);
export const setPostUser = (resolver) => rest.post(API_URL, resolver);

export const validGetUser = (req, res, ctx) => {
    const users = JSON.parse(sessionStorage.getItem('users') ?? "[]");
    if(users.length === 0) {
        users.push(...defaultUsers)
        sessionStorage.setItem('users', JSON.stringify(users))
    }
    return res(ctx.status(200), ctx.json(users));
}

export const getThreeUsers = (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(threeUsers));
}

export const getUsersFail = (req, res, ctx) => {
    return res(ctx.status(500));
}


export const validAddUser = (req, res, ctx) => {
    const users = JSON.parse(sessionStorage.getItem('users') ?? "[]");
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    sessionStorage.setItem('users', JSON.stringify([...users, {email: req.body.email}]))
    return res(ctx.status(200), ctx.json(users));
}

export const handlers = [
    setGetUser(validGetUser),
    setPostUser(validAddUser)
]

