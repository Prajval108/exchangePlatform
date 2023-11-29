// import '@/styles/globals.css'
// import { ChakraProvider } from '@chakra-ui/react'


// export default function App({ Component, pageProps }) {


//   return (
//     <ChakraProvider >
//       <Component {...pageProps} />
//     </ChakraProvider>
//   )
// }


import { SessionProvider } from "next-auth/react"
import { WagmiConfig, createClient, configureChains, chain } from "wagmi"
import { publicProvider } from "wagmi/providers/public"
import { ChakraProvider } from '@chakra-ui/react'
// import "@/styles/globals.css"

export const { chains, provider } = configureChains(
  [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
  [publicProvider()]
)

const client = createClient({
  autoConnect: true,
  provider,
})

// Use of the <SessionProvider> is mandatory to allow components that call
// `useSession()` anywhere in your application to access the `session` object.
export default function App({
  Component,
  pageProps,
}) {
  return (
    <WagmiConfig client={client}>
      <ChakraProvider >

        <SessionProvider session={pageProps.session} refetchInterval={0}>
          <Component {...pageProps} />
        </SessionProvider>
      </ChakraProvider>

    </WagmiConfig>
  )
}