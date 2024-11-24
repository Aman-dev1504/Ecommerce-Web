"use client"

import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from "recoil"

export function Providers({children}: {
    children: React.ReactNode
}){
    return <RecoilRoot>
        {children}
    </RecoilRoot>
}