export const activityEvents = [
  {
    id: 'evt-001',
    type: 'deployment',
    actor: 'asmobbin',
    project: 'nextjs-blog',
    meta: {
      environment: 'Production',
      branch: 'main',
      commitHash: 'a8f3c2d',
      commitMessage: 'Fix navbar responsive layout',
      status: 'success',
    },
    timeLabel: '2 min ago',
    day: 'today',
  },
  {
    id: 'evt-002',
    type: 'domain',
    actor: 'asmobbin',
    project: 'nextjs-blog',
    meta: {
      domain: 'nextjs-blog.com',
    },
    timeLabel: '1 hr ago',
    day: 'today',
  },
  {
    id: 'evt-003',
    type: 'deployment',
    actor: 'asmobbin',
    project: 'react-dashboard',
    meta: {
      environment: 'Preview',
      branch: 'feat/new-charts',
      commitHash: 'b7d3a1c',
      commitMessage: 'Add pie chart widget',
      status: 'failed',
      errorMessage: "Build failed: Cannot resolve module 'chart.js'",
    },
    timeLabel: '3 hrs ago',
    day: 'today',
  },
  {
    id: 'evt-004',
    type: 'env',
    actor: 'asmobbin',
    project: 'react-dashboard',
    meta: {
      varName: 'DATABASE_URL',
      environment: 'Production',
    },
    timeLabel: '5 hrs ago',
    day: 'today',
  },
  {
    id: 'evt-005',
    type: 'member',
    actor: 'asmobbin',
    project: null,
    meta: {
      invitee: 'jordan@acme.com',
      role: 'Developer',
    },
    timeLabel: 'Yesterday 3:42 PM',
    day: 'yesterday',
  },
  {
    id: 'evt-006',
    type: 'integration',
    actor: 'asmobbin',
    project: null,
    meta: {
      integrationName: 'GitHub',
    },
    timeLabel: 'Yesterday 9:15 AM',
    day: 'yesterday',
  },
  {
    id: 'evt-007',
    type: 'project',
    actor: 'asmobbin',
    project: 'sveltekit-boilerplate',
    meta: {
      framework: 'SvelteKit',
    },
    timeLabel: 'Yesterday 8:50 AM',
    day: 'yesterday',
  },
  {
    id: 'evt-008',
    type: 'deployment',
    actor: 'asmobbin',
    project: 'sveltekit-boilerplate',
    meta: {
      environment: 'Production',
      branch: 'main',
      commitHash: '4618318',
      commitMessage: 'Initial commit',
      status: 'success',
    },
    timeLabel: 'Yesterday 8:55 AM',
    day: 'yesterday',
  },
];

export const activityTypeOptions = [
  { value: 'all', label: 'All types' },
  { value: 'deployment', label: 'Deployments' },
  { value: 'domain', label: 'Domains' },
  { value: 'env', label: 'Env variables' },
  { value: 'member', label: 'Members' },
  { value: 'integration', label: 'Integrations' },
  { value: 'project', label: 'Projects' },
];

export const activityDateOptions = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '90d', label: 'Last 90 days' },
];
