import dynamic from 'next/dynamic'
import Router from 'next/router'

const TezosDarkblockWidget = dynamic(
  () =>
    import('@darkblock.io/tez-widget').then((mod) => {
      return mod.TezosDarkblockWidget
    }),
  { ssr: false }
)

const TezosUpgradeWidget = dynamic(
  () =>
    import('@darkblock.io/tez-widget').then((mod) => {
      return mod.TezosUpgradeWidget
    }),
  { ssr: false }
)

const cb = (param1) => {
  // console.log(param1)
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
  if (param1 === 'upload_complete') {
    Router.reload()
  }
}

const apiKey = process.env.NEXT_PUBLIC_REACT_APP_API_KEY

export const TezWidget = ({ id, contract, wa, upgrade = false }) => {
  if (upgrade) {
    return (
      <TezosUpgradeWidget
        apiKey={apiKey}
        contractAddress={contract}
        tokenId={id}
        wa={wa}
        cb={cbUpgrade}
        config={config}
      />
    )
  } else {
    return <TezosDarkblockWidget contractAddress={contract} tokenId={id} wa={wa} cb={cb} config={config} />
  }
}
