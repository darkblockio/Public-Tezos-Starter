export function shortenAddr(addr) {
  if (addr && addr.length > 0) {
    return addr.slice(0, 6) + '...' + addr.slice(addr.length - 4)
  }
}
