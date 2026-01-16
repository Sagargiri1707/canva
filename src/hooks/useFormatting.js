import { useCallback } from 'react';
import { useEditor } from '../context/EditorContext';
import { serializeIframeHTML } from '../utils';

export const useFormatting = (onChange) => {
    const { iframeRef, showError } = useEditor();

    const executeCommand = useCallback((command, value = null) => {
        try {
            const iframe = iframeRef.current;
            if (!iframe) return;

            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (!iframeDoc) return;

            // Execute command
            iframeDoc.execCommand(command, false, value);

            // Trigger onChange
            if (onChange) {
                const currentHTML = serializeIframeHTML(iframe);
                onChange(currentHTML);
            }

        } catch (error) {
            console.error('Error executing command:', error);
            showError('Failed to apply formatting');
        }
    }, [iframeRef, onChange, showError]);

    return { executeCommand };
};
