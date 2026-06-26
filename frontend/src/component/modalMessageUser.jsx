import { useState, useEffect, useRef } from "react";

const ModalMessageUser = () => {
  const token = localStorage.getItem("accessToken");
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      showMessageAll();
    }
  }, [isOpen]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const sendMessage = async (msg) => {
    if (!msg.trim()) return;
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/send-message-user-to-administrator`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ textUser: msg }),
        }
      );
      const result = await response.json();
      if (result.success) {
        setInputMessage("");
        await showMessageAll();
      }
    } catch (error) {
      console.error("Ошибка отправки:", error);
    }
  };

  const showMessageAll = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BASE_URL_BACKEND}/show-all-message-user`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      const data = result.allMessage || [];
      setMessages(data);
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const toggleModal = () => setIsOpen((prev) => !prev);

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(inputMessage);
  };

  return (
    <>
      {/* Кнопка-триггер */}
      {isOpen ? (<button className="chat-trigger " onClick={toggleModal} aria-label="Открыть чат">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
        </svg>
        {messages.length > 0 && (
          <span className="chat-badge">{messages.length}</span>
        )}
      </button>):( <div className="chat-widget">
          <div className="chat-modal">
            <div className="chat-header">
              <h3>Сообщения</h3>
              <button className="chat-close" onClick={toggleModal}>
                ✕
              </button>
            </div>

            <div className="chat-messages">
              {messages.length === 0 ? (
                <div className="chat-empty">
                  <p>Нет сообщений</p>
                  <span>Напишите что-нибудь</span>
                </div>
              ) : (
                messages.map((item) => (
                  <div key={item.ID_message} className="chat-message">
                    <div className="message-bubble">
                      <p>{item.message}</p>
                    </div>
                    {item.createdAt && (
                      <span className="message-time">
                        {new Date(item.createdAt).toLocaleTimeString("ru-RU", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    )}
                  </div>
                ))
              )}
              <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Введите сообщение..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="chat-input"
              />
              <button type="submit" className="chat-send-btn">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </form>
          </div>
        </div>)}
      

      {/* Модальное окно (всплывает справа) */}
    </>
  );
};

export default ModalMessageUser;