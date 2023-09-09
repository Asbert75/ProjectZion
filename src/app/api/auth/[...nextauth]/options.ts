import type { NextAuthOptions } from 'next-auth'
import { User } from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials'
import UserApi from '@/lib/api/user-api'

export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {
                    label: 'Username',
                    type: 'text',
                    placeholder: 'Enter username...'
                },
                password: {
                    label: 'Password',
                    type: 'password',
                    placeholder: 'Enter password...'
                }
            },
            async authorize(credentials) {
                if (!credentials) return null;
                console.log('Sending credentials', credentials);
                const response = await UserApi.login(credentials.username, credentials.password);
                console.log('Authorize returning', response);
                if (!response || response.code && response.code != 200) return null;
                else return {
                    username: response.username,
                    verified: response.verified,
                    created: response.created,
                    email: response.email,
                    id: response.id,
                    name: response.name,
                    avatar: response.avatar
                };
            }
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async jwt({ token, user }) {
            console.log('----- JWT CALLBACK', { token, user });
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            console.log('----- SESSION CALLBACK', { session, token });
            session.user = token.user as User;
            return session;
        }
    }
}
