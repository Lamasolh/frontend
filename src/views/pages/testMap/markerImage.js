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
    console.log('png', pngData)
    // pass png data URL to callback
    callback(pngData)
  } // end async
  // start loading SVG data into in memory image
  image.src = svgData
}
export default function (image) {
  console.log('image')
  console.log(image)
  const b = `<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
  viewBox="0 0 957.1 957.5" style="enable-background:new 0 0 957.1 957.5;" xml:space="preserve">
<style type="text/css">
 .st0{fill:url(#XMLID_5_);stroke:#000000;}
</style>
<g>
 <defs>
     <ellipse id="XMLID_2_" cx="478.4" cy="478.8" rx="478.8" ry="468.7"/>
 </defs>
 <clipPath id="XMLID_4_">
     <use xlink:href="#XMLID_2_"  style="overflow:visible;"/>
 </clipPath>
 <g style="clip-path:url(#XMLID_4_);">
     
         <image style="overflow:visible;" width="512" height="512" xlink:href="${image}" transform="matrix(1.8702 0 0 1.8702 -0.3882 0)">
     </image>
 </g>
</g>
<radialGradient id="XMLID_5_" cx="478.3778" cy="478.7661" r="473.7829" gradientUnits="userSpaceOnUse">
 <stop  offset="0.5459" style="stop-color:#FFFFFF;stop-opacity:0.2"/>
 <stop  offset="0.5975" style="stop-color:#FBFBFB;stop-opacity:0.2913"/>
 <stop  offset="0.6538" style="stop-color:#EDEDED;stop-opacity:0.3907"/>
 <stop  offset="0.7122" style="stop-color:#D8D8D8;stop-opacity:0.4939"/>
 <stop  offset="0.7721" style="stop-color:#B9B9B9;stop-opacity:0.5998"/>
 <stop  offset="0.8331" style="stop-color:#929292;stop-opacity:0.7078"/>
 <stop  offset="0.8952" style="stop-color:#626262;stop-opacity:0.8174"/>
 <stop  offset="0.9568" style="stop-color:#2A2A2A;stop-opacity:0.9263"/>
 <stop  offset="0.9985" style="stop-color:#000000"/>
</radialGradient>
<ellipse id="XMLID_1_" class="st0" cx="478.4" cy="478.8" rx="478.8" ry="468.7"/>
</svg>
    `
  console.log(b)
  return new Promise(resolve => {
    svgString2Image(b, 50, 50, pngData => {
      resolve(pngData)
    })
  })
}
