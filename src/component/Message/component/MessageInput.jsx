
import React, { useState } from 'react';
import styles from '../styles/MessageInput.module.css';

const MessageInput = ({ onSend }) => {
  const [message, setMessage] = useState('');

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      onSend(message);
      setMessage('');
    }
  };

  const handleClick = () => {
    onSend(message);
    setMessage('');
  };

  return (
    <div className={styles['message-input-area']}>
      <div className={styles['message-input-container']}>
        <textarea
          className={styles['message-input']}
          placeholder="Mensaje"
          rows="1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyPress}
        />
        <button className={styles['send-btn']} onClick={handleClick}>
          Enviar
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
