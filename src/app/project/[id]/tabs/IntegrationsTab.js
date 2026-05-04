'use client';

import { useState } from 'react';
import {
  Button, Tag, Toast, OverflowMenu, Search,
} from 'aopends';
import {
  AlertCircle, CheckCircle, Database, ExternalLink, GitBranch,
  MessageSquare, Plus, RefreshCw, Settings, ShieldCheck,
} from 'lucide-react';

const projectIntegrations = [
  {
    id: 'github',
    name: 'GitHub',
    category: 'Source Control',
    description: 'Deploys from commits, pull requests, and branch changes in the connected repository.',
    status: 'connected',
    statusLabel: 'Connected',
    statusIntent: 'success',
    icon: GitBranch,
    scope: 'All branches',
    detail: 'Repository access synced 12 minutes ago',
    envVars: 0,
  },
  {
    id: 'postgres',
    name: 'Postgres',
    category: 'Storage',
    description: 'Provides a managed database and syncs connection variables into project environments.',
    status: 'connected',
    statusLabel: 'Connected',
    statusIntent: 'success',
    icon: Database,
    scope: 'Production, Preview',
    detail: 'DATABASE_URL synced yesterday',
    envVars: 2,
  },
  {
    id: 'slack',
    name: 'Slack',
    category: 'Notifications',
    description: 'Sends deployment status, build failures, and rollback alerts to team channels.',
    status: 'setup',
    statusLabel: 'Needs Setup',
    statusIntent: 'info',
    icon: MessageSquare,
    scope: '#deployments',
    detail: 'Choose channels to resume alerts',
    envVars: 0,
  },
];

const availableIntegrations = [
  { id: 'sentry', name: 'Sentry', category: 'Errors', description: 'Create releases and link runtime errors back to deployments.' },
  { id: 'datadog', name: 'Datadog', category: 'Observability', description: 'Forward deployment events and runtime metrics to dashboards.' },
  { id: 'linear', name: 'Linear', category: 'Workflow', description: 'Attach deployments to issues and update release status.' },
];

function IntegrationIcon({ icon: Icon }) {
  return (
    <div className="w-10 h-10 rounded-[var(--ds-radius-md)] border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)] flex items-center justify-center flex-shrink-0">
      <Icon size={18} className="text-[var(--ds-text-secondary)]" />
    </div>
  );
}

function ConnectedIntegrationCard({ integration, onAction }) {
  const Icon = integration.icon;

  return (
    <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4 bg-[var(--ds-bg-primary)] hover:border-[var(--ds-border-secondary)] transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <IntegrationIcon icon={Icon} />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] truncate">{integration.name}</h3>
            <p className="text-xs text-[var(--ds-text-secondary)] truncate">{integration.category}</p>
          </div>
        </div>
        <Tag intent={integration.statusIntent} size="sm">{integration.statusLabel}</Tag>
      </div>

      <p className="text-sm text-[var(--ds-text-secondary)] mb-4">{integration.description}</p>

      <div className="space-y-2 text-xs">
        <div className="flex items-center justify-between gap-3">
          <span className="text-[var(--ds-text-secondary)]">Scope</span>
          <span className="text-[var(--ds-text-primary)] truncate">{integration.scope}</span>
        </div>
        <div className="flex items-center justify-between gap-3">
          <span className="text-[var(--ds-text-secondary)]">Environment Variables</span>
          <span className="text-[var(--ds-text-primary)]">{integration.envVars}</span>
        </div>
        <div className="flex items-center gap-1.5 pt-1">
          {integration.status === 'setup' ? (
            <AlertCircle size={12} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
          ) : (
            <CheckCircle size={12} className="text-green-500 flex-shrink-0" />
          )}
          <span className="text-[var(--ds-text-secondary)] truncate">{integration.detail}</span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--ds-border-primary)]">
        <Button
          variant={integration.status === 'setup' ? 'secondary' : 'ghost'}
          size="sm"
          icon={integration.status === 'setup' ? <AlertCircle size={14} /> : <Settings size={14} />}
          onClick={() => onAction(integration)}
        >
          {integration.status === 'setup' ? 'Finish Setup' : 'Manage'}
        </Button>
        <OverflowMenu
          items={[
            { label: 'View configuration', onClick: () => onAction(integration) },
            { label: 'Resync integration', onClick: () => onAction({ ...integration, name: `${integration.name} resync` }) },
            { divider: true },
            { label: 'Disconnect', danger: true, onClick: () => onAction({ ...integration, name: `${integration.name} disconnect` }) },
          ]}
          align="right"
          size="sm"
        />
      </div>
    </div>
  );
}

export default function IntegrationsTab({ project }) {
  const [search, setSearch] = useState('');
  const [showToast, setShowToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');

  const filteredConnected = projectIntegrations.filter(integration => (
    integration.name.toLowerCase().includes(search.toLowerCase()) ||
    integration.category.toLowerCase().includes(search.toLowerCase())
  ));

  const handleAction = (integration) => {
    setToastTitle(`${integration.name} action queued`);
    setShowToast(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[var(--ds-text-primary)]">Integrations</h2>
          <p className="text-sm text-[var(--ds-text-secondary)] mt-1">
            Manage apps and services connected to <span className="font-medium text-[var(--ds-text-primary)]">{project.name}</span>.
          </p>
        </div>
        <Button variant="primary" size="sm" icon={<Plus size={14} />} onClick={() => handleAction({ name: 'Add integration' })}>
          Add Integration
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="text-base font-semibold text-[var(--ds-text-primary)]">{projectIntegrations.length}</div>
          <div className="text-sm font-medium text-[var(--ds-text-primary)] mt-1">Connected Apps</div>
          <p className="text-xs text-[var(--ds-text-secondary)] mt-1">Active for this project</p>
        </div>
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="text-base font-semibold text-[var(--ds-text-primary)]">2</div>
          <div className="text-sm font-medium text-[var(--ds-text-primary)] mt-1">Synced Variables</div>
          <p className="text-xs text-[var(--ds-text-secondary)] mt-1">Production and Preview</p>
        </div>
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="text-base font-semibold text-[var(--ds-text-primary)]">1</div>
          <div className="text-sm font-medium text-[var(--ds-text-primary)] mt-1">Needs Setup</div>
          <p className="text-xs text-[var(--ds-text-secondary)] mt-1">Review permissions and channels</p>
        </div>
      </div>

      <div className="p-3 bg-[var(--ds-bg-secondary)] rounded-[var(--ds-radius-md)] flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 min-w-0">
          <ShieldCheck size={14} className="text-[var(--ds-text-secondary)] flex-shrink-0" />
          <p className="text-sm text-[var(--ds-text-secondary)] truncate">
            Integrations inherit project permissions from <code className="text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]">{project.repo}</code>.
          </p>
        </div>
        <Button variant="ghost" size="sm" icon={<RefreshCw size={14} />} onClick={() => handleAction({ name: 'Permission sync' })}>
          Sync
        </Button>
      </div>

      <section>
        <div className="flex items-center justify-between mb-3 gap-3">
          <div>
            <h3 className="font-semibold text-[var(--ds-text-primary)]">Connected Apps</h3>
            <p className="text-sm text-[var(--ds-text-secondary)]">Project-level apps, permissions, and environment sync.</p>
          </div>
          <div className="w-64">
            <Search value={search} onChange={setSearch} placeholder="Search integrations..." size="sm" />
          </div>
        </div>

        {filteredConnected.length === 0 ? (
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] py-12 text-center">
            <Settings size={32} className="mx-auto mb-3 text-[var(--ds-text-tertiary)]" />
            <p className="text-sm text-[var(--ds-text-secondary)]">No connected integrations match your search.</p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-4">
            {filteredConnected.map(integration => (
              <ConnectedIntegrationCard key={integration.id} integration={integration} onAction={handleAction} />
            ))}
          </div>
        )}
      </section>

      <section>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="font-semibold text-[var(--ds-text-primary)]">Available for This Project</h3>
            <p className="text-sm text-[var(--ds-text-secondary)]">Add observability, workflow, and error reporting tools.</p>
          </div>
          <Button variant="secondary" size="sm" icon={<ExternalLink size={14} />} iconPosition="right">
            Browse Marketplace
          </Button>
        </div>

        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden">
          {availableIntegrations.map((integration, index) => (
            <div
              key={integration.id}
              className={`flex items-center justify-between gap-4 px-4 py-3 ${index > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''} hover:bg-[var(--ds-bg-hover)]`}
            >
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--ds-text-primary)]">{integration.name}</span>
                  <Tag intent="default" size="sm">{integration.category}</Tag>
                </div>
                <p className="text-xs text-[var(--ds-text-secondary)] mt-0.5 truncate">{integration.description}</p>
              </div>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />} onClick={() => handleAction(integration)}>
                Add
              </Button>
            </div>
          ))}
        </div>
      </section>

      {showToast && (
        <Toast
          intent="info"
          title={toastTitle}
          open={showToast}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
}
