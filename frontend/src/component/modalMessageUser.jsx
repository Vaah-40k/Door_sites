import { useState } from "react";

const ModalMessageUser = () => {
  const token = localStorage.getItem("accessToken");
  const [messages, setMessages] = useState([]); // ← массив сообщений
  const [inputMessage, setInputMessage] = useState(""); // ← текст в инпуте
  const [activeModal, setActiveModal] = useState(true);

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
        },
      );
      const result = await response.json();
      if (result.success) {
        setInputMessage(""); // ← очищаем поле ввода
        await showMessageAll(); // ← обновляем список
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
        },
      );
      const result = await response.json();
      const data = result.allMessage || [];
      setMessages(data); // ← обновляем массив сообщений
    } catch (error) {
      console.error("Ошибка загрузки:", error);
    }
  };

  const toggleModal = () => setActiveModal((prev) => !prev);

  return (
    <div className="Modal">
      <div
        onClick={toggleModal}
        className={`circleModal ${activeModal ? "active" : "noActive"}`}
      >
        <p onClick={showMessageAll}>Крутая кнопка</p>
      </div>

      <div className={`ModalMessage ${activeModal ? "noActive" : "active"}`}>
        <div className="showMessageAll">
          {messages.length === 0 ? (
            <p>Сообщений нет</p>
          ) : (
            messages.map((item) => <p key={item.ID_message}>{item.message}</p>)
          )}
        </div>

        <div className="writeMessage">
          <button type="button" onClick={toggleModal}>
            x
          </button>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage(inputMessage);
            }}
          >
            <input
              type="text"
              placeholder="Введите сообщение"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
            />
            <button type="submit">→</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ModalMessageUser;
