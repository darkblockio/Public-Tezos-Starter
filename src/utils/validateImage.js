export const validateImage = (urlImage) => {
  if (urlImage?.toString().includes('ipfs://')) {
    return `https://ipfs.io/ipfs/${urlImage.split('//').at(-1)}`
  }
  return urlImage
}
