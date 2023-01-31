import { useCallback, useEffect, useReducer } from "react"
import { TezosToolkit } from '@taquito/taquito';
import { BeaconWallet } from '@taquito/beacon-wallet'
import { Web3Context } from "./Web3Context"

const INITIAL_STATE = {
  tezos: {
    address: null,
    publicKey: null,
    provider: null,
    chainError: false,
  },
}

function tezosReducer(state, action) {
  switch (action.type) {
    case 'SET_PROVIDER':
      return {
        ...state,
        tezos: {
          address: action.address,
          publicKey: action.publicKey,
          provider: action.provider,
        },
      }
    case 'SET_ADDRESS':
      return {
        ...state,
        tezos: {
          address: action.address,
          publicKey: action.publicKey,
        },
      }
    case 'RESET_PROVIDER':
      return INITIAL_STATE
    case 'SET_CHAIN_ERROR':
      return {
        ...INITIAL_STATE,
        tezos: {
          chainError: true,
        },
      }
    default:
      throw new Error()
  }
}

let Tezos = null
let tezosWallet = null

if (typeof window !== 'undefined') {
  Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io')
  tezosWallet = new BeaconWallet({ name: 'darkblock.io' })
  Tezos.setWalletProvider(tezosWallet)
}

export const Web3Provider = ({ children }) => {
  const [state, dispatch] = useReducer(tezosReducer, INITIAL_STATE)
  const { provider, address, publicKey, chainError } = state.tezos

  const connect = useCallback(async function() {
    if (typeof window !== 'undefined') {
      try {
        let address = null
        let publicKey = null
        let provider = null
        let permissions = null
        const activeAccount = await tezosWallet.client.getActiveAccount()

        if (!activeAccount) {
          await tezosWallet.clearActiveAccount()
          permissions = await tezosWallet.client.requestPermissions()
          address = permissions.address
          publicKey = permissions.publicKey
          provider = tezosWallet
        } else {
          address = activeAccount.address
          publicKey = activeAccount.publicKey
          provider = tezosWallet
        }

        if (permissions || activeAccount) {
          dispatch({
            type: 'SET_PROVIDER',
            provider: provider,
            address: address,
            publicKey: publicKey,
            chainError: false,
          })
        } else {
          dispatch({
            type: 'SET_CHAIN_ERROR',
            chainError: true,
          })
        }
      } catch (error) {
        // connect()
      }
    }
  }, [])

  const disconnect = useCallback(async function() {
    if (typeof window !== 'undefined') {
      window.localStorage.removeItem('beacon:sdk-secret-seed')
      window.localStorage.removeItem('beacon:sdk_version')
      window.localStorage.removeItem('beacon:active-account')
      window.localStorage.removeItem('beacon:accounts')
      window.localStorage.removeItem('beacon:postmessage-peers-dapp')

      Tezos = new TezosToolkit('https://mainnet-tezos.giganode.io')
      tezosWallet = new BeaconWallet({ name: 'darkblock.io' })
      Tezos.setWalletProvider(tezosWallet)
    }

    dispatch({
      type: 'RESET_PROVIDER',
    })
  }, [])

  useEffect(() => {
    connect()
  }, [])

  return (
    <Web3Context.Provider value={{ address, publicKey, connect, disconnect, provider, chainError }}>
      { children }
    </Web3Context.Provider>
  )
}
