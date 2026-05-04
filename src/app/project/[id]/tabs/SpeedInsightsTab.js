'use client';

import { Select, Notification, KpiCard, LineChart, Tag } from 'aopends';
import { Globe, CheckCircle } from 'lucide-react';
import { speedMetrics } from '@/data/analytics';

export default function SpeedInsightsTab({ project }) {
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
