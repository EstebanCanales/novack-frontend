"use client";
import { Input } from "@/components/ui/input";
import { Search, Send, Image, File, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function ChatPage() {
  const users = [
    { name: "Esteban Rios", lastSeen: "07/24 28:53", avatar: "ER" },
    { name: "Matías Muchaluna", lastSeen: "8/68 58/3", avatar: "MM" },
    { name: "Brandon Espadas", lastSeen: "7/25 87:54", avatar: "BE" },
    { name: "Marina Delgado", lastSeen: "10/37 27:57", avatar: "MD" },
    { name: "Santiago Fresa", lastSeen: "2/07 21:44", avatar: "SF" },
    { name: "Gabriela Segura", lastSeen: "36/38 76:6", avatar: "GS" },
  ];

  const messages = [
    { id: 1, text: "Message", isOwn: false },
    { id: 2, text: "Message", isOwn: true },
    { id: 3, text: "Message", isOwn: false },
    { id: 4, text: "Message", isOwn: true },
    { id: 5, text: "Message", isOwn: false },
    { id: 6, text: "Message", isOwn: true },
    { id: 7, text: "Message", isOwn: false },
  ];

  return (
    <main className="h-screen flex bg-black">
      {/* Sidebar - Users List */}
      <section className="w-80 bg-white/5 backdrop-blur-sm border-r border-white/10 p-4 overflow-hidden">
        {/* Search Section */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-white mb-4">Chat</h2>
          <div className="flex items-center gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input 
                placeholder="Search User" 
                className="pl-10 bg-white/5 border-white/10 text-white placeholder:text-gray-400 focus:border-[#07D9D9]"
              />
            </div>
          </div>
        </div>

        {/* Users List */}
        <div className="overflow-y-auto scrollbar-hide h-[calc(100vh-180px)]">
          <div className="space-y-2">
            {users.map((user, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 hover:border-[#07D9D9]/20 transition-all duration-200 cursor-pointer group"
              >
                <Avatar className="h-10 w-10 border border-[#07D9D9]/30">
                  <AvatarFallback className="bg-[#07D9D9] text-[#010440] font-semibold">
                    {user.avatar}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-white font-medium truncate group-hover:text-[#07D9D9] transition-colors">
                      {user.name}
                    </p>
                    <span className="text-xs text-gray-400 ml-2 flex-shrink-0">
                      {user.lastSeen}
                    </span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">
                    Last message preview...
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Chat Area */}
      <section className="flex-1 flex flex-col bg-black overflow-hidden">
        <div className="flex flex-col h-full bg-white/5 backdrop-blur-sm border border-white/10 m-4 rounded-xl">
          {/* Chat Header */}
          <div className="h-16 bg-white/5 border-b border-white/10 flex justify-between items-center px-6 rounded-t-xl">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10 border border-[#07D9D9]/30">
                <AvatarFallback className="bg-[#07D9D9] text-[#010440] font-semibold">
                  ER
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <span className="font-semibold text-lg text-white">
                  Esteban Rios
                </span>
                <span className="text-sm font-medium text-[#07D9D9]">
                  Online
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#07D9D9] hover:bg-white/5">
                <Search className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#07D9D9] hover:bg-white/5">
                <File className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#07D9D9] hover:bg-white/5">
                <Image className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" className="text-gray-400 hover:text-[#07D9D9] hover:bg-white/5">
                <MoreVertical className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-auto p-6 space-y-4 bg-gradient-to-b from-black/50 to-black/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                    message.isOwn
                      ? 'bg-[#07D9D9] text-[#010440] rounded-br-none'
                      : 'bg-white/10 text-white border border-white/20 rounded-bl-none'
                  }`}
                >
                  <p className="text-sm">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isOwn ? 'text-[#010440]/70' : 'text-gray-400'
                  }`}>
                    {message.isOwn ? '10:30 AM' : '10:29 AM'}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-white/10">
            <form
              className="flex gap-2 focus-within:shadow-[0_0_15px_rgba(7,217,217,0.3)] transition-all duration-200 rounded-xl"
              onSubmit={(e) => {
                e.preventDefault();
                console.log("Enviar mensaje");
              }}
            >
              <div className="flex-1">
                <Input
                  className="h-12 rounded-xl border-white/10 bg-white/5 text-white placeholder:text-gray-400 focus:border-[#07D9D9] focus-visible:ring-0 focus-visible:ring-offset-0"
                  placeholder="Send a message"
                />
              </div>
              <Button 
                type="submit" 
                className="h-12 px-4 rounded-xl bg-[#07D9D9] hover:bg-[#0596A6] text-[#010440] font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-[#07D9D9]/30"
              >
                <Send size={20} />
              </Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}