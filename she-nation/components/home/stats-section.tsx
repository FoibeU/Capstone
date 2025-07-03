"use client";

import { useEffect, useState } from "react";
import { Users, BookOpen, Briefcase, Award } from "lucide-react";

export function StatsSection() {
  const [stats, setStats] = useState([
    { icon: Users, label: "Active Members", value: 0, suffix: "+" },
    { icon: BookOpen, label: "Courses Completed", value: 0, suffix: "+" },
    { icon: Briefcase, label: "Job Placements", value: 0, suffix: "+" },
    { icon: Award, label: "Success Stories", value: 0, suffix: "+" },
  ]);

  const [counters, setCounters] = useState(stats.map(() => 0));

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [usersRes, coursesRes, jobsRes, storiesRes] = await Promise.all([
          fetch("http://localhost:8082/api/auth/all-users/"),
          fetch("http://localhost:8082/api/courses/"),
          fetch("http://localhost:8082/api/jobs/"),
          fetch("http://localhost:8082/api/successstories/"),
        ]);

        const [users, courses, jobs, stories] = await Promise.all([
          usersRes.json(),
          coursesRes.json(),
          jobsRes.json(),
          storiesRes.json(),
        ]);

        setStats([
          { icon: Users, label: "Active Members", value: users.length, suffix: "+" },
          { icon: BookOpen, label: "Courses Completed", value: courses.length, suffix: "+" },
          { icon: Briefcase, label: "Job Placements", value: jobs.length, suffix: "+" },
          { icon: Award, label: "Success Stories", value: stories.length, suffix: "+" },
        ]);
      } catch (error) {
        console.error("Failed to fetch stats:", error);
      }
    };

    fetchStats();
  }, []);

  useEffect(() => {
    const duration = 2000;
    const steps = 60;
    const stepDuration = duration / steps;

    const timers: NodeJS.Timeout[] = [];

    stats.forEach((stat, index) => {
      const increment = stat.value / steps;
      let currentValue = 0;

      const timer = setInterval(() => {
        currentValue += increment;
        if (currentValue >= stat.value) {
          currentValue = stat.value;
          clearInterval(timer);
        }
        setCounters((prev) => {
          const newCounters = [...prev];
          newCounters[index] = Math.floor(currentValue);
          return newCounters;
        });
      }, stepDuration);

      timers.push(timer);
    });

    return () => timers.forEach(clearInterval);
  }, [stats]);

  return (
    <section className="py-20 bg-white/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold font-poppins gradient-text mb-4">
            Transforming Lives Through Empowerment
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Join thousands of women who have already transformed their careers and lives through our platform
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={stat.label} className="text-center group">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <div className="text-3xl md:text-4xl font-bold font-poppins text-gray-900 mb-2">
                  {counters[index].toLocaleString()}
                  {stat.suffix}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
