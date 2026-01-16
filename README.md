# canva-editor

A full-page HTML editor component for React that allows users to edit text content within complete HTML documents while preserving structure, styles, and scripts.

## Features

- ✅ Edit text content directly in the preview
- ✅ Preserves HTML structure, styles, and scripts
- ✅ Download edited HTML with proper Doctype
- ✅ Load external HTML files
- ✅ Real-time editing with contentEditable
- ✅ Isolated iframe prevents CSS/JS conflicts
- ✅ TypeScript support
- ✅ Responsive design

## Architecture

This component follows robust architectural decisions:

1. **Iframe Isolation** - Uses `<iframe>` to create a separate browsing context
2. **Content Injection** - Uses `document.write()` for same-origin content injection
3. **ContentEditable Engine** - Makes the entire `<body>` editable
4. **Proper Serialization** - Preserves Doctype when saving
5. **Security Sandbox** - Controlled iframe permissions
6. **UX Enhancements** - Injected CSS for better editing experience

## Installation

```bash
npm install canva-editor
```

or

```bash
yarn add canva-editor
```

## Quick Start

```jsx
import HTMLEditor from 'canva-editor';
import 'canva-editor/dist/style.css';

function App() {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page</title>
    <style>
        body { font-family: Arial; padding: 20px; }
        h1 { color: #333; }
    </style>
</head>
<body>
    <h1>Hello World</h1>
    <p>Click to edit this text!</p>
</body>
</html>`;

    return (
        <div style={{ height: '100vh' }}>
            <HTMLEditor
                initialHTML={htmlContent}
                fileName="my-document.html"
            />
        </div>
    );
}

export default App;
```

## Component Usage

### Basic Usage

```jsx
import HTMLEditor from './HTMLEditor';

function App() {
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <title>My Page</title>
</head>
<body>
    <h1>Hello World</h1>
</body>
</html>`;

    return (
        <HTMLEditor
            initialHTML={htmlContent}
            fileName="my-document.html"
        />
    );
}
```

### Advanced Usage with Callbacks

```jsx
import HTMLEditor from './HTMLEditor';

function App() {
    const handleSave = (htmlContent) => {
        console.log('Saved HTML:', htmlContent);
        // Send to server, save to database, etc.
    };

    const handleChange = (htmlContent) => {
        console.log('Content changed');
        // Auto-save, track changes, etc.
    };

    return (
        <HTMLEditor
            initialHTML={htmlContent}
            fileName="document.html"
            onSave={handleSave}
            onChange={handleChange}
            showToolbar={true}
        />
    );
}
```

## Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `initialHTML` | string | `''` | Initial HTML content to load |
| `fileName` | string | `'document.html'` | Default file name for downloads |
| `onSave` | function | `null` | Callback when content is saved (receives HTML string) |
| `onChange` | function | `null` | Callback when content changes (receives HTML string) |
| `showToolbar` | boolean | `true` | Whether to show the toolbar |

## Features

- ✅ Edit text content directly in the preview
- ✅ Preserves HTML structure, styles, and scripts
- ✅ Download edited HTML with proper Doctype
- ✅ Load external HTML files
- ✅ Reset to original content
- ✅ Real-time editing with contentEditable
- ✅ Isolated iframe prevents CSS/JS conflicts
- ✅ Responsive design

## File Structure

```
.
├── HTMLEditor.jsx          # Main component
├── HTMLEditor.css          # Component styles
├── App.jsx                 # Example usage
├── App.css                 # App styles
├── main.jsx                # React entry point
├── index.html              # HTML template
├── package.json            # Dependencies
├── vite.config.js          # Vite configuration
├── sample.html             # Sample HTML to edit
└── reasoning.txt           # Architecture documentation
```

## How It Works

### 1. Iframe Isolation
The component uses an `<iframe>` to create a completely separate browsing context. This prevents:
- CSS from the editor bleeding into the loaded HTML
- JavaScript conflicts between the editor and loaded content

### 2. Content Injection
Uses `document.write()` to inject HTML content synchronously while maintaining same-origin status, allowing the React app to read/write the iframe content.

### 3. Editable Content
Makes the iframe's `<body>` element `contentEditable`, allowing users to click anywhere and edit text while preserving the HTML structure.

### 4. Saving
Manually reconstructs the complete HTML document including the Doctype using `XMLSerializer` and `outerHTML`.

### 5. Security
Uses iframe `sandbox` attribute with controlled permissions:
- `allow-same-origin` - Allows React to access iframe content
- `allow-scripts` - Allows scripts in the HTML to run
- `allow-forms` - Allows form submission
- `allow-popups` - Allows opening new windows

## Customization

### Custom Styling

You can customize the editor appearance by modifying `HTMLEditor.css` or overriding the CSS classes:

```css
.html-editor-container { /* Main container */ }
.html-editor-header { /* Toolbar */ }
.html-editor-btn-primary { /* Primary buttons */ }
.html-editor-iframe { /* Editor iframe */ }
```

### Hide Toolbar

```jsx
<HTMLEditor
    initialHTML={htmlContent}
    showToolbar={false}
/>
```

### Programmatic Access

You can access the current HTML programmatically:

```jsx
const iframeRef = useRef();

// Access via ref
const currentHTML = iframeRef.current?.getHTML();
```

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Security Considerations

⚠️ **Important**: This editor uses `allow-same-origin` in the iframe sandbox, which means malicious HTML could potentially access your app's cookies and localStorage. Only use this with trusted HTML content or implement additional security measures.

## Development

### Local Development

Clone the repository and install dependencies:

```bash
git clone https://github.com/yourusername/canva-editor.git
cd canva-editor
npm install
```

Run the development server:

```bash
npm run dev
```

### Building the Library

Build the library for distribution:

```bash
npm run build:lib
```

This creates the `dist/` folder with:
- `canva-editor.es.js` - ES module
- `canva-editor.umd.js` - UMD module
- `style.css` - Component styles
- Source maps

### Publishing to npm

1. Update the version in `package.json`:
```bash
npm version patch  # or minor, or major
```

2. Build the library:
```bash
npm run build:lib
```

3. Login to npm (if not already logged in):
```bash
npm login
```

4. Publish:
```bash
npm publish
```

The `prepublishOnly` script will automatically build the library before publishing.

## Project Structure

```
.
├── src/
│   ├── HTMLEditor.jsx       # Main component
│   ├── HTMLEditor.css        # Component styles
│   ├── index.js              # Entry point
│   └── index.d.ts            # TypeScript definitions
├── dist/                     # Built library (generated)
├── App.jsx                   # Demo app
├── package.json
├── vite.config.lib.js        # Vite config for library build
├── README.md
└── LICENSE
```

## License

MIT

## Contributing

Feel free to submit issues and pull requests!
