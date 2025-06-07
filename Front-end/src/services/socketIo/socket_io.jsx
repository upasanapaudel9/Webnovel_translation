import io from "socket.io-client";

const initializeSocket = () => {
    const socket = io.connect("http://localhost:5000");
    return socket;
};

export { initializeSocket };