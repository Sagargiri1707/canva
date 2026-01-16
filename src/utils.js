/**
 * Utility functions for HTMLEditor component
 */

/**
 * Serializes iframe document to HTML string with Doctype
 * @param {HTMLIFrameElement} iframe - The iframe element
 * @returns {string} Complete HTML string with Doctype
 * @throws {Error} If iframe or document is not accessible
 */
export function serializeIframeHTML(iframe) {
    if (!iframe) {
        throw new Error('Iframe not available');
    }

    const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
    if (!iframeDoc) {
        throw new Error('Cannot access iframe document');
    }

    let fullHTML = '';

    // Serialize the Doctype
    if (iframeDoc.doctype) {
        const doctype = new XMLSerializer().serializeToString(iframeDoc.doctype);
        fullHTML += doctype + '\n';
    }

    // Serialize the HTML content
    fullHTML += iframeDoc.documentElement.outerHTML;

    return fullHTML;
}

/**
 * Checks if iframe document is accessible
 * @param {HTMLIFrameElement} iframe - The iframe element
 * @returns {boolean} True if accessible, false otherwise
 */
export function isIframeAccessible(iframe) {
    if (!iframe) return false;

    try {
        const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
        return !!iframeDoc;
    } catch (error) {
        return false;
    }
}

/**
 * Safely removes an element from the DOM
 * @param {Element} element - The element to remove
 */
export function safeRemoveElement(element) {
    if (element && element.parentNode) {
        element.parentNode.removeChild(element);
    }
}

/**
 * Creates a download link for a file
 * @param {string} content - File content
 * @param {string} fileName - File name
 * @param {string} mimeType - MIME type
 */
export function downloadFile(content, fileName, mimeType = 'text/html;charset=utf-8') {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

/**
 * Debounces a function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Validates if a string is valid HTML
 * @param {string} htmlString - HTML string to validate
 * @returns {boolean} True if valid, false otherwise
 */
export function isValidHTML(htmlString) {
    if (typeof htmlString !== 'string' || !htmlString.trim()) {
        return false;
    }

    try {
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlString, 'text/html');
        return doc.documentElement.nodeName === 'HTML';
    } catch (error) {
        return false;
    }
}

/**
 * Generates a unique ID
 * @param {string} prefix - Prefix for the ID
 * @returns {string} Unique ID
 */
export function generateUniqueId(prefix = 'id') {
    return `${prefix}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}
