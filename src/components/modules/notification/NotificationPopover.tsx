"use client";

import { useState } from "react";
import {
  useGetMyNotifications,
  useGetUnreadNotificationCount,
  useMarkNotificationAsRead,
  useMarkAllNotificationsRead,
  useDeleteNotification,
} from "@/hooks/use-notification";
import { Bell, CheckCheck, Trash2, Check, X } from "lucide-react";
import { toast } from "sonner";

export function NotificationPopover() {
  const [isOpen, setIsOpen] = useState(false);
  const { data: unreadCount = 0 } = useGetUnreadNotificationCount();
  const { data: notificationsData, isLoading } = useGetMyNotifications({ limit: 15 });
  
  const markSingleRead = useMarkNotificationAsRead();
  const markAllRead = useMarkAllNotificationsRead();
  const deleteNotification = useDeleteNotification();

  const notifications = notificationsData?.data || [];

  const handleMarkSingleRead = (id: string, isRead: boolean) => {
    if (isRead) return;
    markSingleRead.mutate(id);
  };

  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    deleteNotification.mutate(id, {
      onSuccess: () => toast.success("Notification deleted."),
    });
  };

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative rounded-xl border border-white/10 bg-white/5 p-2.5 text-zinc-300 hover:bg-white/10"
      >
        <Bell className="h-4 w-4" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] font-bold text-white shadow-lg shadow-red-600/50">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#0a0d14] p-4 shadow-2xl z-50 backdrop-blur-xl">
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <h3 className="text-xs font-bold text-white">Notifications</h3>
            {unreadCount > 0 && (
              <button
                type="button"
                onClick={() => markAllRead.mutate()}
                className="flex items-center gap-1 text-[11px] font-semibold text-red-400 hover:underline"
              >
                <CheckCheck className="h-3.5 w-3.5" /> Mark all read
              </button>
            )}
          </div>

          <div className="mt-3 max-h-72 overflow-y-auto space-y-2">
            {isLoading ? (
              <p className="text-center text-xs text-zinc-500 py-4">Loading notifications...</p>
            ) : notifications.length === 0 ? (
              <p className="text-center text-xs text-zinc-500 py-6">No notifications found</p>
            ) : (
              notifications.map((item: any) => (
                <div
                  key={item.id}
                  className={`group relative flex items-start justify-between rounded-xl border p-3 text-xs transition ${
                    item.isRead
                      ? "border-white/5 bg-white/2 text-zinc-400"
                      : "border-red-500/20 bg-red-500/5 text-white font-medium"
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => handleMarkSingleRead(item.id, item.isRead)}
                    className="flex-1 cursor-pointer space-y-0.5 pr-4 text-left"
                  >
                    <p className="font-bold">{item.title}</p>
                    <p className="text-[11px] text-zinc-400">{item.message}</p>
                    <p className="text-[9px] text-zinc-500">
                      {new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={(e) => handleDelete(e, item.id)}
                    className="opacity-0 group-hover:opacity-100 text-zinc-500 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
}