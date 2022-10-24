import React from 'react'
import Link from 'next/link';
import { isImageType, validateImage } from "../utils/validateImage";

const NftCard = ({ nft }) => {
  const { name, image, is_darkblocked, contract, token, animation_url} = nft

  return (
    <Link href={`details/${contract}/${token}`}>
      {image ? (
        <div className="mb-8 text-center transition-all transform group hover:scale-105 bg-secondary rounded-xl w-72">
          <div>
            { ( !!animation_url && !isImageType(animation_url) ) ? (
              <video
                className="mx-0 mb-12 border border-gray-200 rounded-md shadow-md"
                src={validateImage(animation_url)}
                autoPlay
                muted
                loop
              />
            ) : (
              <img // eslint-disable-line
                alt={image}
                loading={'lazy'}
                className="object-contain mx-auto truncate h-72 rounded-t-xl"
                src={validateImage(image)} />
            )}
          </div>
          <div className="w-full p-3 text-left h-28">
            <h2 className="text-lg font-semibold leading-5 text-center truncate text-fontColor whitespace-nowrap">
              {name}
            </h2>
            { is_darkblocked ? (
              <div className="flex items-center w-full py-2">
                <img // eslint-disable-line
                  alt="icon"
                  className="h-5"
                  src="/footericon-blk.svg"
                ></img>
                <div className='pl-2 text-sm font-semibold align-middle text-fontColor'>
                  Unlockable Content
                </div>
              </div>
            ) : <div className='h-5'></div>}
          </div>
          <div className='absolute bottom-0 hidden w-full py-2 font-medium cursor-pointer text-fontColor group-hover:block bg-terciary rounded-b-xl'>
            Details
          </div>
        </div>
      ) : (
        <></>
      )}
    </Link>
  )
}

export default NftCard
