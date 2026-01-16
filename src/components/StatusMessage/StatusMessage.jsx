import React from 'react';
import styles from './StatusMessage.module.css';

/**
 * StatusMessage Component
 * Displays success or error messages with auto-dismiss
 */
const StatusMessage = ({ message, type = 'success' }) => {
    if (!message) return null;

    return (
        <div className={`${styles.container} ${type === 'error' ? styles.error : styles.success}`}>
            {type === 'error' && '⚠️ '}{message}
        </div>
    );
};

export default StatusMessage;
