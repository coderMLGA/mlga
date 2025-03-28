// Тип для трансляции
export interface Stream {
  id: string;
  title: string;
  streamer: {
    name: string;
    avatar: string;
  };
  thumbnail: string;
  viewers: number;
  tags: string[];
}

// Моковые данные (в реальном приложении замените на API-запросы)
export const mockStreams: Stream[] = [
  {
    id: "1",
    title: "в полутьме пустого коридора",
    streamer: {
      name: "Yaroslav",
      avatar:
        "https://livacha.com/upload/user/avatar/e1/13/user_icon_GFbXr_ZwFLnd772XkKRfBjOdPkrrPjWuGUwvhjUovRcGJg.jpeg",
    },
    thumbnail: "/mlga/yarik.gif",
    viewers: 1250,
    tags: ["KFS", "СплюНаХоду"],
  },
  {
    id: "2",
    title: "Переехали в Сан-Франциско",
    streamer: {
      name: "innavolchitsa",
      avatar:
        "https://livacha.com/upload/user/avatar/4b/45/user_icon_eonNa_QxqAlc807MNL60m2vI2VpBq5xk8bhImwlLEbhK97.jpeg",
    },

    thumbnail:
      "https://livacha.com/upload/chat_room/cover/42/3c/chat_room_Rp2ZK_wqEhTCjo0aEd3pHtmUpPwEDh72UNJiWgYGqd9Oo8.jpeg",
    viewers: 850,
    tags: ["Путешествия", "Баулы", "Комарик"],
  },
  {
    id: "3",
    title: "Котики помогите на мелкие расходы",
    streamer: {
      name: "RadioXoi",
      avatar:
        "https://livacha.com/upload/user/avatar/8b/6a/user_icon_Zbkva_iaGpTe4Mj7dabusgdL1iuSqNFeF1KZ0zoBzRobAT.jpeg",
    },

    thumbnail:
      "https://livacha.com/upload/stream/cover/a8/5a/stream_sDlKl_6bswbhGlUENTsme3FGeyMdOVF9BUryCAeaSjT42r.jpeg",
    viewers: 420,
    tags: ["Ставочки", "ЯНеЗнаюЧтоДелать", "Котики", "Денег нет"],
  },
];

// Имитация API для получения списка трансляций
export const fetchStreams = async (): Promise<Stream[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки сети
  return mockStreams;
};

// Имитация API для получения одной трансляции
export const fetchStreamById = async (
  id: string,
): Promise<Stream | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500)); // Имитация задержки сети
  return mockStreams.find((stream) => stream.id === id);
};
