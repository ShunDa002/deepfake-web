import { ChatSession, Message } from "./types";

export const mockMessages: Message[] = [
  {
    id: "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    content:
      "Hello! I need help analyzing an image for potential deepfake detection.",
    sender: "user",
    timestamp: new Date("2024-12-13T10:00:00"),
  },
  {
    id: "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    content:
      "Of course! I'd be happy to help you analyze an image for deepfake detection. Please upload the image you'd like me to examine, and I'll use advanced detection algorithms to identify any signs of manipulation or AI-generated content.",
    sender: "app",
    timestamp: new Date("2024-12-13T10:00:15"),
  },
  {
    id: "c3d4e5f6-a7b8-9012-cdef-123456789012",
    content: "What kind of manipulation can you detect?",
    sender: "user",
    timestamp: new Date("2024-12-13T10:01:00"),
  },
  {
    id: "d4e5f6a7-b8c9-0123-def0-234567890123",
    content:
      "I can detect several types of manipulations including:\n\n• Face swaps and morphing\n• AI-generated faces (GAN-based)\n• Lip-sync manipulations\n• Expression transfers\n• Background alterations\n\nMy analysis looks at pixel-level inconsistencies, lighting anomalies, and other artifacts that often indicate digital manipulation.",
    sender: "app",
    timestamp: new Date("2024-12-13T10:01:30"),
  },
];

export const mockChatSessions: ChatSession[] = [
  {
    id: "8eef52b4-36e8-4a7a-8382-dc36e1818ee5",
    title: "Deepfake Detection Help",
    messages: mockMessages,
    createdAt: new Date("2024-12-13T10:00:00"),
    updatedAt: new Date("2024-12-13T10:01:30"),
  },
  {
    id: "f5c23a81-7b62-4d98-a1c4-e8f92b3d6a45",
    title: "Image Analysis Query",
    messages: [
      {
        id: "e5f6a7b8-c9d0-1234-ef01-345678901234",
        content: "Can you explain how your detection algorithm works?",
        sender: "user",
        timestamp: new Date("2024-12-12T14:00:00"),
      },
      {
        id: "f6a7b8c9-d0e1-2345-f012-456789012345",
        content:
          "Our detection system uses a multi-layered approach combining convolutional neural networks (CNNs) with attention mechanisms to identify manipulated regions in images and videos.",
        sender: "app",
        timestamp: new Date("2024-12-12T14:00:30"),
      },
    ],
    createdAt: new Date("2024-12-12T14:00:00"),
    updatedAt: new Date("2024-12-12T14:00:30"),
  },
  {
    id: "2a9c4b7e-1d38-4f56-b2e7-c9a8d5f4e3b2",
    title: "Video Verification",
    messages: [
      {
        id: "a7b8c9d0-e1f2-3456-0123-567890123456",
        content: "Is it possible to verify if a video is authentic?",
        sender: "user",
        timestamp: new Date("2024-12-11T09:30:00"),
      },
      {
        id: "b8c9d0e1-f2a3-4567-1234-678901234567",
        content:
          "Yes! Video verification involves frame-by-frame analysis to detect temporal inconsistencies, unnatural movements, and audio-visual mismatches that are common in manipulated videos.",
        sender: "app",
        timestamp: new Date("2024-12-11T09:31:00"),
      },
    ],
    createdAt: new Date("2024-12-11T09:30:00"),
    updatedAt: new Date("2024-12-11T09:31:00"),
  },
];

export const mockChatHistory = {
  sessions: mockChatSessions,
};
