import { collection } from './collection'
import { filter } from './filter'

const baseApi = process.env.NEXT_PUBLIC_BASE_API ? process.env.NEXT_PUBLIC_BASE_API : 'https://api.darkblock.io/v1/'

/**
 * Get the list of nfts in a wallet
 * Returns [NFTsArray]
 *
 * @param {address} Wallet address
 * @param {platform} Could be Polygon, Ethereum, Avalanche, Solana, Tezos
 * @return {offset}
 */
export const getNFTs = async (address, platform, offset = 0) => {
  const pageSize = 48
  return await fetch(
    `${baseApi}/nfts/created?platform=${platform}&account=${address}&offset=${offset}&page_size=${pageSize}`
  )
    .then((response) => response.json())
    .then((data) => {
      return {
        nfts: data,
        loaded: true,
        error: false,
        errorMsg: null,
      }
    })
    .catch((error) => {
      return {
        nfts: null,
        loaded: true,
        error: true,
        errorMsg: error,
      }
    })
}

export const getNFTsOwned = async (address, platform, offSet, arrayOfNfts = []) => {
  const pageSize = 48 // Amount of nfts you want to see in the page
  return await fetch(
    `${baseApi}/nfts/collected?platform=${platform}&account=${address}&offset=${offSet}&page_size=${pageSize}`
  )
    .then((response) => response.json())
    .then((data) => {
      let filterData
      if (data.data) {
        //handle wallet without nfts exception, true if you want to see nfts of your wallet, false if you want to use JSON file of a collection
        if (process.env.NEXT_PUBLIC_REACT_APP_USE_WALLET_ADDRESS === 'true') {
          filterData = filter(arrayOfNfts, data)
        } else {
          filterData = filter(collection, data)
        }
      } else {
        filterData = []
      }

      data.filteredData = filterData

      return {
        nfts: data,
        loaded: true,
        error: false,
        errorMsg: null,
      }
    })
    .catch((error) => {
      return {
        nfts: null,
        loaded: true,
        error: true,
        errorMsg: error,
      }
    })
}

/**
 * Get metadata from a NFT
 * Returns an object with the NFT metadata information
 *
 * @param {contract} x The contract address
 * @param {id} The token of the contract
 * @return {platform} Could be Polygon, Ethereum, Avalanche, Solana
 */
export const getNFTMetadata = async (contract, id, platform) => {
  return await fetch(`${baseApi}/nft/metadata?platform=${platform}&contract=${contract}&token=${id}`)
    .then((response) => response.json())
    .then((data) => {
      return {
        nft: data.data,
        loaded: true,
        error: false,
        errorMsg: null,
      }
    })
    .catch((error) => {
      return {
        nft: null,
        loaded: true,
        error: true,
        errorMsg: error,
      }
    })
}
