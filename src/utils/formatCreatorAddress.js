export const formatCreatorAddress = (ca, name) => {
  if (!ca && !name) return ''
  if (name) return name
  let formatted = ca.split(',').length
  if (formatted > 1) return `${formatted} creators`
  return `${ca.substring(0, 100)}..${ca.substring(41)}`
}
