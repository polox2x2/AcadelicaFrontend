import axios from 'axios';

const sendMessageToN8N = async (message) => {
  try {
    const response = await axios.post('http://localhost:5678/webhook/0270ed51-2582-4f9c-a7f0-3911674e341f/chat', { text: message });
    return response.data;
  } catch (error) {
    console.error('Error al enviar el mensaje:', error);
  }
};