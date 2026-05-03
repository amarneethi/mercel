'use client';

import { useState } from 'react';
import {
  Button, Tag, Select, TableList,
  Modal, Form, FormGroup, FormRow, FormActions, TextInput,
  Notification, Toast,
} from 'aopends';
import { Settings, Plus, CheckCircle } from 'lucide-react';

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

const stubSections = ['git', 'integrations', 'functions', 'cron', 'security', 'advanced'];

export default function SettingsTab({ project }) {
  const [projectName, setProjectName] = useState(project.name);
  const [framework, setFramework] = useState(project.framework);
  const [buildCmd, setBuildCmd] = useState('');
  const [outputDir, setOutputDir] = useState('');
  const [installCmd, setInstallCmd] = useState('');
  const [devCmd, setDevCmd] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showSavedToast, setShowSavedToast] = useState(false);
  const [activeSection, setActiveSection] = useState('general');

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
                  <Button variant="secondary" onClick={() => setShowSavedToast(true)}>Save</Button>
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

        {stubSections.includes(activeSection) && (
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
