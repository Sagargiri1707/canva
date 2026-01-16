import React, { useState, useEffect } from 'react';
import HTMLEditor from './src/HTMLEditor';
import ErrorBoundary from './src/ErrorBoundary';
import './App.css';

function App() {
    const [initialHTML, setInitialHTML] = useState('');
    const [loading, setLoading] = useState(true);

    // Sample image assets for replacement
    const imageAssets = [
        'https://images.pexels.com/photos/7820633/pexels-photo-7820633.jpeg',
        'https://images.pexels.com/photos/14039962/pexels-photo-14039962.jpeg',
        'https://images.pexels.com/photos/5322514/pexels-photo-5322514.jpeg',
        'https://images.pexels.com/photos/6169057/pexels-photo-6169057.jpeg',
        'https://images.pexels.com/photos/6050148/pexels-photo-6050148.jpeg',
        'https://images.pexels.com/photos/2698552/pexels-photo-2698552.jpeg',
        'https://images.pexels.com/photos/27550663/pexels-photo-27550663.jpeg',
        'https://images.pexels.com/photos/34407/pexels-photo.jpg',
        'https://images.pexels.com/photos/4246100/pexels-photo-4246100.jpeg',
        'https://images.pexels.com/photos/3651821/pexels-photo-3651821.jpeg'
    ];

    // Load sample.html on component mount
    useEffect(() => {
        loadSampleHTML();
    }, []);

    const loadSampleHTML = async () => {
        try {
            const response = await fetch('/sample.html');
            const content = await response.text();
            setInitialHTML(content);
            setLoading(false);
        } catch (error) {
            console.error('Error loading sample.html:', error);
            // Fallback to a simple HTML template
            setInitialHTML(getDefaultHTML());
            setLoading(false);
        }
    };

    const getDefaultHTML = () => {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Document</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            padding: 40px;
            line-height: 1.6;
            max-width: 800px;
            margin: 0 auto;
        }
        h1 {
            color: #FF6347;
        }
        p {
            color: #333;
            margin-bottom: 1em;
        }
    </style>
</head>
<body>
    <h1>Welcome to HTML Editor</h1>
    <p>Click anywhere to start editing the text content.</p>
    <p>This editor allows you to modify text while preserving the HTML structure, styles, and scripts.</p>
    <h2>Features</h2>
    <ul>
        <li>Edit text content directly in the preview</li>
        <li>Preserves all HTML structure and styling</li>
        <li>Download your edited HTML</li>
        <li>Load external HTML files</li>
    </ul>
</body>
</html>`;
    };

    const handleSave = (htmlContent) => {
        console.log('=== Edited HTML ===');
        console.log(htmlContent);
        console.log('===================');
        // You can add custom save logic here
        // For example, send to a server, save to localStorage, etc.
    };

    const handleChange = (htmlContent) => {
        // This fires on every edit
        // console.log('HTML changed:', htmlContent.substring(0, 100) + '...');
    };

    if (loading) {
        return (
            <div className="app-loading">
                <div className="loading-spinner"></div>
                <p>Loading HTML Editor...</p>
            </div>
        );
    }

    return (
        <div className="app">
            <ErrorBoundary>
                <HTMLEditor
                    initialHTML={initialHTML}
                    fileName="sample.html"
                    onSave={handleSave}
                    onChange={handleChange}
                    showToolbar={true}
                    assets={imageAssets}
                />
            </ErrorBoundary>
        </div>
    );
}

export default App;
