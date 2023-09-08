'use client';
// Must use AuthProvider for client components to use useSession
import { useSession } from 'next-auth/react'
import { redirect } from 'next/navigation'

export default function Client() {
    const { data: session } = useSession({
        required: true,
        onUnauthenticated() {
            redirect('/api/auth/signin?callbackUrl=/client') // Always make callback the page you're currently redirecting from, to be redirected back
        }
    })

    return (
        <section>
            <p>Client Page, signed in! {session?.user?.name}</p>
        </section>
    )
}