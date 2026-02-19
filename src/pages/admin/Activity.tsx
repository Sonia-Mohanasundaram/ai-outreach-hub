import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity as ActivityIcon, Bot } from "lucide-react";

interface ActivityRecord {
  id: string;
  query: string;
  channel: string;
  priority: string;
  date: string;
  user_name?: string;
  pipeline_summary?: Record<string, string>;
  agent_outputs?: Record<string, unknown>[];
  generated_content?: string;
}

const AdminActivity: React.FC = () => {
  const [filter, setFilter] = useState("all");
  const [selected, setSelected] = useState<ActivityRecord | null>(null);

  // API-ready
  const [adminHistory] = useState<ActivityRecord[]>([]);
  const [userHistory] = useState<ActivityRecord[]>([]);
  const [allHistory] = useState<ActivityRecord[]>([]);

  const getRecords = () => {
    if (filter === "admin") return adminHistory;
    if (filter === "user") return userHistory;
    return allHistory;
  };

  const records = getRecords();

  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-foreground">Activity & History</h1>
        <p className="text-muted-foreground mt-1">Monitor system activity and pipeline results</p>
      </div>

      <Tabs value={filter} onValueChange={setFilter} className="mb-6">
        <TabsList>
          <TabsTrigger value="admin">Admin History</TabsTrigger>
          <TabsTrigger value="user">User History</TabsTrigger>
          <TabsTrigger value="all">All History</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex gap-6">
        {/* Records List */}
        <div className={`${selected ? "flex-1" : "w-full"} bg-card border border-border rounded-xl card-shadow overflow-hidden transition-all`}>
          {records.length > 0 ? (
            <div className="divide-y divide-border">
              {records.map((r) => (
                <div
                  key={r.id}
                  onClick={() => setSelected(r)}
                  className={`p-4 cursor-pointer hover:bg-muted/50 transition-colors ${selected?.id === r.id ? "bg-muted" : ""}`}
                >
                  <p className="text-sm font-medium text-foreground">{r.query}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs text-muted-foreground">{r.channel}</span>
                    <span className="text-xs text-muted-foreground">•</span>
                    <span className="text-xs text-muted-foreground">{r.priority}</span>
                    {r.user_name && (
                      <>
                        <span className="text-xs text-muted-foreground">•</span>
                        <span className="text-xs text-primary">{r.user_name}</span>
                      </>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{r.date}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <ActivityIcon className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No activity yet</h3>
              <p className="text-sm text-muted-foreground">Activity records will appear here</p>
            </div>
          )}
        </div>

        {/* Detail Panel */}
        {selected && (
          <div className="w-[420px] bg-card border border-border rounded-xl card-shadow p-6 animate-slide-in-left space-y-6">
            <div>
              <h3 className="font-semibold text-foreground mb-1">Pipeline Summary</h3>
              {selected.pipeline_summary ? (
                <div className="space-y-2 mt-3">
                  {Object.entries(selected.pipeline_summary).map(([k, v]) => (
                    <div key={k} className="flex justify-between text-sm">
                      <span className="text-muted-foreground capitalize">{k.replace(/_/g, " ")}</span>
                      <span className="text-foreground font-medium">{v}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">No pipeline data</p>
              )}
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-1 flex items-center gap-2">
                <Bot className="h-4 w-4 text-primary" />
                Agent Outputs
              </h3>
              {selected.agent_outputs ? (
                <div className="space-y-3 mt-3">
                  {selected.agent_outputs.map((agent, i) => (
                    <div key={i} className="bg-muted rounded-lg p-3">
                      <p className="text-xs font-semibold text-foreground mb-2">Agent {i + 1}</p>
                      {Object.entries(agent).map(([k, v]) => (
                        <div key={k} className="flex justify-between text-xs">
                          <span className="text-muted-foreground capitalize">{k.replace(/_/g, " ")}</span>
                          <span className="text-foreground">{String(v)}</span>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground mt-2">No agent data</p>
              )}
            </div>

            {selected.generated_content && (
              <div>
                <h3 className="font-semibold text-foreground mb-1">Generated Content</h3>
                <div className="bg-muted rounded-lg p-3 text-sm text-foreground whitespace-pre-wrap mt-2 max-h-[200px] overflow-y-auto">
                  {selected.generated_content}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminActivity;
