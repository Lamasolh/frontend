/**
 * Expose `isUrl`.
 */

/**
  * RegExps.
  * A URL must match #1 and then at least one of #2/#3.
  * Use two levels of REs to avoid REDOS.
  */

/**
  * Loosely validate a URL `string`.
  *
  * @param {String} string
  * @return {Boolean}
  */

export default function isUrl(string) {
  const protocolAndDomainRE = /^(?:\w+:)?\/\/(\S+)$/

  const localhostDomainRE = /^localhost[\\:?\d]*(?:[^\\:?\d]\S*)?$/
  const nonLocalhostDomainRE = /^[^\s\\.]+\.\S{2,}$/

  if (typeof string !== 'string') {
    return false
  }

  const match = string.match(protocolAndDomainRE)
  if (!match) {
    return false
  }

  const everythingAfterProtocol = match[1]
  if (!everythingAfterProtocol) {
    return false
  }

  if (localhostDomainRE.test(everythingAfterProtocol)
       || nonLocalhostDomainRE.test(everythingAfterProtocol)) {
    return true
  }

  return false
}
