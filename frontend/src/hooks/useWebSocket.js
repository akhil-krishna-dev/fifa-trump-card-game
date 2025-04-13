import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../App";

const useWebSocket = (path) => {
	const url = import.meta.env.VITE_BACKEND_WS_URL;
	const { opponentType } = useContext(AppContext);

	const webSocketRef = useRef(null);
	useEffect(() => {
		if (opponentType === "user" && !webSocketRef.current) {
			webSocketRef.current = new WebSocket(url + path);
		}

		return () => {
			if (webSocketRef.current && webSocketRef.current.readyState === 1) {
				webSocketRef.current.close();
			}
		};
	}, [opponentType, webSocketRef]);

	return webSocketRef;
};

export default useWebSocket;
