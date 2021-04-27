const { builder } = require('@netlify/functions')
const puppeteer = require('puppeteer-core')
const chromium = require('chrome-aws-lambda')
const fs = require('fs')
const path = require('path')
const route = require('path-match')({
  // path-to-regexp options
  sensitive: false,
  strict: false,
  end: false
})

async function handler (event, context) {
  // Initialise the browser.
  const browser = await puppeteer.launch({
    executablePath: await chromium.executablePath,
    args: chromium.args,
    headless: chromium.headless
  })
  const page = await browser.newPage()

  // Load the template.
  const html = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8')
  await page.setContent(html,{
    waitUntil: ["networkidle0"],
  })

  // Set the correct viewport.
  await page.setViewport({
    width: 600,
    height: 315,
    deviceScaleFactor: 2
  })

  // Update the title from the path
  const match = route('/.netlify/functions/social-image/title/:title')
  const params = match(event.path)

  // Decode the title and prep it for the browser.
  const share = {
    title: params.title
  }

  console.log(event.queryStringParameters.title)
  await page.evaluate((share) => {
    const title = document.querySelector('h1')
    title.innerHTML = share.title
  }, share)

  // Take the screenshot.
  const screenshot = await page.screenshot({ encoding: 'base64' })

  // Close the browser.
  await browser.close()

  // Return our image data.
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'image/png',
      'x-test': event.path
    },
    body: screenshot,
    isBase64Encoded: true
  }
}

exports.handler = builder(handler)
