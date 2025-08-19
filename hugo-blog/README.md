# r-log Hugo Blog

This is your personal blog rebuilt with Hugo static site generator. You can now manage your content using simple markdown files instead of the previous admin system.

## Structure

```
hugo-blog/
├── content/           # Your blog posts in markdown
│   ├── coding/       # Coding-related posts
│   ├── writing/      # Writing posts
│   ├── music/        # Music posts
│   └── careers/      # Career-related posts
├── themes/           # Your custom theme
│   └── r-log-theme/
└── hugo.toml         # Site configuration
```

## Creating New Posts

To create a new blog post, simply add a markdown file to the appropriate category folder:

### Example: Creating a coding post

Create a file `content/coding/my-new-post.md`:

```markdown
---
title: "Your Post Title"
date: 2025-01-19T19:00:00+02:00
draft: false
author: "r-log"
---

Your content here in markdown format...

## Subheading

- Bullet points
- More points

**Bold text**, *italic text*, `code snippets`
```

## Running the Blog Locally

```bash
cd hugo-blog
hugo server -D
```

This will start a local server at http://localhost:1313

## Building for Production

```bash
hugo
```

This creates a `public/` directory with your static site ready for deployment.

## Deployment Options

### GitHub Pages
1. Push the `public/` folder to a GitHub repository
2. Enable GitHub Pages in repository settings

### Netlify
1. Connect your GitHub repository to Netlify
2. Set build command: `hugo`
3. Set publish directory: `public`

### Manual Hosting
Upload the contents of `public/` to any static web hosting service.

## Features

- **Dark/Light Theme Toggle**: Persistent theme switching
- **Responsive Design**: Works on all devices
- **Fast Loading**: Static sites load instantly
- **SEO Friendly**: Clean URLs and semantic HTML
- **No Database Required**: All content in markdown files
- **Version Control**: Track changes with Git

## Customization

- **Styles**: Edit `themes/r-log-theme/static/css/style.css`
- **Layouts**: Modify templates in `themes/r-log-theme/layouts/`
- **Configuration**: Update `hugo.toml` for site settings

## Tips

1. **Front Matter**: Always include title and date in your posts
2. **Draft Posts**: Set `draft: true` to hide posts while working on them
3. **Images**: Place images in `static/images/` and reference as `/images/filename.jpg`
4. **Categories**: Posts are automatically organized by their folder location

Your blog is now ready to use! Simply create markdown files and Hugo will handle the rest.
