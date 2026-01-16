import React, { useState, useEffect, useRef } from 'react';
import styles from './LinkEditor.module.css';

/**
 * LinkEditor Component
 * Modal for creating and editing hyperlinks
 */
const LinkEditor = ({ existingUrl = '', existingText = '', onSave, onRemove, onClose }) => {
    const [url, setUrl] = useState(existingUrl);
    const [text, setText] = useState(existingText);
    const inputRef = useRef(null);

    useEffect(() => {
        // Auto-focus URL input
        if (inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, []);

    const handleSave = () => {
        if (!url.trim()) {
            return;
        }

        let finalUrl = url.trim();

        // Add https:// if no protocol specified
        if (!/^https?:\/\//i.test(finalUrl) && !/^mailto:/i.test(finalUrl)) {
            finalUrl = 'https://' + finalUrl;
        }

        onSave(finalUrl, text.trim());
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSave();
        } else if (e.key === 'Escape') {
            e.preventDefault();
            onClose();
        }
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>{existingUrl ? 'Edit Link' : 'Insert Link'}</h3>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.field}>
                        <label htmlFor="link-url">URL</label>
                        <input
                            ref={inputRef}
                            id="link-url"
                            type="text"
                            value={url}
                            onChange={(e) => setUrl(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="https://example.com"
                            className={styles.input}
                        />
                    </div>

                    {!existingText && (
                        <div className={styles.field}>
                            <label htmlFor="link-text">Text (optional)</label>
                            <input
                                id="link-text"
                                type="text"
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder="Link text"
                                className={styles.input}
                            />
                        </div>
                    )}
                </div>
                <div className={styles.footer}>
                    {existingUrl && onRemove && (
                        <button
                            className={`${styles.btn} ${styles.btnDanger}`}
                            onClick={onRemove}
                        >
                            Remove Link
                        </button>
                    )}
                    <div className={styles.footerActions}>
                        <button
                            className={`${styles.btn} ${styles.btnSecondary}`}
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            className={`${styles.btn} ${styles.btnPrimary}`}
                            onClick={handleSave}
                            disabled={!url.trim()}
                        >
                            {existingUrl ? 'Update' : 'Insert'} Link
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LinkEditor;
