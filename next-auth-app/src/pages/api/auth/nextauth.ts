// pages/api/auth/[...nextauth].ts
import { NextApiRequest, NextApiResponse } from 'next';
import NextAuth from 'next-auth';
import Providers from 'next-auth/providers';

export default NextAuth({
    providers: [
        Providers.Credentials({
            name: 'Credentials',
            credentials: {
                username: { label: 'Username', type: 'text' },
                password: { label: 'Password', type: 'password' }
            },
            async authorize(credentials: Record<string, string>) {
                // Your login authorization logic here
            }
        })
    ],
    pages: {
        signIn: '/login', // Redirect to login page for sign in
        signUp: '/register', // Redirect to register page for sign up
        error: '/auth/error' // Error page path
    },
    callbacks: {
        async createUser(user) {
            // Your user creation logic here
        }
    }
});
