# Netlify On-demand Social Images

Create dynamic social share images using Netlify On-demand Builders.

**Like this project? Help support my projects and buy me a coffee via [ko-fi](https://ko-fi.com/defaced)**.

## Getting Started

### Usage

Add the `/netlify/functions/social-image` directory to your own project and in your social card image tags link to the function's exposed URL adding the text you would like displayed.

`https://your-project.netlify.app/.netlify/functions/social-image/title/<TITLE_TEXT>`

Make sure to also add the required dependencies from `package.json` to your project.

### Template

The image template can be easily modified and is generated from the `template.html` file found in the `/netlify/functions/social-image` directory. 

The h1 tag is automatically modified by the function to include the specified title text.

## Author
Chris Johnson - [defaced.dev](https://defaced.dev) - [@defaced](http://twitter.co.uk/defaced/)

