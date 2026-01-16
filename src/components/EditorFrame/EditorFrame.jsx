import React, { forwardRef } from 'react';
import styles from './EditorFrame.module.css';

/**
 * EditorFrame Component
 * Iframe container with loading state
 */
const EditorFrame = forwardRef(({ isLoading }, ref) => {
    return (
        <div className={styles.content}>
            <div className={styles.frameContainer}>
                {isLoading && (
                    <div className={styles.loadingOverlay}>
                        <div className={styles.spinner}></div>
                        <p>Loading...</p>
                    </div>
                )}
                <iframe
                    ref={ref}
                    className={styles.iframe}
                    sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-modals"
                    title="HTML Editor"
                />
            </div>
        </div>
    );
});

EditorFrame.displayName = 'EditorFrame';

export default EditorFrame;
