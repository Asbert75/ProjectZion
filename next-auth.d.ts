import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'nexdt-auth/jwt';

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            username: string,
            verified: string,
            created: string,
            email: string,
            name: string,
            avatar: string,
            role: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        role: string
    }
}

declare module 'next-auth/jwt' {
    interface JWT extends DefaultJWT {
        user: Session.User
    }
}