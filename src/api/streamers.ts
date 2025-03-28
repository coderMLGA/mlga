import { mockStreams, type Stream } from "./streams";

// Тип для стримера
export interface Streamer {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  followers: number;
  totalViews: number;
}

// Моковые данные стримеров
const mockStreamers: Streamer[] = [
  {
    id: "1",
    name: mockStreams[0].streamer.name,
    avatar: mockStreams[0].streamer.avatar,
    bio: "Профессиональный стример",
    followers: 12500,
    totalViews: 1200000,
  },
  {
    id: "2",
    name: mockStreams[1].streamer.name,
    avatar: mockStreams[1].streamer.avatar,
    bio: "Стример-путешественник",
    followers: 8500,
    totalViews: 800000,
  },
  {
    id: "3",
    name: mockStreams[2].streamer.name,
    avatar: mockStreams[2].streamer.avatar,
    bio: "Общаюсь с подписчиками",
    followers: 4200,
    totalViews: 500000,
  },
];

// Имитация API для получения списка стримеров
export const fetchStreamers = async (): Promise<Streamer[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStreamers;
};

// Имитация API для получения стримера по ID
export const fetchStreamerById = async (
  id: string,
): Promise<Streamer | undefined> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  return mockStreamers.find((streamer) => streamer.id === id);
};

// Имитация API для получения стримов стримера
export const fetchStreamerStreams = async (id: string): Promise<Stream[]> => {
  await new Promise((resolve) => setTimeout(resolve, 500));
  const streamer = mockStreamers.find((s) => s.id === id);
  if (!streamer) return [];

  const matchedStream = mockStreams.find((s) => s.id === id);
  const thumbnail = matchedStream?.thumbnail || "";

  return [
    {
      id: "1",
      title: streamer.name,
      streamer: {
        name: streamer.name,
        avatar: streamer.avatar,
      },
      thumbnail,
      viewers: 1250,
      tags: ["FPS", "Competitive"],
    },
  ];
};
