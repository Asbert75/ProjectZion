import type { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import UserApi from '@/api/user-api'
import RoleApi from '@/api/role-api';

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

                try {
                    const response = await UserApi.login(credentials.username, credentials.password);
                    const role = await RoleApi.getRole(response.roleId);
                    if (!response || response.code && response.code != 200) return null;
                    else {
                        return {
                            username: response.username,
                            verified: response.verified,
                            created: response.created,
                            email: response.email,
                            id: response.id,
                            name: response.name,
                            avatar: response.avatar,
                            role: role.name
                        };
                    }
                } catch {
                    return null;
                }
            }
        })
    ],
    pages: {
        signIn: '/signin'
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) token.user = user;
            return token;
        },
        async session({ session, token }) {
            session.user = token.user;
            return session;
        }
    }
}
