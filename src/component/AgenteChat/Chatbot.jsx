// @ts-nocheck
import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./style/Chatbot.module.css";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      from: "bot",
      text: "¡Hola! Soy el asistente virtual de Acadelica. ¿En qué puedo ayudarte hoy?",
    },
  ]);
  const [input, setInput] = useState("");
  const [alumno, setAlumno] = useState(null);
  const chatEndRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const correo = localStorage.getItem("correoAlumno");
    if (!correo) {
      navigate("/login");
      return;
    }

    const fetchAlumno = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/alumno/obtenerCorreo?correo=${encodeURIComponent(correo)}`
        );
        setAlumno(res.data);
      } catch (error) {
        console.error("Error al obtener alumno", error);
        localStorage.removeItem("correoAlumno");
        navigate("/login");
      }
    };

    fetchAlumno();
  }, [navigate]);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const toggleChatbot = () => setIsOpen(!isOpen);

  const sendMessage = async () => {
    if (!input.trim() || !alumno) return;

    const userMessage = { from: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    const currentInput = input;
    setInput("");

    try {
      const response = await axios.post("http://localhost:8080/api/chat/webhook", {
        message: currentInput,
        alumnoId: alumno.id,
      });

      setMessages((prev) => [...prev, { from: "bot", text: response.data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "Error al conectar con el servidor." },
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") sendMessage();
  };

  return (
    <div className={styles["chatbot-container"]}>
      <button className={styles["chatbot-toggle"]} onClick={toggleChatbot}>
        💬
      </button>
      {isOpen && (
        <div className={styles["chatbot-window"]}>
          <div className={styles["chatbot-header"]}>
            <div>
              <strong>Acadelica Assistant</strong>
              <div style={{ fontSize: "0.8rem", opacity: 0.8 }}>
                {alumno ? `Hola, ${alumno.nombre}` : "Cargando..."}
              </div>
            </div>
            <button className={styles["chatbot-close"]} onClick={toggleChatbot}>
              ×
            </button>
          </div>
          <div className={styles["chatbot-body"]}>
            <div className={styles["chatbot-messages"]}>
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`${styles["message"]} ${styles[msg.from]}`}
                >
                  {msg.text}
                </div>
              ))}
              <div ref={chatEndRef} />
            </div>
          </div>
          <div className={styles["chatbot-input-container"]}>
            <input
              type="text"
              className={styles["chatbot-input"]}
              placeholder="Escribe tu mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
            />
            <button className={styles["chatbot-send"]} onClick={sendMessage}>
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbot;
