export interface INotificationQuery {
  page?: number;
  limit?: number;
  isRead?: "true" | "false";
}

export interface INotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
}