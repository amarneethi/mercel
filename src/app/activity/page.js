'use client';

import { useState, useMemo } from 'react';
import {
  Header, Button, Dropdown, Tag, NotificationList,
} from 'aopends';
import {
  Bell, Rocket, Globe, Settings, UserPlus, Plug, FolderPlus,
  GitBranch, GitCommit, AlertCircle, ChevronDown,
} from 'lucide-react';
import { activityEvents, activityTypeOptions, activityDateOptions } from '@/data/activity';
import { projects } from '@/data/projects';

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const notificationItems = [
  { title: 'Slack permissions expired', description: 'Reconnect Slack to resume deployment alerts', timestamp: '1h ago', severity: 'warning', unread: true },
  { title: 'GitHub integration connected', description: 'Repository sync is active for nextjs-blog', timestamp: '12m ago', severity: 'info', unread: false },
];

const eventIconMap = {
  deployment: Rocket,
  domain: Globe,
  env: Settings,
  member: UserPlus,
  integration: Plug,
  project: FolderPlus,
};

function EventIcon({ type, failed }) {
  const Icon = failed ? AlertCircle : (eventIconMap[type] || Settings);
  return (
    <div className="w-9 h-9 rounded-[var(--ds-radius-md)] border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)] flex items-center justify-center flex-shrink-0">
      <Icon
        size={16}
        className={failed ? 'text-red-500' : 'text-[var(--ds-text-secondary)]'}
      />
    </div>
  );
}

function DeploymentMeta({ meta }) {
  return (
    <div className="flex items-center gap-3 mt-1">
      <span className="flex items-center gap-1 text-xs text-[var(--ds-text-tertiary)]">
        <GitBranch size={12} className="text-[var(--ds-text-tertiary)]" />
        <code className="text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]">
          {meta.branch}
        </code>
      </span>
      <span className="flex items-center gap-1 text-xs text-[var(--ds-text-tertiary)]">
        <GitCommit size={12} className="text-[var(--ds-text-tertiary)]" />
        <code className="text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]">
          {meta.commitHash}
        </code>
      </span>
      <span className="text-xs text-[var(--ds-text-tertiary)] truncate">{meta.commitMessage}</span>
    </div>
  );
}

function EventDescription({ event }) {
  const actorSpan = (
    <span className="font-semibold text-[var(--ds-text-primary)]">{event.actor}</span>
  );
  const projectSpan = event.project && (
    <span className="font-semibold text-[var(--ds-text-primary)]">{event.project}</span>
  );

  if (event.type === 'deployment') {
    const { meta } = event;
    const envIntent = meta.environment === 'Production' ? 'success' : 'default';
    if (meta.status === 'failed') {
      return (
        <div>
          <p className="text-sm text-[var(--ds-text-primary)]">
            {actorSpan}
            <span className="text-[var(--ds-text-secondary)]"> — deployment failed for </span>
            {projectSpan}
          </p>
          <DeploymentMeta meta={meta} />
          {meta.errorMessage && (
            <p className="text-xs text-red-500 mt-1">{meta.errorMessage}</p>
          )}
        </div>
      );
    }
    return (
      <div>
        <p className="text-sm text-[var(--ds-text-primary)] flex items-center gap-1.5 flex-wrap">
          {actorSpan}
          <span className="text-[var(--ds-text-secondary)]">deployed</span>
          {projectSpan}
          <span className="text-[var(--ds-text-secondary)]">to</span>
          <Tag intent={envIntent} size="sm">{meta.environment}</Tag>
        </p>
        <DeploymentMeta meta={meta} />
      </div>
    );
  }

  if (event.type === 'domain') {
    return (
      <p className="text-sm text-[var(--ds-text-primary)]">
        {actorSpan}
        <span className="text-[var(--ds-text-secondary)]"> added domain </span>
        <span className="font-semibold text-[var(--ds-text-primary)]">{event.meta.domain}</span>
        <span className="text-[var(--ds-text-secondary)]"> to </span>
        {projectSpan}
      </p>
    );
  }

  if (event.type === 'env') {
    return (
      <p className="text-sm text-[var(--ds-text-primary)]">
        {actorSpan}
        <span className="text-[var(--ds-text-secondary)]"> updated environment variable </span>
        <code className="text-xs bg-[var(--ds-bg-tertiary)] px-1.5 py-0.5 rounded text-[var(--ds-text-secondary)]">
          {event.meta.varName}
        </code>
        <span className="text-[var(--ds-text-secondary)]"> in </span>
        {projectSpan}
      </p>
    );
  }

  if (event.type === 'member') {
    return (
      <p className="text-sm text-[var(--ds-text-primary)]">
        {actorSpan}
        <span className="text-[var(--ds-text-secondary)]"> invited </span>
        <span className="font-semibold text-[var(--ds-text-primary)]">{event.meta.invitee}</span>
        <span className="text-[var(--ds-text-secondary)]"> as </span>
        <span className="font-semibold text-[var(--ds-text-primary)]">{event.meta.role}</span>
      </p>
    );
  }

  if (event.type === 'integration') {
    return (
      <p className="text-sm text-[var(--ds-text-primary)]">
        {actorSpan}
        <span className="text-[var(--ds-text-secondary)]"> installed integration </span>
        <span className="font-semibold text-[var(--ds-text-primary)]">{event.meta.integrationName}</span>
      </p>
    );
  }

  if (event.type === 'project') {
    return (
      <p className="text-sm text-[var(--ds-text-primary)]">
        {actorSpan}
        <span className="text-[var(--ds-text-secondary)]"> created project </span>
        {projectSpan}
      </p>
    );
  }

  return null;
}

function EventRow({ event, isFirst }) {
  const isFailed = event.type === 'deployment' && event.meta.status === 'failed';
  return (
    <div className={`flex items-start gap-4 py-4 ${isFirst ? '' : 'border-t border-[var(--ds-border-primary)]'}`}>
      <EventIcon type={event.type} failed={isFailed} />
      <div className="flex-1 min-w-0">
        <EventDescription event={event} />
      </div>
      <span className="text-xs text-[var(--ds-text-tertiary)] flex-shrink-0 mt-0.5 whitespace-nowrap">
        {event.timeLabel}
      </span>
    </div>
  );
}

function DayGroup({ label, events }) {
  if (!events.length) return null;
  return (
    <div className="mb-6">
      <p className="text-xs font-semibold text-[var(--ds-text-tertiary)] uppercase tracking-wider mb-3">
        {label}
      </p>
      <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] bg-[var(--ds-bg-primary)] overflow-hidden px-4">
        {events.map((event, i) => (
          <EventRow key={event.id} event={event} isFirst={i === 0} />
        ))}
      </div>
    </div>
  );
}

export default function ActivityPage() {
  const [showNotifications, setShowNotifications] = useState(false);
  const [typeFilter, setTypeFilter] = useState('all');
  const [projectFilter, setProjectFilter] = useState('all');
  const [dateFilter, setDateFilter] = useState('7d');
  const [visibleCount, setVisibleCount] = useState(8);

  const projectOptions = useMemo(() => [
    { value: 'all', label: 'All projects' },
    ...projects.map(p => ({ value: p.id, label: p.name })),
  ], []);

  const filteredEvents = useMemo(() => {
    return activityEvents.filter(event => {
      if (typeFilter !== 'all' && event.type !== typeFilter) return false;
      if (projectFilter !== 'all' && event.project !== projectFilter) return false;
      return true;
    }).slice(0, visibleCount);
  }, [typeFilter, projectFilter, visibleCount]);

  const todayEvents = filteredEvents.filter(e => e.day === 'today');
  const yesterdayEvents = filteredEvents.filter(e => e.day === 'yesterday');
  const hasMore = filteredEvents.length < activityEvents.filter(e => {
    if (typeFilter !== 'all' && e.type !== typeFilter) return false;
    if (projectFilter !== 'all' && e.project !== projectFilter) return false;
    return true;
  }).length;

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)]">
      <Header
        logo={<Logo />}
        productName="Alex Smith's projects"
        items={[
          { label: 'Overview', href: '/' },
          { label: 'Integrations', href: '/integrations' },
          { label: 'Activity', href: '/activity', active: true },
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
        <div className="flex items-center justify-between mb-6">
          <h1 className="font-semibold text-[var(--ds-text-primary)]">Activity</h1>
        </div>

        <div className="flex items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3">
            <Dropdown
              options={activityTypeOptions}
              value={typeFilter}
              onChange={setTypeFilter}
            />
            <Dropdown
              options={projectOptions}
              value={projectFilter}
              onChange={setProjectFilter}
            />
          </div>
          <Dropdown
            options={activityDateOptions}
            value={dateFilter}
            onChange={setDateFilter}
          />
        </div>

        {filteredEvents.length === 0 ? (
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] bg-[var(--ds-bg-primary)] px-6 py-16 flex flex-col items-center gap-3">
            <ChevronDown size={32} className="text-[var(--ds-text-tertiary)]" />
            <p className="text-sm text-[var(--ds-text-secondary)]">No activity found for the selected filters.</p>
          </div>
        ) : (
          <>
            <DayGroup label="Today" events={todayEvents} />
            <DayGroup label="Yesterday" events={yesterdayEvents} />
            {hasMore && (
              <div className="flex justify-center pt-2 pb-4">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => setVisibleCount(c => c + 8)}
                >
                  Load more
                </Button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
