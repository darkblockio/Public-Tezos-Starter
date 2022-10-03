import React, { useContext, useEffect, useState } from 'react'
import Header from '../../components/Header'
import { getNFTMetadata } from '../../utils/getNfts'
import { validateImage } from '../../utils/validateImage'
import { dateTimeFormat } from '../../utils/dateFormatter'
import { shortenAddr } from '../../utils/shortAddress'
import { useRouter } from 'next/router'
import { Web3Context } from '../../context/Web3Context'
import { TezWidget } from '../../components/TezWidget'
import { Loading } from '../../components/Loading'

const countAttribs = (nft) => {
  let count = 1
  if (nft.token) count++
  if (nft.contract) count++
  if (nft.blockchain) count++
  if (nft.edition) count++
  if (nft.nft_date_created) count++
  return count
}

const platform = 'Tezos'

const NftDetailCard = () => {
  const router = useRouter()
  const contract = router.query.params ? router.query.params[0] : null
  const id = router.query.params ? router.query.params[1] : null
  const [nftData, setNftData] = useState(null)
  const { provider } = useContext(Web3Context)
  const [isLoading, setIsLoading] = useState(false)
  console.log(nftData, 'dataaaaaaa')

  useEffect(() => {
    if (id && contract && id !== undefined && contract !== undefined) {
      setIsLoading(true)
      getNFTMetadata(contract, id, `${platform}`).then((data) => {
        setNftData(data.nft)
        setIsLoading(false)
      })
    }
  }, [id, contract])

  return (
    <div>
      <Header />
      <div className="h-auto text-fontColor md:overflow-hidden bg-primary">
        {isLoading ? (
          <Loading />
        ) : nftData ? (
          <div>
            <div className="grid grid-cols-1 gap-1 pt-8 md:grid-cols-3">
              <div className="md:pl-20">
                <div className="mb-10 font-sans text-4xl font-bold text-center md:hidden md:mb-2">{nftData.name}</div>
                {nftData && nftData.image ? (
                  <img // eslint-disable-line
                    className="px-4 mx-auto my-5 rounded-md h-66"
                    src={validateImage(nftData.image)}
                    alt="NFT"
                  />
                ) : (
                  <></>
                )}
              </div>

              <div className="w-full max-w-4xl px-4 mx-auto md:col-span-2">
                <div className="hidden mb-10 font-sans text-4xl font-bold md:block md:mb-2">{nftData.name}</div>
                <div className="pt-2 mx-2">{nftData.nft_description}</div>
                <div className="mx-2">
                  {
                    //be sure font color is dark, NPM brings a white background 
                    <div className="flex justify-end py-3 text-gray-800">
                      <TezWidget contract={nftData.contract} id={nftData.token} wa={provider} upgrade={true} />
                    </div>
                  }

                  {<TezWidget contract={nftData.contract} id={nftData.token} wa={provider} />}
                </div>
              </div>
            </div>
            <div>
              <div className="grid w-full md:grid-cols-3 gap-4 px-4 py-12 mt-12 border-t-[1px] md:grid-cols-3 md:px-7">
                {nftData.traits && (
                  <div className="flex flex-col pb-2">
                    <div className="flex flex-row mb-2">
                      <h2 className="font-bold">Traits:</h2>
                      <div className="px-2 py-1 ml-2 text-xs font-semibold text-gray-800 bg-gray-200 rounded">
                        {nftData.traits?.length ? nftData.traits.length : 0}
                      </div>
                    </div>
                    <div className="border border-gray-200 rounded-md">
                      {nftData.traits?.map((i) => (
                        <div key={i.value} className="grid grid-cols-2 p-2 md:grid-cols-2 ">
                          <p className="pt-1 text-sm font-semibold text-left text-gray-500">{i.name}</p>
                          <p className="text-base text-right text-fontColor ">{shortenAddr(i.value)}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
                <div>
                  <div className="flex pb-2">
                    <h2 className="font-bold">Details</h2>
                    <div className="px-2 py-1 ml-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded">
                      {countAttribs(nftData)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 p-2 text-left border border-gray-200 rounded-md">
                    {platform && (
                      <>
                        <div className="py-2 text-sm font-semibold text-gray-500">
                          <h3>Blockchain</h3>
                        </div>
                        <div className="py-2 text-right truncate text-ellipsis">
                          <p>{platform}</p>
                        </div>
                      </>
                    )}
                    {nftData.token && (
                      <>
                        <div className="py-2 text-sm font-semibold text-gray-500">
                          <h3>Token ID</h3>
                        </div>

                        <p className="py-2 text-right underline truncate text-ellipsis">{shortenAddr(nftData.token)}</p>
                      </>
                    )}
                    {contract && (
                      <>
                        <div className="py-2 text-sm font-semibold text-gray-500">
                          <h3>Contract Address</h3>
                        </div>

                        <p className="py-2 text-right underline truncate">{shortenAddr(contract)}</p>
                      </>
                    )}
                    {nftData.blockchain && (
                      <>
                        <div className="py-2 text-sm font-semibold text-gray-500">
                          <h3>Contract Standard</h3>
                        </div>
                        <div className="py-2 text-right">
                          <p>{nftData.blockchain}</p>
                        </div>
                      </>
                    )}
                    {nftData.edition && (
                      <>
                        <div className="py-2 text-sm font-semibold text-gray-500">
                          <h3>Editions</h3>
                        </div>
                        <div className="py-2 text-right">
                          <p>{nftData.edition}</p>
                        </div>
                      </>
                    )}
                    {nftData.nft_date_created && (
                      <>
                        <div className="py-2 text-sm font-semibold text-gray-500">
                          <h3>Date Contract</h3>
                        </div>
                        <div className="py-2 text-right">
                          <p>{dateTimeFormat(nftData.nft_date_created)}</p>
                        </div>
                      </>
                    )}
                  </div>
                </div>
                <div>
                  <div>
                    <div className="flex pb-2">
                      <h2 className="font-bold">Owned by</h2>
                      <div className="px-2 py-1 ml-2 text-xs font-semibold text-gray-700 bg-gray-200 border border-gray-100 rounded">
                        {1}
                      </div>
                    </div>
                    <p className="p-3 font-medium text-center text-gray-500 border border-gray-100 rounded ">
                      {shortenAddr(nftData.owner_address)}
                    </p>

                    <div className="flex pb-2 mt-2">
                      <h2 className="font-bold ">Created by</h2>
                      <div className="px-2 py-1 ml-2 text-xs font-semibold text-gray-700 bg-gray-200 rounded">
                        {nftData.creators?.length ? nftData.creators.length : 1}
                      </div>
                    </div>
                    {nftData.creator_address && (
                      <p className="p-3 font-medium text-center text-gray-500 border border-gray-100 rounded">
                        {shortenAddr(nftData.creator_address)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="w-full mt-20 text-2xl text-center">NFT not found</div>
        )}
      </div>
    </div>
  )
}

export default NftDetailCard
