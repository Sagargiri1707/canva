# NPM Publishing Guide

Step-by-step guide to publish `react-html-editor-iframe` to npm.

## Prerequisites

1. **npm Account**: Create an account at [npmjs.com](https://www.npmjs.com/)
2. **Verify Email**: Make sure your npm email is verified
3. **Two-Factor Authentication**: Enable 2FA for better security (recommended)

## Publishing Steps

### 1. Prepare the Package

First, make sure all your changes are committed:

```bash
git add .
git commit -m "Prepare for npm publish"
```

### 2. Update Package Information

Edit `package.json` and update these fields:

```json
{
  "name": "react-html-editor-iframe",  // Choose a unique name if this is taken
  "author": "Your Name <your.email@example.com>",
  "repository": {
    "type": "git",
    "url": "https://github.com/YOUR_USERNAME/react-html-editor-iframe.git"
  }
}
```

### 3. Check Package Name Availability

```bash
npm search react-html-editor-iframe
```

If the name is taken, choose a different one (e.g., `@yourname/react-html-editor-iframe`).

### 4. Login to npm

```bash
npm login
```

Enter your:
- Username
- Password
- Email
- 2FA code (if enabled)

Verify login:
```bash
npm whoami
```

### 5. Build the Library

```bash
npm run build:lib
```

This creates the `dist/` folder with the compiled library.

### 6. Test the Package Locally (Optional but Recommended)

Create a test project and install your package locally:

```bash
# In a different directory
mkdir test-app
cd test-app
npx create-react-app .
npm install /path/to/react-html-editor-iframe
```

Then test it in your React app:

```jsx
import HTMLEditor from 'react-html-editor-iframe';
import 'react-html-editor-iframe/dist/style.css';
```

### 7. Dry Run (Check what will be published)

```bash
npm pack --dry-run
```

This shows you what files will be included in the package.

### 8. Publish to npm

For the first publish:

```bash
npm publish
```

If you're using a scoped package (e.g., `@yourname/package`):

```bash
npm publish --access public
```

### 9. Verify Publication

Check your package at: `https://www.npmjs.com/package/react-html-editor-iframe`

### 10. Test Installation

In a new project:

```bash
npm install react-html-editor-iframe
```

## Publishing Updates

### Patch Release (1.0.0 → 1.0.1)

For bug fixes:

```bash
npm version patch
npm run build:lib
npm publish
```

### Minor Release (1.0.0 → 1.1.0)

For new features (backward compatible):

```bash
npm version minor
npm run build:lib
npm publish
```

### Major Release (1.0.0 → 2.0.0)

For breaking changes:

```bash
npm version major
npm run build:lib
npm publish
```

## Troubleshooting

### "Package name already exists"

Choose a different name or use a scoped package:

```json
{
  "name": "@yourusername/react-html-editor-iframe"
}
```

### "You must verify your email"

Go to npmjs.com, log in, and verify your email address.

### "You do not have permission to publish"

Make sure you're logged in with the correct account:

```bash
npm logout
npm login
```

### "Failed to publish - missing dist folder"

Make sure to run the build command first:

```bash
npm run build:lib
```

## Best Practices

1. **Semantic Versioning**: Follow [semver.org](https://semver.org/)
   - MAJOR: Breaking changes
   - MINOR: New features, backward compatible
   - PATCH: Bug fixes

2. **Changelog**: Maintain a CHANGELOG.md file

3. **Git Tags**: npm version automatically creates git tags

4. **Test Before Publishing**: Always test locally first

5. **README**: Keep README.md updated with examples

6. **TypeScript Definitions**: Include .d.ts files for TypeScript users

## Post-Publishing

1. **Tag the release on GitHub**:
```bash
git push --tags
```

2. **Create a GitHub Release** with release notes

3. **Share on social media** or relevant communities

4. **Monitor issues** on GitHub and npm

## Unpublishing (Use with Caution)

You can only unpublish within 72 hours:

```bash
npm unpublish react-html-editor-iframe@1.0.0
```

⚠️ **Warning**: Unpublishing can break projects that depend on your package!

## Resources

- [npm Documentation](https://docs.npmjs.com/)
- [Semantic Versioning](https://semver.org/)
- [npm Package Best Practices](https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry)
