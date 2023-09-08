import type { NextAuthOptions } from 'next-auth'

import GitHubProvider from 'next-auth/providers/github'
import { GithubProfile } from 'next-auth/providers/github'

import CredentialsProvider from 'next-auth/providers/credentials'

import GoogleProvider from 'next-auth/providers/google'
import { GoogleProfile } from 'next-auth/providers/google'

// import { randomUUID, randomBytes } from 'crypto'

export const options: NextAuthOptions = {
    providers: [
        GitHubProvider({
            profile(profile: GithubProfile) {
                return {
                    ...profile,
                    role: profile.role ?? 'user',
                    id: profile.id.toString(),
                    image: profile.avatar_url,
                }
            },
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
            profile(profile: GoogleProfile) {
                return {
                    ...profile,
                    role: profile.role ?? 'user',
                    id: profile.id.toString(),
                    image: profile.avatar_url
                }
            }
        }),
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
                // This is where you need to retrieve user data 
                // to verify with credentials
                // Docs: https://next-auth.js.org/configuration/providers/credentials
                const user = { id: "42", name: "Dave", password: "nextauth", role: "manager" }

                if (credentials?.username === user.name && credentials?.password === user.password) {
                    return user
                } else {
                    return null
                }
            }
        })
    ],
    // session: {
    //     strategy: 'database',
    //     maxAge: 30 * 24 * 60 * 60, // 60 days
    //     updateAge: 24 * 60 * 60, // 24 hours
    //     generateSessionToken: () => {
    //         return randomUUID?.() ?? randomBytes(32).toString('hex')
    //     }
    // },
    // pages: {
    //     signIn: '/signin'
    // },
    callbacks: {
        // Ref: https://authjs.dev/guides/basics/role-based-access-control#persisting-the-role
        async jwt({ token, user }) {
            if (user) token.role = user.role
            return token
        },
        // If you want to use the role in client components
        async session({ session, token }) {
            if (session?.user) session.user.role = token.role
            return session
        },
    }
}