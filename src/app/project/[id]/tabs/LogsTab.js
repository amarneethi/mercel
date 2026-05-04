'use client';

import { useState } from 'react';
import { Button, Search, Select, Checkbox, OverflowMenu } from 'aopends';
import { Terminal, RefreshCw } from 'lucide-react';
import { logEntries } from '@/data/logs';

export default function LogsTab({ project }) {
  const [search, setSearch] = useState('');
  const [levelFilters, setLevelFilters] = useState({ info: false, warning: false, error: false });

  const toggleLevel = (level) => setLevelFilters(prev => ({ ...prev, [level]: !prev[level] }));
  const anyLevelSelected = Object.values(levelFilters).some(Boolean);

  const filtered = logEntries.filter(entry => {
    if (search && !entry.request.includes(search) && !entry.message.includes(search)) return false;
    if (anyLevelSelected && !levelFilters[entry.level]) return false;
    return true;
  });

  const statusColor = (code) => {
    if (code >= 500) return 'text-red-600';
    if (code >= 400) return 'text-amber-600';
    if (code >= 300) return 'text-blue-600';
    return 'text-green-600';
  };

  return (
    <div className="flex gap-0 -mx-6">
      {/* Sidebar */}
      <div className="w-48 flex-shrink-0 border-r border-[var(--ds-border-primary)] px-4 py-4 space-y-4">
        <div>
          <h3 className="text-xs font-semibold text-[var(--ds-text-secondary)] uppercase tracking-wider mb-2">Filters</h3>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--ds-text-primary)] mb-2">Timeline</p>
          <Select options={['Past 30 minutes', 'Past 1 hour', 'Past 24 hours', 'Past 7 days']} value="Past 30 minutes" onChange={() => {}} size="sm" />
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--ds-text-primary)] mb-2">Level</p>
          <div className="space-y-2">
            <Checkbox label="Info" checked={levelFilters.info} onChange={() => toggleLevel('info')} size="sm" />
            <Checkbox label="Warning" checked={levelFilters.warning} onChange={() => toggleLevel('warning')} size="sm" />
            <Checkbox label="Error" checked={levelFilters.error} onChange={() => toggleLevel('error')} size="sm" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--ds-text-primary)] mb-2">Environment</p>
          <div className="space-y-2">
            <Checkbox label="Production" defaultChecked size="sm" />
            <Checkbox label="Preview" size="sm" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--ds-text-primary)] mb-2">Request Method</p>
          <div className="space-y-2">
            <Checkbox label="GET" defaultChecked size="sm" />
            <Checkbox label="POST" defaultChecked size="sm" />
            <Checkbox label="DELETE" size="sm" />
          </div>
        </div>
        <div>
          <p className="text-xs font-medium text-[var(--ds-text-primary)] mb-2">Cache</p>
          <div className="space-y-2">
            <Checkbox label="HIT" size="sm" />
            <Checkbox label="MISS" size="sm" />
          </div>
        </div>
      </div>

      {/* Log content */}
      <div className="flex-1 px-6 py-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex-1">
            <Search
              value={search}
              onChange={setSearch}
              placeholder="Search logs..."
              size="sm"
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1.5">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-sm font-medium text-[var(--ds-text-primary)]">Live</span>
            </div>
            <Button variant="ghost" size="sm" icon={<RefreshCw size={14} />} />
            <OverflowMenu items={[{ label: 'Download logs', onClick: () => {} }, { label: 'Clear', onClick: () => {} }]} size="sm" />
          </div>
        </div>

        {/* Timeline markers */}
        <div className="flex items-center gap-6 text-xs text-[var(--ds-text-tertiary)] border-b border-[var(--ds-border-primary)] pb-2">
          {['10:46', '10:48', '10:50', '10:52', '10:54', '10:55'].map(t => (
            <span key={t}>{t}</span>
          ))}
        </div>

        {/* Column headers */}
        <div className="grid grid-cols-[100px_60px_1fr_1fr] gap-3 text-xs font-medium text-[var(--ds-text-secondary)] uppercase tracking-wide px-2">
          <span>Time</span>
          <span>Status</span>
          <span>Request</span>
          <span>Message</span>
        </div>

        {/* Log rows */}
        <div className="space-y-0.5">
          {filtered.length === 0 ? (
            <div className="text-center py-12">
              <Terminal size={32} className="mx-auto mb-3 text-[var(--ds-text-tertiary)]" />
              <p className="text-sm text-[var(--ds-text-secondary)]">There are no logs in this time range</p>
              <div className="flex gap-2 justify-center mt-4">
                <Button variant="primary" size="sm" onClick={() => { setSearch(''); setLevelFilters({ info: false, warning: false, error: false }); }}>Refresh Query</Button>
                <Button variant="secondary" size="sm">Learn More</Button>
              </div>
            </div>
          ) : (
            filtered.map(entry => (
              <div
                key={entry.id}
                className="grid grid-cols-[100px_60px_1fr_1fr] gap-3 text-xs py-1.5 px-2 rounded hover:bg-[var(--ds-bg-hover)] font-mono"
              >
                <span className="text-[var(--ds-text-tertiary)]">{entry.time}</span>
                <span className={`font-semibold ${statusColor(entry.status)}`}>{entry.status}</span>
                <span className="text-[var(--ds-text-primary)] truncate">{entry.request}</span>
                <span className="text-[var(--ds-text-secondary)] truncate">{entry.message}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
