import Header from "../components/Header";
import { useState, useEffect, useContext } from "react";
import { getNFTs, getNFTsOwned } from "../utils/getNfts";
import NftCard from "../components/NftCard";
import { collection } from "../utils/collection";
import { Loading } from "../components/Loading";
import { Web3Context } from "../context/Web3Context";

const platform = 'Tezos'

export default function Home() {
  const [myNfts, setMyNfts] = useState([]);
  const [offset, setOffset] = useState(0);
  const [offsetMyNfts, setOffsetMyNfts] = useState(0);
  const [HasMoreNfts, setHasMoreNfts] = useState(false);
  const [HasMoreMyNfts, setHasMoreMyNfts] = useState(false);
  const [showNfts, setShowNfts] = useState("created");
  const [arrayOfNfts, setArrayOfNfts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(true);
  const { address } = useContext(Web3Context)

  const getData = async () => {
    await getNFTs(
      process.env.NEXT_PUBLIC_REACT_APP_WALLET_ADDRESS,
      platform,
      offset
    ).then((res) => {
      setIsLoaded(false);
      setArrayOfNfts(res.nfts.data);
      setOffset(res.next_offset);
      setHasMoreNfts(res.has_more);
      setIsLoaded(true);
    });
  };

  const getMyNFTs = async (address, loadMore) => {
    await getNFTsOwned(address, platform, loadMore ? offsetMyNfts : 0, arrayOfNfts).then(
      (nfts) => {
        setIsLoaded(false)
        let allNfts = []
        if (
          loadMore &&
          process.env.NEXT_PUBLIC_REACT_APP_USE_WALLET_ADDRESS === "true"
        ) {
          allNfts = myNfts.concat(nfts.nfts.filteredData)
        } else {
          allNfts = nfts.nfts.filteredData
        }
        setMyNfts(allNfts)
        setOffsetMyNfts(nfts.nfts.next_offset)
        setHasMoreMyNfts(nfts.nfts.has_more)
        setIsLoaded(true)
      }
    );
  };

  useEffect(() => {
    process.env.NEXT_PUBLIC_REACT_APP_USE_WALLET_ADDRESS === "true"
      ? getData()
      : setArrayOfNfts(collection)
  }, []) // eslint-disable-line

  useEffect(() => {
    setMyNfts([]);
    setOffsetMyNfts(0)
    getMyNFTs(address)
  }, [address, arrayOfNfts]); // eslint-disable-line

  const renderNFTs = () => {
    switch (showNfts) {
      case "darkblockeds":
        return (
          myNfts &&
          myNfts.length > 0 &&
          myNfts[0] !== undefined &&
          myNfts.map((nft) => <NftCard key={nft.token} nft={nft} />)
        );
      case "created":
        return (
          arrayOfNfts &&
          arrayOfNfts !== [] &&
          arrayOfNfts.map((nft) => <NftCard key={nft.token} nft={nft} />)
        );
    }
  };

  return (
    <div>
      <Header address={address} />
      <div>
        <div className="flex flex-col items-center w-auto pt-8 ml-8 text-center md:px-10 md:flex-row md:w-auto">
          <span // eslint-disable-line
            className={` hover:border-b-2 bg-secondary text-fontColor pb-2 px-4 py-1 rounded mr-8 cursor-pointer ${
              showNfts === "created"
                ? "border-b-2 border-black"
                : "text-gray-300"
            }`}
            onClick={() => setShowNfts("created")}
          >
            NFTs Created
          </span>
          <span // eslint-disable-line
            className={`hover:border-b-2 bg-secondary text-fontColor pb-2 px-4 md:mt-0 mt-5 py-1 rounded mr-8 cursor-pointer ${
              showNfts === "darkblockeds"
                ? "border-b-2 border-black"
                : "text-gray-300"
            }`}
            onClick={() => setShowNfts("darkblockeds")}
          >
            My Filtered NFTs
          </span>
        </div>
        {isLoaded ? (
          <div className="grid gap-3 px-4 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 justify-items-center">
            {renderNFTs()}
          </div>
        ) : (
          <Loading />
        )}
        {HasMoreNfts && showNfts === "created" && (
          <button
            onClick={getData}
            className="flex justify-center p-2 m-auto font-semibold bg-fontColor bg-gray-200 rounded "
          >
            Load More
          </button>
        )}

        { address && address.length > 0 ?
          (myNfts?.length === 0 && showNfts === "darkblockeds" && (
            <div className="w-full h-screen m-auto text-xl text-center text-fontColor">
              {`Oops, looks like you don't have any matching NFTs in this wallet.`}
            </div>
          )) : (
            <div className="w-full h-screen m-auto text-xl text-center text-fontColor">
              {`Connect your wallet.`}
            </div>
          )
        }
      </div>
    </div>
  );
}
