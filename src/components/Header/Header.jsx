import React from 'react';
import styles from './Header.module.css';

/**
 * Header Component
 * Contains title and action buttons (Undo, Redo, Save)
 */
const Header = ({
    fileName,
    isLoading,
    hasContent,
    onSave,
    onUndo,
    onRedo
}) => {
    return (
        <div className={styles.header}>
            <div className={styles.title}>
                📝 HTML Editor - {fileName}
            </div>
            <div className={styles.editorActions}>
                <button
                    className={`${styles.btn} ${styles.btnIcon}`}
                    onClick={onUndo}
                    disabled={isLoading}
                    title="Undo (Ctrl+Z)"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 7v6h6"></path>
                        <path d="M21 17a9 9 0 00-9-9 9 9 0 00-6 2.3L3 13"></path>
                    </svg>
                </button>
                <button
                    className={`${styles.btn} ${styles.btnIcon}`}
                    onClick={onRedo}
                    disabled={isLoading}
                    title="Redo (Ctrl+Y)"
                >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 7v6h-6"></path>
                        <path d="M3 17a9 9 0 019-9 9 9 0 016 2.3l3 2.7"></path>
                    </svg>
                </button>
            </div>
            <div className={styles.actions}>
                <button
                    className={`${styles.btn} ${styles.btnPrimary}`}
                    onClick={onSave}
                    disabled={isLoading || !hasContent}
                >
                    💾 Save HTML
                </button>
            </div>
        </div>
    );
};

export default Header;
