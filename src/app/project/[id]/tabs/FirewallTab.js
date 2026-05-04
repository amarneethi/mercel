'use client';

import { useState } from 'react';
import {
  Button, Select, AreaChart, DataTable, OverflowMenu, Modal, FormActions,
  Form, FormGroup, Toggle, TextInput, Tag,
} from 'aopends';
import { ChevronDown, Plus, Shield } from 'lucide-react';
import { firewallData } from '@/data/firewall';

export default function FirewallTab({ project }) {
  const [view, setView] = useState('Overview');
  const [showConfigModal, setShowConfigModal] = useState(false);

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
