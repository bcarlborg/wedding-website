## Project dependencies
- `python3`: python3 is used to serve the website locally during development

## Serving the site locally
Run the script `./build-scripts/serve-local` then visit [http://0.0.0.0:8081/](http://0.0.0.0:8081/).
```

## Notes
- using `cwebp` to convert jpg to webp images
  - https://web.dev/articles/serve-images-webp
- some svgs that resize and change aspect ratio as the page changes need to have `preserveAspectRatio="none"` added to their outermost tag.