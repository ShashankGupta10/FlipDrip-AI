import { useState } from "react";
import sendPrompt from "../../assets/sendPrompt.svg";
import chatHistory from "../../assets/chatHistory.svg";
import axios from "axios";
import "./ChatbotUI.css";

export default function App() {
  return (
    <>
      <ChatbotForm />
    </>
  );
}

const ChatbotForm = () => {
  const [topic, setTopic] = useState("New Chat");
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([{}]);
  const [preferences, setPreferences] = useState("");
  const [bought, setBought] = useState("");

  const handleChange = (e) => {
    setPrompt(e.target.value);
  };

  async function fetchChat(e) {
    e.preventDefault();
    setLoading(true);
    setMessages((prevMessages) => [
      ...prevMessages,
      { origin: "user", message: prompt },
    ]);
    e.target.form[0].value = "";
    axios
      .get("http://localhost:4000/cart")
      .then((resp) => {
        setPreferences(resp.data.data[0]);
        setBought(resp.data.bought[0])
        console.log(preferences)
        console.log(bought)
      })
      .catch((err) => {
        console.log(err);
      });

    await fetch("http://localhost:5000/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        prompt,
        preferences,
        bought
      ])
    })
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setTopic(topic === "New Chat" ? data.topic : "New Chat");
        setMessages((prevMessages) => [
          ...prevMessages,
          { origin: data.image ? "systemimg" : "system", message: data.output },
        ]);
      });
  }
  return (
    <>
      <form className="chatbot-form">
        <div className="response-wrapper">
          {messages.map(({ origin, message }, index) => {
            return origin === "user" ? (
              <p key={index} className="user-message">
                {message}
              </p>
            ) : origin === "system" ? (
              <p key={index} className="system-message">
                {message}
              </p>
            ) : origin === "systemimg" ? (
              <img key={index} className="image-message" src={message} />
            ) : (
              ""
            );
          })}
          {loading ? (
            <div className="loader system-message">
              <span className="loader__dot slide__one"></span>
              <span className="loader__dot"></span>
              <span className="loader__dot"></span>
              <span className="loader__dot slide__two"></span>
            </div>
          ) : (
            ""
          )}
        </div>
        <div className="prompt-input">
          <input
            type="text"
            onChange={handleChange}
            placeholder="Send a message"
          />
          <button type="submit" onClick={fetchChat}>
            <img src={sendPrompt} />
          </button>
        </div>
      </form>

      <nav className="sidebar">
        <div className="chat-topic">
          <img src={chatHistory} />
          <p>{topic}</p>
        </div>
      </nav>
    </>
  );
};

