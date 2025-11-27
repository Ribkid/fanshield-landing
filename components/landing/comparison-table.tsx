"use client";

import { Check, X } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

export function ComparisonTable() {
  const features = [
    {
      feature: "Automated Scanning",
      fanshield: true,
      bruqi: true,
      dmcaforce: false,
      ceartas: true,
    },
    {
      feature: "Anonymous Filing",
      fanshield: true,
      bruqi: false,
      dmcaforce: false,
      ceartas: false,
    },
    {
      feature: "Google Delisting",
      fanshield: true,
      bruqi: true,
      dmcaforce: true,
      ceartas: true,
    },
    {
      feature: "Telegram Monitoring",
      fanshield: true,
      bruqi: false,
      dmcaforce: false,
      ceartas: true,
    },
    {
      feature: "Impersonator Detection",
      fanshield: true,
      bruqi: false,
      dmcaforce: false,
      ceartas: false,
    },
    {
      feature: "Video Protection",
      fanshield: true,
      bruqi: true,
      dmcaforce: true,
      ceartas: false,
    },
    {
      feature: "API Access",
      fanshield: true,
      bruqi: false,
      dmcaforce: false,
      ceartas: false,
    },
    {
      feature: "Starting Price",
      fanshield: "$19/mo",
      bruqi: "$30/mo",
      dmcaforce: "$50/mo",
      ceartas: "$50/mo",
    },
  ];

  return (
    <section className="container mx-auto px-4 sm:px-6 py-20">
      <div className="mb-16 text-center">
        <h2 className="mb-4 text-3xl sm:text-4xl font-bold text-white">
          Why Choose FanShield?
        </h2>
        <p className="text-gray-400 text-lg">
          More features, better protection, lower price
        </p>
      </div>

      <div className="max-w-5xl mx-auto">
        <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-b border-white/10 hover:bg-transparent">
                  <TableHead className="text-gray-400 w-1/3">Feature</TableHead>
                  <TableHead className="text-center">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-white font-semibold">FanShield</span>
                      <Badge className="bg-gradient-to-r from-pink-500 to-purple-500 text-white border-0">
                        Best Value
                      </Badge>
                    </div>
                  </TableHead>
                  <TableHead className="text-center text-gray-400">Bruqi</TableHead>
                  <TableHead className="text-center text-gray-400">DMCAForce</TableHead>
                  <TableHead className="text-center text-gray-400">Ceartas</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {features.map((row, index) => (
                  <TableRow
                    key={index}
                    className="border-b border-white/10 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      {row.feature}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof row.fanshield === "boolean" ? (
                        row.fanshield ? (
                          <Check className="h-5 w-5 text-green-400 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        <span className="text-pink-400 font-semibold">{row.fanshield}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof row.bruqi === "boolean" ? (
                        row.bruqi ? (
                          <Check className="h-5 w-5 text-gray-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-400">{row.bruqi}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof row.dmcaforce === "boolean" ? (
                        row.dmcaforce ? (
                          <Check className="h-5 w-5 text-gray-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-400">{row.dmcaforce}</span>
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {typeof row.ceartas === "boolean" ? (
                        row.ceartas ? (
                          <Check className="h-5 w-5 text-gray-500 mx-auto" />
                        ) : (
                          <X className="h-5 w-5 text-gray-600 mx-auto" />
                        )
                      ) : (
                        <span className="text-gray-400">{row.ceartas}</span>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </section>
  );
}
