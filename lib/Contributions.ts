interface Contribution {
  title: string;
  project: string;
  org: string;
  desc: string;
  type: "PR" | "Issue" | "Documentation";
  status: "Merged" | "Open" | "Closed";
  date: string;
  link: string;
  tech: string[];
}

const contributions: Contribution[] = [
  {
    title: "feat: add message to ProgressNotification",
    project: "python-sdk",
    org: "modelcontextprotocol",
    desc: "Added support for optional message field to ProgressNotificationParams, aligning the Python SDK with the latest MCP specification for progress utilities. Implemented bidirectional message testing and improved test reliability.",
    type: "PR",
    status: "Merged",
    date: "May 2025",
    link: "https://github.com/modelcontextprotocol/python-sdk/pull/435",
    tech: ["Python", "MCP", "Testing"],
  },
  {
    title: "Feature: Support WebSocket Transport",
    project: "langchain-mcp-adapters",
    org: "langchain-ai",
    desc: "Added WebSocket transport support to enable communication over WebSocket connections. Created WebSocket client class, pytest fixtures for testing, and integrated into existing test suite. First open-source contribution.",
    type: "PR",
    status: "Merged",
    date: "April 2025",
    link: "https://github.com/langchain-ai/langchain-mcp-adapters/pull/79",
    tech: ["Python", "WebSocket", "Testing"],
  },
];

export default contributions;
export type { Contribution };
