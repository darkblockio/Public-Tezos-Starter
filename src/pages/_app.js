import './styles/globals.css'
import './styles/darkblock.css'
import { Web3Provider } from '../context/Web3Provider'

function MyApp({ Component, pageProps }) {
  return(
    <Web3Provider>
      <Component {...pageProps} />
    </Web3Provider>
  )
}

export default MyApp
