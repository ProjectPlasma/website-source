The Project Plasma website source code.

This README covers adding blog posts, and the CI/CD process.

---


## Blog Posts
### Naming
To create a blog post, you must create a file in `src/content/news/<name>.md`.
> Note, `<name>` will appear in the URL like so `projectplasma.github.io/news/<name>`

### Header
The markdown file must start with the following header:
```
---
title: "Update on our First Semester as Project Plasma"
date: 2026-02-12
image: "/news/christmas_tree_grid.png"
summary: "This is a short blog post outlining some of the work we have done recently."
---
```
`title` - indicates the post title<br>
`date` - should be the date of releasing the blog post<br>
`image` - the cover image for the blog post<br>
`summary` - a brief summary of the blog post

### Main Content
After this header has been added, markdown can be added directly below which forms the content of the blog post.

## Blog Post Images
To add the cover image, and images in the blog post, you must first upload the images to:
`public/news/`

Images can be added in markdown with the following syntax:
```markdown
![Christmas tree grid](/news/christmas_tree_grid.png>)
```
Obviously, you can adjust the path to including various images.

<br>

## CI/CD
After any commits are pushed to the master branch, GitHub will request my server to rebuild the site.

My server runs the following script:
```sh
#!/bin/sh

cd /root/webhook
rm -rf website-src/
set -e # stop script if any command fails, after rm

git clone git@gh-pp-source:projectplasma/website-source.git website-src/
cd website-src/

SOURCE_COMMIT=$(git rev-parse --short HEAD) # info on the last commit to the source code

npm ci # install npm dependencies
npm run build # build the static site files

# preprocessing on build folder, as described
cd dist
cp index.html 404.html

# push the build folder to the repo
git init
git checkout -b master
git remote add origin git@gh-pp-deploy:projectplasma/projectplasma.github.io.git
git add -A
git commit -m "Auto-deployed commit $SOURCE_COMMIT at $(date '+%Y-%m-%d %H:%M:%S')"
git push -f origin master

# clean stuff up
cd /root/webhook
rm -rf website-src/ 
```

This clones the site's source code and runs the Astro build process to build the site into static files.
Further, it copies the root `index.html` file to `404.html` to fix issues with GitHub hosting.
Finally, the script pushes the built static files to the `projectplasma.github.io` repository to go live.

---

If building manually, a similar process can be used:
- Clone the sites source code
- Build the site with `npm run build`
- Fix a GitHub issue using `cd dist && cp index.html 404.html`
- Finally, push the build files in `dist/` to the `projectplasma.github.io` repository

