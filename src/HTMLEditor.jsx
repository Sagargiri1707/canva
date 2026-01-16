import React, { useRef, useEffect, useReducer, useCallback, useState } from 'react';
import StatusMessage from './components/StatusMessage';
import Header from './components/Header';
import FormattingToolbar from './components/FormattingToolbar';
import ImagePicker from './components/ImagePicker';
import EditorFrame from './components/EditorFrame';
import { ACTIONS } from './constants';
import styles from './HTMLEditor.module.css';

// Action types for reducer
const EDITOR_ACTIONS = {
    SET_HTML_CONTENT: 'SET_HTML_CONTENT',
    SET_FILE_NAME: 'SET_FILE_NAME',
    SET_STATUS: 'SET_STATUS',
    SET_ERROR: 'SET_ERROR',
    SET_LOADING: 'SET_LOADING',
    SHOW_IMAGE_PICKER: 'SHOW_IMAGE_PICKER',
    HIDE_IMAGE_PICKER: 'HIDE_IMAGE_PICKER',
    SET_SELECTED_IMAGE: 'SET_SELECTED_IMAGE',
    CLEAR_STATUS: 'CLEAR_STATUS',
    CLEAR_ERROR: 'CLEAR_ERROR'
};

// Initial state
const initialState = {
    htmlContent: '',
    currentFileName: 'document.html',
    statusMessage: '',
    errorMessage: '',
    isLoading: false,
    showImagePicker: false,
    selectedImage: null
};

// Reducer function
function editorReducer(state, action) {
    switch (action.type) {
        case EDITOR_ACTIONS.SET_HTML_CONTENT:
            return { ...state, htmlContent: action.payload, isLoading: false, errorMessage: '' };
        case EDITOR_ACTIONS.SET_FILE_NAME:
            return { ...state, currentFileName: action.payload };
        case EDITOR_ACTIONS.SET_STATUS:
            return { ...state, statusMessage: action.payload, errorMessage: '' };
        case EDITOR_ACTIONS.SET_ERROR:
            return { ...state, errorMessage: action.payload, statusMessage: '', isLoading: false };
        case EDITOR_ACTIONS.SET_LOADING:
            return { ...state, isLoading: action.payload };
        case EDITOR_ACTIONS.SHOW_IMAGE_PICKER:
            return { ...state, showImagePicker: true, selectedImage: action.payload };
        case EDITOR_ACTIONS.HIDE_IMAGE_PICKER:
            return { ...state, showImagePicker: false, selectedImage: null };
        case EDITOR_ACTIONS.CLEAR_STATUS:
            return { ...state, statusMessage: '' };
        case EDITOR_ACTIONS.CLEAR_ERROR:
            return { ...state, errorMessage: '' };
        default:
            return state;
    }
}

/**
 * HTMLEditor Component - Modular Version
 */
const HTMLEditor = ({
    initialHTML = '',
    fileName = 'document.html',
    onSave = null,
    onChange = null,
    showToolbar = true,
    assets = []
}) => {
    const [state, dispatch] = useReducer(editorReducer, {
        ...initialState,
        htmlContent: initialHTML,
        currentFileName: fileName
    });

    const [showFormattingToolbar, setShowFormattingToolbar] = useState(false);
    const [toolbarPosition, setToolbarPosition] = useState({ top: 0, left: 0 });

    const savedRangeRef = useRef(null);
    const iframeDocRef = useRef(null);
    const iframeRef = useRef(null);
    const statusTimeoutRef = useRef(null);
    const errorTimeoutRef = useRef(null);
    const iframeLoadedRef = useRef(false);

    // Update state when props change
    useEffect(() => {
        if (initialHTML && initialHTML !== state.htmlContent) {
            dispatch({ type: EDITOR_ACTIONS.SET_HTML_CONTENT, payload: initialHTML });
        }
    }, [initialHTML]);

    useEffect(() => {
        if (fileName !== state.currentFileName) {
            dispatch({ type: EDITOR_ACTIONS.SET_FILE_NAME, payload: fileName });
        }
    }, [fileName]);

    // Show status message with auto-clear
    const showStatus = useCallback((message, duration = 3000) => {
        if (statusTimeoutRef.current) {
            clearTimeout(statusTimeoutRef.current);
        }
        dispatch({ type: EDITOR_ACTIONS.SET_STATUS, payload: message });
        statusTimeoutRef.current = setTimeout(() => {
            dispatch({ type: EDITOR_ACTIONS.CLEAR_STATUS });
        }, duration);
    }, []);

    // Show error message with auto-clear
    const showError = useCallback((message, duration = 5000) => {
        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }
        dispatch({ type: EDITOR_ACTIONS.SET_ERROR, payload: message });
        errorTimeoutRef.current = setTimeout(() => {
            dispatch({ type: EDITOR_ACTIONS.CLEAR_ERROR });
        }, duration);
    }, []);

    // Get serialized HTML with Doctype
    const getSerializedHTML = useCallback(() => {
        try {
            const iframe = iframeRef.current;
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
        } catch (error) {
            console.error('Error serializing HTML:', error);
            showError('Failed to get HTML content');
            return '';
        }
    }, [showError]);

    // Setup image click handlers with hover icons
    const setupImageClickHandlers = useCallback((iframeDoc) => {
        try {
            const images = iframeDoc.querySelectorAll('img');

            images.forEach(img => {
                // Skip if already has icon
                if (img.hasAttribute('data-editor-image-setup')) return;
                img.setAttribute('data-editor-image-setup', 'true');

                // Make image non-editable to prevent text cursor
                img.contentEditable = 'false';

                // Wrap image in a container for icon positioning
                const parent = img.parentNode;
                const wrapper = iframeDoc.createElement('div');
                wrapper.className = 'html-editor-image-wrapper';
                wrapper.contentEditable = 'false';

                // Create edit icon
                const icon = iframeDoc.createElement('div');
                icon.className = 'html-editor-image-icon';
                icon.innerHTML = `
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                    </svg>
                `;
                icon.contentEditable = 'false';

                // Insert wrapper
                parent?.insertBefore(wrapper, img);
                wrapper.appendChild(img);
                wrapper.appendChild(icon);

                // Click handler on wrapper
                const handleClick = (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch({ type: EDITOR_ACTIONS.SHOW_IMAGE_PICKER, payload: img });
                };

                wrapper.addEventListener('click', handleClick);
                icon.addEventListener('click', handleClick);
            });
        } catch (error) {
            console.error('Error setting up image handlers:', error);
            showError('Failed to setup image click handlers');
        }
    }, [showError]);

    // Setup text selection listener
    const setupSelectionListener = useCallback((iframeDoc) => {
        try {
            iframeDocRef.current = iframeDoc;

            const handleSelectionChange = () => {
                const selection = iframeDoc.getSelection();

                if (!selection || selection.isCollapsed || selection.toString().trim() === '') {
                    setShowFormattingToolbar(false);
                    savedRangeRef.current = null;
                    return;
                }

                // Save the range before it's lost
                try {
                    const range = selection.getRangeAt(0);
                    savedRangeRef.current = range.cloneRange();

                    const rect = range.getBoundingClientRect();
                    const iframe = iframeRef.current;

                    if (!iframe) return;

                    // Get iframe position relative to viewport
                    const iframeRect = iframe.getBoundingClientRect();

                    // Calculate toolbar position with smart positioning
                    const toolbarHeight = 48;
                    const toolbarWidth = 400;
                    const padding = 8;

                    let top = iframeRect.top + rect.top - toolbarHeight - padding;
                    let left = iframeRect.left + rect.left + (rect.width / 2) - (toolbarWidth / 2);

                    // Adjust if toolbar goes above viewport
                    if (top < 60) {
                        top = iframeRect.top + rect.bottom + padding;
                    }

                    // Adjust if toolbar goes beyond right edge
                    if (left + toolbarWidth > window.innerWidth - padding) {
                        left = window.innerWidth - toolbarWidth - padding;
                    }

                    // Adjust if toolbar goes beyond left edge
                    if (left < padding) {
                        left = padding;
                    }

                    setToolbarPosition({ top, left });
                    setShowFormattingToolbar(true);
                } catch (e) {
                    console.error('Error handling selection:', e);
                }
            };

            // Listen for selection changes
            iframeDoc.addEventListener('selectionchange', handleSelectionChange);
            iframeDoc.addEventListener('mouseup', handleSelectionChange);

            // Hide toolbar on scroll
            const handleScroll = () => {
                setShowFormattingToolbar(false);
            };

            iframeDoc.addEventListener('scroll', handleScroll, true);

        } catch (error) {
            console.error('Error setting up selection listener:', error);
        }
    }, []);

    // Execute formatting command
    const executeCommand = useCallback((command, value = null) => {
        try {
            const iframeDoc = iframeDocRef.current;
            if (!iframeDoc || !savedRangeRef.current) return;

            // Restore selection from saved range
            const selection = iframeDoc.getSelection();
            if (selection) {
                try {
                    selection.removeAllRanges();
                    selection.addRange(savedRangeRef.current);
                } catch (e) {
                    console.error('Error restoring selection:', e);
                    return;
                }
            }

            // Execute command
            iframeDoc.execCommand(command, false, value);

            // Update saved range after command
            if (selection && selection.rangeCount > 0) {
                savedRangeRef.current = selection.getRangeAt(0).cloneRange();
            }

            // Trigger onChange
            if (onChange) {
                const currentHTML = getSerializedHTML();
                onChange(currentHTML);
            }

        } catch (error) {
            console.error('Error executing command:', error);
            showError('Failed to apply formatting');
        }
    }, [onChange, getSerializedHTML, showError]);

    // Setup editable content
    const setupEditableContent = useCallback(() => {
        try {
            const iframe = iframeRef.current;
            if (!iframe) {
                throw new Error('Iframe reference not available');
            }

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) {
                throw new Error('Cannot access iframe document');
            }

            const body = iframeDoc.body;
            if (!body) {
                throw new Error('Iframe body not available');
            }

            // Make body editable
            body.contentEditable = 'true';

            // Remove existing editor styles
            const existingStyle = iframeDoc.querySelector('[data-editor-style]');
            if (existingStyle) {
                existingStyle.remove();
            }

            // Inject UX enhancement CSS
            const style = iframeDoc.createElement('style');
            style.setAttribute('data-editor-style', 'true');
            style.textContent = `
                body {
                    outline: none !important;
                    cursor: text !important;
                    min-height: 100vh !important;
                }
                * {
                    cursor: text !important;
                }
                a, button, input, select, textarea {
                    cursor: pointer !important;
                }
                ${assets.length > 0 ? `
                /* Image wrapper styles */
                .html-editor-image-wrapper {
                    position: relative !important;
                    display: inline !important;
                    cursor: pointer !important;
                }

                .html-editor-image-wrapper img {
                    transition: opacity 0.2s, filter 0.2s !important;
                    cursor: pointer !important;
                }

                .html-editor-image-wrapper:hover img {
                    opacity: 0.85 !important;
                    filter: brightness(0.95) !important;
                }

                /* Edit icon styles - subtle corner design */
                .html-editor-image-icon {
                    position: absolute !important;
                    top: 8px !important;
                    right: 8px !important;
                    background: rgba(255, 255, 255, 0.95) !important;
                    backdrop-filter: blur(8px) !important;
                    color: #FF6347 !important;
                    width: 36px !important;
                    height: 36px !important;
                    border-radius: 8px !important;
                    display: flex !important;
                    align-items: center !important;
                    justify-content: center !important;
                    cursor: pointer !important;
                    opacity: 0 !important;
                    transition: all 0.2s ease !important;
                    pointer-events: none !important;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15) !important;
                    border: 1px solid rgba(0, 0, 0, 0.1) !important;
                }

                .html-editor-image-icon:hover {
                    background: #FF6347 !important;
                    color: white !important;
                    transform: scale(1.05) !important;
                    box-shadow: 0 4px 12px rgba(255, 99, 71, 0.3) !important;
                }

                .html-editor-image-wrapper:hover .html-editor-image-icon {
                    opacity: 1 !important;
                    pointer-events: auto !important;
                }

                .html-editor-image-icon svg {
                    pointer-events: none !important;
                }
                ` : ''}
            `;
            iframeDoc.head.appendChild(style);

            // Setup change detection
            if (onChange) {
                const handleInput = () => {
                    try {
                        const currentHTML = getSerializedHTML();
                        onChange(currentHTML);
                    } catch (error) {
                        console.error('Error in onChange handler:', error);
                    }
                };

                // Remove existing listeners
                body.removeEventListener('input', handleInput);
                body.removeEventListener('paste', handleInput);

                // Add new listeners
                body.addEventListener('input', handleInput);
                body.addEventListener('paste', handleInput);
            }

            // Setup image click handlers if assets are provided
            if (assets.length > 0) {
                setupImageClickHandlers(iframeDoc);
            }

            // Setup text selection listener for formatting toolbar
            setupSelectionListener(iframeDoc);

            // Auto-focus the body
            setTimeout(() => {
                body.focus();
            }, 100);

            iframeLoadedRef.current = true;
        } catch (error) {
            console.error('Error setting up editable content:', error);
            showError('Failed to initialize editor. Please refresh the page.');
        }
    }, [assets, onChange, getSerializedHTML, setupImageClickHandlers, setupSelectionListener, showError]);

    // Inject HTML into iframe
    useEffect(() => {
        if (!state.htmlContent || !iframeRef.current) return;

        iframeLoadedRef.current = false;
        const iframe = iframeRef.current;

        try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) {
                throw new Error('Cannot access iframe document');
            }

            // Clear and write new content
            iframeDoc.open();
            iframeDoc.write(state.htmlContent);
            iframeDoc.close();

            // Wait for iframe to fully load with multiple checks
            const handleLoad = () => {
                const checkReady = () => {
                    const doc = iframe.contentDocument || iframe.contentWindow?.document;

                    if (!doc) {
                        setTimeout(checkReady, 100);
                        return;
                    }

                    // Wait for readyState to be complete
                    if (doc.readyState !== 'complete') {
                        setTimeout(checkReady, 100);
                        return;
                    }

                    // Additional delay to ensure all scripts have executed
                    setTimeout(() => {
                        setupEditableContent();
                    }, 500);
                };

                checkReady();
            };

            iframe.removeEventListener('load', handleLoad);
            iframe.addEventListener('load', handleLoad);

            // Also listen for DOMContentLoaded in the iframe
            const iframeWindow = iframe.contentWindow;
            if (iframeWindow) {
                iframeWindow.addEventListener('DOMContentLoaded', handleLoad);
            }

            // If already loaded, setup immediately
            if (iframeDoc.readyState === 'complete') {
                handleLoad();
            }

            // Cleanup
            return () => {
                iframe.removeEventListener('load', handleLoad);
                if (iframeWindow) {
                    iframeWindow.removeEventListener('DOMContentLoaded', handleLoad);
                }
            };
        } catch (error) {
            console.error('Error injecting HTML:', error);
            showError('Failed to load HTML content');
        }
    }, [state.htmlContent, setupEditableContent, showError]);

    // Handle file load
    const handleLoadFile = useCallback((event) => {
        const file = event.target.files?.[0];
        if (!file) return;

        dispatch({ type: EDITOR_ACTIONS.SET_LOADING, payload: true });

        const reader = new FileReader();

        reader.onload = (e) => {
            try {
                const content = e.target?.result;
                if (typeof content !== 'string') {
                    throw new Error('Invalid file content');
                }

                dispatch({ type: EDITOR_ACTIONS.SET_HTML_CONTENT, payload: content });
                dispatch({ type: EDITOR_ACTIONS.SET_FILE_NAME, payload: file.name });
                showStatus('File loaded successfully!');
            } catch (error) {
                console.error('Error loading file:', error);
                showError('Failed to load file');
                dispatch({ type: EDITOR_ACTIONS.SET_LOADING, payload: false });
            }
        };

        reader.onerror = () => {
            console.error('FileReader error:', reader.error);
            showError('Failed to read file');
            dispatch({ type: EDITOR_ACTIONS.SET_LOADING, payload: false });
        };

        reader.readAsText(file);
    }, [showStatus, showError]);

    // Handle save
    const handleSave = useCallback(() => {
        try {
            const fullHTML = getSerializedHTML();
            if (!fullHTML) {
                throw new Error('No content to save');
            }

            // Call onSave callback if provided
            if (onSave) {
                try {
                    onSave(fullHTML);
                } catch (error) {
                    console.error('Error in onSave callback:', error);
                }
            }

            // Create download
            const blob = new Blob([fullHTML], { type: 'text/html;charset=utf-8' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = state.currentFileName;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            URL.revokeObjectURL(url);

            showStatus('File saved successfully!');
        } catch (error) {
            console.error('Error saving file:', error);
            showError('Failed to save file');
        }
    }, [getSerializedHTML, onSave, state.currentFileName, showStatus, showError]);

    // Handle reset
    const handleReset = useCallback(() => {
        if (!confirm('Are you sure you want to reload the original content? Any unsaved changes will be lost.')) {
            return;
        }

        try {
            dispatch({ type: EDITOR_ACTIONS.SET_HTML_CONTENT, payload: initialHTML });
            showStatus('Content reset to original');
        } catch (error) {
            console.error('Error resetting content:', error);
            showError('Failed to reset content');
        }
    }, [initialHTML, showStatus, showError]);

    // Handle image replacement
    const handleImageReplace = useCallback((assetUrl) => {
        try {
            if (!state.selectedImage) {
                throw new Error('No image selected');
            }

            state.selectedImage.src = assetUrl;
            dispatch({ type: EDITOR_ACTIONS.HIDE_IMAGE_PICKER });
            showStatus('Image replaced successfully!');

            // Trigger onChange if provided
            if (onChange) {
                try {
                    const currentHTML = getSerializedHTML();
                    onChange(currentHTML);
                } catch (error) {
                    console.error('Error in onChange callback:', error);
                }
            }
        } catch (error) {
            console.error('Error replacing image:', error);
            showError('Failed to replace image');
            dispatch({ type: EDITOR_ACTIONS.HIDE_IMAGE_PICKER });
        }
    }, [state.selectedImage, onChange, getSerializedHTML, showStatus, showError]);

    // Cleanup timeouts on unmount
    useEffect(() => {
        return () => {
            if (statusTimeoutRef.current) {
                clearTimeout(statusTimeoutRef.current);
            }
            if (errorTimeoutRef.current) {
                clearTimeout(errorTimeoutRef.current);
            }
        };
    }, []);

    // Expose getHTML method via ref
    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.getHTML = getSerializedHTML;
        }
    }, [getSerializedHTML]);

    return (
        <div className={styles.container}>
            {/* Status Messages */}
            <StatusMessage message={state.statusMessage} type="success" />
            <StatusMessage message={state.errorMessage} type="error" />

            {/* Formatting Toolbar */}
            {showFormattingToolbar && (
                <FormattingToolbar
                    position={toolbarPosition}
                    onCommand={executeCommand}
                    onClose={() => setShowFormattingToolbar(false)}
                />
            )}

            {/* Header Toolbar */}
            {showToolbar && (
                <Header
                    fileName={state.currentFileName}
                    isLoading={state.isLoading}
                    hasContent={!!state.htmlContent}
                    hasInitialHTML={!!initialHTML}
                    onLoadFile={handleLoadFile}
                    onReset={handleReset}
                    onSave={handleSave}
                />
            )}

            {/* Editor Content */}
            <EditorFrame ref={iframeRef} isLoading={state.isLoading} />

            {/* Image Picker Modal */}
            {state.showImagePicker && (
                <ImagePicker
                    assets={assets}
                    onSelect={handleImageReplace}
                    onClose={() => dispatch({ type: EDITOR_ACTIONS.HIDE_IMAGE_PICKER })}
                />
            )}
        </div>
    );
};

export default HTMLEditor;
