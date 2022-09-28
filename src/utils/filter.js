export const filter = (array,apiData)=>{
    let filterData = []
    array.forEach((nft) => {
        apiData.data.filter((item) => {
          if (item.contract === nft.contract && item.token === nft.token) {
            filterData.push(item)
          }
        })
      })
    return filterData
  }
  