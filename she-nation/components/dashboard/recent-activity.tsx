"use client";

import { useEffect, useState } from "react";
import { Clock, BookOpen, Users, MessageCircle } from "lucide-react";

interface Activity {
  id: string;
  type: "course" | "mentorship" | "forum";
  title: string;
  time: string;
}

const iconMap: Record<string, any> = {
  course: BookOpen,
  mentorship: Users,
  forum: MessageCircle,
};

const colorMap: Record<string, string> = {
  course: "text-teal-600",
  mentorship: "text-pink-600",
  forum: "text-indigo-600",
};

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchActivities() {
      try {
        const res = await fetch("http://localhost:8082/api/activities");
        const data = await res.json();
        setActivities(data);
      } catch (err) {
        console.error("Failed to fetch recent activities", err);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  function formatTime(isoTime: string): string {
    const time = new Date(isoTime);
    const now = new Date();
    const diff = Math.floor((now.getTime() - time.getTime()) / 1000);

    if (diff < 60) return "Just now";
    if (diff < 3600) return `${Math.floor(diff / 60)} min ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
    return `${Math.floor(diff / 86400)} days ago`;
  }

  return (
    <div className="glass-effect rounded-xl p-6">
      <h3 className="text-xl font-semibold font-poppins text-gray-900 mb-6">Recent Activity</h3>

      {loading ? (
        <p className="text-gray-500">Loading...</p>
      ) : activities.length === 0 ? (
        <p className="text-gray-400">No recent activity.</p>
      ) : (
        <div className="space-y-4">
          {activities.map((activity) => {
            const Icon = iconMap[activity.type] || Clock;
            const color = colorMap[activity.type] || "text-gray-600";

            return (
              <div
                key={activity.id}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-white/50 transition-colors"
              >
                <div className={`p-2 rounded-lg bg-gray-100 ${color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{activity.title}</p>
                  <div className="flex items-center text-sm text-gray-500 mt-1">
                    <Clock className="w-4 h-4 mr-1" />
                    {formatTime(activity.time)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
