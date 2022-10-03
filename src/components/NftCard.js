import React from 'react'
import Link from 'next/link';

const NftCard = ({ nft }) => {
  const { name, image, is_darkblocked, contract, token, description } = nft

  return (
    <Link href={`details/${contract}/${token}`}>
      {image ? (
        <div className="mb-8 text-center transition-all transform group hover:scale-105 bg-secondary rounded-xl w-72">
          <div>
            <img // eslint-disable-line
              className='object-cover mx-auto truncate h-72 rounded-t-xl'
              loading={'lazy '}
              alt={image}
              src={image}
            />
          </div>
          <div className="w-full p-3 text-left h-28">
            <h2 className="text-lg font-semibold leading-5 text-center text-fontColor truncate whitespace-nowrap">
              {name}
            </h2>
            { is_darkblocked ? (
              <div className="flex items-center w-full py-2">
                <img // eslint-disable-line
                  alt="icon"
                  className="h-5"
                  src="/footericon-blk.svg"
                ></img>
                <div className='pl-2 text-sm font-semibold text-fontColor align-middle'>
                  Unlockable Content
                </div>
              </div>
            ) : <div className='pt-9'></div>}
            <h3 className="text-sm font-semibold leading-5 text-center text-fontColor truncate whitespace-nowrap">
            {description}
            </h3>
          </div>
          <div className='absolute bottom-0 hidden w-full py-2 font-medium text-fontColor cursor-pointer group-hover:block bg-terciary rounded-b-xl'>
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
