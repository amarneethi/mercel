'use client';

import { useState, use } from 'react';
import {
  Header, Tabs, Button, Toast, Breadcrumb,
} from 'aopends';
import {
  ChevronRight, ExternalLink, Globe, Code, BarChart2, Bell,
} from 'lucide-react';
import { projects } from '@/data/projects';
import ProjectTab from './tabs/ProjectTab';
import DeploymentsTab from './tabs/DeploymentsTab';
import AnalyticsTab from './tabs/AnalyticsTab';
import SpeedInsightsTab from './tabs/SpeedInsightsTab';
import LogsTab from './tabs/LogsTab';
import FirewallTab from './tabs/FirewallTab';
import StorageTab from './tabs/StorageTab';
import SettingsTab from './tabs/SettingsTab';

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

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
