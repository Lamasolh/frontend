function svgString2Image(svgString, width, height, callback) {
  // set default for format parameter
  // SVG data URL from SVG string
  const svgData = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svgString)))}`
  // create canvas in memory(not in DOM)
  const canvas = document.createElement('canvas')
  // get canvas context for drawing on canvas
  const context = canvas.getContext('2d')
  // set canvas size
  canvas.width = width
  canvas.height = height
  // create image in memory(not in DOM)
  const image = new Image()
  // later when image loads run this
  image.onload = function load() { // async (happens later)
    // clear canvas
    context.clearRect(0, 0, width, height)
    // draw image with SVG data to canvas
    context.drawImage(image, 0, 0, width, height)
    // snapshot canvas as png
    const pngData = canvas.toDataURL('image/png')
    // pass png data URL to callback
    callback(pngData)
  } // end async
  // start loading SVG data into in memory image
  image.src = svgData
}
function toHSL(hex, light) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)

  let r = parseInt(result[1], 16)
  let g = parseInt(result[2], 16)
  let b = parseInt(result[3], 16)

  // eslint-disable-next-line no-unused-expressions
  r /= 255
  g /= 255
  b /= 255
  const max = Math.max(r, g, b); const
    min = Math.min(r, g, b)
  let h; let s; let
    l = (max + min) / 2

  if (max === min) {
    h = 0
    s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
      default:
    }
    h /= 6
  }

  s *= 100
  s = Math.round(s)
  l *= light
  l = Math.round(l)
  h = Math.round(360 * h)
  return `hsl(${h}, ${s}%, ${l}%)`
}
export default function (color) {
  const b = `<?xml version="1.0" encoding="utf-8"?>
  <!-- Generator: Adobe Illustrator 25.2.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
  <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" height="45px" width="60px"
       viewBox="0 0 342 512" style="enable-background:new 0 0 342 512;" xml:space="preserve">
  <style type="text/css">
      .st0{fill:${color.hex};}
      .st1{fill:${toHSL(color.hex, 90)};}
  </style>
  <g>
      <g>
          <path class="st0" d="M342.1,158c-0.9-1.1-0.4-2.3-0.5-3.4c-0.7-8.1-0.5-16.3-2.3-24.2c-4.3-18.4-11.5-35.7-21.7-51.7
              c-11.2-17.5-24.9-32.9-41.6-45.3c-22.5-16.7-46.7-29.3-75.2-32c-4.3-0.4-8.6-0.1-12.8-1.3c-2.3,0-4.7,0-7,0c-2,0.8-4,0.8-6,0
              c-4.7,0-9.3,0-14,0c-0.6,0.6-1.3,0.5-2,0.5s-1.4,0.1-2-0.5c-1.3,0-2.7,0-4,0c-5.8,1.4-11.9,0.7-17.7,1.7
              c-31.2,5.6-57.8,20.4-81.1,41.4C40.4,55.7,28.9,70,20,86.4c-8.8,16.2-15.9,33-18.2,51.4C1,144.2,1.3,150.6,0.1,157
              c0,1.3,0,2.7,0,4c1,2.1,0.3,4.3,0.5,6.4c-0.3,3.5,0.6,7.1-0.5,10.6c0,2.3,0,4.7,0,7c0.7,0.7,0.5,1.6,0.5,2.4
              c0,22.6,6.6,43.7,17.4,63.2C29.9,272,42.4,293,54.8,314.1C72.1,344,89.3,374,106.5,404c19.7,34.4,39.4,68.7,59.1,103
              c1.5,2.6,3.4,4.6,6.7,4.2c2.4-1.1,3.7-3.1,5-5.3c11-19.3,22.1-38.4,33.1-57.6c14.5-25.2,29-50.5,43.5-75.7
              c16-28,32.3-55.9,48.1-84c9.4-16.7,20.6-32.3,27.9-50.1c4.7-11.4,9.3-22.9,10.5-35.3c0.7-6.4,0.6-12.8,1.7-19.2c0-2.7,0-5.3,0-8
              c-0.8-3.3-0.8-6.7,0-10C342.1,163.3,342.1,160.7,342.1,158z M171,238.2c-36.8,0-66.7-29.9-66.7-66.7s29.9-66.7,66.7-66.7
              s66.7,29.9,66.7,66.7S207.8,238.2,171,238.2z"/>
  
          <path class="st1" d="M171.5,64.1C112.7,63.9,64.3,110.2,64.4,171c0,60.8,49.8,106.9,106.7,106c57.3,0.8,106.5-45.4,106.6-106.2
              C277.8,110.5,230.1,64.3,171.5,64.1z M171,238.2c-36.8,0-66.7-29.9-66.7-66.7s29.9-66.7,66.7-66.7s66.7,29.9,66.7,66.7
              S207.8,238.2,171,238.2z"/>
      </g>
  </g>
  </svg>
  `

  return new Promise(resolve => {
    svgString2Image(b, 45, 60, /* callback that gets png data URL passed to it */pngData => {
      // pngData is base64 png string
      resolve(pngData)
    })
  })
}
