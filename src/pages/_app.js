import '@/styles/globals.css'
import { ClerkProvider } from '@clerk/clerk-react'
import 'purecss/build/pure.css'

export default function App({ Component, pageProps }) {
    return <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY} >
        <Component {...pageProps} />
    </ClerkProvider>
}
