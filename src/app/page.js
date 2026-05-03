'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Header, Search, Button, Tag, Dropdown, Modal, Form, FormGroup, FormRow,
  FormActions, TextInput, Select, OverflowMenu, Toast, Notification, Tabs,
  NotificationList,
} from 'aopends';
import {
  LayoutGrid, List, Plus, Bell, GitBranch, GitCommit, Globe,
  ExternalLink, RefreshCw, Activity, ChevronDown, Triangle,
} from 'lucide-react';
import { projects } from '@/data/projects';

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const frameworkColors = {
  'Next.js': '#000',
  'SvelteKit': '#ff3e00',
  'Create React App': '#61dafb',
  'Astro': '#ff5d01',
  'Vite': '#646cff',
};

const statusConfig = {
  ready: { intent: 'success', label: 'Ready' },
  building: { intent: 'info', label: 'Building' },
  error: { intent: 'danger', label: 'Error' },
  canceled: { intent: 'default', label: 'Canceled' },
};

function ProjectAvatar({ name, framework }) {
  const color = frameworkColors[framework] || '#6366f1';
  return (
    <div
      className="w-10 h-10 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
      style={{ backgroundColor: color }}
    >
      {name[0].toUpperCase()}
    </div>
  );
}

function ProjectCard({ project, view, onDelete }) {
  const sc = statusConfig[project.status] || statusConfig.ready;

  const overflowItems = [
    { label: 'View Project', onClick: () => {} },
    { label: 'Redeploy', onClick: () => {} },
    { label: 'View Logs', onClick: () => {} },
    { divider: true, dividerLabel: 'Danger zone' },
    { label: 'Delete Project', danger: true, onClick: () => onDelete(project.id) },
  ];

  const cardContent = (
    <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4 bg-[var(--ds-bg-primary)] hover:border-[var(--ds-border-secondary)] transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <ProjectAvatar name={project.name} framework={project.framework} />
          <div className="min-w-0">
            <div className="font-semibold text-[var(--ds-text-primary)] text-sm truncate">{project.name}</div>
            <div className="text-xs text-[var(--ds-text-secondary)] truncate">{project.url}</div>
          </div>
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          <button className="p-1.5 rounded hover:bg-[var(--ds-bg-hover)] text-[var(--ds-text-secondary)]">
            <Activity size={14} />
          </button>
          <OverflowMenu items={overflowItems} align="right" size="sm" />
        </div>
      </div>

      <div className="flex items-center gap-1.5 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-[var(--ds-text-secondary)] flex-shrink-0">
          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
        </svg>
        <span className="text-xs text-[var(--ds-text-secondary)] truncate">{project.repo}</span>
      </div>

      {project.hasProductionDeploy ? (
        <div className="space-y-1.5">
          <div className="flex items-center gap-1.5">
            <GitCommit size={12} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
            <span className="text-xs text-[var(--ds-text-secondary)] truncate">{project.latestCommit.message}</span>
            <span className="text-xs text-[var(--ds-text-tertiary)] flex-shrink-0">{project.latestCommit.timeAgo}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1">
              <GitBranch size={12} className="text-[var(--ds-text-tertiary)]" />
              <code className="text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]">{project.branch}</code>
            </div>
            <Tag intent={sc.intent} size="sm">{sc.label}</Tag>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2">
          <Tag intent="default" size="sm">No Production Deployment</Tag>
        </div>
      )}
    </div>
  );

  return (
    <Link href={`/project/${project.id}`} className="block">
      {cardContent}
    </Link>
  );
}

const notificationItems = [
  { title: 'nextjs-blog deployed successfully', description: 'Production deployment is live', timestamp: '2h ago', severity: 'info', unread: true },
  { title: 'docs-site build failed', description: 'Type error in API reference page', timestamp: '3d ago', severity: 'error', unread: false },
];

export default function Overview() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('activity');
  const [viewMode, setViewMode] = useState('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastIntent, setToastIntent] = useState('success');
  const [showNotifications, setShowNotifications] = useState(false);
  const [projectList, setProjectList] = useState(projects);
  const [newProjectName, setNewProjectName] = useState('');
  const [newProjectUrl, setNewProjectUrl] = useState('');
  const [newProjectFramework, setNewProjectFramework] = useState('');

  const filtered = projectList.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.repo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    return 0;
  });

  const handleDelete = (id) => {
    setProjectList(prev => prev.filter(p => p.id !== id));
    setToastMsg('Project deleted');
    setToastIntent('info');
    setShowToast(true);
  };

  const handleAddProject = () => {
    if (!newProjectName) return;
    const newProject = {
      id: newProjectName.toLowerCase().replace(/\s+/g, '-'),
      name: newProjectName,
      url: `${newProjectName.toLowerCase().replace(/\s+/g, '-')}.mercel.app`,
      repo: `asmobbin/${newProjectName.toLowerCase().replace(/\s+/g, '-')}`,
      framework: newProjectFramework || 'Next.js',
      branch: 'main',
      status: 'building',
      latestCommit: { hash: 'init001', message: 'Initial commit', author: 'asmobbin', timeAgo: 'Just now' },
      hasProductionDeploy: false,
      activeBranches: [],
    };
    setProjectList(prev => [newProject, ...prev]);
    setShowAddModal(false);
    setNewProjectName('');
    setNewProjectUrl('');
    setNewProjectFramework('');
    setToastMsg('Project created and deploying...');
    setToastIntent('success');
    setShowToast(true);
  };

  const accountNavItems = [
    { value: 'overview', label: 'Overview' },
    { value: 'integrations', label: 'Integrations' },
    { value: 'activity', label: 'Activity' },
    { value: 'domains', label: 'Domains' },
    { value: 'usage', label: 'Usage' },
    { value: 'monitoring', label: 'Monitoring' },
    { value: 'storage', label: 'Storage' },
    { value: 'ai', label: 'AI' },
    { value: 'support', label: 'Support' },
    { value: 'settings', label: 'Settings' },
  ];

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)]">
      <Header
        logo={<Logo />}
        productName="Alex Smith's projects"
        items={[
          { label: 'Overview', href: '/', active: true },
          { label: 'Integrations', href: '#' },
          { label: 'Activity', href: '#' },
          { label: 'Domains', href: '#' },
          { label: 'Usage', href: '#' },
          { label: 'Monitoring', href: '#' },
          { label: 'Storage', href: '#' },
          { label: 'AI', href: '#' },
          { label: 'Support', href: '#' },
          { label: 'Settings', href: '#' },
        ]}
        actions={
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">Feedback</Button>
            <Button variant="ghost" size="sm">Changelog</Button>
            <Button variant="ghost" size="sm">Help</Button>
            <Button variant="ghost" size="sm">Docs</Button>
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                icon={<Bell size={16} />}
                onClick={() => setShowNotifications(v => !v)}
              />
              {showNotifications && (
                <div className="absolute right-0 top-10 w-80 z-50 bg-[var(--ds-bg-primary)] border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] shadow-[var(--ds-shadow-lg)] overflow-hidden">
                  <div className="px-4 py-3 border-b border-[var(--ds-border-primary)] flex gap-4">
                    <button className="text-sm font-medium text-[var(--ds-text-primary)] border-b-2 border-[var(--ds-border-brand)] pb-1">Inbox</button>
                    <button className="text-sm text-[var(--ds-text-secondary)]">Archive</button>
                    <button className="text-sm text-[var(--ds-text-secondary)]">Comments</button>
                  </div>
                  <NotificationList items={notificationItems} maxHeight="300px" />
                </div>
              )}
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 cursor-pointer" />
          </div>
        }
      />

      <main className="max-w-6xl mx-auto px-6 py-8">
        {/* Toolbar */}
        <div className="flex items-center gap-3 mb-6">
          <div className="flex-1">
            <Search
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Search Repositories and Projects..."
              size="md"
            />
          </div>
          <Dropdown
            options={[
              { value: 'activity', label: 'Sort by activity' },
              { value: 'name', label: 'Sort by name' },
              { value: 'created', label: 'Sort by created' },
            ]}
            value={sortBy}
            onChange={setSortBy}
          />
          <div className="flex border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-md)] overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 transition-colors ${viewMode === 'grid' ? 'bg-[var(--ds-bg-selected)] text-[var(--ds-text-brand)]' : 'bg-[var(--ds-bg-primary)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-hover)]'}`}
              title="Grid view"
            >
              <LayoutGrid size={16} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 transition-colors ${viewMode === 'list' ? 'bg-[var(--ds-bg-selected)] text-[var(--ds-text-brand)]' : 'bg-[var(--ds-bg-primary)] text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-hover)]'}`}
              title="List view"
            >
              <List size={16} />
            </button>
          </div>
          <Button
            variant="primary"
            icon={<Plus size={16} />}
            iconPosition="left"
            onClick={() => setShowAddModal(true)}
          >
            Add New...
          </Button>
        </div>

        {/* Project grid/list */}
        {sorted.length === 0 ? (
          <div className="text-center py-16 text-[var(--ds-text-secondary)]">
            <Globe size={32} className="mx-auto mb-3 opacity-40" />
            <p className="text-sm">No projects match your search.</p>
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-2 gap-4' : 'flex flex-col gap-3'}>
            {sorted.map(project => (
              <ProjectCard key={project.id} project={project} view={viewMode} onDelete={handleDelete} />
            ))}
          </div>
        )}
      </main>

      {/* Add New Project Modal */}
      <Modal
        open={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Project"
        size="md"
        footer={
          <FormActions align="right">
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleAddProject}>Deploy Project</Button>
          </FormActions>
        }
      >
        <Form onSubmit={e => { e.preventDefault(); handleAddProject(); }}>
          <FormGroup legend="Repository">
            <TextInput
              label="Git Repository URL"
              placeholder="https://github.com/user/repo"
              value={newProjectUrl}
              onChange={e => setNewProjectUrl(e.target.value)}
            />
          </FormGroup>
          <FormGroup legend="Project Settings">
            <TextInput
              label="Project Name"
              placeholder="my-awesome-project"
              value={newProjectName}
              onChange={e => setNewProjectName(e.target.value)}
              required
            />
            <Select
              label="Framework Preset"
              options={['Next.js', 'SvelteKit', 'Vite', 'Astro', 'Create React App', 'Remix', 'Nuxt', 'Other']}
              placeholder="Auto-detect"
              value={newProjectFramework}
              onChange={setNewProjectFramework}
            />
          </FormGroup>
        </Form>
      </Modal>

      {/* Toast */}
      {showToast && (
        <Toast
          intent={toastIntent}
          title={toastMsg}
          open={showToast}
          onClose={() => setShowToast(false)}
          duration={4000}
        />
      )}
    </div>
  );
}
