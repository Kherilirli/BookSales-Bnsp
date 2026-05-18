import { useEffect, useRef, useState } from "react";
import {
    createConversation,
    getMessages,
    sendMessage,
} from "../../../_services/message";

export default function ContactAdmin() {
    const [conversation, setConversation] = useState(null);

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const messagesEndRef = useRef(null);

    const firstLoadRef = useRef(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // SCROLL KE BAWAH
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // AUTO SCROLL HANYA SAAT LOAD PERTAMA
    useEffect(() => {
        if (messages.length > 0 && firstLoadRef.current) {
            scrollToBottom();

            firstLoadRef.current = false;
        }
    }, [messages]);

    // LOAD CHAT PERTAMA
    useEffect(() => {
        const initChat = async () => {
            try {
                const conversationData = await createConversation();

                setConversation(conversationData);

                const messageData = await getMessages(conversationData.id);

                setMessages(messageData);

                // AUTO SCROLL HANYA SEKALI SAAT LOAD
                setTimeout(() => {
                    scrollToBottom();
                }, 100);
            } catch (error) {
                console.log(error);
            }
        };

        initChat();
    }, []);

    // AUTO REFRESH CHAT
    useEffect(() => {
        if (!conversation) return;

        const interval = setInterval(async () => {
            try {
                const messageData = await getMessages(conversation.id);

                setMessages(messageData);
            } catch (error) {
                console.log(error);
            }
        }, 3000);

        return () => clearInterval(interval);
    }, [conversation]);

    // SEND MESSAGE
    const handleSend = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        try {
            setLoading(true);

            await sendMessage({
                conversation_id: conversation.id,
                message,
            });

            const updatedMessages = await getMessages(conversation.id);

            setMessages(updatedMessages);

            setMessage("");

            // AUTO SCROLL HANYA SAAT KIRIM PESAN
            setTimeout(() => {
                scrollToBottom();
            }, 100);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <section className="min-h-screen py-10 bg-gradient-to-br from-orange-50 via-white to-yellow-50">
            <div className="max-w-5xl px-6 mx-auto">
                {/* HEADER */}
                <div className="mb-10 text-center">
                    <h1 className="text-4xl font-extrabold text-gray-900">
                        Live Chat
                        <span className="text-orange-500"> Support</span>
                    </h1>

                    <p className="mt-4 text-gray-600">
                        Hubungi admin secara langsung jika mengalami kendala
                        atau membutuhkan bantuan.
                    </p>
                </div>

                <div className="overflow-hidden bg-white border border-orange-100 shadow-xl rounded-3xl">
                    {/* TOP BAR */}
                    <div className="flex items-center gap-4 px-6 py-5 border-b border-orange-100 bg-orange-50">
                        <div className="flex items-center justify-center w-14 h-14 text-xl font-bold text-white bg-orange-500 rounded-full">
                            A
                        </div>

                        <div>
                            <h2 className="text-lg font-bold text-gray-800">
                                Admin BookSales
                            </h2>

                            <p className="text-sm text-green-500">Online</p>
                        </div>
                    </div>

                    {/* CHAT AREA */}
                    <div className="h-[500px] overflow-y-auto p-6 space-y-5 bg-orange-50/30">
                        {messages.length > 0 ? (
                            messages.map((item) => {
                                const isMine = item.sender_id === userInfo?.id;

                                return (
                                    <div
                                        key={item.id}
                                        className={`flex ${
                                            isMine
                                                ? "justify-end"
                                                : "justify-start"
                                        }`}
                                    >
                                        <div
                                            className={`max-w-[75%] px-5 py-4 rounded-3xl shadow-sm ${
                                                isMine
                                                    ? "bg-orange-500 text-white rounded-br-md"
                                                    : "bg-white text-gray-800 border border-orange-100 rounded-bl-md"
                                            }`}
                                        >
                                            <p className="text-sm">
                                                {item.message}
                                            </p>

                                            <p
                                                className={`mt-2 text-xs ${
                                                    isMine
                                                        ? "text-orange-100"
                                                        : "text-gray-400"
                                                }`}
                                            >
                                                {new Date(
                                                    item.created_at,
                                                ).toLocaleTimeString([], {
                                                    hour: "2-digit",
                                                    minute: "2-digit",
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="flex items-center justify-center h-full">
                                <p className="text-gray-400">Belum ada pesan</p>
                            </div>
                        )}

                        <div ref={messagesEndRef}></div>
                    </div>

                    {/* INPUT */}
                    <form
                        onSubmit={handleSend}
                        className="flex items-center gap-4 p-5 border-t border-orange-100 bg-white"
                    >
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Tulis pesan..."
                            className="flex-1 px-5 py-4 border border-orange-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-orange-300"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center gap-2 px-6 py-4 font-semibold text-white transition bg-orange-500 rounded-2xl hover:bg-orange-600 disabled:bg-gray-400"
                        >
                            <iconify-icon
                                icon="mdi:send"
                                width="20"
                            ></iconify-icon>

                            {loading ? "Sending..." : "Send"}
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
