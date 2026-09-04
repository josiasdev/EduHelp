export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  avatar_url?: string;
  university?: string;
  semester?: string;
  course?: string;
  created_at: string;
}

export interface Discipline {
  id: string;
  name: string;
  description?: string;
  image_url?: string;
  created_at: string;
}

export interface Question {
  id: string;
  user_id: string;
  discipline_id: string;
  content: string;
  privacy: "public" | "private";
  created_at: string;
  user?: User;
  discipline?: Discipline;
  answers_count?: number;
}

export interface Answer {
  id: string;
  question_id: string;
  user_id: string;
  content: string;
  pdf_url?: string;
  is_best: boolean;
  likes_count: number;
  created_at: string;
  user?: User;
  question?: Question;
}

export interface Friend {
  id: string;
  user_id: string;
  friend_id: string;
  status: "pending" | "accepted";
  created_at: string;
  user?: User;
  friend?: User;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  read: boolean;
  created_at: string;
  sender?: User;
  receiver?: User;
}

export interface Notification {
  id: string;
  user_id: string;
  type: "answer" | "friend_request" | "friend_accept" | "message" | "like" | "favorite";
  reference_id: string;
  read: boolean;
  created_at: string;
  user?: User;
}
