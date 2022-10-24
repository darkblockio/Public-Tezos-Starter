export const validateImage = (urlImage) => {
  if (urlImage?.toString().includes('ipfs://')) {
    return `https://ipfs.io/ipfs/${urlImage.split('//').at(-1)}`
  }
  return urlImage
}

export const isImageType = (urlImage) => {
  const test = /\.(jpg|jpeg|png|webp|avif|gif|svg|glb)$/.test(urlImage)
  return test
}
