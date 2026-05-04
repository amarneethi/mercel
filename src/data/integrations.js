import {
  Activity, Bug, Database, GitBranch, ListChecks, MessageSquare,
} from 'lucide-react';

export const integrationSummary = [
  {
    label: 'Connected',
    value: '6',
    helper: 'Installed across active projects',
  },
  {
    label: 'Needs Setup',
    value: '2',
    helper: 'Permissions or environment variables missing',
  },
  {
    label: 'Events This Week',
    value: '1.2k',
    helper: 'Build, deploy, and alert events',
  },
  {
    label: 'Available',
    value: '24',
    helper: 'Browse the integration catalog',
  },
];

export const connectedIntegrations = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'Source Control',
    description: 'Repository imports, preview deployments, and production triggers from commits and pull requests.',
    meta: '5 projects',
    status: 'active',
    icon: GitBranch,
  },
  {
    id: 'postgres',
    name: 'Postgres',
    category: 'Storage',
    description: 'Managed databases with project connection strings and environment variable sync.',
    meta: '3 databases',
    status: 'active',
    icon: Database,
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Notifications',
    description: 'Deployment notifications, rollback alerts, and incident messages for team channels.',
    meta: '2 projects',
    status: 'setup',
    icon: MessageSquare,
  },
  {
    id: 'sentry',
    name: 'Sentry',
    category: 'Errors',
    description: 'Release tracking and deployment-linked production errors for faster triage.',
    meta: '4 projects',
    status: 'active',
    icon: Bug,
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'Observability',
    description: 'Metrics, traces, and deployment events forwarded to monitoring dashboards.',
    meta: '1 workspace',
    status: 'active',
    icon: Activity,
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Workflow',
    description: 'Issue links and automated release status updates for deployment workflows.',
    meta: '2 teams',
    status: 'active',
    icon: ListChecks,
  },
];

export const catalogIntegrations = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'Source Control',
    state: 'installed',
    icon: GitBranch,
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Notifications',
    state: 'setup',
    icon: MessageSquare,
  },
  {
    id: 'datadog',
    name: 'Datadog',
    category: 'Observability',
    state: 'available',
    icon: Activity,
  },
  {
    id: 'postgres',
    name: 'Postgres',
    category: 'Storage',
    state: 'installed',
    icon: Database,
  },
];

export const setupChecklist = [
  { label: 'Connect source provider', done: true },
  { label: 'Sync project permissions', done: true },
  { label: 'Choose Slack channels', done: false },
  { label: 'Add observability token', done: false },
];

export const integrationActivity = [
  {
    title: 'GitHub installed on nextjs-blog',
    time: '12 minutes ago',
  },
  {
    title: 'Slack permissions expired',
    time: '1 hour ago',
  },
  {
    title: 'Postgres environment variables synced',
    time: 'Yesterday',
  },
];
