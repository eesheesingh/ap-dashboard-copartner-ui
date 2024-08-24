import React, { useState } from 'react';

const SendMessage = ({ onClose, onSend, selectedUsers, token }) => {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const sendMessage = () => {
    if (message.trim() && selectedUsers.length > 0 && !isSending) {
      setIsSending(true);  // Prevent further clicks immediately

      const payload = {
        message: message.trim(),
        selected_users: selectedUsers,
        token: token,
      };

      fetch('https://apbot.copartner.in/api/sendmessagetousers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Message sent successfully:', data);
          onSend(message);
          onClose();
        })
        .catch(error => {
          console.error('Failed to send message:', error);
        })
        .finally(() => {
          setIsSending(false);  // Re-enable the button after API response
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#2E374B] p-8 rounded-lg shadow-xl md:w-96 w-80">
        <div className="flex justify-between items-start mb-6">
          <h2 className="text-2xl font-semibold text-white">Send Message</h2>
          <button onClick={onClose} className="text-white text-xl">&times;</button>
        </div>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full p-3 border border-gray-600 rounded-lg mb-6 bg-[#3B475F] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#fff] transition"
          rows={5}
          placeholder="Write your message here..."
        />
        <div className="flex justify-end space-x-4">
          <button
            onClick={sendMessage}
            className="px-4 py-2 bg-[#fff] text-[#000] hover:text-[#fff] rounded-lg hover:bg-[#000] transition-all"
            disabled={isSending}
          >
            {isSending ? 'Sending...' : 'Send'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
