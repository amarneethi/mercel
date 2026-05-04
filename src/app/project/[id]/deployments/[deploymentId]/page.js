'use client';

import { useState, use, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Header, Button, Tag, Breadcrumb, Toast, Spinner,
} from 'aopends';
import {
  GitBranch, GitCommit, ExternalLink, RotateCcw, ChevronRight,
  AlertCircle, CheckCircle, Clock, Copy, Check, ArrowUpRight,
  Globe, Terminal, Package, Rocket, XCircle, Zap,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { deploymentsByProject } from '@/data/deployments';
import { buildLogsByDeployment, phaseDurationsByStatus } from '@/data/buildLogs';

// ─── Logo ─────────────────────────────────────────────────────────────────────
const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

// ─── Status helpers ────────────────────────────────────────────────────────────
const statusConfig = {
  ready:    { intent: 'success', label: 'Ready',    icon: <CheckCircle size={14} /> },
  building: { intent: 'info',    label: 'Building', icon: <Clock size={14} /> },
  error:    { intent: 'danger',  label: 'Error',    icon: <AlertCircle size={14} /> },
  canceled: { intent: 'default', label: 'Canceled', icon: <XCircle size={14} /> },
};

// ─── Phase icons ──────────────────────────────────────────────────────────────
const phaseIcons = {
  clone:   <GitBranch size={14} />,
  install: <Package size={14} />,
  build:   <Zap size={14} />,
  deploy:  <Rocket size={14} />,
};

// ─── Build log line renderer ──────────────────────────────────────────────────
const logColors = {
  phase:   { color: '#e2e8f0', fontWeight: '600', paddingTop: '12px' },
  command: { color: '#94a3b8' },
  output:  { color: '#cbd5e1' },
  success: { color: '#4ade80' },
  error:   { color: '#f87171' },
  warning: { color: '#fbbf24' },
  info:    { color: '#7dd3fc' },
  divider: { color: '#334155', borderBottom: '1px solid #1e293b', paddingBottom: '8px' },
};

const logPrefixes = {
  phase:   '',
  command: '→ ',
  output:  '  ',
  success: '✓ ',
  error:   '✗ ',
  warning: '! ',
  info:    '  ',
  divider: '',
};

function BuildLogLine({ entry }) {
  const style = logColors[entry.type] || logColors.output;
  const prefix = logPrefixes[entry.type] || '';

  if (entry.type === 'divider') {
    return <div style={{ borderBottom: '1px solid #1e293b', margin: '6px 0' }} />;
  }

  if (entry.type === 'phase') {
    return (
      <div style={{ paddingTop: '12px', paddingBottom: '4px' }}>
        <span style={{ color: '#94a3b8', fontFamily: 'monospace', fontSize: '12px' }}>{entry.time}</span>
        <span style={{ color: '#64748b', marginLeft: '12px', marginRight: '8px' }}>│</span>
        <span style={{ color: '#e2e8f0', fontWeight: '600', fontFamily: 'monospace', fontSize: '12px' }}>
          {entry.message}
        </span>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', lineHeight: '1.6' }}>
      <span style={{ color: '#475569', fontFamily: 'monospace', fontSize: '12px', flexShrink: 0, minWidth: '80px' }}>
        {entry.time}
      </span>
      <span style={{ color: '#334155', marginLeft: '12px', marginRight: '8px', flexShrink: 0 }}>│</span>
      <span style={{ ...style, fontFamily: 'monospace', fontSize: '12px', whiteSpace: 'pre-wrap', wordBreak: 'break-all' }}>
        {prefix}{entry.message}
      </span>
    </div>
  );
}

// ─── Phase timeline ────────────────────────────────────────────────────────────
function PhaseTimeline({ status, logs }) {
  const phases = ['clone', 'install', 'build', 'deploy'];
  const durations = phaseDurationsByStatus[status] || phaseDurationsByStatus.ready;
  const completedPhases = new Set(logs.map(l => l.phase));

  const getPhaseStatus = (phase) => {
    const idx = phases.indexOf(phase);
    const completedIdx = phases.findLastIndex(p => completedPhases.has(p));

    if (!completedPhases.has(phase)) {
      if (status === 'building' && idx === completedIdx + 1) return 'active';
      return 'pending';
    }
    if (status === 'error' && phase === phases[completedIdx]) return 'error';
    if (status === 'canceled' && phase === phases[completedIdx]) return 'canceled';
    if (durations[phase]) return 'done';
    return 'active';
  };

  return (
    <div className="flex items-center gap-0">
      {phases.map((phase, i) => {
        const phaseStatus = getPhaseStatus(phase);
        const duration = durations[phase];

        const dotColor = {
          done:     'bg-green-500',
          active:   'bg-blue-400 animate-pulse',
          error:    'bg-red-500',
          canceled: 'bg-gray-400',
          pending:  'bg-[var(--ds-bg-tertiary)] border border-[var(--ds-border-primary)]',
        }[phaseStatus];

        const labelColor = {
          done:     'text-[var(--ds-text-primary)]',
          active:   'text-blue-400',
          error:    'text-red-400',
          canceled: 'text-[var(--ds-text-tertiary)]',
          pending:  'text-[var(--ds-text-tertiary)]',
        }[phaseStatus];

        return (
          <div key={phase} className="flex items-center">
            <div className="flex flex-col items-center gap-1">
              <div className="flex items-center gap-1.5">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${dotColor}`} />
                <span className={`text-xs font-medium capitalize ${labelColor}`}>
                  {phase.charAt(0).toUpperCase() + phase.slice(1)}
                </span>
              </div>
              {duration && (
                <span className="text-[10px] text-[var(--ds-text-tertiary)] pl-3.5">{duration}</span>
              )}
            </div>
            {i < phases.length - 1 && (
              <div className={`h-px w-8 mx-2 mt-[-8px] ${phaseStatus === 'done' ? 'bg-green-500/40' : 'bg-[var(--ds-border-primary)]'}`} />
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Copy button ───────────────────────────────────────────────────────────────
function CopyButton({ text, label = 'Copy' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(text).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      onClick={handleCopy}
      className="flex items-center gap-1 text-xs text-[var(--ds-text-secondary)] hover:text-[var(--ds-text-primary)] transition-colors"
    >
      {copied ? <Check size={12} className="text-green-500" /> : <Copy size={12} />}
      {copied ? 'Copied' : label}
    </button>
  );
}

// ─── Sidebar ──────────────────────────────────────────────────────────────────
function DeploymentSidebar({ project, deployment, onRollback, onPromote }) {
  const sc = statusConfig[deployment.status] || statusConfig.ready;

  return (
    <div className="space-y-5">
      {/* Actions */}
      <div className="space-y-2">
        <a
          href={`https://${deployment.url}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button variant="primary" size="sm" icon={<ExternalLink size={14} />} className="w-full justify-center">
            Visit Deployment
          </Button>
        </a>
        {deployment.environment === 'Preview' && deployment.status === 'ready' && (
          <Button
            variant="secondary"
            size="sm"
            icon={<ArrowUpRight size={14} />}
            className="w-full justify-center"
            onClick={onPromote}
          >
            Promote to Production
          </Button>
        )}
        {!deployment.isCurrent && deployment.status === 'ready' && (
          <Button
            variant="secondary"
            size="sm"
            icon={<RotateCcw size={14} />}
            className="w-full justify-center"
            onClick={onRollback}
          >
            Instant Rollback
          </Button>
        )}
      </div>

      <div className="border-t border-[var(--ds-border-primary)]" />

      {/* Status */}
      <div>
        <p className="text-xs text-[var(--ds-text-secondary)] mb-2 uppercase tracking-wide font-medium">Status</p>
        <div className="flex items-center gap-2">
          {sc.icon}
          <Tag intent={sc.intent} size="sm">{sc.label}</Tag>
          {deployment.isCurrent && <Tag intent="info" size="sm">Current</Tag>}
        </div>
      </div>

      {/* Deployment URL */}
      <div>
        <p className="text-xs text-[var(--ds-text-secondary)] mb-1 uppercase tracking-wide font-medium">Deployment URL</p>
        <div className="flex items-center justify-between gap-2">
          <a
            href={`https://${deployment.url}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[var(--ds-text-brand)] hover:underline truncate"
          >
            {deployment.url}
          </a>
          <CopyButton text={`https://${deployment.url}`} />
        </div>
      </div>

      {/* Domains (production only) */}
      {deployment.environment === 'Production' && (
        <div>
          <p className="text-xs text-[var(--ds-text-secondary)] mb-1 uppercase tracking-wide font-medium">Domain</p>
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 min-w-0">
              <Globe size={13} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
              <span className="text-sm text-[var(--ds-text-primary)] truncate">{project.url}</span>
            </div>
            <ExternalLink size={12} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
          </div>
        </div>
      )}

      {/* Environment */}
      <div>
        <p className="text-xs text-[var(--ds-text-secondary)] mb-1 uppercase tracking-wide font-medium">Environment</p>
        <Tag intent={deployment.environment === 'Production' ? 'success' : 'default'} size="sm">
          {deployment.environment}
        </Tag>
      </div>

      {/* Source */}
      <div>
        <p className="text-xs text-[var(--ds-text-secondary)] mb-2 uppercase tracking-wide font-medium">Source</p>
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <GitBranch size={13} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
            <code className="text-xs text-[var(--ds-text-primary)] bg-[var(--ds-bg-secondary)] px-1.5 py-0.5 rounded">
              {deployment.branch}
            </code>
          </div>
          <div className="flex items-center gap-2">
            <GitCommit size={13} className="text-[var(--ds-text-tertiary)] flex-shrink-0" />
            <code className="text-xs text-[var(--ds-text-brand)]">{deployment.commitHash}</code>
          </div>
          <p className="text-xs text-[var(--ds-text-secondary)] pl-5">{deployment.commitMessage}</p>
        </div>
      </div>

      {/* Created */}
      <div>
        <p className="text-xs text-[var(--ds-text-secondary)] mb-1 uppercase tracking-wide font-medium">Created</p>
        <p className="text-sm text-[var(--ds-text-primary)]">{deployment.deployedAt}</p>
        <p className="text-xs text-[var(--ds-text-secondary)]">by {deployment.author}</p>
      </div>

      {/* Duration */}
      {deployment.duration && deployment.duration !== '—' && (
        <div>
          <p className="text-xs text-[var(--ds-text-secondary)] mb-1 uppercase tracking-wide font-medium">Build Duration</p>
          <div className="flex items-center gap-1.5">
            <Clock size={13} className="text-[var(--ds-text-tertiary)]" />
            <span className="text-sm text-[var(--ds-text-primary)]">{deployment.duration}</span>
          </div>
        </div>
      )}

      {/* Deployment ID */}
      <div className="border-t border-[var(--ds-border-primary)] pt-4">
        <p className="text-xs text-[var(--ds-text-secondary)] mb-1 uppercase tracking-wide font-medium">Deployment ID</p>
        <div className="flex items-center justify-between">
          <code className="text-xs text-[var(--ds-text-primary)]">{deployment.id}</code>
          <CopyButton text={deployment.id} />
        </div>
      </div>
    </div>
  );
}

// ─── Build log panel ───────────────────────────────────────────────────────────
function BuildLogPanel({ deployment, logs }) {
  const bottomRef = useRef(null);
  const isBuilding = deployment.status === 'building';

  useEffect(() => {
    if (isBuilding) {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [logs, isBuilding]);

  return (
    <div
      className="rounded-[var(--ds-radius-lg)] overflow-hidden border border-[var(--ds-border-primary)]"
      style={{ background: '#0f172a' }}
    >
      {/* Terminal toolbar */}
      <div
        className="flex items-center justify-between px-4 py-2.5 border-b"
        style={{ borderColor: '#1e293b', background: '#0a1628' }}
      >
        <div className="flex items-center gap-2">
          <Terminal size={14} style={{ color: '#475569' }} />
          <span style={{ color: '#94a3b8', fontSize: '12px', fontFamily: 'monospace' }}>
            Build Output
          </span>
        </div>
        <div className="flex items-center gap-3">
          {isBuilding && (
            <div className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              <span style={{ color: '#7dd3fc', fontSize: '11px', fontFamily: 'monospace' }}>Live</span>
            </div>
          )}
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full" style={{ background: '#ef4444' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#f59e0b' }} />
            <div className="w-3 h-3 rounded-full" style={{ background: '#22c55e' }} />
          </div>
        </div>
      </div>

      {/* Log content */}
      <div
        className="overflow-y-auto p-4"
        style={{ minHeight: '400px', maxHeight: '600px' }}
      >
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-48">
            <div className="text-center">
              <Spinner size="sm" />
              <p style={{ color: '#475569', fontSize: '12px', fontFamily: 'monospace', marginTop: '8px' }}>
                Waiting for build output...
              </p>
            </div>
          </div>
        ) : (
          <>
            {logs.map((entry, i) => (
              <BuildLogLine key={i} entry={entry} />
            ))}
            {isBuilding && (
              <div className="flex items-center gap-2 mt-3" style={{ paddingLeft: '92px' }}>
                <div className="flex gap-0.5">
                  {[0, 1, 2].map(i => (
                    <div
                      key={i}
                      className="w-1 h-1 rounded-full bg-blue-400"
                      style={{ animation: `bounce 1s infinite ${i * 0.15}s` }}
                    />
                  ))}
                </div>
                <span style={{ color: '#475569', fontSize: '12px', fontFamily: 'monospace' }}>
                  Building…
                </span>
              </div>
            )}
            <div ref={bottomRef} />
          </>
        )}
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function DeploymentPage({ params }) {
  const { id: projectId, deploymentId } = use(params);
  const [showRollbackToast, setShowRollbackToast] = useState(false);
  const [showPromoteToast, setShowPromoteToast] = useState(false);

  const project = projects.find(p => p.id === projectId);
  const deployments = deploymentsByProject[projectId] || [];
  const deployment = deployments.find(d => d.id === deploymentId);
  const logs = buildLogsByDeployment[deploymentId] || [];

  const sc = statusConfig[deployment?.status] || statusConfig.ready;

  const breadcrumbItems = [
    { label: 'Projects', href: '/' },
    { label: project?.name || projectId, href: `/project/${projectId}` },
    { label: 'Deployments', href: `/project/${projectId}?tab=deployments` },
    { label: deploymentId?.replace('dpl_', '') || deploymentId },
  ];

  if (!project || !deployment) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[var(--ds-bg-primary)]">
        <div className="text-center space-y-3">
          <AlertCircle size={40} className="text-[var(--ds-text-tertiary)] mx-auto" />
          <p className="text-[var(--ds-text-primary)] font-semibold">Deployment not found</p>
          <Link href={`/project/${projectId}`}>
            <Button variant="secondary" size="sm">Back to project</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[var(--ds-bg-primary)]">
      <Header
        logo={<Logo />}
        logoHref="/"
        nav={[
          { label: 'Overview', href: '/' },
          { label: 'Projects', href: '/' },
        ]}
        actions={
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm">Feedback</Button>
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-indigo-600 flex items-center justify-center text-white text-xs font-bold">
              A
            </div>
          </div>
        }
      />

      <div className="max-w-[1200px] mx-auto px-6 py-6 space-y-6">
        {/* Breadcrumb */}
        <Breadcrumb items={breadcrumbItems} />

        {/* Page header */}
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-xl font-semibold text-[var(--ds-text-primary)] font-mono">
                {deploymentId}
              </h1>
              <div className="flex items-center gap-1.5">
                {sc.icon && <span className={sc.intent === 'success' ? 'text-green-500' : sc.intent === 'danger' ? 'text-red-500' : sc.intent === 'info' ? 'text-blue-400' : 'text-[var(--ds-text-tertiary)]'}>{sc.icon}</span>}
                <Tag intent={sc.intent} size="sm">{sc.label}</Tag>
              </div>
              {deployment.isCurrent && <Tag intent="info" size="sm">Current</Tag>}
              <Tag intent={deployment.environment === 'Production' ? 'success' : 'default'} size="sm">
                {deployment.environment}
              </Tag>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <a
                href={`https://${deployment.url}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-sm text-[var(--ds-text-brand)] hover:underline"
              >
                {deployment.url}
                <ExternalLink size={12} />
              </a>
              <span className="text-[var(--ds-text-tertiary)]">·</span>
              <div className="flex items-center gap-1.5 text-sm text-[var(--ds-text-secondary)]">
                <GitBranch size={13} className="text-[var(--ds-text-tertiary)]" />
                <code className="text-xs">{deployment.branch}</code>
                <GitCommit size={13} className="text-[var(--ds-text-tertiary)]" />
                <code className="text-xs text-[var(--ds-text-brand)]">{deployment.commitHash}</code>
              </div>
            </div>
          </div>
        </div>

        {/* Phase timeline */}
        <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] px-5 py-4 bg-[var(--ds-bg-primary)]">
          <PhaseTimeline status={deployment.status} logs={logs} />
        </div>

        {/* Main content: logs + sidebar */}
        <div className="grid grid-cols-[1fr_280px] gap-6 items-start">
          {/* Build log */}
          <BuildLogPanel deployment={deployment} logs={logs} />

          {/* Sidebar */}
          <div className="border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-5 bg-[var(--ds-bg-primary)]">
            <DeploymentSidebar
              project={project}
              deployment={deployment}
              onRollback={() => setShowRollbackToast(true)}
              onPromote={() => setShowPromoteToast(true)}
            />
          </div>
        </div>
      </div>

      {showRollbackToast && (
        <Toast
          intent="success"
          title="Rollback initiated"
          message={`Rolling back to ${deploymentId}…`}
          onClose={() => setShowRollbackToast(false)}
        />
      )}
      {showPromoteToast && (
        <Toast
          intent="success"
          title="Promoted to Production"
          message={`${deploymentId} is now the production deployment.`}
          onClose={() => setShowPromoteToast(false)}
        />
      )}
    </div>
  );
}
