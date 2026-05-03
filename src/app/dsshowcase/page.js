'use client';

import { useState } from 'react';
import {
  Button, TextInput, Checkbox, Toggle, Select, Tag,
  Notification, Toast, Banner, Spinner, Skeleton, SkeletonText, TableSkeleton,
  Breadcrumb, Tabs, Modal, Dropdown, OverflowMenu, DatePicker,
  Form, FormGroup, FormRow, FormActions, Search, DataTable, Pagination,
  KpiCard, SideNav, Header,
} from 'aopends';
import {
  Home, Settings, Bell, ChevronRight, Mail,
  Edit, Trash2, Copy, MoreVertical, Download, Star, Zap,
  Shield, Database, FileText, Activity, Plus, Check,
  DollarSign, Users,
} from 'lucide-react';

// ─── Section wrapper ──────────────────────────────────────────────────────────
function Section({ title, description, children }) {
  return (
    <section className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-[var(--ds-text-primary)]">{title}</h2>
        {description && <p className="text-sm text-[var(--ds-text-secondary)] mt-0.5">{description}</p>}
      </div>
      <div className="bg-[var(--ds-bg-primary)] border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] p-6">
        {children}
      </div>
    </section>
  );
}

function Row({ label, children, vertical }) {
  return (
    <div className={`space-y-2 ${vertical ? '' : ''}`}>
      {label && <p className="text-xs font-medium text-[var(--ds-text-tertiary)] uppercase tracking-wider">{label}</p>}
      <div className={`flex ${vertical ? 'flex-col' : 'flex-wrap'} items-start gap-3`}>
        {children}
      </div>
    </div>
  );
}

function Divider() {
  return <div className="border-t border-[var(--ds-border-primary)] my-5" />;
}

const Logo = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2L2 22h20L12 2z" />
  </svg>
);

// ─── Main page ────────────────────────────────────────────────────────────────
export default function DesignSystemShowcase() {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalSize, setModalSize] = useState('md');
  const [toastOpen, setToastOpen] = useState(false);
  const [toastIntent, setToastIntent] = useState('info');
  const [searchValue, setSearchValue] = useState('');
  const [selectValue, setSelectValue] = useState('');
  const [dropdownValue, setDropdownValue] = useState('');
  const [datepickerValue, setDatepickerValue] = useState('');
  const [tablePage, setTablePage] = useState(1);
  const [sidenavCollapsed, setSidenavCollapsed] = useState(false);

  const tableData = Array.from({ length: 20 }, (_, i) => ({
    id: i + 1,
    name: ['alice-portfolio', 'mercel-web', 'dashboard-v2', 'api-gateway', 'mobile-app'][i % 5],
    status: ['ready', 'building', 'error', 'ready', 'ready'][i % 5],
    branch: ['main', 'dev', 'feat/new-ui', 'main', 'staging'][i % 5],
    updated: `${i + 1}h ago`,
  }));

  const tableColumns = [
    { key: 'name', header: 'Project', sortable: true },
    {
      key: 'status', header: 'Status', sortable: true,
      render: (val) => {
        const cfg = { ready: 'success', building: 'info', error: 'danger' };
        return <Tag intent={cfg[val] || 'default'} size="sm">{val}</Tag>;
      },
    },
    { key: 'branch', header: 'Branch' },
    { key: 'updated', header: 'Updated' },
    {
      key: 'actions', header: '',
      render: (_) => (
        <OverflowMenu
          align="right"
          items={[
            { label: 'View', icon: <FileText size={14} /> },
            { label: 'Edit', icon: <Edit size={14} /> },
            { divider: true, dividerLabel: 'Danger zone' },
            { label: 'Delete', icon: <Trash2 size={14} />, danger: true },
          ]}
        />
      ),
    },
  ];

  const sidenavItems = [
    { label: 'Overview', href: '#', icon: <Home size={16} />, active: true },
    { label: 'Deployments', href: '#', icon: <Zap size={16} />, badge: '3' },
    {
      label: 'Analytics', icon: <Activity size={16} />,
      children: [
        { label: 'Traffic', href: '#' },
        { label: 'Performance', href: '#' },
      ],
      expanded: true,
    },
    { divider: true, dividerLabel: 'Settings' },
    { label: 'Domains', href: '#', icon: <Shield size={16} /> },
    { label: 'Environment', href: '#', icon: <Database size={16} /> },
    { label: 'Settings', href: '#', icon: <Settings size={16} /> },
  ];

  return (
    <div className="min-h-screen bg-[var(--ds-bg-secondary)]">
      {/* Page header */}
      <div className="bg-[var(--ds-bg-primary)] border-b border-[var(--ds-border-primary)] sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold text-[var(--ds-text-primary)]">Design System Showcase</h1>
            <p className="text-xs text-[var(--ds-text-secondary)] mt-0.5">aopends component library</p>
          </div>
          <Tag intent="brand" size="sm">v0.2.1</Tag>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-10 space-y-12">

        {/* ── Buttons ─────────────────────────────────────────────────────── */}
        <Section title="Button" description="Primary action trigger. Supports five variants, three sizes, icons, loading state, and full-width layout.">
          <div className="space-y-5">
            <Row label="Variants">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="tertiary">Tertiary</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="ghost">Ghost</Button>
            </Row>
            <Divider />
            <Row label="Sizes">
              <Button variant="primary" size="sm">Small</Button>
              <Button variant="primary" size="md">Medium</Button>
              <Button variant="primary" size="lg">Large</Button>
            </Row>
            <Divider />
            <Row label="With icons">
              <Button variant="primary" icon={<Plus size={16} />}>Add Project</Button>
              <Button variant="secondary" icon={<Download size={16} />} iconPosition="right">Export</Button>
              <Button variant="tertiary" icon={<Bell size={16} />}>Notifications</Button>
            </Row>
            <Divider />
            <Row label="States">
              <Button variant="primary" loading>Loading</Button>
              <Button variant="primary" disabled>Disabled</Button>
              <Button variant="danger" icon={<Trash2 size={16} />}>Delete</Button>
            </Row>
          </div>
        </Section>

        {/* ── TextInput ───────────────────────────────────────────────────── */}
        <Section title="TextInput" description="Text field with label, helper/error/success states, sizes, and icon support.">
          <div className="space-y-5">
            <Row label="Default">
              <div className="w-64">
                <TextInput label="Project name" placeholder="my-project" />
              </div>
              <div className="w-64">
                <TextInput label="Email" placeholder="you@example.com" icon={<Mail size={16} />} />
              </div>
            </Row>
            <Divider />
            <Row label="States">
              <div className="w-64">
                <TextInput label="Helper text" helperText="This will be your public URL slug." />
              </div>
              <div className="w-64">
                <TextInput label="Error state" errorText="This field is required." defaultValue="bad-val" />
              </div>
              <div className="w-64">
                <TextInput label="Success state" successText="Looks good!" defaultValue="my-project" />
              </div>
            </Row>
            <Divider />
            <Row label="Sizes">
              <div className="w-48">
                <TextInput size="sm" placeholder="Small" />
              </div>
              <div className="w-48">
                <TextInput size="md" placeholder="Medium" />
              </div>
              <div className="w-48">
                <TextInput size="lg" placeholder="Large" />
              </div>
            </Row>
            <Divider />
            <Row label="Disabled">
              <div className="w-64">
                <TextInput label="Disabled" disabled defaultValue="read-only value" />
              </div>
            </Row>
          </div>
        </Section>

        {/* ── Checkbox ────────────────────────────────────────────────────── */}
        <Section title="Checkbox" description="Boolean input with indeterminate state support.">
          <Row>
            <Checkbox label="Unchecked" checked={false} onChange={() => {}} />
            <Checkbox label="Checked" checked={true} onChange={() => {}} />
            <Checkbox label="Indeterminate" indeterminate={true} onChange={() => {}} />
            <Checkbox label="Disabled unchecked" disabled />
            <Checkbox label="Disabled checked" checked={true} disabled />
          </Row>
          <Divider />
          <Row label="Sizes">
            <Checkbox label="Small" size="sm" />
            <Checkbox label="Medium" size="md" />
            <Checkbox label="Large" size="lg" />
          </Row>
        </Section>

        {/* ── Toggle ──────────────────────────────────────────────────────── */}
        <Section title="Toggle" description="On/off switch. Mirrors Checkbox API with controlled and uncontrolled modes.">
          <Row>
            <Toggle label="Off" checked={false} onChange={() => {}} />
            <Toggle label="On" checked={true} onChange={() => {}} />
            <Toggle label="Disabled off" disabled />
            <Toggle label="Disabled on" checked={true} disabled />
          </Row>
          <Divider />
          <Row label="Sizes">
            <Toggle label="Small" size="sm" />
            <Toggle label="Medium" size="md" />
            <Toggle label="Large" size="lg" />
          </Row>
        </Section>

        {/* ── Select ──────────────────────────────────────────────────────── */}
        <Section title="Select" description="Native-style select menu. Accepts strings or value/label objects.">
          <div className="space-y-5">
            <Row>
              <div className="w-56">
                <Select
                  label="Framework"
                  options={['Next.js', 'SvelteKit', 'Astro', 'Vite', 'Remix']}
                  placeholder="Select framework"
                  value={selectValue}
                  onChange={setSelectValue}
                />
              </div>
              <div className="w-56">
                <Select
                  label="Region"
                  options={[
                    { value: 'iad1', label: 'Washington D.C. (iad1)' },
                    { value: 'sfo1', label: 'San Francisco (sfo1)' },
                    { value: 'lhr1', label: 'London (lhr1)' },
                  ]}
                  placeholder="Select region"
                  helperText="Closest to your users."
                />
              </div>
              <div className="w-56">
                <Select label="Disabled" options={['Option A']} disabled />
              </div>
            </Row>
          </div>
        </Section>

        {/* ── Dropdown ────────────────────────────────────────────────────── */}
        <Section title="Dropdown" description="Custom-styled dropdown with search and object options.">
          <Row>
            <div className="w-56">
              <Dropdown
                label="Node version"
                options={['18.x', '20.x', '22.x']}
                placeholder="Choose version"
                value={dropdownValue}
                onChange={setDropdownValue}
              />
            </div>
            <div className="w-56">
              <Dropdown
                label="Build output"
                options={[
                  { value: '.next', label: '.next (Next.js)' },
                  { value: 'dist', label: 'dist (Vite/CRA)' },
                  { value: 'build', label: 'build' },
                ]}
                placeholder="Output directory"
                helperText="Where your build artifacts live."
              />
            </div>
          </Row>
        </Section>

        {/* ── Search ──────────────────────────────────────────────────────── */}
        <Section title="Search" description="Search field with debounced submit, suggestions, loading state, and scope chip.">
          <div className="space-y-5">
            <Row label="With suggestions">
              <div className="w-80">
                <Search
                  placeholder="Search projects..."
                  value={searchValue}
                  onChange={setSearchValue}
                  options={[
                    { value: 'mercel-web', label: 'mercel-web', description: 'Production · Next.js' },
                    { value: 'alice-portfolio', label: 'alice-portfolio', description: 'Production · Astro' },
                    { value: 'api-gateway', label: 'api-gateway', description: 'Production · Node.js' },
                  ]}
                  scope="Projects"
                />
              </div>
            </Row>
            <Divider />
            <Row label="Loading state">
              <div className="w-72">
                <Search placeholder="Searching..." loading />
              </div>
            </Row>
          </div>
        </Section>

        {/* ── DatePicker ──────────────────────────────────────────────────── */}
        <Section title="DatePicker" description="Calendar date selector with single and range modes.">
          <Row>
            <div className="w-56">
              <DatePicker
                label="Deploy date"
                value={datepickerValue}
                onChange={setDatepickerValue}
                placeholder="Select date"
                helperText="Scheduled deployment date."
              />
            </div>
            <div className="w-72">
              <DatePicker
                label="Date range"
                mode="range"
                placeholder="Start — End"
              />
            </div>
            <div className="w-56">
              <DatePicker label="Disabled" disabled placeholder="Not available" />
            </div>
          </Row>
        </Section>

        {/* ── Form ────────────────────────────────────────────────────────── */}
        <Section title="Form / FormGroup / FormRow / FormActions" description="Layout primitives for building structured forms.">
          <Form onSubmit={(e) => { e.preventDefault(); }}>
            <FormGroup legend="Project details">
              <FormRow>
                <TextInput label="Project name" placeholder="my-awesome-app" required />
                <Select
                  label="Framework"
                  options={['Next.js', 'SvelteKit', 'Astro']}
                  placeholder="Select"
                />
              </FormRow>
              <TextInput label="Root directory" placeholder="./" helperText="Relative to your repository root." />
            </FormGroup>
            <FormGroup legend="Build settings">
              <FormRow>
                <TextInput label="Build command" placeholder="npm run build" />
                <TextInput label="Output directory" placeholder=".next" />
              </FormRow>
              <FormRow>
                <TextInput label="Install command" placeholder="npm install" />
                <Select label="Node version" options={['18.x', '20.x', '22.x']} />
              </FormRow>
            </FormGroup>
            <FormActions align="right">
              <Button variant="secondary" type="button">Cancel</Button>
              <Button variant="primary" type="submit">Deploy</Button>
            </FormActions>
          </Form>
        </Section>

        {/* ── Tag ─────────────────────────────────────────────────────────── */}
        <Section title="Tag" description="Compact label with intent variants, sizes, outline style, icon, and close button.">
          <div className="space-y-5">
            <Row label="Intents — filled">
              <Tag intent="default">Default</Tag>
              <Tag intent="brand">Brand</Tag>
              <Tag intent="success">Success</Tag>
              <Tag intent="warning">Warning</Tag>
              <Tag intent="danger">Danger</Tag>
              <Tag intent="info">Info</Tag>
            </Row>
            <Divider />
            <Row label="Outline">
              <Tag intent="default" outline>Default</Tag>
              <Tag intent="brand" outline>Brand</Tag>
              <Tag intent="success" outline>Success</Tag>
              <Tag intent="warning" outline>Warning</Tag>
              <Tag intent="danger" outline>Danger</Tag>
              <Tag intent="info" outline>Info</Tag>
            </Row>
            <Divider />
            <Row label="With icon & closable">
              <Tag intent="brand" icon={<Star size={12} />}>Featured</Tag>
              <Tag intent="success" icon={<Check size={12} />}>Verified</Tag>
              <Tag intent="danger" closable onClose={() => {}}>Remove me</Tag>
            </Row>
            <Divider />
            <Row label="Sizes">
              <Tag intent="brand" size="sm">Small</Tag>
              <Tag intent="brand" size="md">Medium</Tag>
              <Tag intent="brand" size="lg">Large</Tag>
            </Row>
          </div>
        </Section>

        {/* ── Notification ────────────────────────────────────────────────── */}
        <Section title="Notification" description="Inline alert banners for persistent contextual messages.">
          <div className="space-y-3">
            <Notification intent="info" title="Info" closable>Your deployment is queued and will start shortly.</Notification>
            <Notification intent="success" title="Deployed successfully" closable>Your project is live at <strong>mercel-web.vercel.app</strong>.</Notification>
            <Notification intent="warning" title="Approaching limits" closable>You've used 85% of your bandwidth this month.</Notification>
            <Notification intent="error" title="Build failed" closable>Exit code 1: cannot find module 'react-dom'.</Notification>
          </div>
        </Section>

        {/* ── Banner ──────────────────────────────────────────────────────── */}
        <Section title="Banner" description="Full-width alert strip, typically pinned to the top of a page.">
          <div className="space-y-3">
            <Banner intent="info" closable>Scheduled maintenance on 2026-05-10 from 02:00–04:00 UTC.</Banner>
            <Banner intent="success" closable>Billing updated — your new plan is active.</Banner>
            <Banner intent="warning" closable>Your free trial ends in 3 days.</Banner>
            <Banner intent="error" closable>Payment failed. Please update your payment method.</Banner>
          </div>
        </Section>

        {/* ── Toast ───────────────────────────────────────────────────────── */}
        <Section title="Toast" description="Transient notification that auto-dismisses. Click a button below to preview.">
          <div className="space-y-4">
            <Row label="Trigger">
              {['info', 'success', 'warning', 'error'].map((intent) => (
                <Button
                  key={intent}
                  variant="secondary"
                  size="sm"
                  onClick={() => { setToastIntent(intent); setToastOpen(true); }}
                >
                  Show {intent}
                </Button>
              ))}
            </Row>
            <Toast
              intent={toastIntent}
              title={toastIntent.charAt(0).toUpperCase() + toastIntent.slice(1) + ' toast'}
              open={toastOpen}
              duration={3000}
              onClose={() => setToastOpen(false)}
            >
              This is a {toastIntent} toast notification message.
            </Toast>
          </div>
        </Section>

        {/* ── Spinner ─────────────────────────────────────────────────────── */}
        <Section title="Spinner" description="Animated loading indicator in four sizes.">
          <Row label="Sizes">
            <Spinner size="sm" label="Loading small" />
            <Spinner size="md" label="Loading medium" />
            <Spinner size="lg" label="Loading large" />
            <Spinner size="xl" label="Loading extra large" />
          </Row>
        </Section>

        {/* ── Skeleton ────────────────────────────────────────────────────── */}
        <Section title="Skeleton / SkeletonText / TableSkeleton" description="Loading placeholders that mimic the shape of real content.">
          <div className="space-y-5">
            <Row label="Skeleton variants">
              <Skeleton width={200} height={20} variant="rectangular" />
              <Skeleton width={40} height={40} variant="circular" />
              <Skeleton width={120} height="1em" variant="text" />
            </Row>
            <Divider />
            <Row label="SkeletonText">
              <div className="w-72">
                <SkeletonText lines={3} />
              </div>
            </Row>
            <Divider />
            <Row label="TableSkeleton">
              <div className="w-full">
                <TableSkeleton rows={4} columns={4} />
              </div>
            </Row>
          </div>
        </Section>

        {/* ── Breadcrumb ──────────────────────────────────────────────────── */}
        <Section title="Breadcrumb" description="Hierarchical navigation trail with custom separator support.">
          <div className="space-y-3">
            <Breadcrumb
              items={[
                { label: 'Home', href: '#' },
                { label: 'Projects', href: '#' },
                { label: 'mercel-web' },
              ]}
            />
            <Breadcrumb
              items={[
                { label: 'Dashboard', href: '#', icon: <Home size={14} /> },
                { label: 'Settings', href: '#', icon: <Settings size={14} /> },
                { label: 'Domains' },
              ]}
              separator={<ChevronRight size={14} />}
            />
          </div>
        </Section>

        {/* ── Tabs ────────────────────────────────────────────────────────── */}
        <Section title="Tabs" description="Content switcher with underline and pill variants, badges, and disabled tabs.">
          <div className="space-y-6">
            <div>
              <p className="text-xs font-medium text-[var(--ds-text-tertiary)] uppercase tracking-wider mb-3">Underline (default)</p>
              <Tabs
                variant="underline"
                defaultValue="overview"
                items={[
                  { value: 'overview', label: 'Overview', content: <p className="pt-4 text-sm text-[var(--ds-text-secondary)]">Overview content area.</p> },
                  { value: 'deployments', label: 'Deployments', badge: '5', content: <p className="pt-4 text-sm text-[var(--ds-text-secondary)]">Deployments content area.</p> },
                  { value: 'analytics', label: 'Analytics', content: <p className="pt-4 text-sm text-[var(--ds-text-secondary)]">Analytics content area.</p> },
                  { value: 'settings', label: 'Settings', disabled: true, content: null },
                ]}
              />
            </div>
            <Divider />
            <div>
              <p className="text-xs font-medium text-[var(--ds-text-tertiary)] uppercase tracking-wider mb-3">Pill</p>
              <Tabs
                variant="pill"
                defaultValue="all"
                items={[
                  { value: 'all', label: 'All', content: null },
                  { value: 'production', label: 'Production', content: null },
                  { value: 'preview', label: 'Preview', badge: '3', content: null },
                  { value: 'development', label: 'Development', content: null },
                ]}
              />
            </div>
          </div>
        </Section>

        {/* ── OverflowMenu ────────────────────────────────────────────────── */}
        <Section title="OverflowMenu" description="Contextual action menu triggered by a trigger element (defaults to vertical dots).">
          <Row>
            <OverflowMenu
              items={[
                { label: 'View deployment', icon: <FileText size={14} /> },
                { label: 'Copy URL', icon: <Copy size={14} />, shortcut: '⌘C' },
                { label: 'Download logs', icon: <Download size={14} /> },
                { divider: true, dividerLabel: 'Danger zone' },
                { label: 'Delete', icon: <Trash2 size={14} />, danger: true },
              ]}
            />
            <OverflowMenu
              align="right"
              items={[
                { label: 'Edit', icon: <Edit size={14} />, shortcut: '⌘E' },
                { label: 'Duplicate', icon: <Copy size={14} /> },
                { divider: true },
                { label: 'Archive', danger: true },
              ]}
              trigger={
                <Button variant="secondary" size="sm" icon={<MoreVertical size={14} />}>Actions</Button>
              }
            />
          </Row>
        </Section>

        {/* ── Modal ───────────────────────────────────────────────────────── */}
        <Section title="Modal" description="Dialog overlay with configurable size, footer, and dismiss behaviour.">
          <div className="space-y-4">
            <Row label="Open by size">
              {['sm', 'md', 'lg', 'xl'].map((size) => (
                <Button
                  key={size}
                  variant="secondary"
                  size="sm"
                  onClick={() => { setModalSize(size); setModalOpen(true); }}
                >
                  {size.toUpperCase()}
                </Button>
              ))}
            </Row>
            <Modal
              open={modalOpen}
              onClose={() => setModalOpen(false)}
              title="Deploy to production"
              size={modalSize}
              footer={
                <div className="flex gap-2 justify-end">
                  <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
                  <Button variant="primary" onClick={() => setModalOpen(false)}>Deploy</Button>
                </div>
              }
            >
              <div className="space-y-4">
                <Notification intent="warning" title="Production deployment">
                  This will overwrite the current production deployment.
                </Notification>
                <TextInput label="Deployment comment" placeholder="e.g. fix: resolve auth bug" />
                <Toggle label="Run post-deploy checks" defaultChecked />
              </div>
            </Modal>
          </div>
        </Section>

        {/* ── KpiCard ─────────────────────────────────────────────────────── */}
        <Section title="KpiCard" description="Metric display card with five layout variants.">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <KpiCard
              label="Total Deployments"
              value="1,284"
              variant="simple"
            />
            <KpiCard
              label="Bandwidth"
              value="48.2 GB"
              variant="with-trend"
              trendData={[12, 18, 14, 22, 30, 28, 35, 40, 38, 48]}
              trendColor="#3b82f6"
            />
            <KpiCard
              label="Build Success Rate"
              value="97.3%"
              variant="with-delta"
              delta={2.4}
              deltaFormat="percentage"
              deltaLabel="vs last month"
            />
            <KpiCard
              label="Storage Used"
              value="6.4 GB"
              variant="with-progress"
              progress={64}
              target="10 GB"
              progressType="bar"
              progressColor="#22c55e"
            />
            <KpiCard
              label="Active Users"
              value="8,412"
              variant="with-icon"
              icon={<Users size={20} />}
              iconColor="#6366f1"
            />
            <KpiCard
              label="Revenue"
              value="$12,340"
              variant="with-icon"
              icon={<DollarSign size={20} />}
              iconColor="#22c55e"
            />
          </div>
        </Section>

        {/* ── DataTable ───────────────────────────────────────────────────── */}
        <Section title="DataTable" description="Feature-rich data table with sorting, row selection, custom renderers, and pagination.">
          <div className="space-y-5">
            <DataTable
              columns={tableColumns}
              data={tableData.slice(0, 5)}
              sortable
              selectable
              striped
              size="md"
            />
            <Divider />
            <p className="text-xs font-medium text-[var(--ds-text-tertiary)] uppercase tracking-wider">Loading state</p>
            <DataTable
              columns={tableColumns}
              data={[]}
              loading
              emptyMessage="No deployments found."
            />
          </div>
        </Section>

        {/* ── Pagination ──────────────────────────────────────────────────── */}
        <Section title="Pagination" description="Page navigation with item count, page-size selector, and sibling count control.">
          <div className="space-y-5">
            <Pagination
              value={tablePage}
              totalPages={10}
              totalItems={100}
              pageSize={10}
              onChange={setTablePage}
              showItemCount
            />
            <Divider />
            <Pagination
              value={tablePage}
              totalPages={10}
              totalItems={100}
              pageSize={10}
              onChange={setTablePage}
              onPageSizeChange={() => {}}
              showPageSizeSelector
              showItemCount
              pageSizeOptions={[10, 25, 50]}
            />
          </div>
        </Section>

        {/* ── Header ──────────────────────────────────────────────────────── */}
        <Section title="Header" description="Top navigation bar with logo, nav items, and action slot.">
          <div className="-mx-6 -mt-6 rounded-t-[var(--ds-radius-lg)] overflow-hidden">
            <Header
              logo={<Logo />}
              productName="Mercel"
              items={[
                { label: 'Overview', href: '#', active: true },
                { label: 'Deployments', href: '#' },
                { label: 'Analytics', href: '#' },
                { label: 'Settings', href: '#', icon: <Settings size={14} /> },
              ]}
              actions={
                <div className="flex items-center gap-2">
                  <Button variant="ghost" size="sm" icon={<Bell size={16} />} />
                  <Button variant="primary" size="sm">New Project</Button>
                </div>
              }
            />
          </div>
        </Section>

        {/* ── SideNav ─────────────────────────────────────────────────────── */}
        <Section title="SideNav" description="Vertical navigation with nested items, badges, dividers, and collapsed (icon-only) mode.">
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 items-start">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setSidenavCollapsed(!sidenavCollapsed)}
              >
                {sidenavCollapsed ? 'Expand' : 'Collapse'}
              </Button>
            </div>
            <div className="flex-1 border border-[var(--ds-border-primary)] rounded-[var(--ds-radius-lg)] overflow-hidden" style={{ minHeight: 320 }}>
              <SideNav
                items={sidenavItems}
                collapsed={sidenavCollapsed}
                header={
                  <div className="flex items-center gap-2 px-2 py-1">
                    <Logo />
                    {!sidenavCollapsed && <span className="font-semibold text-sm text-[var(--ds-text-primary)]">Mercel</span>}
                  </div>
                }
              />
            </div>
          </div>
        </Section>

      </div>
    </div>
  );
}
