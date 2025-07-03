"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { MentorGrid } from "@/components/mentorship/mentor-grid";

// Define the shape of mentor data from the API
interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  category: string;
  rating: number;
  sessions: number;
  avatar: string;
}

function MentorshipPage() {
  const [mentors, setMentors] = useState<Mentor[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

  // Fetch mentors from the backend
  useEffect(() => {
    async function fetchMentors() {
      try {
        const response = await fetch("http://localhost:8082/api/mentors/");
        if (!response.ok) throw new Error("Failed to fetch mentors");
        const data: Mentor[] = await response.json();
        setMentors(data);
      } catch (error) {
        console.error("Error fetching mentors:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchMentors();
  }, []);

  // Unique categories for filtering
  const categories = Array.from(new Set(mentors.map((m) => m.category))).sort();

  // Filtered mentors based on search and category
  const filteredMentors = mentors.filter((mentor) => {
    const searchMatch =
      mentor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      mentor.company.toLowerCase().includes(searchQuery.toLowerCase());

    const categoryMatch =
      !categoryFilter || mentor.category === categoryFilter;

    return searchMatch && categoryMatch;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500 text-lg">Loading mentors...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find a Mentor
          </h1>
          <p className="text-gray-600">
            Connect with experienced professionals for guidance and support.
          </p>
        </div>

        {/* Search and Category Filters */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Input */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search mentors…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full md:w-48">
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Mentor Display Grid */}
        <MentorGrid mentors={filteredMentors} />
      </div>
    </div>
  );
}

export default MentorshipPage;
