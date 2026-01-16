import React, { createContext, useContext, useReducer, useRef, useCallback } from 'react';
import { editorReducer, initialState } from '../reducers/editorReducer';
import { ACTIONS, DEFAULTS } from '../constants';

const EditorContext = createContext(null);

export const useEditor = () => {
    const context = useContext(EditorContext);
    if (!context) {
        throw new Error('useEditor must be used within EditorProvider');
    }
    return context;
};

export const EditorProvider = ({ children, initialHTML = '', fileName = 'document.html' }) => {
    const [state, dispatch] = useReducer(editorReducer, {
        ...initialState,
        htmlContent: initialHTML,
        currentFileName: fileName
    });

    const iframeRef = useRef(null);
    const statusTimeoutRef = useRef(null);
    const errorTimeoutRef = useRef(null);

    // Status message handler
    const showStatus = useCallback((message, duration = DEFAULTS.STATUS_DURATION) => {
        if (statusTimeoutRef.current) {
            clearTimeout(statusTimeoutRef.current);
        }
        dispatch({ type: ACTIONS.SET_STATUS, payload: message });
        statusTimeoutRef.current = setTimeout(() => {
            dispatch({ type: ACTIONS.CLEAR_STATUS });
        }, duration);
    }, []);

    // Error message handler
    const showError = useCallback((message, duration = DEFAULTS.ERROR_DURATION) => {
        if (errorTimeoutRef.current) {
            clearTimeout(errorTimeoutRef.current);
        }
        dispatch({ type: ACTIONS.SET_ERROR, payload: message });
        errorTimeoutRef.current = setTimeout(() => {
            dispatch({ type: ACTIONS.CLEAR_ERROR });
        }, duration);
    }, []);

    const value = {
        state,
        dispatch,
        iframeRef,
        showStatus,
        showError
    };

    return (
        <EditorContext.Provider value={value}>
            {children}
        </EditorContext.Provider>
    );
};
