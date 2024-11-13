function generateUniqueId(prefix = '') {
  // Generate a random part using Math.random() and format it with padding
  const randomPart = Math.floor(Math.random() * (10 ** 13)).toString(16).padStart(13, '0')

  // Combine the prefix with the random part
  return prefix + randomPart
}

export default generateUniqueId
