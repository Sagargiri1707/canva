import React, { useState, useRef, useEffect } from 'react';
import styles from './FormattingToolbar.module.css';

/**
 * FormattingToolbar Component
 * Floating toolbar for text formatting with position and dropdown
 */
const FormattingToolbar = ({ position, onCommand, onClose }) => {
    const [showMoreOptions, setShowMoreOptions] = useState(false);
    const toolbarRef = useRef(null);

    // Handle click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (toolbarRef.current && !toolbarRef.current.contains(event.target)) {
                onClose();
                setShowMoreOptions(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [onClose]);

    return (
        <div
            ref={toolbarRef}
            className={styles.toolbar}
            style={{
                position: 'fixed',
                top: `${position.top}px`,
                left: `${position.left}px`,
                zIndex: 10001
            }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <div className={styles.main}>
                {/* Bold */}
                <button
                    className={styles.btn}
                    onClick={() => onCommand('bold')}
                    title="Bold (Ctrl+B)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 4h8a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                        <path d="M6 12h9a4 4 0 0 1 4 4 4 4 0 0 1-4 4H6z"></path>
                    </svg>
                </button>

                {/* Italic */}
                <button
                    className={styles.btn}
                    onClick={() => onCommand('italic')}
                    title="Italic (Ctrl+I)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="19" y1="4" x2="10" y2="4"></line>
                        <line x1="14" y1="20" x2="5" y2="20"></line>
                        <line x1="15" y1="4" x2="9" y2="20"></line>
                    </svg>
                </button>

                {/* Underline */}
                <button
                    className={styles.btn}
                    onClick={() => onCommand('underline')}
                    title="Underline (Ctrl+U)"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 3v7a6 6 0 0 0 6 6 6 6 0 0 0 6-6V3"></path>
                        <line x1="4" y1="21" x2="20" y2="21"></line>
                    </svg>
                </button>

                {/* Strikethrough */}
                <button
                    className={styles.btn}
                    onClick={() => onCommand('strikeThrough')}
                    title="Strikethrough"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17.3 4.9c-2.3-.6-4.4-1-6.2-.9-2.7.1-5.3 1.1-6.6 3.1-.5.9-.8 1.9-.8 2.9 0 2.5 2.1 4.8 6.2 5.4"></path>
                        <path d="M6.5 19c1.9 1.1 5.3 1.4 8.5.5 2.5-.7 4.4-2.4 4.8-4.5.2-1.1 0-2.2-.5-3"></path>
                        <line x1="3" y1="12" x2="21" y2="12"></line>
                    </svg>
                </button>

                <div className={styles.divider}></div>

                {/* Text Color */}
                <div className={styles.btnGroup}>
                    <input
                        type="color"
                        onChange={(e) => onCommand('foreColor', e.target.value)}
                        title="Text Color"
                        className={styles.colorInput}
                    />
                    <span className={styles.label}>A</span>
                </div>

                {/* Background Color */}
                <div className={styles.btnGroup}>
                    <input
                        type="color"
                        onChange={(e) => onCommand('backColor', e.target.value)}
                        title="Background Color"
                        className={styles.colorInput}
                    />
                    <span className={styles.label}>⬛</span>
                </div>

                <div className={styles.divider}></div>

                {/* More Options */}
                <button
                    className={`${styles.btn} ${styles.moreBtn}`}
                    onClick={() => setShowMoreOptions(!showMoreOptions)}
                    title="More options"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="1"></circle>
                        <circle cx="12" cy="5" r="1"></circle>
                        <circle cx="12" cy="19" r="1"></circle>
                    </svg>
                </button>
            </div>

            {/* More Options Dropdown */}
            {showMoreOptions && (
                <div className={styles.dropdown}>
                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('justifyLeft')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="17" y1="10" x2="3" y2="10"></line>
                            <line x1="21" y1="6" x2="3" y2="6"></line>
                            <line x1="21" y1="14" x2="3" y2="14"></line>
                            <line x1="17" y1="18" x2="3" y2="18"></line>
                        </svg>
                        <span>Align Left</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('justifyCenter')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="18" y1="10" x2="6" y2="10"></line>
                            <line x1="21" y1="6" x2="3" y2="6"></line>
                            <line x1="21" y1="14" x2="3" y2="14"></line>
                            <line x1="18" y1="18" x2="6" y2="18"></line>
                        </svg>
                        <span>Align Center</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('justifyRight')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="21" y1="10" x2="7" y2="10"></line>
                            <line x1="21" y1="6" x2="3" y2="6"></line>
                            <line x1="21" y1="14" x2="3" y2="14"></line>
                            <line x1="21" y1="18" x2="7" y2="18"></line>
                        </svg>
                        <span>Align Right</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('formatBlock', '<h1>')}
                    >
                        <span style={{ fontWeight: 'bold' }}>H1</span>
                        <span>Heading 1</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('formatBlock', '<h2>')}
                    >
                        <span style={{ fontWeight: 'bold' }}>H2</span>
                        <span>Heading 2</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('insertUnorderedList')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="8" y1="6" x2="21" y2="6"></line>
                            <line x1="8" y1="12" x2="21" y2="12"></line>
                            <line x1="8" y1="18" x2="21" y2="18"></line>
                            <line x1="3" y1="6" x2="3.01" y2="6"></line>
                            <line x1="3" y1="12" x2="3.01" y2="12"></line>
                            <line x1="3" y1="18" x2="3.01" y2="18"></line>
                        </svg>
                        <span>Bullet List</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('insertOrderedList')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="10" y1="6" x2="21" y2="6"></line>
                            <line x1="10" y1="12" x2="21" y2="12"></line>
                            <line x1="10" y1="18" x2="21" y2="18"></line>
                            <path d="M4 6h1v4"></path>
                            <path d="M4 10h2"></path>
                            <path d="M6 18H4c0-1 2-2 2-3s-1-1.5-2-1"></path>
                        </svg>
                        <span>Numbered List</span>
                    </button>

                    <button
                        className={styles.dropdownBtn}
                        onClick={() => onCommand('removeFormat')}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 7V4h16v3"></path>
                            <path d="M5 20h6"></path>
                            <path d="M13 4L8 20"></path>
                            <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                        <span>Clear Formatting</span>
                    </button>
                </div>
            )}
        </div>
    );
};

export default FormattingToolbar;
