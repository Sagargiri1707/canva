import React from 'react';
import styles from './ImagePicker.module.css';

/**
 * ImagePicker Component
 * Modal for selecting replacement images from asset library
 */
const ImagePicker = ({ assets, onSelect, onClose }) => {
    if (!assets || assets.length === 0) return null;

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.header}>
                    <h3>Replace Image</h3>
                    <button
                        className={styles.closeBtn}
                        onClick={onClose}
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <div className={styles.body}>
                    <div className={styles.grid}>
                        {assets.map((assetUrl, index) => (
                            <div
                                key={`${assetUrl}-${index}`}
                                className={styles.option}
                                onClick={() => onSelect(assetUrl)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => {
                                    if (e.key === 'Enter' || e.key === ' ') {
                                        e.preventDefault();
                                        onSelect(assetUrl);
                                    }
                                }}
                            >
                                <img
                                    src={assetUrl}
                                    alt={`Asset ${index + 1}`}
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ImagePicker;
