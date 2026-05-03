export const analyticsData = {
  visitors: 11,
  pageViews: 34,
  trafficData: [
    { date: 'Aug 21', visitors: 0, pageViews: 0 },
    { date: 'Aug 22', visitors: 0, pageViews: 0 },
    { date: 'Aug 23', visitors: 0, pageViews: 0 },
    { date: 'Aug 24', visitors: 0, pageViews: 0 },
    { date: 'Aug 25', visitors: 0, pageViews: 1 },
    { date: 'Aug 26', visitors: 1, pageViews: 4 },
    { date: 'Aug 27', visitors: 4, pageViews: 12 },
    { date: 'Aug 28', visitors: 6, pageViews: 17 },
  ],
  pages: [
    { path: '/', visitors: 11, pageViews: 34 },
    { path: '/about', visitors: 4, pageViews: 7 },
    { path: '/blog', visitors: 3, pageViews: 9 },
    { path: '/contact', visitors: 2, pageViews: 3 },
    { path: '/pricing', visitors: 1, pageViews: 2 },
  ],
  referrers: [
    { source: 'com.slack', visitors: 2, pageViews: 7 },
    { source: 'vercel.com', visitors: 2, pageViews: 2 },
    { source: 'alohafind.com', visitors: 1, pageViews: 2 },
    { source: 'github.com', visitors: 1, pageViews: 1 },
  ],
  countries: [
    { label: 'Indonesia', value: '4' },
    { label: 'United Kingdom', value: '2' },
    { label: 'Canada', value: '1' },
    { label: 'Germany', value: '1' },
    { label: 'France', value: '1' },
  ],
  operatingSystems: [
    { label: 'Android', value: '8' },
    { label: 'Mac', value: '2' },
    { label: 'iOS', value: '1' },
  ],
  browsers: [
    { label: 'Chrome Mobile', value: '5' },
    { label: 'Chrome', value: '3' },
    { label: 'Aloha Browser Lite', value: '1' },
    { label: 'Mobile Safari', value: '1' },
    { label: 'vivo Browser', value: '1' },
  ],
};

export const speedMetrics = {
  lcp: { label: 'Largest Contentful Paint', value: 1.8, unit: 's', score: 92, status: 'good' },
  fcp: { label: 'First Contentful Paint', value: 0.9, unit: 's', score: 98, status: 'good' },
  cls: { label: 'Cumulative Layout Shift', value: 0.03, unit: '', score: 95, status: 'good' },
  inp: { label: 'Interaction to Next Paint', value: 142, unit: 'ms', score: 88, status: 'good' },
  ttfb: { label: 'Time to First Byte', value: 210, unit: 'ms', score: 90, status: 'good' },
};
