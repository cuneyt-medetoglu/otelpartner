"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

type Notification = {
  id: string;
  type: string;
  title: string;
  message: string;
  relatedEntityType: string | null;
  relatedEntityId: string | null;
  isRead: boolean;
  readAt: string | null;
  createdAt: string;
};

export function NotificationList({
  initialNotifications,
  initialUnreadCount,
}: {
  initialNotifications: Notification[];
  initialUnreadCount: number;
}) {
  const router = useRouter();
  const [notifications, setNotifications] = useState(initialNotifications);
  const [unreadCount, setUnreadCount] = useState(initialUnreadCount);
  const [loadingId, setLoadingId] = useState<string | null>(null);

  async function markRead(id: string) {
    const n = notifications.find((x) => x.id === id);
    if (!n || n.isRead) return;
    setLoadingId(id);
    try {
      const res = await fetch(`/api/notifications/${id}`, { method: "PATCH" });
      if (!res.ok) return;
      setNotifications((prev) =>
        prev.map((x) => (x.id === id ? { ...x, isRead: true, readAt: new Date().toISOString() } : x))
      );
      setUnreadCount((c) => Math.max(0, c - 1));
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  }

  function formatDate(iso: string) {
    const d = new Date(iso);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    if (diff < 60 * 60 * 1000) return "Az önce";
    if (diff < 24 * 60 * 60 * 1000) return `${Math.floor(diff / (60 * 60 * 1000))} saat önce`;
    return d.toLocaleDateString("tr-TR", { day: "numeric", month: "short", year: "numeric" });
  }

  if (notifications.length === 0) {
    return (
      <div className="rounded-xl border border-gray-100 bg-white p-8 shadow-lg">
        <p className="text-center text-gray-500">Henüz bildirim yok.</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-gray-100 bg-white shadow-lg overflow-hidden">
      <ul className="divide-y divide-gray-100">
        {notifications.map((n) => (
          <li
            key={n.id}
            className={`flex flex-col gap-1 px-6 py-4 ${!n.isRead ? "bg-blue-50/50" : ""}`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0 flex-1">
                <p className="font-semibold text-gray-900">{n.title}</p>
                <p className="mt-0.5 text-sm text-gray-600">{n.message}</p>
                <p className="mt-1 text-xs text-gray-400">{formatDate(n.createdAt)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-2">
                {n.relatedEntityType === "reservation" && n.relatedEntityId && (
                  <Link
                    href={`/dashboard/reservations/${n.relatedEntityId}`}
                    className="rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-blue-700"
                  >
                    Görüntüle
                  </Link>
                )}
                {!n.isRead && (
                  <button
                    type="button"
                    onClick={() => markRead(n.id)}
                    disabled={loadingId === n.id}
                    className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    {loadingId === n.id ? "..." : "Okundu"}
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
