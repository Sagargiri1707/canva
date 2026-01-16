/**
 * Action types for the editor reducer
 */
export const ACTIONS = {
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

/**
 * Default configuration values
 */
export const DEFAULTS = {
    FILE_NAME: 'document.html',
    STATUS_DURATION: 3000,
    ERROR_DURATION: 5000,
    IFRAME_LOAD_DELAY: 300,
    FOCUS_DELAY: 100
};

/**
 * Error messages
 */
export const ERROR_MESSAGES = {
    IFRAME_NOT_AVAILABLE: 'Iframe not available',
    CANNOT_ACCESS_IFRAME: 'Cannot access iframe document',
    IFRAME_BODY_NOT_AVAILABLE: 'Iframe body not available',
    FAILED_TO_GET_HTML: 'Failed to get HTML content',
    FAILED_TO_SETUP_IMAGE_HANDLERS: 'Failed to setup image click handlers',
    FAILED_TO_INITIALIZE: 'Failed to initialize editor. Please refresh the page.',
    FAILED_TO_LOAD_HTML: 'Failed to load HTML content',
    INVALID_FILE_CONTENT: 'Invalid file content',
    FAILED_TO_LOAD_FILE: 'Failed to load file',
    FAILED_TO_READ_FILE: 'Failed to read file',
    NO_CONTENT_TO_SAVE: 'No content to save',
    FAILED_TO_SAVE: 'Failed to save file',
    FAILED_TO_RESET: 'Failed to reset content',
    NO_IMAGE_SELECTED: 'No image selected',
    FAILED_TO_REPLACE_IMAGE: 'Failed to replace image'
};

/**
 * Success messages
 */
export const SUCCESS_MESSAGES = {
    FILE_LOADED: 'File loaded successfully!',
    FILE_SAVED: 'File saved successfully!',
    CONTENT_RESET: 'Content reset to original',
    IMAGE_REPLACED: 'Image replaced successfully!'
};
