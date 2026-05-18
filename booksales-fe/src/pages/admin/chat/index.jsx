import { useEffect, useRef, useState } from "react";
import {
    getConversations,
    getAdminMessages,
    sendAdminMessage,
} from "../../../_services/message";

export default function AdminChats() {
    const [conversations, setConversations] = useState([]);

    const [selectedConversation, setSelectedConversation] = useState(null);

    const [messages, setMessages] = useState([]);

    const [message, setMessage] = useState("");

    const [loading, setLoading] = useState(false);

    const [search, setSearch] = useState("");

    const messagesEndRef = useRef(null);

    const firstLoadRef = useRef(true);

    const userInfo = JSON.parse(localStorage.getItem("userInfo"));

    // SCROLL KE BAWAH
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    };

    // LOAD CONVERSATIONS
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const data = await getConversations();

                setConversations(data);

                if (data.length > 0) {
                    setSelectedConversation(data[0]);
                }
            } catch (error) {
                console.log(error);
            }
        };

        fetchConversations();
    }, []);

    // LOAD MESSAGES
    useEffect(() => {
        if (!selectedConversation) return;

        firstLoadRef.current = true;

        const fetchMessages = async () => {
            try {
                const data = await getAdminMessages(
                    selectedConversation.id,
                );

                setMessages(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchMessages();

        const interval = setInterval(fetchMessages, 3000);

        return () => clearInterval(interval);
    }, [selectedConversation]);

    // AUTO SCROLL HANYA PERTAMA LOAD
    useEffect(() => {
        if (messages.length > 0 && firstLoadRef.current) {
            scrollToBottom();

            firstLoadRef.current = false;
        }
    }, [messages]);

    // SEND MESSAGE
    const handleSend = async (e) => {
        e.preventDefault();

        if (!message.trim()) return;

        try {
            setLoading(true);

            await sendAdminMessage({
                conversation_id: selectedConversation.id,
                message,
            });

            const updatedMessages = await getAdminMessages(
                selectedConversation.id,
            );

            setMessages(updatedMessages);

            setMessage("");

            scrollToBottom();
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    // SEARCH
    const filteredConversations = conversations.filter((conversation) =>
        conversation.user?.name
            ?.toLowerCase()
            .includes(search.toLowerCase()),
    );

    return (
        <section className="max-w-7xl mx-auto">
            {/* HEADER */}
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-gray-800">
                    Live Chat Support
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Balas pesan customer secara realtime.
                </p>
            </div>

            {/* CHAT CONTAINER */}
            <div className="grid h-[70vh] overflow-hidden bg-white border border-orange-100 shadow-sm lg:grid-cols-12 rounded-3xl">
                {/* SIDEBAR */}
                <div className="flex flex-col border-r border-orange-100 lg:col-span-4">
                    {/* SEARCH */}
                    <div className="p-5 border-b border-orange-100">
                        <input
                            type="text"
                            placeholder="Search customer..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full px-4 py-3 text-sm border border-orange-200 rounded-2xl outline-none focus:ring-2 focus:ring-orange-300"
                        />
                    </div>

                    {/* CONVERSATION LIST */}
                    <div className="flex-1 overflow-y-auto">
                        {filteredConversations.length > 0 ? (
                            filteredConversations.map((conversation) => (
                                <button
                                    key={conversation.id}
                                    onClick={() =>
                                        setSelectedConversation(conversation)
                                    }
                                    className={`w-full text-left px-5 py-4 border-b border-orange-100 transition ${
                                        selectedConversation?.id ===
                                        conversation.id
                                            ? "bg-orange-50"
                                            : "hover:bg-orange-50/50"
                                    }`}
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="flex items-center justify-center w-12 h-12 text-lg font-bold text-white bg-orange-500 rounded-full">
                                            {conversation.user?.name?.charAt(0)}
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-800">
                                                {conversation.user?.name}
                                            </h3>

                                            <p className="text-sm text-gray-500">
                                                {conversation.user?.email}
                                            </p>
                                        </div>
                                    </div>
                                </button>
                            ))
                        ) : (
                            <div className="p-10 text-center text-gray-400">
                                No conversations found.
                            </div>
                        )}
                    </div>
                </div>

                {/* CHAT AREA */}
                <div className="flex flex-col overflow-hidden lg:col-span-8">
                    {selectedConversation ? (
                        <>
                            {/* TOP BAR */}
                            <div className="flex items-center gap-4 px-6 py-5 border-b border-orange-100 bg-orange-50">
                                <div className="flex items-center justify-center w-14 h-14 text-xl font-bold text-white bg-orange-500 rounded-full">
                                    {selectedConversation.user?.name?.charAt(
                                        0,
                                    )}
                                </div>

                                <div>
                                    <h2 className="text-lg font-bold text-gray-800">
                                        {selectedConversation.user?.name}
                                    </h2>

                                    <p className="text-sm text-green-500">
                                        Customer
                                    </p>
                                </div>
                            </div>

                            {/* MESSAGES */}
                            <div className="flex-1 overflow-y-auto p-6 space-y-5 bg-orange-50/30">
                                {messages.length > 0 ? (
                                    messages.map((item) => {
                                        const isMine =
                                            item.sender_id === userInfo?.id;

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
                                                        ).toLocaleTimeString(
                                                            [],
                                                            {
                                                                hour: "2-digit",
                                                                minute: "2-digit",
                                                            },
                                                        )}
                                                    </p>
                                                </div>
                                            </div>
                                        );
                                    })
                                ) : (
                                    <div className="flex items-center justify-center h-full text-gray-400">
                                        No messages yet.
                                    </div>
                                )}

                                <div ref={messagesEndRef}></div>
                            </div>

                            {/* INPUT */}
                            <form
                                onSubmit={handleSend}
                                className="flex items-center gap-4 border-t border-orange-100 bg-white p-5"
                            >
                                <input
                                    type="text"
                                    value={message}
                                    onChange={(e) =>
                                        setMessage(e.target.value)
                                    }
                                    placeholder="Type message..."
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
                        </>
                    ) : (
                        <div className="flex items-center justify-center flex-1 text-gray-400">
                            Select conversation
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}