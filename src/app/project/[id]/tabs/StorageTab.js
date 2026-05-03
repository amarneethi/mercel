'use client';

import { useState } from 'react';
import {
  Button, Tag, Banner,
  Modal, Form, FormGroup, FormActions, TextInput, Select,
} from 'aopends';
import { Zap, HardDrive, Database, Server } from 'lucide-react';

const databases = [
  { id: 'edge-config', name: 'Edge Config', description: 'Ultra-low latency reads', icon: <Zap size={20} />, color: '#f59e0b' },
  { id: 'blob', name: 'Blob', description: 'Fast object storage', badge: 'Beta', icon: <HardDrive size={20} />, color: '#f97316' },
  { id: 'postgres', name: 'Postgres', description: 'Serverless SQL', icon: <Database size={20} />, color: '#3b82f6' },
  { id: 'kv', name: 'KV', description: 'Durable Redis', icon: <Server size={20} />, color: '#8b5cf6' },
];

export default function StorageTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedDb, setSelectedDb] = useState(null);

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
