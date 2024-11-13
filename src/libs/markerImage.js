function svgString2Image(svgString, width, height, callback) {
  // set default for format parameter
  // SVG data URL from SVG string
  const svgData = `data:image/svg+xml;base64,${btoa(
    unescape(encodeURIComponent(svgString)),
  )}`
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
  image.onload = function load() {
    // async (happens later)
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
export default function (image) {
  const b = `<?xml version="1.0" encoding="utf-8"?>
<!-- Generator: Adobe Illustrator 25.2.3, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
<svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
viewBox="0 0 60 45" style="enable-background:new 0 0 60 45;" xml:space="preserve">
<style type="text/css">
.st0{clip-path:url(#SVGID_2_);}
.st1{fill:none;stroke:#000000;stroke-miterlimit:10;}
</style>
<g>
<g>
<defs>
<ellipse id="SVGID_1_" cx="30" cy="23.5" rx="24.6" ry="24.1"/>
</defs>
<clipPath id="SVGID_2_">
<use xlink:href="#SVGID_1_"  style="overflow:visible;"/>
</clipPath><g class="st0"><image style="overflow:visible;enable-background:new    ;" width="200" height="200" href="${image}"  transform="matrix(0.2450 0 0 0.2450 5.3836 -1.0754)">
</image></g></g></g>
<ellipse id="XMLID_1_" class="st1" cx="30" cy="22.5" rx="22.5" ry="22"/>
</svg>

    `
  return new Promise(resolve => {
    svgString2Image(b, 50, 50, pngData => {
      resolve(pngData)
    })
  })
}
