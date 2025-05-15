import React from "react";

const Chat = () => {
  return (
    <div className="flex flex-grow min-h-[calc(100vh-64px)] gap-4 ">

      {/* Sidebar: Student List */}
      <aside className="w-64 bg-zinc-800 p-5 rounded border border-zinc-700">
        <h2 className="text-base mb-4 font-semibold">List of Students</h2>
        <ul className="space-y-2">
          <li className="bg-[#333] p-2 rounded cursor-pointer hover:bg-[#555] hover:border-l-4 hover:border-[#007bff]">
            Student 1
          </li>
          <li className="bg-[#333] p-2 rounded cursor-pointer hover:bg-[#555] hover:border-l-4 hover:border-[#007bff]">
            Student 2
          </li>
          <li className="bg-[#555] p-2 rounded border-l-4 border-[#007bff]">
            Active Student
          </li>
        </ul>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col bg-[#1f1f1f] p-5 rounded border border-zinc-700 shadow">
        {/* Chat Header */}
        <header className="bg-[#333] p-4 rounded text-lg font-medium mb-4">
          Chat Header
        </header>

        {/* Chat Messages */}
        <section className="flex-1 overflow-y-auto bg-[#222] p-4 rounded space-y-3 mb-4">
          {[1, 2].map((msg) => (
            <div
              key={msg}
              className="flex justify-between items-center bg-[#28a745] p-3 rounded"
            >
              <span>Message {msg}</span>
              <div className="flex space-x-2">
                <button className="bg-[#dc3545] hover:bg-[#c82333] text-white text-sm px-3 py-1 rounded">
                  Edit
                </button>
                <button className="bg-[#dc3545] hover:bg-[#c82333] text-white text-sm px-3 py-1 rounded">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* Input Area */}
        <footer className="flex items-center bg-[#333] p-3 rounded space-x-2">
          <input
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-[#444] text-white p-2 rounded border-none outline-none"
          />
          <button className="bg-[#28a745] hover:bg-[#218838] text-white px-4 py-2 rounded">
            Send
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Chat;
