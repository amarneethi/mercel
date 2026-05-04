'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import {
  Header, Tabs, Button, Tag, DataTable, Dropdown, Select, Search,
  Modal, Form, FormGroup, FormRow, FormActions, TextInput, Toggle,
  Checkbox, Breadcrumb, Pagination, OverflowMenu, Toast, Notification,
  Banner, Spinner, Skeleton, SkeletonText, TableSkeleton,
  KpiCard, AreaChart, BarChart, PieChart, LineChart,
  RankedList, ActivityFeed, NotificationList, TableList, DatePicker,
} from 'aopends';
import {
  GitBranch, GitCommit, ExternalLink, RefreshCw, ChevronRight,
  AlertCircle, CheckCircle, Clock, Zap, Shield, Database, HardDrive,
  Globe, Settings, FileText, Activity, BarChart2, Terminal,
  ArrowLeft, Plus, RotateCcw, Eye, Code, ChevronDown, Filter,
  Server, Cpu, Wifi, Bell, Layers,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { deploymentsByProject } from '@/data/deployments';
import { analyticsData, speedMetrics } from '@/data/analytics';
import { logEntries } from '@/data/logs';
import { firewallData } from '@/data/firewall';

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

// ─── Status helpers ───────────────────────────────────────────────────────────
const statusConfig = {
  ready: { intent: 'success', label: 'Ready', icon: <CheckCircle size={12} /> },
  building: { intent: 'info', label: 'Building', icon: <Clock size={12} /> },
  error: { intent: 'danger', label: 'Error', icon: <AlertCircle size={12} /> },
  canceled: { intent: 'default', label: 'Canceled' },
};

// ─── Tab: Project ─────────────────────────────────────────────────────────────
function ProjectTab({ project }) {
  const deployments = deploymentsByProject[project.id] || [];
  const current = deployments.find(d => d.isCurrent) || deployments[0];
  const sc = statusConfig[project.status] || statusConfig.ready;

  const activityItems = deployments.slice(0, 5).map(d => ({
    content: `${d.commitMessage} on ${d.branch}`,
    timestamp: d.deployedAt,
    color: d.status === 'ready' ? 'green' : d.status === 'error' ? 'red' : 'blue',
  }));

  return (
    <div className="space-y-6">
      {/* Production Deployment */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-semibold text-[var(--ds-text-primary)]">Production Deployment</h2>
            <p className="text-sm text-[var(--ds-text-secondary)]">The deployment that is available to your visitors.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm" icon={<FileText size={14} />}>Build Logs</Button>
            <Button variant="secondary" size="sm" icon={<Terminal size={14} />}>Runtime Logs</Button>
            <Button variant="secondary" size="sm" icon={<RotateCcw size={14} />}>Instant Rollback</Button>
          </div>
        </div>

        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-5 bg-[var(--ds-bg-primary)]">
          {current ? (
            <div className="flex gap-6">
              {/* Preview thumbnail */}
              <div className="w-48 h-32 bg-gradient-to-br from-[var(--ds-bg-secondary)] to-[var(--ds-bg-tertiary)] rounded-[var(--ds-radius-md)] flex items-center justify-center flex-shrink-0 border border-[var(--ds-border-primary)]">
                <Globe size={32} className="text-[var(--ds-text-tertiary)]" />
              </div>

              {/* Deployment details */}
              <div className="flex-1 grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-[var(--ds-text-secondary)] mb-1">Deployment</p>
                  <p className="text-sm font-medium text-[var(--ds-text-brand)] truncate">{current.url}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--ds-text-secondary)] mb-1">Domains</p>
                  <div className="flex items-center gap-1">
                    <p className="text-sm font-medium text-[var(--ds-text-primary)] truncate">{project.url}</p>
                    <ExternalLink size={12} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[var(--ds-text-secondary)] mb-1">Status</p>
                  <Tag intent={sc.intent} size="sm">{sc.label}</Tag>
                </div>
                <div>
                  <p className="text-xs text-[var(--ds-text-secondary)] mb-1">Created</p>
                  <p className="text-sm text-[var(--ds-text-primary)]">{current.deployedAt} by {current.author}</p>
                </div>
                <div>
                  <p className="text-xs text-[var(--ds-text-secondary)] mb-1">Source</p>
                  <div className="flex items-center gap-1.5">
                    <GitBranch size={12} className="text-[var(--ds-text-tertiary)]" />
                    <code className="text-xs text-[var(--ds-text-primary)]">{current.branch}</code>
                    <GitCommit size={12} className="text-[var(--ds-text-tertiary)]" />
                    <code className="text-xs text-[var(--ds-text-primary)]">{current.commitHash}</code>
                    <span className="text-xs text-[var(--ds-text-secondary)]">{current.commitMessage}</span>
                  </div>
                </div>
                <div>
                  <p className="text-xs text-[var(--ds-text-secondary)] mb-1">Duration</p>
                  <p className="text-sm text-[var(--ds-text-primary)]">{current.duration}</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Tag intent="default">No Production Deployment</Tag>
              <p className="text-sm text-[var(--ds-text-secondary)] mt-2">Push to the main branch to deploy.</p>
            </div>
          )}
        </div>

        {project.hasProductionDeploy && (
          <div className="mt-3 p-3 bg-[var(--ds-bg-secondary)] rounded-[var(--ds-radius-md)] flex items-center justify-between">
            <p className="text-sm text-[var(--ds-text-secondary)]">
              To update your Production Deployment, push to the <code className="bg-[var(--ds-bg-tertiary)] px-1 rounded text-xs">{project.branch}</code> branch.
            </p>
            <Button variant="ghost" size="sm">Learn More</Button>
          </div>
        )}
      </div>

      {/* Active Branches */}
      {project.activeBranches?.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 className="font-semibold text-[var(--ds-text-primary)]">Active Branches</h2>
              <p className="text-sm text-[var(--ds-text-secondary)]">
                Open branches on <span className="font-medium">{project.repo}</span> that have been deployed.
              </p>
            </div>
          </div>
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden">
            {project.activeBranches.map((branch, i) => (
              <div
                key={branch.name}
                className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''} hover:bg-[var(--ds-bg-hover)]`}
              >
                <div className="flex items-center gap-3">
                  <GitBranch size={14} className="text-[var(--ds-text-secondary)]" />
                  <div>
                    <code className="text-sm font-medium text-[var(--ds-text-primary)]">{branch.name}</code>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <GitCommit size={11} className="text-[var(--ds-text-tertiary)]" />
                      <span className="text-xs text-[var(--ds-text-secondary)]">{branch.commitHash} — {branch.commitMessage}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-[var(--ds-text-tertiary)]">{branch.deployedAt}</span>
                  <Tag intent="success" size="sm">Ready</Tag>
                  <Button variant="ghost" size="sm" icon={<ExternalLink size={12} />}>Visit</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      <div>
        <h2 className="font-semibold text-[var(--ds-text-primary)] mb-3">Recent Activity</h2>
        <ActivityFeed items={activityItems} maxHeight="200px" />
      </div>
    </div>
  );
}

// ─── Tab: Deployments ─────────────────────────────────────────────────────────
function DeploymentsTab({ project }) {
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
            <Link
              href={`/project/${project.id}/deployments/${val}`}
              className="text-sm font-medium text-[var(--ds-text-brand)] hover:underline font-mono"
            >
              {val.replace('dpl_', '')}
            </Link>
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
      render: (_, row) => (
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

// ─── Tab: Analytics ──────────────────────────────────────────────────────────
function AnalyticsTab({ project }) {
  const [metric, setMetric] = useState('visitors');
  const [period, setPeriod] = useState('7d');

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ds-text-primary)]">Web Analytics</h2>
          <div className="flex items-center gap-2 mt-1">
            <Globe size={13} className="text-[var(--ds-text-secondary)]" />
            <span className="text-sm text-[var(--ds-text-secondary)]">{project.url}</span>
            <span className="flex items-center gap-1">
              <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
              <span className="text-xs text-green-600 font-medium">2 online</span>
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Select
            options={['Production', 'Preview']}
            value="Production"
            onChange={() => {}}
          />
          <Select
            options={[
              { value: '7d', label: 'Last 7 Days' },
              { value: '30d', label: 'Last 30 Days' },
              { value: '90d', label: 'Last 90 Days' },
            ]}
            value={period}
            onChange={setPeriod}
          />
        </div>
      </div>

      {/* KPI Cards + Chart */}
      <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden">
        {/* KPI selectors */}
        <div className="flex border-b border-[var(--ds-border-primary)]">
          <button
            onClick={() => setMetric('visitors')}
            className={`px-6 py-4 text-left border-b-2 transition-colors ${metric === 'visitors' ? 'border-[var(--ds-border-brand)] bg-[var(--ds-bg-primary)]' : 'border-transparent bg-[var(--ds-bg-secondary)] hover:bg-[var(--ds-bg-hover)]'}`}
          >
            <div className="text-xs text-[var(--ds-text-secondary)] mb-1">Visitors</div>
            <div className="text-2xl font-bold text-[var(--ds-text-primary)]">{analyticsData.visitors}</div>
          </button>
          <button
            onClick={() => setMetric('pageViews')}
            className={`px-6 py-4 text-left border-b-2 transition-colors ${metric === 'pageViews' ? 'border-[var(--ds-border-brand)] bg-[var(--ds-bg-primary)]' : 'border-transparent bg-[var(--ds-bg-secondary)] hover:bg-[var(--ds-bg-hover)]'}`}
          >
            <div className="text-xs text-[var(--ds-text-secondary)] mb-1">Page Views</div>
            <div className="text-2xl font-bold text-[var(--ds-text-primary)]">{analyticsData.pageViews}</div>
          </button>
          <div className="flex-1 bg-[var(--ds-bg-secondary)] border-b-2 border-transparent" />
        </div>

        {/* Chart */}
        <div className="p-4">
          <AreaChart
            variant="gradient"
            data={analyticsData.trafficData}
            dataKeys={[metric]}
            xAxisKey="date"
            height={220}
            showGrid
            showTooltip
            showLegend={false}
          />
        </div>
      </div>

      {/* Pages + Referrers */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--ds-text-primary)]">Pages</h3>
            <span className="text-xs text-[var(--ds-text-secondary)] uppercase tracking-wide">Visitors</span>
          </div>
          <RankedList items={analyticsData.pages.map(p => ({ label: p.path, value: String(p.visitors) }))} valueLabel="Visitors" />
        </div>
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--ds-text-primary)]">Referrers</h3>
            <span className="text-xs text-[var(--ds-text-secondary)] uppercase tracking-wide">Visitors</span>
          </div>
          <RankedList items={analyticsData.referrers.map(r => ({ label: r.source, value: String(r.visitors) }))} valueLabel="Visitors" />
        </div>
      </div>

      {/* Countries + OS + Browsers */}
      <div className="grid grid-cols-3 gap-4">
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--ds-text-primary)]">Countries</h3>
            <span className="text-xs text-[var(--ds-text-secondary)]">VISITORS</span>
          </div>
          <RankedList items={analyticsData.countries} valueLabel="Visitors" />
        </div>
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--ds-text-primary)]">Operating Systems</h3>
            <span className="text-xs text-[var(--ds-text-secondary)]">VISITORS</span>
          </div>
          <RankedList items={analyticsData.operatingSystems} valueLabel="Visitors" />
        </div>
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium text-[var(--ds-text-primary)]">Browsers</h3>
            <span className="text-xs text-[var(--ds-text-secondary)]">VISITORS</span>
          </div>
          <RankedList items={analyticsData.browsers} valueLabel="Visitors" />
        </div>
      </div>

      {/* Events + Flags empty states */}
      <div className="grid grid-cols-2 gap-4">
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-6 flex flex-col items-center justify-center text-center min-h-32">
          <Plus size={24} className="text-[var(--ds-text-tertiary)] mb-2" />
          <h3 className="font-medium text-[var(--ds-text-primary)] mb-1">Events</h3>
          <p className="text-sm text-[var(--ds-text-secondary)]">Set up custom events to gain a deeper understanding of user behavior on your site.</p>
        </div>
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-6 flex flex-col items-center justify-center text-center min-h-32">
          <Layers size={24} className="text-[var(--ds-text-tertiary)] mb-2" />
          <h3 className="font-medium text-[var(--ds-text-primary)] mb-1">Flags <Tag intent="info" size="sm">Beta</Tag></h3>
          <p className="text-sm text-[var(--ds-text-secondary)]">Gain insights into how active feature flags impact user behavior.</p>
        </div>
      </div>
    </div>
  );
}

// ─── Tab: Speed Insights ──────────────────────────────────────────────────────
function SpeedInsightsTab({ project }) {
  const scoreColor = (score) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 50) return 'text-amber-600';
    return 'text-red-600';
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ds-text-primary)]">Speed Insights</h2>
          <div className="flex items-center gap-1.5 mt-1">
            <Globe size={13} className="text-[var(--ds-text-secondary)]" />
            <span className="text-sm text-[var(--ds-text-secondary)]">{project.url}</span>
          </div>
        </div>
        <div className="flex gap-2">
          <Select options={['Production', 'Preview']} value="Production" onChange={() => {}} />
          <Select options={['Desktop', 'Mobile']} value="Desktop" onChange={() => {}} />
        </div>
      </div>

      <Notification intent="info" title="Real Experience Score">
        Measured from real user interactions. Scores above 90 indicate a great end-user experience.
      </Notification>

      <div className="grid grid-cols-3 gap-4">
        <KpiCard
          label="Real Experience Score"
          value="92"
          variant="with-delta"
          delta={4.5}
          deltaFormat="absolute"
          deltaLabel="vs last week"
        />
        <KpiCard
          label="Page Load Time (P75)"
          value="1.8s"
          variant="with-trend"
          trendData={[2.1, 2.0, 1.95, 1.88, 1.82, 1.80, 1.8]}
          trendColor="#22c55e"
        />
        <KpiCard
          label="Core Web Vitals"
          value="5/5"
          variant="with-icon"
          icon={<CheckCircle size={20} />}
          iconColor="#22c55e"
        />
      </div>

      <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden">
        <div className="px-4 py-3 bg-[var(--ds-bg-secondary)] border-b border-[var(--ds-border-primary)]">
          <h3 className="font-medium text-[var(--ds-text-primary)]">Core Web Vitals</h3>
        </div>
        {Object.entries(speedMetrics).map(([key, m], i) => (
          <div key={key} className={`flex items-center justify-between px-4 py-3 ${i > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''}`}>
            <div>
              <p className="text-sm font-medium text-[var(--ds-text-primary)]">{m.label}</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-48 h-2 bg-[var(--ds-bg-tertiary)] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-green-500"
                  style={{ width: `${m.score}%` }}
                />
              </div>
              <span className={`text-sm font-semibold w-16 text-right ${scoreColor(m.score)}`}>
                {m.value}{m.unit}
              </span>
              <Tag intent="success" size="sm">Good</Tag>
            </div>
          </div>
        ))}
      </div>

      <LineChart
        variant="multi"
        data={[
          { date: 'Aug 22', lcp: 2.1, fcp: 1.0 },
          { date: 'Aug 23', lcp: 2.0, fcp: 0.98 },
          { date: 'Aug 24', lcp: 1.95, fcp: 0.95 },
          { date: 'Aug 25', lcp: 1.88, fcp: 0.93 },
          { date: 'Aug 26', lcp: 1.85, fcp: 0.91 },
          { date: 'Aug 27', lcp: 1.82, fcp: 0.90 },
          { date: 'Aug 28', lcp: 1.80, fcp: 0.90 },
        ]}
        dataKeys={['lcp', 'fcp']}
        xAxisKey="date"
        height={200}
        title="Performance Trends"
        showGrid
        showTooltip
        showLegend
      />
    </div>
  );
}

// ─── Tab: Logs ────────────────────────────────────────────────────────────────
function LogsTab({ project }) {
  const [search, setSearch] = useState('');
  const [levelFilters, setLevelFilters] = useState({ info: false, warning: false, error: false });
  const [isLive, setIsLive] = useState(true);

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

// ─── Tab: Firewall ────────────────────────────────────────────────────────────
function FirewallTab({ project }) {
  const [view, setView] = useState('Overview');
  const [showConfigModal, setShowConfigModal] = useState(false);

  const actionColor = (action) => {
    if (action === 'block') return 'danger';
    if (action === 'challenge') return 'warning';
    return 'success';
  };

  const ruleColumns = [
    { key: 'name', header: 'RULE', render: (val, row) => (
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full flex-shrink-0 ${row.action === 'block' ? 'bg-red-500' : row.action === 'challenge' ? 'bg-amber-500' : 'bg-green-500'}`} />
        <span className="text-sm font-medium text-[var(--ds-text-primary)]">{val}</span>
        <Tag intent="default" size="sm">{row.action}</Tag>
      </div>
    )},
    { key: 'amount', header: 'AMOUNT', render: (val) => <span className="text-sm text-[var(--ds-text-primary)]">{val}</span> },
    { key: 'ratio', header: 'RATIO', render: (val) => <span className="text-sm text-[var(--ds-text-secondary)]">{val}</span> },
    { key: 'actions', header: '', render: (_, row) => (
      <OverflowMenu items={[{ label: 'Edit rule', onClick: () => {} }, { label: 'Delete rule', danger: true, onClick: () => {} }]} size="sm" align="right" />
    )},
  ];

  const systemRules = firewallData.rules.filter(r => r.type === 'system');
  const customRules = firewallData.rules.filter(r => r.type === 'custom');

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-[var(--ds-text-primary)]">Firewall</h2>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm" onClick={() => setShowConfigModal(true)}>Configure</Button>
          <Button variant="secondary" size="sm">View Activity</Button>
          <Button variant="primary" size="sm" icon={<Shield size={14} />}>Attack Challenge Mode</Button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select options={['Overview', 'Custom Rules', 'Managed Rules']} value={view} onChange={setView} />
        <Select options={['Group by Category', 'Group by Action']} value="Group by Category" onChange={() => {}} />
        <div className="flex items-center gap-1.5 ml-auto">
          <span className="inline-block w-2 h-2 rounded-full bg-green-500" />
          <span className="text-sm text-[var(--ds-text-primary)]">Live</span>
        </div>
      </div>

      <AreaChart
        variant="stacked"
        data={firewallData.activityChart}
        dataKeys={['allowed', 'blocked']}
        xAxisKey="time"
        height={200}
        showGrid
        showTooltip
        showLegend
        title=""
      />

      {/* System rules */}
      <div>
        <div className="flex items-center gap-2 mb-2">
          <ChevronDown size={14} className="text-[var(--ds-text-secondary)]" />
          <span className="text-sm font-semibold text-[var(--ds-text-primary)]">System</span>
          <span className="text-xs text-[var(--ds-text-secondary)]">Amount</span>
          <span className="text-xs text-[var(--ds-text-secondary)] ml-auto">Ratio</span>
        </div>
        <DataTable columns={ruleColumns} data={systemRules} size="sm" />
      </div>

      {/* Custom rules */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <ChevronDown size={14} className="text-[var(--ds-text-secondary)]" />
            <span className="text-sm font-semibold text-[var(--ds-text-primary)]">Custom Rules</span>
          </div>
          <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Add Rule</Button>
        </div>
        <DataTable columns={ruleColumns} data={customRules} size="sm" />
      </div>

      <Modal
        open={showConfigModal}
        onClose={() => setShowConfigModal(false)}
        title="Configure Firewall"
        size="md"
        footer={
          <FormActions align="right">
            <Button variant="secondary" onClick={() => setShowConfigModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowConfigModal(false)}>Save</Button>
          </FormActions>
        }
      >
        <Form>
          <FormGroup legend="Bot Protection">
            <Toggle label="Enable bot protection" defaultChecked />
            <Toggle label="Challenge suspicious traffic" defaultChecked />
          </FormGroup>
          <FormGroup legend="Rate Limiting">
            <TextInput label="Max requests per minute" defaultValue="100" type="number" />
          </FormGroup>
        </Form>
      </Modal>
    </div>
  );
}

// ─── Tab: Storage ─────────────────────────────────────────────────────────────
function StorageTab({ project }) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDb, setSelectedDb] = useState(null);

  const databases = [
    { id: 'edge-config', name: 'Edge Config', description: 'Ultra-low latency reads', icon: <Zap size={20} />, color: '#f59e0b' },
    { id: 'blob', name: 'Blob', description: 'Fast object storage', badge: 'Beta', icon: <HardDrive size={20} />, color: '#f97316' },
    { id: 'postgres', name: 'Postgres', description: 'Serverless SQL', icon: <Database size={20} />, color: '#3b82f6' },
    { id: 'kv', name: 'KV', description: 'Durable Redis', icon: <Server size={20} />, color: '#8b5cf6' },
  ];

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-[var(--ds-text-primary)]">Storage</h2>
          <p className="text-sm text-[var(--ds-text-secondary)] mt-1">
            Read and write directly to databases and stores connected to this project.
          </p>
        </div>
      </div>

      <Banner intent="info">
        Connect a database to start reading and writing data from your project.
      </Banner>

      <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden">
        <div className="flex flex-col items-center py-10 px-6 text-center border-b border-[var(--ds-border-primary)]">
          <Database size={40} className="text-[var(--ds-text-tertiary)] mb-3" />
          <h3 className="font-semibold text-[var(--ds-text-primary)] mb-1">Create a database</h3>
          <p className="text-sm text-[var(--ds-text-secondary)]">Create databases and stores that you can connect to your projects.</p>
        </div>

        {databases.map((db, i) => (
          <div
            key={db.id}
            className={`flex items-center justify-between px-5 py-3.5 ${i > 0 ? 'border-t border-[var(--ds-border-primary)]' : ''} hover:bg-[var(--ds-bg-hover)]`}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-8 h-8 rounded-[var(--ds-radius-md)] flex items-center justify-center text-white flex-shrink-0"
                style={{ backgroundColor: db.color }}
              >
                {db.icon}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--ds-text-primary)]">{db.name}</span>
                  {db.badge && <Tag intent="info" size="sm">{db.badge}</Tag>}
                </div>
                <p className="text-xs text-[var(--ds-text-secondary)]">{db.description}</p>
              </div>
            </div>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => { setSelectedDb(db); setShowCreateModal(true); }}
            >
              Create
            </Button>
          </div>
        ))}
      </div>

      <Modal
        open={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        title={`Create ${selectedDb?.name} Database`}
        size="sm"
        footer={
          <FormActions align="right">
            <Button variant="secondary" onClick={() => setShowCreateModal(false)}>Cancel</Button>
            <Button variant="primary" onClick={() => setShowCreateModal(false)}>Create</Button>
          </FormActions>
        }
      >
        <Form>
          <FormGroup legend="">
            <TextInput label="Database name" placeholder={`my-${selectedDb?.id}`} required />
            <Select label="Region" options={['US East (N. Virginia)', 'EU West (Ireland)', 'Asia Pacific (Singapore)']} value="" onChange={() => {}} />
          </FormGroup>
        </Form>
      </Modal>
    </div>
  );
}

// ─── Tab: Settings ────────────────────────────────────────────────────────────
function SettingsTab({ project }) {
  const [projectName, setProjectName] = useState(project.name);
  const [framework, setFramework] = useState(project.framework);
  const [buildCmd, setBuildCmd] = useState('');
  const [outputDir, setOutputDir] = useState('');
  const [installCmd, setInstallCmd] = useState('');
  const [devCmd, setDevCmd] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

  const sections = [
    { id: 'general', label: 'General' },
    { id: 'domains', label: 'Domains' },
    { id: 'env', label: 'Environment Variables' },
    { id: 'git', label: 'Git' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'functions', label: 'Functions' },
    { id: 'cron', label: 'Cron Jobs' },
    { id: 'security', label: 'Security' },
    { id: 'advanced', label: 'Advanced' },
  ];

  return (
    <div className="flex gap-8">
      {/* Settings sidebar nav */}
      <div className="w-44 flex-shrink-0">
        <nav className="space-y-0.5">
          {sections.map(s => (
            <button
              key={s.id}
              onClick={() => setActiveSection(s.id)}
              className={`w-full text-left px-3 py-2 text-sm rounded-[var(--ds-radius-md)] transition-colors ${activeSection === s.id ? 'bg-[var(--ds-bg-selected)] text-[var(--ds-text-brand)] font-medium' : 'text-[var(--ds-text-secondary)] hover:bg-[var(--ds-bg-hover)]'}`}
            >
              {s.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Settings content */}
      <div className="flex-1 space-y-8">
        {activeSection === 'general' && (
          <>
            {/* Project Name */}
            <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-5">
              <h3 className="font-semibold text-[var(--ds-text-primary)] mb-1">Project Name</h3>
              <p className="text-sm text-[var(--ds-text-secondary)] mb-4">
                Used to identify your Project on the Dashboard, Mercel CLI and in the URL of your Deployments.
              </p>
              <FormRow>
                <TextInput
                  label=""
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  helperText={`mercel.app/login/${projectName}`}
                />
                <div className="flex items-end">
                  <Button
                    variant="secondary"
                    onClick={() => { setShowSavedToast(true); }}
                  >
                    Save
                  </Button>
                </div>
              </FormRow>
            </div>

            {/* Build Settings */}
            <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-5">
              <h3 className="font-semibold text-[var(--ds-text-primary)] mb-1">Build & Development Settings</h3>
              <p className="text-sm text-[var(--ds-text-secondary)] mb-4">
                When using a framework, it will be automatically detected. You can override the settings below.
              </p>
              <Form>
                <FormGroup legend="">
                  <Select
                    label="Framework Preset"
                    options={['Next.js', 'SvelteKit', 'Vite', 'Astro', 'Create React App', 'Remix', 'Nuxt', 'Other']}
                    value={framework}
                    onChange={setFramework}
                  />
                  <FormRow>
                    <TextInput label="Build Command" placeholder="next build" value={buildCmd} onChange={e => setBuildCmd(e.target.value)} />
                    <Button variant="ghost" size="sm">Override</Button>
                  </FormRow>
                  <FormRow>
                    <TextInput label="Output Directory" placeholder=".next" value={outputDir} onChange={e => setOutputDir(e.target.value)} />
                    <Button variant="ghost" size="sm">Override</Button>
                  </FormRow>
                  <FormRow>
                    <TextInput label="Install Command" placeholder="npm install" value={installCmd} onChange={e => setInstallCmd(e.target.value)} />
                    <Button variant="ghost" size="sm">Override</Button>
                  </FormRow>
                  <FormRow>
                    <TextInput label="Development Command" placeholder="next dev" value={devCmd} onChange={e => setDevCmd(e.target.value)} />
                    <Button variant="ghost" size="sm">Override</Button>
                  </FormRow>
                </FormGroup>
                <FormActions align="right">
                  <Button variant="primary" onClick={() => setShowSavedToast(true)}>Save</Button>
                </FormActions>
              </Form>
            </div>

            {/* Danger zone */}
            <div className="border border-red-200 rounded-[var(--ds-radius-lg)] p-5">
              <h3 className="font-semibold text-red-600 mb-1">Delete Project</h3>
              <p className="text-sm text-[var(--ds-text-secondary)] mb-4">
                This action is permanent and cannot be undone. All deployments and data will be deleted.
              </p>
              <Button variant="danger" onClick={() => setShowDeleteModal(true)}>Delete Project</Button>
            </div>
          </>
        )}

        {activeSection === 'env' && (
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[var(--ds-text-primary)]">Environment Variables</h3>
                <p className="text-sm text-[var(--ds-text-secondary)]">Available to your serverless functions and build commands.</p>
              </div>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Add Variable</Button>
            </div>
            <TableList
              columns={[
                { key: 'name', header: 'Name' },
                { key: 'value', header: 'Value' },
                { key: 'env', header: 'Environment' },
              ]}
              data={[
                { name: 'NEXT_PUBLIC_API_URL', value: '••••••••', env: 'Production, Preview, Dev' },
                { name: 'DATABASE_URL', value: '••••••••', env: 'Production' },
                { name: 'API_SECRET', value: '••••••••', env: 'Production, Preview' },
              ]}
            />
          </div>
        )}

        {activeSection === 'domains' && (
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-[var(--ds-text-primary)]">Domains</h3>
                <p className="text-sm text-[var(--ds-text-secondary)]">These domains are assigned to your Production Deployments.</p>
              </div>
              <Button variant="secondary" size="sm" icon={<Plus size={14} />}>Add Domain</Button>
            </div>
            <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-md)] overflow-hidden">
              <div className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-500" />
                  <span className="text-sm font-medium text-[var(--ds-text-primary)]">{project.url}</span>
                  <Tag intent="success" size="sm">Valid</Tag>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </div>
          </div>
        )}

        {['git', 'integrations', 'functions', 'cron', 'security', 'advanced'].includes(activeSection) && (
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-8 flex flex-col items-center text-center">
            <Settings size={32} className="text-[var(--ds-text-tertiary)] mb-3" />
            <h3 className="font-semibold text-[var(--ds-text-primary)] mb-1">{sections.find(s => s.id === activeSection)?.label}</h3>
            <p className="text-sm text-[var(--ds-text-secondary)]">Configure {sections.find(s => s.id === activeSection)?.label.toLowerCase()} settings for this project.</p>
          </div>
        )}
      </div>

      {/* Delete confirmation modal */}
      <Modal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        title="Delete Project"
        size="sm"
        footer={
          <FormActions align="right">
            <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>Cancel</Button>
            <Button variant="danger" onClick={() => setShowDeleteModal(false)}>Delete Project</Button>
          </FormActions>
        }
      >
        <Notification intent="error" title="This action cannot be undone">
          All deployments, logs, and associated data for <strong>{project.name}</strong> will be permanently deleted.
        </Notification>
        <div className="mt-4">
          <TextInput
            label={`Type "${project.name}" to confirm`}
            placeholder={project.name}
          />
        </div>
      </Modal>

      {showSavedToast && (
        <Toast
          intent="success"
          title="Settings saved"
          open={showSavedToast}
          onClose={() => setShowSavedToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ProjectPage({ params }) {
  const { id } = use(params);
  const project = projects.find(p => p.id === id) || projects[0];
  const [activeTab, setActiveTab] = useState('project');
  const [showToast, setShowToast] = useState(false);

  const tabs = [
    { value: 'project', label: 'Project', content: <ProjectTab project={project} /> },
    { value: 'deployments', label: 'Deployments', content: <DeploymentsTab project={project} /> },
    { value: 'analytics', label: 'Analytics', content: <AnalyticsTab project={project} /> },
    { value: 'speed-insights', label: 'Speed Insights', content: <SpeedInsightsTab project={project} /> },
    { value: 'logs', label: 'Logs', content: <LogsTab project={project} /> },
    { value: 'firewall', label: 'Firewall', content: <FirewallTab project={project} /> },
    { value: 'storage', label: 'Storage', content: <StorageTab project={project} /> },
    { value: 'settings', label: 'Settings', content: <SettingsTab project={project} /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)]">
      <Header
        logo={<Logo />}
        productName="ASMobbin"
        items={[]}
        actions={
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm">Feedback</Button>
            <Button variant="ghost" size="sm">Changelog</Button>
            <Button variant="ghost" size="sm">Help</Button>
            <Button variant="ghost" size="sm">Docs</Button>
            <Button variant="ghost" size="sm" icon={<Bell size={16} />} />
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0 cursor-pointer" />
          </div>
        }
      />

      {/* Project sub-header */}
      <div className="bg-[var(--ds-bg-primary)]">
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-0">
          {/* Breadcrumb + actions */}
          <div className="flex items-center justify-between mb-4">
            <Breadcrumb
              items={[
                { label: 'ASMobbin', href: '/', icon: <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" /> },
                { label: project.name },
              ]}
              separator={<ChevronRight size={14} />}
            />
            <div className="flex items-center gap-2">
              <Button variant="secondary" size="sm" icon={<Code size={13} />}>Repository</Button>
              <Button variant="secondary" size="sm" icon={<BarChart2 size={13} />}>Usage</Button>
              <Button variant="secondary" size="sm" icon={<Globe size={13} />}>Domains</Button>
              <Button
                variant="primary"
                size="sm"
                icon={<ExternalLink size={13} />}
                iconPosition="right"
                onClick={() => setShowToast(true)}
              >
                Visit
              </Button>
            </div>
          </div>

          {/* Project-level tabs */}
          <Tabs
            items={tabs.map(t => ({ value: t.value, label: t.label }))}
            value={activeTab}
            onChange={setActiveTab}
            size="md"
            variant="pill"
          />
        </div>
      </div>

      {/* Tab content */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {tabs.find(t => t.value === activeTab)?.content}
      </main>

      {showToast && (
        <Toast
          intent="info"
          title={`Opening ${project.url}`}
          open={showToast}
          onClose={() => setShowToast(false)}
          duration={3000}
        />
      )}
    </div>
  );
}
