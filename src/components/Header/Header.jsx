import React, { useRef } from 'react';
import styles from './Header.module.css';

/**
 * Header Component
 * Contains title and action buttons (Load, Reset, Save)
 */
const Header = ({
    fileName,
    isLoading,
    hasContent,
    hasInitialHTML,
    onLoadFile,
    onReset,
    onSave
}) => {
    const fileInputRef = useRef(null);

    const handleFileChange = (event) => {
        onLoadFile(event);
        // Reset file input
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    return (
        <div className={styles.header}>
            <div className={styles.title}>
                📝 HTML Editor - {fileName}
            </div>
            <div className={styles.actions}>
                <input
                    ref={fileInputRef}
                    type="file"
                    accept=".html,.htm"
                    onChange={handleFileChange}
                    className={styles.fileInput}
                    disabled={isLoading}
                />
                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                >
                    📁 Load HTML
                </button>
                <button
                    className={`${styles.btn} ${styles.btnSecondary}`}
                    onClick={onReset}
                    disabled={isLoading || !hasInitialHTML}
                >
                    🔄 Reset
                </button>
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
