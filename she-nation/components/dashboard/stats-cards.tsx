"use client";

import { useEffect, useState } from "react";
import { TrendingUp, BookOpen, Users, Award } from "lucide-react";

interface Stat {
  title: string;
  value: string | number;
  change: string;
  icon: any;
  color: string;
}

const iconMap: Record<string, any> = {
  "Courses Completed": BookOpen,
  "Mentorship Hours": Users,
  "Skill Level": TrendingUp,
  "Achievements": Award,
};

const colorMap: Record<string, string> = {
  "Courses Completed": "from-purple-500 to-purple-600",
  "Mentorship Hours": "from-pink-500 to-pink-600",
  "Skill Level": "from-indigo-500 to-indigo-600",
  "Achievements": "from-teal-500 to-teal-600",
};

export function StatsCards() {
  const [stats, setStats] = useState<Stat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const res = await fetch("http://localhost:8082/api/user-stats");
        const data = await res.json();

        // Map backend data into display format
        const formattedStats: Stat[] = [
          {
            title: "Courses Completed",
            value: data.coursesCompleted,
            change: data.coursesChange,
            icon: BookOpen,
            color: colorMap["Courses Completed"],
          },
          {
            title: "Mentorship Hours",
            value: data.mentorshipHours,
            change: data.mentorshipChange,
            icon: Users,
            color: colorMap["Mentorship Hours"],
          },
          {
            title: "Skill Level",
            value: `${data.skillLevel}%`,
            change: data.skillLevelChange,
            icon: TrendingUp,
            color: colorMap["Skill Level"],
          },
          {
            title: "Achievements",
            value: data.achievements,
            change: data.achievementsChange,
            icon: Award,
            color: colorMap["Achievements"],
          },
        ];

        setStats(formattedStats);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) {
    return <p className="text-gray-500">Loading stats...</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <div
            key={stat.title}
            className="glass-effect rounded-xl p-6 hover-lift transition-all duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg bg-gradient-to-r ${stat.color}`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
              <p className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</p>
              <p className="text-sm text-green-600">{stat.change}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
