import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GitBranch, GitCommit, GitPullRequest, Github, Play, CheckCircle, XCircle } from "lucide-react";

export function CICDPipeline() {
  const pipelines = [
    {
      name: "Build & Test Frontend",
      branch: "main",
      status: "success",
      duration: "2m 34s",
      commit: "feat: add inventory dashboard",
      author: "dev.team"
    },
    {
      name: "Deploy to Azure App Service",
      branch: "main",
      status: "success",
      duration: "4m 12s",
      commit: "feat: add inventory dashboard",
      author: "dev.team"
    },
    {
      name: "Fabric Dataset Deploy",
      branch: "dev",
      status: "running",
      duration: "1m 45s",
      commit: "chore: update medallion layers",
      author: "data.engineer"
    },
    {
      name: "Integration Tests",
      branch: "feature/bom-update",
      status: "failed",
      duration: "3m 21s",
      commit: "fix: update BOM calculations",
      author: "backend.dev"
    }
  ];

  const getStatusBadge = (status: string) => {
    switch(status) {
      case "success":
        return <Badge className="bg-success text-success-foreground gap-1"><CheckCircle className="h-3 w-3" /> Success</Badge>;
      case "running":
        return <Badge className="bg-primary text-primary-foreground gap-1 animate-pulse"><Play className="h-3 w-3" /> Running</Badge>;
      case "failed":
        return <Badge variant="destructive" className="gap-1"><XCircle className="h-3 w-3" /> Failed</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const branchStrategy = [
    { name: "main", description: "Production", color: "bg-success" },
    { name: "dev", description: "Development", color: "bg-primary" },
    { name: "feature/*", description: "Feature branches", color: "bg-warning" }
  ];

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5" />
            CI/CD Pipeline Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {pipelines.map((pipeline, index) => (
              <div key={index} className="p-4 rounded-lg border bg-card">
                <div className="flex justify-between items-start">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{pipeline.name}</h4>
                      {getStatusBadge(pipeline.status)}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <GitBranch className="h-3 w-3" />
                        <span>{pipeline.branch}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <GitCommit className="h-3 w-3" />
                        <span>{pipeline.commit}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span>@{pipeline.author}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-muted-foreground">{pipeline.duration}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GitPullRequest className="h-5 w-5" />
            Branch Strategy
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {branchStrategy.map((branch) => (
              <div key={branch.name} className="flex items-center justify-between p-3 rounded-lg bg-muted">
                <div className="flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${branch.color}`} />
                  <div>
                    <p className="font-medium">{branch.name}</p>
                    <p className="text-sm text-muted-foreground">{branch.description}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  View Workflow
                </Button>
              </div>
            ))}
          </div>
          <div className="mt-4 p-4 rounded-lg bg-gradient-metal">
            <h4 className="font-semibold mb-2">GitHub Actions Workflow</h4>
            <pre className="text-xs bg-card p-3 rounded overflow-x-auto">
              <code>{`name: CI/CD Pipeline
on:
  push:
    branches: [main, dev]
  pull_request:
    branches: [main]

jobs:
  build-test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
      - run: npm ci
      - run: npm test
      - run: npm run build`}</code>
            </pre>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}