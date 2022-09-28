import { collection } from './collection'
import { filter } from './filter'

const baseApi = process.env.NEXT_PUBLIC_BASE_API ? process.env.NEXT_PUBLIC_BASE_API : 'https://api.darkblock.io/v1/'

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
  const pageSize = 48
  return await fetch(
    `${baseApi}/nfts/collected?platform=${platform}&account=${address}&offset=${offSet}&page_size=${pageSize}`
  )
    .then((response) => response.json())
    .then((data) => {
      let filterData
      if (data.data) {
        //handle wallet without nfts exception
        if (process.env.NEXT_PUBLIC_REACT_APP_USE_WALLET_ADDRESS === 'true') {
          filterData = filter(arrayOfNfts, data)
          // return item.all_owners[0].toLowerCase() === process.env.NEXT_PUBLIC_REACT_APP_WALLET_ADDRESS.toLowerCase() //for now we use all_owners because creator_address is null
          //return item.creator_address.toLowerCase() === process.env.NEXT_PUBLIC_REACT_APP_WALLET_ADDRESS.toLowerCase() //for now we use all_owners because creator_address is null
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

export const getNFTData = async (contract, tokenId) => {
  return await fetch(`${baseApi}/nft/metadata?platform=Ethereum&contract=${contract}&token=${tokenId}`)
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
