'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { Header, Button, Tag, Tabs, Breadcrumb, OverflowMenu, Toast } from 'aopends';
import {
  ChevronRight, ExternalLink, ArrowUpCircle,
  CheckCircle, AlertCircle, Clock, GitBranch, GitCommit, User, Calendar,
  Globe, Github, RotateCcw, RefreshCw, Bell,
  GitPullRequest, Package, Hammer, Rocket, Terminal,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { deploymentsByProject, deploymentDetails } from '@/data/deployments';

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

const STATUS = {
  ready:    { label: 'Ready',    Icon: CheckCircle, cssVar: 'var(--ds-text-success)' },
  building: { label: 'Building', Icon: Clock,        cssVar: 'var(--ds-text-info)' },
  error:    { label: 'Error',    Icon: AlertCircle,  cssVar: 'var(--ds-text-danger)' },
  canceled: { label: 'Canceled', Icon: Clock,        cssVar: 'var(--ds-text-tertiary)' },
};

const STEP_ICONS = { 'git-pull-request': GitPullRequest, package: Package, hammer: Hammer, rocket: Rocket };

const TABS = [
  { value: 'overview',     label: 'Overview' },
  { value: 'build-logs',   label: 'Build Logs' },
  { value: 'runtime-logs', label: 'Runtime Logs' },
  { value: 'functions',    label: 'Functions' },
  { value: 'source',       label: 'Source' },
];

export default function DeploymentDetailPage({ params }) {
  const { id, deploymentId } = use(params);
  const [activeTab, setActiveTab] = useState('overview');
  const [toast, setToast] = useState(null);

  const project = projects.find(p => p.id === id) || projects[0];
  const allDeployments = deploymentsByProject[id] || [];
  const deployment = allDeployments.find(d => d.id === deploymentId) || allDeployments[0];
  const detail = deploymentDetails[deployment?.id] || {
    region: 'iad1 (Washington D.C.)',
    nodeVersion: '20.x',
    createdAt: 'May 3, 2026, 2:41 PM',
    buildSteps: [
      { key: 'clone',   label: 'Clone',   duration: '3s',  icon: 'git-pull-request' },
      { key: 'install', label: 'Install', duration: '12s', icon: 'package' },
      { key: 'build',   label: 'Build',   duration: '22s', icon: 'hammer' },
      { key: 'deploy',  label: 'Deploy',  duration: '8s',  icon: 'rocket', active: true },
    ],
    buildLogs: [
      '$ npm run build',
      `> ${id}@0.1.0 build`,
      '> next build',
      'Next.js 15.1.0',
      'Creating an optimized production build...',
      '✓ Compiled successfully',
      '✓ Linting and checking validity of types',
      '✓ Collecting page data',
      '✓ Generating static pages (12/12)',
      '✓ Finalizing page optimization',
      `Build completed in ${deployment?.duration || '45s'}`,
      `Deployment assigned: ${deployment?.url}`,
    ],
    domains: [
      { url: `${id}.mercel.app`, badge: 'Primary' },
      { url: deployment?.url || `${id}-auto.mercel.app`, badge: 'Auto' },
    ],
  };

  const sc = STATUS[deployment?.status] || STATUS.ready;
  const { Icon: StatusIcon } = sc;

  function notify(msg) { setToast(msg); }

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

      {/* Sub-header — same pattern as project page */}
      <div className="bg-[var(--ds-bg-primary)]">
        <div className="max-w-6xl mx-auto px-6 pt-4 pb-0">
          {/* Breadcrumb + actions */}
          <div className="flex items-center justify-between mb-6">
            <Breadcrumb
              items={[
                { label: 'ASMobbin', href: '/', icon: <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-pink-500" /> },
                { label: project?.name, href: `/project/${id}` },
                { label: deployment?.id },
              ]}
              separator={<ChevronRight size={14} />}
            />
            <div className="flex items-center gap-2">
              <Button
                variant="secondary"
                size="sm"
                icon={<ExternalLink size={13} />}
                iconPosition="right"
                onClick={() => notify(`Opening ${deployment?.url}`)}
              >
                Visit
              </Button>
              <Button
                variant="primary"
                size="sm"
                icon={<ArrowUpCircle size={13} />}
                onClick={() => notify('Promoting to production...')}
              >
                Promote to Production
              </Button>
              <OverflowMenu
                items={[
                  { label: 'Copy URL', onClick: () => notify('URL copied') },
                  { label: 'View Source', onClick: () => setActiveTab('source') },
                  { divider: true },
                  { label: 'Delete Deployment', onClick: () => notify('Deleting...') },
                ]}
                align="right"
                size="sm"
              />
            </div>
          </div>

          {/* Hero: status + metadata */}
          <div className="space-y-5 mb-6">
            <div className="flex items-center gap-4">
              <StatusIcon size={36} style={{ color: sc.cssVar }} />
              <div>
                <div className="flex items-center gap-2 mb-0.5">
                  <h1 className="text-2xl font-semibold text-[var(--ds-text-primary)]">{sc.label}</h1>
                  {deployment?.environment && (
                    <Tag intent={deployment.environment === 'Production' ? 'default' : 'info'} size="sm">
                      {deployment.environment}
                    </Tag>
                  )}
                  {deployment?.isCurrent && <Tag intent="success" size="sm">Current</Tag>}
                </div>
                <span className="text-sm text-[var(--ds-text-secondary)]">{deployment?.url}</span>
              </div>
            </div>

            <div className="flex items-start gap-8">
              {[
                { label: 'BRANCH',      Icon: GitBranch, value: deployment?.branch },
                { label: 'COMMIT',      Icon: GitCommit, value: `${deployment?.commitHash} — ${deployment?.commitMessage}` },
                { label: 'DEPLOYED BY', Icon: User,       value: deployment?.author },
                { label: 'BUILD TIME',  Icon: Clock,      value: deployment?.duration },
                { label: 'DEPLOYED',    Icon: Calendar,   value: deployment?.deployedAt },
              ].map(({ label, Icon, value }) => (
                <div key={label} className="space-y-1">
                  <p className="text-xs font-medium tracking-wide text-[var(--ds-text-tertiary)]">{label}</p>
                  <div className="flex items-center gap-1.5">
                    <Icon size={13} className="text-[var(--ds-text-secondary)] flex-shrink-0" />
                    <span className="text-sm text-[var(--ds-text-primary)]">{value}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tabs — pill variant, same as project page */}
          <Tabs
            items={TABS}
            value={activeTab}
            onChange={setActiveTab}
            size="md"
            variant="pill"
          />
        </div>
      </div>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-6 py-6">
        {activeTab === 'overview' && (
          <div className="flex gap-6 items-start">
            {/* Left column */}
            <div className="flex-1 min-w-0 space-y-6">
              {/* Build pipeline */}
              <section className="space-y-3">
                <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">Build Pipeline</h2>
                <div className="flex items-center gap-2">
                  {detail.buildSteps.map((step, i) => {
                    const StepIcon = STEP_ICONS[step.icon] || Rocket;
                    return (
                      <div key={step.key} className="flex items-center gap-2 flex-1">
                        <div
                          className={[
                            'flex-1 flex flex-col items-center justify-center gap-1 py-3 px-2 rounded-lg border border-[var(--ds-border-primary)]',
                            step.active
                              ? 'bg-[var(--ds-bg-inverse)] text-[var(--ds-text-inverse)]'
                              : 'bg-[var(--ds-bg-secondary)] text-[var(--ds-text-primary)]',
                          ].join(' ')}
                        >
                          <StepIcon size={16} />
                          <span className="text-xs font-medium">{step.label}</span>
                          <span className="text-xs opacity-60">{step.duration}</span>
                        </div>
                        {i < detail.buildSteps.length - 1 && (
                          <ChevronRight size={14} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>
              </section>

              {/* Build output */}
              <section className="space-y-3">
                <div className="flex items-center justify-between">
                  <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">Build Output</h2>
                  <Button
                    variant="secondary"
                    size="sm"
                    icon={<ExternalLink size={12} />}
                    iconPosition="right"
                    onClick={() => setActiveTab('build-logs')}
                  >
                    View Full Logs
                  </Button>
                </div>
                <div className="bg-[#0a0a0a] rounded-lg border border-[var(--ds-border-primary)] p-4 h-60 overflow-y-auto font-mono">
                  {detail.buildLogs.map((line, i) => (
                    <p key={i} className="text-xs text-white leading-relaxed">{line}</p>
                  ))}
                </div>
              </section>

              {/* Domains */}
              <section className="space-y-3">
                <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">Domains</h2>
                <div className="space-y-2">
                  {detail.domains.map(domain => (
                    <div
                      key={domain.url}
                      className="flex items-center justify-between h-12 px-3 rounded-lg border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)]"
                    >
                      <div className="flex items-center gap-2">
                        <Globe size={14} className="text-[var(--ds-text-secondary)]" />
                        <span className="text-sm text-[var(--ds-text-primary)]">{domain.url}</span>
                      </div>
                      <Tag intent="default" size="sm">{domain.badge}</Tag>
                    </div>
                  ))}
                </div>
              </section>
            </div>

            {/* Right column */}
            <div className="w-72 flex-shrink-0 space-y-4">
              {/* Deployment info */}
              <div className="rounded-lg border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)] p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Deployment Information</h3>
                <hr className="border-[var(--ds-border-primary)]" />
                <dl className="space-y-2.5">
                  {[
                    ['UID', deployment?.id],
                    ['Environment', deployment?.environment],
                    ['Created', detail.createdAt],
                    ['Region', detail.region],
                    ['Node.js Version', detail.nodeVersion],
                  ].map(([label, value]) => (
                    <div key={label} className="flex items-center justify-between gap-2">
                      <dt className="text-xs font-medium text-[var(--ds-text-secondary)]">{label}</dt>
                      <dd className="text-xs text-[var(--ds-text-primary)] text-right">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Git source */}
              <div className="rounded-lg border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)] p-4 space-y-3">
                <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Git Source</h3>
                <hr className="border-[var(--ds-border-primary)]" />
                <div className="space-y-2.5">
                  <div className="flex items-center gap-2">
                    <Github size={14} className="text-[var(--ds-text-secondary)] flex-shrink-0" />
                    <span className="text-xs text-[var(--ds-text-primary)]">{project?.repo}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <GitBranch size={14} className="text-[var(--ds-text-secondary)] flex-shrink-0" />
                    <span className="text-xs text-[var(--ds-text-primary)]">{deployment?.branch}</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <GitCommit size={14} className="text-[var(--ds-text-secondary)] flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-xs font-medium font-mono text-[var(--ds-text-primary)]">{deployment?.commitHash}</p>
                      <p className="text-xs text-[var(--ds-text-secondary)] leading-snug">{deployment?.commitMessage}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="rounded-lg border border-[var(--ds-border-primary)] bg-[var(--ds-bg-secondary)] p-4 space-y-2">
                <h3 className="text-sm font-semibold text-[var(--ds-text-primary)]">Actions</h3>
                <hr className="border-[var(--ds-border-primary)]" />
                {[
                  { Icon: RotateCcw, label: 'Rollback to this', onClick: () => notify('Rolling back...') },
                  { Icon: RefreshCw,  label: 'Redeploy',         onClick: () => notify('Redeploying...') },
                ].map(({ Icon, label, onClick }) => (
                  <button
                    key={label}
                    onClick={onClick}
                    className="w-full flex items-center justify-between px-2 h-9 text-sm text-[var(--ds-text-primary)] rounded-md hover:bg-[var(--ds-bg-primary)] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={13} className="text-[var(--ds-text-secondary)]" />
                      {label}
                    </div>
                    <ChevronRight size={13} className="text-[var(--ds-text-tertiary)]" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'build-logs' && (
          <div className="space-y-3">
            <h2 className="text-base font-semibold text-[var(--ds-text-primary)]">Build Logs</h2>
            <div className="bg-[#0a0a0a] rounded-lg border border-[var(--ds-border-primary)] p-4 min-h-96 font-mono">
              {detail.buildLogs.map((line, i) => (
                <p key={i} className="text-xs text-white leading-relaxed">{line}</p>
              ))}
            </div>
          </div>
        )}

        {['runtime-logs', 'functions', 'source'].includes(activeTab) && (
          <div className="flex flex-col items-center justify-center py-24 gap-3 text-[var(--ds-text-tertiary)]">
            <Terminal size={32} />
            <p className="text-sm">No data available for this deployment.</p>
          </div>
        )}
      </main>

      {toast && (
        <Toast
          intent="info"
          title={toast}
          open={!!toast}
          onClose={() => setToast(null)}
          duration={3000}
        />
      )}
    </div>
  );
}
