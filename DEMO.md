# HTML Editor Demo

This demo shows the React HTML Editor component in action, loading and editing `sample.html`.

## 🚀 Running the Demo

The development server is currently running at:

**http://localhost:3000/**

### If not running, start it with:

```bash
npm run dev
```

## 📋 What You'll See

The demo automatically loads `sample.html` (the Mokobara travel gear website) and allows you to:

1. **Edit Text Content** - Click anywhere on the page and start typing to edit text
2. **Load HTML Files** - Click "📁 Load HTML" to load different HTML files
3. **Reset Content** - Click "🔄 Reset" to restore the original sample.html
4. **Save Edited HTML** - Click "💾 Save HTML" to download your changes

## 🎯 Features Demonstrated

### Architecture (from reasoning.txt)

- ✅ **Iframe Isolation** - The loaded HTML runs in a separate browsing context
- ✅ **Content Injection** - Uses `document.write()` for same-origin injection
- ✅ **ContentEditable** - Native browser editing without libraries
- ✅ **Proper Serialization** - Saves with Doctype preserved
- ✅ **Security Sandbox** - Controlled iframe permissions
- ✅ **UX Enhancements** - Custom CSS for better editing

### What You Can Edit

- ✅ Headings, paragraphs, and list items
- ✅ Text in buttons and navigation
- ✅ Any visible text content

### What's Preserved

- ✅ All HTML structure
- ✅ CSS styles and animations
- ✅ JavaScript functionality
- ✅ Images and media
- ✅ Meta tags and Doctype

## 📁 Project Structure

```
.
├── src/
│   ├── HTMLEditor.jsx     # Main component
│   ├── HTMLEditor.css      # Styles
│   └── index.js            # Entry point
├── public/
│   └── sample.html         # Sample HTML to edit
├── App.jsx                 # Demo app
├── main.jsx                # React entry
└── index.html              # HTML template
```

## 🧪 Try These Actions

1. **Edit the Hero Section**
   - Click on "Travel with Ease and Style with Mokobara"
   - Change the text to something else
   - Notice styles are preserved

2. **Edit Product Names**
   - Scroll to "Our Products" section
   - Click on "Cabin Luggage" and rename it
   - All formatting stays intact

3. **Save Your Changes**
   - Click "💾 Save HTML"
   - Open the downloaded file in a browser
   - Your edits are there!

4. **Load a Different File**
   - Create a simple HTML file on your computer
   - Click "📁 Load HTML"
   - Edit the new file

## 🔧 Customization

The component accepts these props:

```jsx
<HTMLEditor
    initialHTML={htmlString}       // HTML content to load
    fileName="document.html"        // Default save filename
    onSave={(html) => {...}}        // Callback when saved
    onChange={(html) => {...}}      // Callback on edits
    showToolbar={true}              // Show/hide toolbar
/>
```

## 📦 Using as an NPM Package

After publishing to npm, install it:

```bash
npm install canva-editor
```

Use in your app:

```jsx
import HTMLEditor from 'canva-editor';
import 'canva-editor/dist/style.css';

function MyApp() {
    return (
        <div style={{ height: '100vh' }}>
            <HTMLEditor initialHTML={myHTML} />
        </div>
    );
}
```

## 🛠️ Development Commands

```bash
# Run demo
npm run dev

# Build library for npm
npm run build:lib

# Build demo for production
npm run build
```

## 🌟 Key Points

1. **No Content Loss** - The editor preserves ALL HTML, including scripts and head tags
2. **Real DOM** - Works directly with the browser's DOM, not a virtual representation
3. **Isolated** - Your app's styles and scripts won't interfere with the loaded HTML
4. **Standards-Based** - Uses contentEditable, a native browser feature

## 🚨 Important Notes

- The editor modifies TEXT CONTENT only
- HTML structure, attributes, and tags are preserved
- Scripts in the loaded HTML will execute (security consideration)
- Use only with trusted HTML or implement additional security

Enjoy editing! 🎉
