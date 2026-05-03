'use client';

import {
  Button, Tag, ActivityFeed,
} from 'aopends';
import {
  GitBranch, GitCommit, ExternalLink, RotateCcw,
  FileText, Terminal, Globe, CheckCircle, AlertCircle, Clock,
} from 'lucide-react';
import { deploymentsByProject } from '@/data/deployments';

const statusConfig = {
  ready: { intent: 'success', label: 'Ready', icon: <CheckCircle size={12} /> },
  building: { intent: 'info', label: 'Building', icon: <Clock size={12} /> },
  error: { intent: 'danger', label: 'Error', icon: <AlertCircle size={12} /> },
  canceled: { intent: 'default', label: 'Canceled' },
};

export default function ProjectTab({ project }) {
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
              <div className="w-48 h-32 bg-gradient-to-br from-[var(--ds-bg-secondary)] to-[var(--ds-bg-tertiary)] rounded-[var(--ds-radius-md)] flex items-center justify-center flex-shrink-0 border border-[var(--ds-border-primary)]">
                <Globe size={32} className="text-[var(--ds-text-tertiary)]" />
              </div>

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
