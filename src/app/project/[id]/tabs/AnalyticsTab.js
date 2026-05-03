'use client';

import { useState } from 'react';
import {
  Select, Tag, AreaChart, RankedList,
} from 'aopends';
import { Globe, Plus, Layers } from 'lucide-react';
import { analyticsData } from '@/data/analytics';

export default function AnalyticsTab({ project }) {
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
