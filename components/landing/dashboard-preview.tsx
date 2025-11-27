"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Shield,
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Clock,
  Eye,
} from "lucide-react";

export function DashboardPreview() {
  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
          Your Protection Command Center
        </h2>
        <p className="text-gray-400 text-lg">
          Track everything from one beautiful dashboard
        </p>
      </div>

      <div className="max-w-6xl mx-auto">
        {/* Main Dashboard Preview */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500/20 to-purple-500/20 blur-3xl" />
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-slate-950 to-slate-900 p-6 backdrop-blur-sm">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-white mb-1">
                  Welcome back, Karlee
                </h3>
                <p className="text-gray-400">Here's your protection status</p>
              </div>
              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                All Systems Active
              </Badge>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Shield className="h-5 w-5 text-pink-400" />
                    <TrendingUp className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">142</div>
                  <div className="text-xs text-gray-400">Items Protected</div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-400" />
                    <Badge className="text-xs bg-yellow-500/20 text-yellow-400 border-0">
                      New
                    </Badge>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">3</div>
                  <div className="text-xs text-gray-400">Leaks Detected</div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-xs text-green-400">+12</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">87</div>
                  <div className="text-xs text-gray-400">Removed This Month</div>
                </CardContent>
              </Card>

              <Card className="border-white/10 bg-white/5">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Clock className="h-5 w-5 text-blue-400" />
                    <span className="text-xs text-gray-400">avg</span>
                  </div>
                  <div className="text-2xl font-bold text-white mb-1">28h</div>
                  <div className="text-xs text-gray-400">Removal Time</div>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card className="border-white/10 bg-white/5">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Eye className="h-5 w-5 text-pink-400" />
                  Recent Detections
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    {
                      site: "example-leak-site.com",
                      status: "Takedown Sent",
                      time: "2 hours ago",
                      badge: "pending",
                    },
                    {
                      site: "another-forum.net",
                      status: "Removed",
                      time: "5 hours ago",
                      badge: "success",
                    },
                    {
                      site: "leak-channel.tg",
                      status: "In Progress",
                      time: "1 day ago",
                      badge: "progress",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 rounded-lg border border-white/10 bg-white/5"
                    >
                      <div className="flex-1">
                        <div className="text-white font-medium mb-1">
                          {item.site}
                        </div>
                        <div className="text-xs text-gray-400">{item.time}</div>
                      </div>
                      <Badge
                        className={
                          item.badge === "success"
                            ? "bg-green-500/20 text-green-400 border-0"
                            : item.badge === "pending"
                            ? "bg-yellow-500/20 text-yellow-400 border-0"
                            : "bg-blue-500/20 text-blue-400 border-0"
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
