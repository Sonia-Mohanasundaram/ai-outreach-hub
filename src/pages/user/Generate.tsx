import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, Sparkles, Send, Bot } from "lucide-react";

interface PipelineSummary {
  query: string;
  role: string;
  location: string;
  industry: string;
  intent: string;
  priority: string;
  priority_score: number;
  target_segment: string;
  recommended_channel: string;
  recommended_tone: string;
  [key: string]: string | number;
}

interface AgentOutput {
  [key: string]: string | number | string[];
}

const Generate: React.FC = () => {
  const [activeTab, setActiveTab] = useState("single");
  const [query, setQuery] = useState("");
  const [email, setEmail] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [behavior, setBehavior] = useState("");
  const [intent, setIntent] = useState("");
  const [file, setFile] = useState<File | null>(null);

  // API-ready state
  const [generatedContent, setGeneratedContent] = useState<string | null>(null);
  const [platform, setPlatform] = useState<string | null>(null);
  const [pipelineSummary, setPipelineSummary] = useState<PipelineSummary | null>(null);
  const [agent1Output, setAgent1Output] = useState<AgentOutput | null>(null);
  const [agent2Output, setAgent2Output] = useState<AgentOutput | null>(null);
  const [agent3Output, setAgent3Output] = useState<AgentOutput | null>(null);
  const [agent4Output, setAgent4Output] = useState<AgentOutput | null>(null);
  const [bulkSummary, setBulkSummary] = useState<{ total: number; processed: number; failed: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    setIsLoading(true);
    // API call placeholder
    // const res = await fetch('/api/generate', { method: 'POST', body: JSON.stringify({ query, email, time, location, behavior, intent }) });
    // const data = await res.json();
    // setGeneratedContent(data.generated_content);
    // setPlatform(data.platform);
    // setPipelineSummary(data.pipeline_summary);
    // setAgent1Output(data.agent1_output);
    // etc.
    setIsLoading(false);
  };

  const handleFileUpload = async () => {
    if (!file) return;
    setIsLoading(true);
    // API call placeholder
    // const formData = new FormData(); formData.append('file', file);
    // const res = await fetch('/api/upload', { method: 'POST', body: formData });
    // const data = await res.json();
    // setBulkSummary(data.bulk_summary);
    setIsLoading(false);
  };

  const handleSubmitContent = async () => {
    // API call placeholder for submitting email content
  };

  return (
    <div className="animate-fade-in space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Generate Outreach</h1>
        <p className="text-muted-foreground mt-1">Create AI-powered content for your leads</p>
      </div>

      {/* SECTION A – INPUT */}
      <div className="bg-card border border-border rounded-xl p-6 card-shadow">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="single">Single Query</TabsTrigger>
            <TabsTrigger value="upload">File Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="single" className="space-y-4">
            <div>
              <Label htmlFor="query">Query *</Label>
              <Textarea id="query" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Describe your lead or outreach target..." className="mt-1" rows={3} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="gen-email">Email (optional)</Label>
                <Input id="gen-email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="lead@company.com" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="gen-time">Time (optional)</Label>
                <Input id="gen-time" value={time} onChange={(e) => setTime(e.target.value)} placeholder="e.g., Morning, Q1 2025" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="gen-location">Location hint (optional)</Label>
                <Input id="gen-location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g., New York, US" className="mt-1" />
              </div>
              <div>
                <Label htmlFor="gen-behavior">Business behavior (optional)</Label>
                <Input id="gen-behavior" value={behavior} onChange={(e) => setBehavior(e.target.value)} placeholder="e.g., SaaS, B2B" className="mt-1" />
              </div>
            </div>
            <div>
              <Label htmlFor="gen-intent">User intent (optional)</Label>
              <Input id="gen-intent" value={intent} onChange={(e) => setIntent(e.target.value)} placeholder="e.g., Partnership, Sales" className="mt-1" />
            </div>
            <Button onClick={handleGenerate} disabled={!query || isLoading}>
              <Sparkles className="h-4 w-4 mr-2" />
              {isLoading ? "Generating..." : "Generate Content"}
            </Button>
          </TabsContent>

          <TabsContent value="upload" className="space-y-4">
            <div>
              <Label>Upload CSV or Excel</Label>
              <div className="mt-2 border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary/40 transition-colors">
                <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-3" />
                <p className="text-sm text-muted-foreground mb-2">
                  {file ? file.name : "Drag & drop or click to upload"}
                </p>
                <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="hidden"
                  id="file-upload"
                />
                <Button variant="outline" size="sm" onClick={() => document.getElementById("file-upload")?.click()}>
                  Select File
                </Button>
              </div>
            </div>
            <Button onClick={handleFileUpload} disabled={!file || isLoading}>
              <Upload className="h-4 w-4 mr-2" />
              {isLoading ? "Processing..." : "Process File"}
            </Button>
          </TabsContent>
        </Tabs>
      </div>

      {/* SECTION B – OUTPUT */}
      {(generatedContent || pipelineSummary) && (
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <div className="lg:col-span-3 bg-card border border-border rounded-xl p-6 card-shadow">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-foreground">Generated Content</h2>
              {platform && <Badge variant="secondary">{platform}</Badge>}
            </div>
            <div className="bg-muted rounded-lg p-4 min-h-[200px] max-h-[400px] overflow-y-auto text-sm text-foreground whitespace-pre-wrap">
              {generatedContent || "No content generated yet."}
            </div>
            <div className="mt-4">
              <Button disabled={platform !== "Email"} onClick={handleSubmitContent}>
                <Send className="h-4 w-4 mr-2" />
                Submit
              </Button>
              {platform && platform !== "Email" && (
                <p className="text-xs text-muted-foreground mt-2">Submit is only available for Email channel</p>
              )}
            </div>
          </div>

          <div className="lg:col-span-2 bg-card border border-border rounded-xl p-6 card-shadow">
            <h2 className="text-lg font-semibold text-foreground mb-4">Pipeline Summary</h2>
            {pipelineSummary ? (
              <div className="space-y-3">
                {Object.entries(pipelineSummary).map(([key, value]) => (
                  <div key={key} className="flex justify-between items-start text-sm">
                    <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                    <span className="text-foreground font-medium text-right max-w-[60%]">{String(value)}</span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No pipeline data available.</p>
            )}
          </div>
        </div>
      )}

      {/* SECTION C – AGENT RESULTS */}
      {(agent1Output || agent2Output || agent3Output || agent4Output) && (
        <div>
          <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
            <Bot className="h-5 w-5 text-primary" />
            Agent Results
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { title: "Agent 1 – Classification", data: agent1Output, fields: ["role", "location", "industry", "intent", "context_signals"] },
              { title: "Agent 2 – ICP", data: agent2Output, fields: ["target_segment", "priority", "priority_score"] },
              { title: "Agent 3 – Channel Decision", data: agent3Output, fields: ["recommended_channel", "tone", "confidence"] },
              { title: "Agent 4 – Content Generation", data: agent4Output, fields: ["primary_content", "alternate_outputs", "platform", "message_preview"] },
            ].map((agent) => (
              <div key={agent.title} className="bg-card border border-border rounded-xl p-6 card-shadow">
                <h3 className="font-semibold text-foreground mb-4">{agent.title}</h3>
                {agent.data ? (
                  <div className="space-y-2">
                    {Object.entries(agent.data).map(([key, val]) => (
                      <div key={key} className="flex justify-between text-sm">
                        <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                        <span className="text-foreground font-medium">{Array.isArray(val) ? val.join(", ") : String(val)}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">Awaiting results...</p>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* SECTION D – BULK UPLOAD SUMMARY */}
      {bulkSummary && activeTab === "upload" && (
        <div className="bg-card border border-border rounded-xl p-6 card-shadow">
          <h2 className="text-lg font-semibold text-foreground mb-4">Bulk Upload Summary</h2>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">{bulkSummary.total}</p>
              <p className="text-sm text-muted-foreground">Total Rows</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-success">{bulkSummary.processed}</p>
              <p className="text-sm text-muted-foreground">Processed</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-destructive">{bulkSummary.failed}</p>
              <p className="text-sm text-muted-foreground">Failed</p>
            </div>
          </div>
        </div>
      )}

      {/* Empty state when nothing generated */}
      {!generatedContent && !pipelineSummary && !bulkSummary && (
        <div className="bg-card border border-border rounded-xl p-12 card-shadow text-center">
          <Sparkles className="h-10 w-10 text-muted-foreground/40 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No results yet</h3>
          <p className="text-sm text-muted-foreground">Enter a query or upload a file to generate AI-powered outreach content</p>
        </div>
      )}
    </div>
  );
};

export default Generate;
