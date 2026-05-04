// type: 'phase' | 'command' | 'output' | 'success' | 'error' | 'warning' | 'info' | 'divider'
// phase: 'clone' | 'install' | 'build' | 'deploy'

const successLogs = [
  { time: '12:34:50.012', phase: 'clone',   type: 'phase',   message: 'Cloning repository' },
  { time: '12:34:50.015', phase: 'clone',   type: 'command', message: 'git clone https://github.com/asmobbin/nextjs-blog' },
  { time: '12:34:50.287', phase: 'clone',   type: 'output',  message: "Cloning into '/vercel/path0'..." },
  { time: '12:34:50.801', phase: 'clone',   type: 'output',  message: 'remote: Enumerating objects: 142, done.' },
  { time: '12:34:50.802', phase: 'clone',   type: 'output',  message: 'remote: Counting objects: 100% (142/142), done.' },
  { time: '12:34:50.803', phase: 'clone',   type: 'output',  message: 'remote: Compressing objects: 100% (98/98), done.' },
  { time: '12:34:50.901', phase: 'clone',   type: 'output',  message: 'Receiving objects: 100% (142/142), 1.24 MiB | 9.1 MiB/s, done.' },
  { time: '12:34:50.920', phase: 'clone',   type: 'command', message: 'git checkout a8f3c2d' },
  { time: '12:34:50.932', phase: 'clone',   type: 'output',  message: "HEAD is now at a8f3c2d Fix navbar responsive layout" },
  { time: '12:34:50.950', phase: 'clone',   type: 'success', message: 'Cloned in 938ms' },
  { time: '12:34:50.951', phase: 'clone',   type: 'divider', message: '' },

  { time: '12:34:51.001', phase: 'install', type: 'phase',   message: 'Analyzing project' },
  { time: '12:34:51.010', phase: 'install', type: 'info',    message: 'Framework: Next.js 14.2.3 (detected from package.json)' },
  { time: '12:34:51.011', phase: 'install', type: 'info',    message: 'Node.js: 20.x' },
  { time: '12:34:51.012', phase: 'install', type: 'info',    message: 'Package manager: npm 10.x' },
  { time: '12:34:51.020', phase: 'install', type: 'divider', message: '' },

  { time: '12:34:51.021', phase: 'install', type: 'phase',   message: 'Installing dependencies' },
  { time: '12:34:51.025', phase: 'install', type: 'command', message: 'npm install' },
  { time: '12:34:51.210', phase: 'install', type: 'output',  message: 'npm warn deprecated inflight@1.0.6: This module is not supported' },
  { time: '12:34:51.950', phase: 'install', type: 'output',  message: 'npm warn deprecated glob@7.2.3: Glob versions prior to v9 are no longer supported' },
  { time: '12:35:02.441', phase: 'install', type: 'output',  message: 'added 847 packages, and audited 848 packages in 11s' },
  { time: '12:35:02.442', phase: 'install', type: 'output',  message: '155 packages are looking for funding' },
  { time: '12:35:02.443', phase: 'install', type: 'output',  message: '  run `npm fund` for details' },
  { time: '12:35:02.444', phase: 'install', type: 'output',  message: 'found 0 vulnerabilities' },
  { time: '12:35:02.460', phase: 'install', type: 'success', message: 'Installed in 11.4s' },
  { time: '12:35:02.461', phase: 'install', type: 'divider', message: '' },

  { time: '12:35:02.500', phase: 'build',   type: 'phase',   message: 'Building application' },
  { time: '12:35:02.510', phase: 'build',   type: 'command', message: 'npm run build' },
  { time: '12:35:02.800', phase: 'build',   type: 'output',  message: '> nextjs-blog@1.0.0 build' },
  { time: '12:35:02.801', phase: 'build',   type: 'output',  message: '> next build' },
  { time: '12:35:02.900', phase: 'build',   type: 'info',    message: '  ▲ Next.js 14.2.3' },
  { time: '12:35:03.100', phase: 'build',   type: 'output',  message: '   Creating an optimized production build ...' },
  { time: '12:35:15.240', phase: 'build',   type: 'output',  message: ' ✓ Compiled successfully' },
  { time: '12:35:15.241', phase: 'build',   type: 'output',  message: ' ✓ Linting and checking validity of types' },
  { time: '12:35:15.242', phase: 'build',   type: 'output',  message: ' ✓ Collecting page data' },
  { time: '12:35:15.950', phase: 'build',   type: 'output',  message: ' ✓ Generating static pages (14/14)' },
  { time: '12:35:15.951', phase: 'build',   type: 'output',  message: ' ✓ Collecting build traces' },
  { time: '12:35:16.200', phase: 'build',   type: 'output',  message: ' ✓ Finalizing page optimization' },
  { time: '12:35:16.201', phase: 'build',   type: 'output',  message: '' },
  { time: '12:35:16.202', phase: 'build',   type: 'output',  message: 'Route (app)                              Size     First Load JS' },
  { time: '12:35:16.203', phase: 'build',   type: 'output',  message: '┌ ○ /                                    5.21 kB        92.4 kB' },
  { time: '12:35:16.204', phase: 'build',   type: 'output',  message: '├ ○ /about                               2.44 kB        89.6 kB' },
  { time: '12:35:16.205', phase: 'build',   type: 'output',  message: '├ ● /blog                                3.81 kB        91.0 kB' },
  { time: '12:35:16.206', phase: 'build',   type: 'output',  message: '├   └ /blog/[slug]                       1.23 kB        88.4 kB' },
  { time: '12:35:16.207', phase: 'build',   type: 'output',  message: '└ ○ /404                                 977 B          87.2 kB' },
  { time: '12:35:16.208', phase: 'build',   type: 'output',  message: '+ First Load JS shared by all            87.2 kB' },
  { time: '12:35:16.209', phase: 'build',   type: 'output',  message: '  ├ chunks/framework-8d8e8e8e8e8e8e.js  44.8 kB' },
  { time: '12:35:16.210', phase: 'build',   type: 'output',  message: '  └ chunks/main-app-1a2b3c4d.js         42.4 kB' },
  { time: '12:35:16.220', phase: 'build',   type: 'success', message: 'Build completed in 13.7s' },
  { time: '12:35:16.221', phase: 'build',   type: 'divider', message: '' },

  { time: '12:35:16.300', phase: 'deploy',  type: 'phase',   message: 'Deploying to edge network' },
  { time: '12:35:16.310', phase: 'deploy',  type: 'output',  message: 'Uploading build artifacts...' },
  { time: '12:35:17.100', phase: 'deploy',  type: 'output',  message: 'Uploaded 2.4 MB in 0.8s' },
  { time: '12:35:17.101', phase: 'deploy',  type: 'output',  message: 'Assigning domains...' },
  { time: '12:35:17.500', phase: 'deploy',  type: 'output',  message: 'Propagating to 18 edge regions...' },
  { time: '12:35:19.800', phase: 'deploy',  type: 'output',  message: 'iad1 — Washington D.C., USA' },
  { time: '12:35:19.801', phase: 'deploy',  type: 'output',  message: 'lhr1 — London, UK' },
  { time: '12:35:19.802', phase: 'deploy',  type: 'output',  message: 'sin1 — Singapore' },
  { time: '12:35:19.803', phase: 'deploy',  type: 'output',  message: 'syd1 — Sydney, Australia' },
  { time: '12:35:19.900', phase: 'deploy',  type: 'success', message: 'Deployed to 18 regions in 3.6s' },
  { time: '12:35:19.901', phase: 'deploy',  type: 'divider', message: '' },
  { time: '12:35:19.910', phase: 'deploy',  type: 'success', message: 'Deployment complete! Total build time: 45s' },
];

const errorLogs = [
  { time: '09:12:30.012', phase: 'clone',   type: 'phase',   message: 'Cloning repository' },
  { time: '09:12:30.015', phase: 'clone',   type: 'command', message: 'git clone https://github.com/asmobbin/docs-site' },
  { time: '09:12:30.801', phase: 'clone',   type: 'output',  message: "Cloning into '/vercel/path0'..." },
  { time: '09:12:31.210', phase: 'clone',   type: 'output',  message: 'Receiving objects: 100% (88/88), 892 kB | 7.4 MiB/s, done.' },
  { time: '09:12:31.250', phase: 'clone',   type: 'success', message: 'Cloned in 1.2s' },
  { time: '09:12:31.251', phase: 'clone',   type: 'divider', message: '' },

  { time: '09:12:31.300', phase: 'install', type: 'phase',   message: 'Analyzing project' },
  { time: '09:12:31.310', phase: 'install', type: 'info',    message: 'Framework: Astro 4.5.0 (detected from package.json)' },
  { time: '09:12:31.311', phase: 'install', type: 'info',    message: 'Node.js: 20.x' },
  { time: '09:12:31.320', phase: 'install', type: 'divider', message: '' },

  { time: '09:12:31.400', phase: 'install', type: 'phase',   message: 'Installing dependencies' },
  { time: '09:12:31.410', phase: 'install', type: 'command', message: 'npm install' },
  { time: '09:12:38.900', phase: 'install', type: 'output',  message: 'added 412 packages in 7.4s' },
  { time: '09:12:38.910', phase: 'install', type: 'success', message: 'Installed in 7.5s' },
  { time: '09:12:38.911', phase: 'install', type: 'divider', message: '' },

  { time: '09:12:39.000', phase: 'build',   type: 'phase',   message: 'Building application' },
  { time: '09:12:39.010', phase: 'build',   type: 'command', message: 'npm run build' },
  { time: '09:12:39.200', phase: 'build',   type: 'output',  message: '> docs-site@0.1.0 build' },
  { time: '09:12:39.201', phase: 'build',   type: 'output',  message: '> astro build' },
  { time: '09:12:39.400', phase: 'build',   type: 'info',    message: '  astro  v4.5.0 build' },
  { time: '09:12:39.500', phase: 'build',   type: 'output',  message: '  Output: static' },
  { time: '09:12:40.100', phase: 'build',   type: 'warning', message: "[WARN] Missing export in 'src/content/config.ts'" },
  { time: '09:12:40.500', phase: 'build',   type: 'output',  message: "  Building entrypoints..." },
  { time: '09:12:41.200', phase: 'build',   type: 'error',   message: "[ERROR] Transform failed with 1 error:" },
  { time: '09:12:41.201', phase: 'build',   type: 'error',   message: "  src/pages/api/reference.mdx:14:1: error: Expected identifier but found \"[\"" },
  { time: '09:12:41.202', phase: 'build',   type: 'error',   message: '' },
  { time: '09:12:41.203', phase: 'build',   type: 'error',   message: "  14 | [API Reference](/reference)" },
  { time: '09:12:41.204', phase: 'build',   type: 'error',   message: "     | ^" },
  { time: '09:12:41.205', phase: 'build',   type: 'error',   message: '' },
  { time: '09:12:41.210', phase: 'build',   type: 'error',   message: "  AstroUserError: Couldn't build pages" },
  { time: '09:12:41.211', phase: 'build',   type: 'error',   message: "    at build (/vercel/path0/node_modules/astro/dist/core/build/index.js:142:9)" },
  { time: '09:12:41.212', phase: 'build',   type: 'error',   message: "    at Object.build (/vercel/path0/node_modules/astro/dist/cli/index.js:91:20)" },
  { time: '09:12:41.220', phase: 'build',   type: 'error',   message: 'Build failed after 8s' },
];

const buildingLogs = [
  { time: '14:22:10.000', phase: 'clone',   type: 'phase',   message: 'Cloning repository' },
  { time: '14:22:10.020', phase: 'clone',   type: 'command', message: 'git clone https://github.com/asmobbin/e-commerce' },
  { time: '14:22:11.100', phase: 'clone',   type: 'output',  message: 'Receiving objects: 100% (317/317), 3.1 MiB | 8.2 MiB/s, done.' },
  { time: '14:22:11.200', phase: 'clone',   type: 'success', message: 'Cloned in 1.2s' },
  { time: '14:22:11.201', phase: 'clone',   type: 'divider', message: '' },

  { time: '14:22:11.400', phase: 'install', type: 'phase',   message: 'Analyzing project' },
  { time: '14:22:11.410', phase: 'install', type: 'info',    message: 'Framework: Next.js 14.2.3 (detected from package.json)' },
  { time: '14:22:11.420', phase: 'install', type: 'divider', message: '' },

  { time: '14:22:11.500', phase: 'install', type: 'phase',   message: 'Installing dependencies' },
  { time: '14:22:11.510', phase: 'install', type: 'command', message: 'npm install' },
  { time: '14:22:24.800', phase: 'install', type: 'output',  message: 'added 1,284 packages in 13.2s' },
  { time: '14:22:24.810', phase: 'install', type: 'success', message: 'Installed in 13.3s' },
  { time: '14:22:24.811', phase: 'install', type: 'divider', message: '' },

  { time: '14:22:25.000', phase: 'build',   type: 'phase',   message: 'Building application' },
  { time: '14:22:25.010', phase: 'build',   type: 'command', message: 'npm run build' },
  { time: '14:22:25.200', phase: 'build',   type: 'output',  message: '> e-commerce@2.1.0 build' },
  { time: '14:22:25.201', phase: 'build',   type: 'output',  message: '> next build' },
  { time: '14:22:25.400', phase: 'build',   type: 'info',    message: '  ▲ Next.js 14.2.3' },
  { time: '14:22:25.600', phase: 'build',   type: 'output',  message: '   Creating an optimized production build ...' },
];

const canceledLogs = [
  { time: '11:05:20.000', phase: 'clone',   type: 'phase',   message: 'Cloning repository' },
  { time: '11:05:20.020', phase: 'clone',   type: 'command', message: 'git clone https://github.com/asmobbin/landing-page' },
  { time: '11:05:20.890', phase: 'clone',   type: 'output',  message: 'Receiving objects: 100% (54/54), 421 kB | 6.1 MiB/s, done.' },
  { time: '11:05:20.910', phase: 'clone',   type: 'success', message: 'Cloned in 910ms' },
  { time: '11:05:20.911', phase: 'clone',   type: 'divider', message: '' },

  { time: '11:05:21.000', phase: 'install', type: 'phase',   message: 'Analyzing project' },
  { time: '11:05:21.010', phase: 'install', type: 'info',    message: 'Framework: Vite 5.2.0 (detected from package.json)' },
  { time: '11:05:21.020', phase: 'install', type: 'divider', message: '' },

  { time: '11:05:21.100', phase: 'install', type: 'phase',   message: 'Installing dependencies' },
  { time: '11:05:21.110', phase: 'install', type: 'command', message: 'npm install' },
  { time: '11:05:27.400', phase: 'install', type: 'output',  message: 'added 289 packages in 6.2s' },
  { time: '11:05:27.420', phase: 'install', type: 'success', message: 'Installed in 6.3s' },
  { time: '11:05:27.421', phase: 'install', type: 'divider', message: '' },

  { time: '11:05:27.500', phase: 'build',   type: 'phase',   message: 'Building application' },
  { time: '11:05:27.510', phase: 'build',   type: 'command', message: 'npm run build' },
  { time: '11:05:27.700', phase: 'build',   type: 'output',  message: '> landing-page@1.0.0 build' },
  { time: '11:05:27.701', phase: 'build',   type: 'output',  message: '> vite build' },
  { time: '11:05:28.000', phase: 'build',   type: 'info',    message: 'vite v5.2.0 building for production...' },
  { time: '11:05:28.100', phase: 'build',   type: 'warning', message: 'Deployment canceled by user' },
];

// Map deployment IDs to their log set by status
export const buildLogsByDeployment = {
  // ready deployments
  'dpl_a8f3c2d': successLogs,
  'dpl_b9e4d1f': successLogs,
  'dpl_c2a6e3b': successLogs,
  'dpl_e1b5a8d': successLogs,
  'dpl_4618318': successLogs,
  'dpl_c2e9f4a': successLogs,
  'dpl_b7d3a1c': successLogs,
  'dpl_c8e4f2a': successLogs,
  'dpl_e9c2f4d': successLogs,
  'dpl_f1a3b5c': successLogs,
  'dpl_f2b4e6a': successLogs,
  'dpl_f6b8d0e': successLogs,
  'dpl_a3c7e9f': successLogs,
  // error deployments
  'dpl_d4f7c9e': errorLogs,
  'dpl_d3f0e5b': errorLogs,
  // building deployments
  'dpl_e5a7c9d': buildingLogs,
  // canceled deployments
  'dpl_b4d6a2e': canceledLogs,
};

export const buildPhases = {
  clone:   { label: 'Clone',   order: 0 },
  install: { label: 'Install', order: 1 },
  build:   { label: 'Build',   order: 2 },
  deploy:  { label: 'Deploy',  order: 3 },
};

// Durations per phase (derived from the log timestamps above)
export const phaseDurationsByStatus = {
  ready:    { clone: '938ms', install: '11.4s', build: '13.7s', deploy: '3.6s' },
  error:    { clone: '1.2s',  install: '7.5s',  build: '8s',    deploy: null },
  building: { clone: '1.2s',  install: '13.3s', build: null,    deploy: null },
  canceled: { clone: '910ms', install: '6.3s',  build: null,    deploy: null },
};
