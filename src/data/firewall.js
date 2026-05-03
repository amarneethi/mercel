export const firewallData = {
  activityChart: [
    { time: '10:46', allowed: 2, blocked: 0 },
    { time: '10:47', allowed: 3, blocked: 1 },
    { time: '10:48', allowed: 1, blocked: 0 },
    { time: '10:49', allowed: 4, blocked: 0 },
    { time: '10:50', allowed: 2, blocked: 1 },
    { time: '10:51', allowed: 5, blocked: 0 },
    { time: '10:52', allowed: 3, blocked: 0 },
    { time: '10:53', allowed: 2, blocked: 2 },
    { time: '10:54', allowed: 4, blocked: 0 },
    { time: '10:55', allowed: 3, blocked: 0 },
  ],
  rules: [
    { id: 'sys-1', name: 'Default Web Traffic', action: 'allow', amount: 24, ratio: '96%', type: 'system' },
    { id: 'sys-2', name: 'Bot Protection', action: 'challenge', amount: 1, ratio: '4%', type: 'system' },
    { id: 'usr-1', name: 'Block suspicious IPs', action: 'block', amount: 0, ratio: '0%', type: 'custom' },
    { id: 'usr-2', name: 'Rate limit API routes', action: 'challenge', amount: 0, ratio: '0%', type: 'custom' },
  ],
};
