import dynamic from 'next/dynamic'
import Router from 'next/router'

const EthereumDarkblockWidget = dynamic(
  () =>
    import('@darkblock.io/eth-widget').then((mod) => {
      return mod.EthereumDarkblockWidget
    }),
  { ssr: false }
)

const EthUpgradeWidget = dynamic(
  () =>
    import('@darkblock.io/eth-widget').then((mod) => {
      return mod.EthUpgradeWidget
    }),
  { ssr: false }
)

const cb = (param1) => {
  // console.log('ethwidget cb', param1)
}

const config = {
  customCssClass: '', // pass here a class name you plan to use
  debug: false, // debug flag to console.log some variables
  imgViewer: {
    // image viewer control parameters
    showRotationControl: true,
    autoHideControls: true,
    controlsFadeDelay: true,
  },
}

const cbUpgrade = (param1) => {
  // console.log('eth upgrade cb', param1)
  if (param1 === 'upload_complete') {
    Router.reload()
  }
}

const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY

export const EthWidget = ({ id, contract, w3, upgrade = false, network = 'mainnet' }) => {
  if (upgrade) {
    return (
      <EthUpgradeWidget
        apiKey={apiKey}
        contractAddress={contract}
        tokenId={id}
        w3={w3}
        cb={cbUpgrade}
        config={config}
        network={network}
      />
    )
  } else {
    return (
      <EthereumDarkblockWidget
        contractAddress={contract}
        tokenId={id}
        w3={w3}
        cb={cb}
        config={config}
        network={network}
      />
    )
  }
}
