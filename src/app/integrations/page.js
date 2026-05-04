'use client';

import { useMemo, useState } from 'react';
import {
  Header, Search, Button, Tag, Dropdown, Toast, NotificationList,
} from 'aopends';
import {
  AlertCircle, ArrowRight, Bell, CheckCircle, ChevronDown, Circle,
  Plus, Settings, SlidersHorizontal,
} from 'lucide-react';
import {
  catalogIntegrations, connectedIntegrations, integrationActivity,
  integrationSummary, setupChecklist,
} from '@/data/integrations';

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const notificationItems = [
  { title: 'Slack permissions expired', description: 'Reconnect Slack to resume deployment alerts', timestamp: '1h ago', severity: 'warning', unread: true },
  { title: 'GitHub integration connected', description: 'Repository sync is active for nextjs-blog', timestamp: '12m ago', severity: 'info', unread: false },
];

const statusConfig = {
  active: { label: 'Active', intent: 'success' },
  setup: { label: 'Setup', intent: 'warning' },
};

const catalogStateConfig = {
  installed: { label: 'Installed', icon: Settings },
  setup: { label: 'Setup', icon: AlertCircle },
  available: { label: 'Add', icon: Plus },
};

function IconBox({ icon: Icon }) {
  return (
    <div className="w-10 h-10 rounded-[var(--ds-radius-md)] border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)] flex items-center justify-center flex-shrink-0">
      <Icon size={18} className="text-[var(--ds-text-secondary)]" />
    </div>
  );
}

function SummaryCard({ item }) {
  return (
    <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] bg-[var(--ds-bg-primary)] p-4">
      <div className="text-base font-semibold text-[var(--ds-text-primary)] mb-1">{item.value}</div>
      <div className="text-sm font-medium text-[var(--ds-text-primary)]">{item.label}</div>
      <p className="text-xs text-[var(--ds-text-secondary)] mt-1">{item.helper}</p>
    </div>
  );
}

function ConnectedCard({ integration, onManage }) {
  const sc = statusConfig[integration.status] || statusConfig.active;

  return (
    <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4 bg-[var(--ds-bg-primary)] hover:border-[var(--ds-border-secondary)] transition-colors">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <IconBox icon={integration.icon} />
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-[var(--ds-text-primary)] truncate">{integration.name}</h3>
            <p className="text-xs text-[var(--ds-text-secondary)] truncate">{integration.category}</p>
          </div>
        </div>
        <Tag intent={sc.intent} size="sm">{sc.label}</Tag>
      </div>
      <p className="text-sm text-[var(--ds-text-secondary)] min-h-[60px]">{integration.description}</p>
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-[var(--ds-border-primary)]">
        <span className="text-xs text-[var(--ds-text-secondary)]">{integration.meta}</span>
        <Button
          variant="ghost"
          size="sm"
          icon={integration.status === 'setup' ? <AlertCircle size={14} /> : <Settings size={14} />}
          onClick={() => onManage(integration)}
        >
          {integration.status === 'setup' ? 'Finish setup' : 'Manage'}
        </Button>
      </div>
    </div>
  );
}

function CatalogList({ onSelect }) {
  return (
    <section className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] bg-[var(--ds-bg-primary)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--ds-border-primary)] flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-[var(--ds-text-primary)]">Integration Catalog</h2>
          <p className="text-sm text-[var(--ds-text-secondary)]">Compact marketplace view</p>
        </div>
        <span className="text-xs text-[var(--ds-text-tertiary)]">24 total</span>
      </div>
      <div>
        {catalogIntegrations.map((integration, index) => {
          const Icon = integration.icon;
          const state = catalogStateConfig[integration.state];
          const ActionIcon = state.icon;

          return (
            <button
              key={integration.id}
              type="button"
              onClick={() => onSelect(integration)}
              className={`w-full flex items-center justify-between gap-3 px-4 py-3 text-left hover:bg-[var(--ds-bg-hover)] ${index > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''}`}
            >
              <div className="flex items-center gap-3 min-w-0">
                <Icon size={16} className="text-[var(--ds-text-secondary)] flex-shrink-0" />
                <div className="min-w-0">
                  <div className="text-sm font-medium text-[var(--ds-text-primary)] truncate">{integration.name}</div>
                  <div className="text-xs text-[var(--ds-text-secondary)] truncate">{integration.category}</div>
                </div>
              </div>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-xs text-[var(--ds-text-secondary)]">{state.label}</span>
                <ActionIcon size={14} className="text-[var(--ds-text-tertiary)]" />
              </div>
            </button>
          );
        })}
      </div>
      <div className="p-3 border-t border-[var(--ds-border-primary)]">
        <Button variant="secondary" size="sm" className="w-full justify-center" icon={<ArrowRight size={14} />} iconPosition="right">
          View All Integrations
        </Button>
      </div>
    </section>
  );
}

function SetupPanel() {
  const doneCount = setupChecklist.filter(item => item.done).length;

  return (
    <section className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] bg-[var(--ds-bg-primary)] p-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h2 className="font-semibold text-[var(--ds-text-primary)]">Setup Checklist</h2>
          <p className="text-sm text-[var(--ds-text-secondary)]">Resolve integration health items</p>
        </div>
        <span className="text-xs font-medium text-[var(--ds-text-secondary)]">{doneCount}/{setupChecklist.length}</span>
      </div>
      <div className="space-y-3">
        {setupChecklist.map(item => (
          <div key={item.label} className="flex items-start gap-2">
            {item.done ? (
              <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
            ) : (
              <Circle size={14} className="text-[var(--ds-text-tertiary)] mt-0.5 flex-shrink-0" />
            )}
            <span className={`text-sm ${item.done ? 'text-[var(--ds-text-secondary)]' : 'text-[var(--ds-text-primary)]'}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}

function ActivityPanel() {
  return (
    <section className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] bg-[var(--ds-bg-primary)] overflow-hidden">
      <div className="px-4 py-3 border-b border-[var(--ds-border-primary)]">
        <h2 className="font-semibold text-[var(--ds-text-primary)]">Recent Activity</h2>
      </div>
      <div>
        {integrationActivity.map((item, index) => (
          <div key={item.title} className={`px-4 py-3 ${index > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''}`}>
            <p className="text-sm text-[var(--ds-text-primary)]">{item.title}</p>
            <p className="text-xs text-[var(--ds-text-tertiary)] mt-0.5">{item.time}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default function IntegrationsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All Categories');
  const [status, setStatus] = useState('All Statuses');
  const [showNotifications, setShowNotifications] = useState(false);
  const [toast, setToast] = useState(null);

  const filteredIntegrations = useMemo(() => (
    connectedIntegrations.filter(integration => {
      const matchesSearch = integration.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        integration.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'All Categories' || integration.category === category;
      const matchesStatus = status === 'All Statuses' || statusConfig[integration.status]?.label === status;
      return matchesSearch && matchesCategory && matchesStatus;
    })
  ), [category, searchQuery, status]);

  const categories = ['All Categories', ...new Set(connectedIntegrations.map(item => item.category))];

  const showToast = (title, intent = 'info') => {
    setToast({ title, intent });
  };

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)]">
      <Header
        logo={<Logo />}
        productName="Alex Smith's projects"
        items={[
          { label: 'Overview', href: '/' },
          { label: 'Integrations', href: '/integrations', active: true },
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
        <div className="flex items-start justify-between gap-4 mb-6">
          <div>
            <h1 className="font-semibold text-[var(--ds-text-primary)] mb-1">Integrations</h1>
            <p className="text-sm text-[var(--ds-text-secondary)] max-w-2xl">
              Connect repositories, observability tools, chat alerts, databases, and team workflows to your Mercel projects.
            </p>
          </div>
          <Button
            variant="primary"
            size="sm"
            icon={<Plus size={14} />}
            onClick={() => showToast('Choose an integration from the catalog', 'info')}
          >
            Add Integration
          </Button>
        </div>

        <div className="grid grid-cols-4 gap-4 mb-6">
          {integrationSummary.map(item => (
            <SummaryCard key={item.label} item={item} />
          ))}
        </div>

        <div className="grid grid-cols-[1fr_300px] gap-6 items-start">
          <div className="space-y-6 min-w-0">
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <Search
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Search integrations..."
                  size="md"
                />
              </div>
              <Dropdown
                options={categories.map(item => ({ value: item, label: item }))}
                value={category}
                onChange={setCategory}
              />
              <Dropdown
                options={[
                  { value: 'All Statuses', label: 'All Statuses' },
                  { value: 'Active', label: 'Active' },
                  { value: 'Setup', label: 'Setup' },
                ]}
                value={status}
                onChange={setStatus}
              />
              <Button variant="secondary" size="sm" icon={<SlidersHorizontal size={14} />}>
                Filters
              </Button>
            </div>

            <section>
              <div className="flex items-center justify-between mb-3">
                <div>
                  <h2 className="font-semibold text-[var(--ds-text-primary)]">Connected Apps</h2>
                  <p className="text-sm text-[var(--ds-text-secondary)]">Installed integrations across active projects</p>
                </div>
                <span className="text-sm text-[var(--ds-text-secondary)]">{filteredIntegrations.length} connected</span>
              </div>

              {filteredIntegrations.length === 0 ? (
                <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] py-16 text-center text-[var(--ds-text-secondary)]">
                  <ChevronDown size={32} className="mx-auto mb-3 opacity-40" />
                  <p className="text-sm">No integrations match your filters.</p>
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-4">
                  {filteredIntegrations.map(integration => (
                    <ConnectedCard
                      key={integration.id}
                      integration={integration}
                      onManage={item => showToast(`${item.name} settings opened`, item.status === 'setup' ? 'info' : 'success')}
                    />
                  ))}
                </div>
              )}
            </section>
          </div>

          <aside className="space-y-6">
            <CatalogList onSelect={item => showToast(`${item.name} selected`, item.state === 'available' ? 'success' : 'info')} />
            <SetupPanel />
            <ActivityPanel />
          </aside>
        </div>
      </main>

      {toast && (
        <Toast
          intent={toast.intent}
          title={toast.title}
          open
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
