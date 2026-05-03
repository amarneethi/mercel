'use client';

import { useState } from 'react';
import {
  Button, Tag, DataTable, Dropdown, Select, Search,
  Pagination, OverflowMenu, DatePicker,
} from 'aopends';
import {
  GitBranch, GitCommit, RefreshCw, CheckCircle, AlertCircle, Clock,
} from 'lucide-react';
import { deploymentsByProject } from '@/data/deployments';

const statusConfig = {
  ready: { intent: 'success', label: 'Ready', icon: <CheckCircle size={12} /> },
  building: { intent: 'info', label: 'Building', icon: <Clock size={12} /> },
  error: { intent: 'danger', label: 'Error', icon: <AlertCircle size={12} /> },
  canceled: { intent: 'default', label: 'Canceled' },
};

export default function DeploymentsTab({ project }) {
  const [branchFilter, setBranchFilter] = useState('');
  const [envFilter, setEnvFilter] = useState('');
  const [page, setPage] = useState(1);
  const [searchVal, setSearchVal] = useState('');
  const allDeployments = deploymentsByProject[project.id] || [];

  const filtered = allDeployments.filter(d => {
    if (branchFilter && d.branch !== branchFilter) return false;
    if (envFilter && d.environment !== envFilter) return false;
    if (searchVal && !d.commitMessage.toLowerCase().includes(searchVal.toLowerCase()) && !d.id.includes(searchVal)) return false;
    return true;
  });

  const branches = [...new Set(allDeployments.map(d => d.branch))];

  const columns = [
    {
      key: 'id',
      header: 'DEPLOYMENT',
      render: (val, row) => (
        <div>
          <div className="flex items-center gap-2">
            <code className="text-sm font-medium text-[var(--ds-text-brand)]">{val.replace('dpl_', '')}</code>
            {row.isCurrent && <Tag intent="info" size="sm">Current</Tag>}
          </div>
          <div className="flex items-center gap-1 mt-0.5">
            <Tag intent="default" size="sm">{row.environment}</Tag>
          </div>
        </div>
      ),
    },
    {
      key: 'status',
      header: 'STATUS',
      render: (val) => {
        const sc = statusConfig[val] || statusConfig.ready;
        return <Tag intent={sc.intent} size="sm">{sc.label}</Tag>;
      },
    },
    {
      key: 'branch',
      header: 'SOURCE',
      render: (val, row) => (
        <div className="space-y-0.5">
          <div className="flex items-center gap-1.5">
            <GitBranch size={12} className="text-[var(--ds-text-tertiary)]" />
            <code className="text-xs text-[var(--ds-text-primary)]">{val}</code>
          </div>
          <div className="flex items-center gap-1.5">
            <GitCommit size={12} className="text-[var(--ds-text-tertiary)]" />
            <span className="text-xs text-[var(--ds-text-secondary)]">{row.commitHash} {row.commitMessage}</span>
          </div>
        </div>
      ),
    },
    {
      key: 'duration',
      header: 'DURATION',
      render: (val) => <span className="text-sm text-[var(--ds-text-secondary)]">{val}</span>,
    },
    {
      key: 'deployedAt',
      header: 'DEPLOYED',
      render: (val, row) => (
        <div>
          <div className="text-sm text-[var(--ds-text-primary)]">{val}</div>
          <div className="text-xs text-[var(--ds-text-secondary)]">by {row.author}</div>
        </div>
      ),
    },
    {
      key: 'actions',
      header: '',
      render: () => (
        <OverflowMenu
          items={[
            { label: 'Visit', onClick: () => {} },
            { label: 'View Build Logs', onClick: () => {} },
            { divider: true },
            { label: 'Promote to Production', onClick: () => {} },
            { label: 'Rollback to this', onClick: () => {} },
          ]}
          align="right"
          size="sm"
        />
      ),
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ds-text-primary)]">Deployments</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <RefreshCw size={12} className="text-[var(--ds-text-secondary)]" />
            <span className="text-sm text-[var(--ds-text-secondary)]">Continuously generated from</span>
            <span className="text-sm font-medium text-[var(--ds-text-brand)]">{project.repo}</span>
          </div>
        </div>
        <OverflowMenu items={[{ label: 'Export CSV', onClick: () => {} }]} />
      </div>

      <div className="flex items-center gap-3">
        <Search
          value={searchVal}
          onChange={setSearchVal}
          placeholder="Search deployments..."
          size="sm"
        />
        <Select
          options={['All Branches', ...branches]}
          value={branchFilter}
          onChange={v => setBranchFilter(v === 'All Branches' ? '' : v)}
          placeholder="All Branches"
        />
        <DatePicker
          label=""
          placeholder="Select Date Range"
          mode="range"
        />
        <Select
          options={['All Environments', 'Production', 'Preview']}
          value={envFilter}
          onChange={v => setEnvFilter(v === 'All Environments' ? '' : v)}
          placeholder="All Environments"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        size="md"
        emptyMessage="No deployments match your filters"
      />

      {filtered.length > 5 && (
        <Pagination
          value={page}
          totalPages={Math.ceil(filtered.length / 5)}
          totalItems={filtered.length}
          pageSize={5}
          onChange={setPage}
          showItemCount
        />
      )}
    </div>
  );
}
