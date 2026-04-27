"use client";

import { useState, useRef, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

const API_KEY = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

const systemInstruction = `
You are "Arvindu AI", the official AI counselor for Arvindu Classes.
Your goal is to help students and parents with information about the institute.

About Arvindu Classes:
- Location: 2nd Floor, Nasib Market, Ashiana - Digha Rd, Ashiana, Ram Nagari, More, Patna, Bihar 800025.
- Contact: +91 80516 96333, Email: info@arvinduclasses.in
- Courses Offered:
  1. Foundation Program (Class 6–8): Focus on strong basics. Fee: ₹25,000.
  2. Science Program (Class 9–10): Preparation for boards and competitive exams. Fee: ₹35,000.
  3. Commerce Program (Class 11–12): Complete guidance for commerce students. Fee: ₹40,000.
  4. PCB Program (Class 11–12): Specialized for Medical aspirants (Physics, Chemistry, Biology). Fee: ₹45,000.
  5. Applied Mathematics (Class 9–12): Strong numerical and analytical focus. Fee: ₹20,000.
  6. B.Com Academic Support: University exam guidance for commerce students. Fee: ₹45,000.
- Key Features: Regular tests, personalized attention, offline & online modes, and Skill-based Scholarships.
- Language: You can chat in English, Hindi, or Hinglish (Hindi written in English script).
- Tone: Professional, helpful, and encouraging.

Instructions:
1. Be concise but informative.
2. If someone asks for admission, tell them to visit the center or call the provided number.
3. If they ask about fees, provide the specific amount mentioned above.
4. Always encourage them to "Visit our center in Patna" for a demo class.
5. If you don't know something, tell them to contact the office at +91 80516 96333.
`;

export default function AIChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLarge, setIsLarge] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const chatEndRef = useRef<HTMLDivElement>(null);
  
  // Fetch blogs from Convex
  const blogs = useQuery(api.posts.getAll);

  // Load history from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem("arvindu_chat_history");
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        setMessages([{ role: "model", text: "Hello! I am Arvindu AI. How can I help you today?" }]);
      }
    } else {
      setMessages([{ role: "model", text: "Hello! I am Arvindu AI. How can I help you today?" }]);
    }
  }, []);

  // Save history to sessionStorage whenever messages change
  useEffect(() => {
    if (messages.length > 0) {
      sessionStorage.setItem("arvindu_chat_history", JSON.stringify(messages));
    }
  }, [messages]);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      if (!API_KEY) {
        throw new Error("Gemini API Key is missing. Please add NEXT_PUBLIC_GEMINI_API_KEY to your environment variables.");
      }

      // Create a context of available blogs to help the AI suggest links
      const blogContext = blogs 
        ? "\n\nAvailable Blog Posts (Suggest these links if relevant to the user's question):\n" + 
          blogs.map(b => `- ${b.title}: /blog/${b.slug}`).join("\n")
        : "";

      const currentSystemInstruction = systemInstruction + blogContext;

      // Filter out the first model message and map to Gemini format
      const history = messages
        .slice(1)
        .map((m) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.text }],
        }));

      // Combine system instruction with the first message or use it as a preamble
      const contents = [
        {
          role: "user",
          parts: [{ text: "SYSTEM INSTRUCTION: " + currentSystemInstruction + "\n\nUser: " + input }],
        },
      ];

      // If we have history, we add it before the current input
      // But for the very first message, we just send the one above.
      // For simplicity and to avoid role errors, let's just send the whole history if it exists.
      
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${API_KEY}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: history.length > 0 ? [...history, { role: "user", parts: [{ text: input }] }] : contents,
            generationConfig: {
              temperature: 0.7,
              maxOutputTokens: 800,
            },
          }),
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Gemini API Error Detail:", errorData);
        throw new Error(errorData.error?.message || "API Error");
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't get a response. Please try again.";

      setMessages((prev) => [...prev, { role: "model", text }]);
    } catch (error: any) {
      console.error("ChatBot Detailed Error:", error.message || error);
      setMessages((prev) => [
        ...prev,
        { role: "model", text: "I'm sorry, I encountered an error. Please ensure the API key is configured or call us at +91 80516 96333." },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed-chatbot-container" style={{ zIndex: 999999 }}>
      {/* Floating Bubble */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="chatbot-bubble shadow-lg"
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "50%",
          backgroundColor: "#01228D",
          color: "white",
          border: "none",
          position: "fixed",
          bottom: "30px",
          right: "30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "24px",
          cursor: "pointer",
          transition: "transform 0.3s ease",
          zIndex: 999999,
        }}
      >
        {isOpen ? <i className="fas fa-times"></i> : <i className="fas fa-comment-dots"></i>}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div 
          className={`chat-window shadow-2xl rounded-2xl flex flex-col transition-all duration-300 ${isLarge ? 'is-large' : ''}`}
          style={{
            position: "fixed",
            bottom: "100px",
            right: "30px",
            width: isLarge ? "450px" : "350px",
            height: isLarge ? "650px" : "500px",
            maxWidth: "90vw",
            maxHeight: "80vh",
            backgroundColor: "white",
            border: "1px solid #eee",
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            zIndex: 999999,
          }}
        >
          {/* Header */}
          <div className="chat-header p-3 flex items-center justify-between" style={{ backgroundColor: "#01228D", color: "white" }}>
            <div className="flex items-center">
              <div className="avatar mr-3">
                 <div className="rounded-circle bg-white text-dark flex items-center justify-center" style={{ width: "35px", height: "35px" }}>
                    <i className="fas fa-user-graduate" style={{ color: "#01228D" }}></i>
                 </div>
              </div>
              <div>
                <h6 className="m-0 font-bold text-sm">Arvindu AI</h6>
                <small className="opacity-75" style={{ fontSize: '10px' }}>Online | Counselor</small>
              </div>
            </div>
            <div className="flex items-center gap-1">
              {/* Minimize to bubble */}
              <button 
                onClick={() => setIsOpen(false)}
                className="bg-transparent border-0 text-white opacity-70 hover:opacity-100 p-1 transition-opacity"
                title="Minimize"
              >
                <i className="fas fa-minus"></i>
              </button>
              {/* Maximize / Restore */}
              <button 
                onClick={() => setIsLarge(!isLarge)}
                className="bg-transparent border-0 text-white opacity-70 hover:opacity-100 p-1 transition-opacity"
                title={isLarge ? "Restore" : "Maximize"}
              >
                <i className={`fas ${isLarge ? 'fa-compress-alt' : 'fa-expand-alt'}`}></i>
              </button>
              {/* Close (same as minimize for now, but standard UI) */}
              <button 
                onClick={() => {
                  setIsOpen(false);
                  setIsLarge(false);
                }}
                className="bg-transparent border-0 text-white opacity-70 hover:opacity-100 p-1 transition-opacity"
                title="Close"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto bg-light chatbot-messages-area">
            {messages.map((m, i) => (
              <div key={i} className={`mb-3 flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div 
                  className={`p-3 rounded-lg max-w-[85%] text-sm ${
                    m.role === "user" 
                    ? "bg-[#01228D] text-white rounded-br-none" 
                    : "bg-white text-dark shadow-sm rounded-bl-none"
                  }`}
                >
                  {m.role === "model" ? (
                    <div className="markdown-content">
                      <ReactMarkdown>{m.text}</ReactMarkdown>
                    </div>
                  ) : (
                    m.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="text-muted text-xs italic mb-2 px-2">Arvindu AI is typing...</div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          <form onSubmit={handleSendMessage} className="p-3 border-t bg-white flex items-center gap-2">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask anything..."
              className="flex-1 p-3 border rounded-full text-sm outline-none focus:border-[#01228D] bg-light"
            />
            <button 
              type="submit" 
              disabled={isLoading}
              className="rounded-full flex items-center justify-center"
              style={{ 
                width: "35px", 
                height: "35px", 
                backgroundColor: "#01228D", 
                color: "white",
                border: "none"
              }}
            >
              <i className="fas fa-paper-plane text-xs"></i>
            </button>
          </form>
        </div>
      )}
      <style jsx>{`
        .markdown-content :global(p) { margin-bottom: 8px; }
        .markdown-content :global(p:last-child) { margin-bottom: 0; }
        .markdown-content :global(ul), .markdown-content :global(ol) { 
          padding-left: 15px; 
          margin-bottom: 8px; 
        }
        .markdown-content :global(li) { margin-bottom: 4px; }
        .markdown-content :global(strong) { font-weight: 700; }
      `}</style>
    </div>
  );
}
