export const PROJECT_TEMPLATES = {
  'web-app': {
    id: 'web-app',
    name: 'Web Application',
    icon: '🌐',
    description: 'A standard web application project covering discovery, design, development, and deployment.',
    phases: [
      {
        id: 'phase-web-1',
        name: 'Discovery',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'web-req', name: 'Requirements gathering', description: 'Gather requirements from stakeholders', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: [], isMilestone: false },
          { id: 'web-user-res', name: 'User research', description: 'Conduct user research and interviews', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['web-req'], isMilestone: false },
          { id: 'web-comp-ana', name: 'Competitor analysis', description: 'Analyze market competitors', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['web-req'], isMilestone: false },
          { id: 'web-disc-milestone', name: 'Discovery complete', description: 'Sign-off on discovery phase', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['web-user-res', 'web-comp-ana'], isMilestone: true }
        ]
      },
      {
        id: 'phase-web-2',
        name: 'Design',
        color: '#a78bfa',
        order: 2,
        tasks: [
          { id: 'web-wire', name: 'Wireframes', description: 'Create low-fidelity wireframes', baseDuration: { small: 3, medium: 5, large: 10 }, dependencies: ['web-disc-milestone'], isMilestone: false },
          { id: 'web-mock', name: 'UI mockups', description: 'High-fidelity UI mockups', baseDuration: { small: 4, medium: 8, large: 15 }, dependencies: ['web-wire'], isMilestone: false },
          { id: 'web-design-sys', name: 'Design system', description: 'Establish design system and tokens', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['web-mock'], isMilestone: false },
          { id: 'web-design-milestone', name: 'Design review', description: 'Design phase complete', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['web-design-sys'], isMilestone: true }
        ]
      },
      {
        id: 'phase-web-3',
        name: 'Frontend',
        color: '#3b82f6',
        order: 3,
        tasks: [
          { id: 'web-comp-lib', name: 'Component library', description: 'Build reusable UI components', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['web-design-milestone'], isMilestone: false },
          { id: 'web-page-impl', name: 'Page implementation', description: 'Build core application pages', baseDuration: { small: 5, medium: 10, large: 20 }, dependencies: ['web-comp-lib'], isMilestone: false },
          { id: 'web-state', name: 'State management', description: 'Implement global state management', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['web-page-impl'], isMilestone: false },
          { id: 'web-resp', name: 'Responsive design', description: 'Ensure mobile responsiveness', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['web-page-impl'], isMilestone: false },
          { id: 'web-front-milestone', name: 'Frontend complete', description: 'Frontend development finished', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['web-state', 'web-resp'], isMilestone: true }
        ]
      },
      {
        id: 'phase-web-4',
        name: 'Backend',
        color: '#06b6d4',
        order: 4,
        tasks: [
          { id: 'web-api-arch', name: 'API architecture', description: 'Design API structure', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['web-disc-milestone'], isMilestone: false },
          { id: 'web-db-schema', name: 'Database schema', description: 'Design database schema', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['web-api-arch'], isMilestone: false },
          { id: 'web-auth', name: 'Authentication', description: 'Implement user auth', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['web-db-schema'], isMilestone: false },
          { id: 'web-api-core', name: 'Core API endpoints', description: 'Develop core API functionality', baseDuration: { small: 5, medium: 10, large: 20 }, dependencies: ['web-auth'], isMilestone: false },
          { id: 'web-back-milestone', name: 'Backend complete', description: 'Backend development finished', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['web-api-core'], isMilestone: true }
        ]
      },
      {
        id: 'phase-web-5',
        name: 'Testing',
        color: '#10b981',
        order: 5,
        tasks: [
          { id: 'web-unit', name: 'Unit tests', description: 'Write unit tests', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['web-front-milestone', 'web-back-milestone'], isMilestone: false },
          { id: 'web-int', name: 'Integration tests', description: 'Write integration tests', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['web-unit'], isMilestone: false },
          { id: 'web-e2e', name: 'E2E tests', description: 'End-to-end testing', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['web-int'], isMilestone: false },
          { id: 'web-perf', name: 'Performance testing', description: 'Load and performance testing', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['web-e2e'], isMilestone: false },
          { id: 'web-qa-milestone', name: 'QA sign-off', description: 'Testing complete', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['web-perf'], isMilestone: true }
        ]
      },
      {
        id: 'phase-web-6',
        name: 'Deployment',
        color: '#f59e0b',
        order: 6,
        tasks: [
          { id: 'web-cicd', name: 'CI/CD setup', description: 'Set up pipelines', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['web-qa-milestone'], isMilestone: false },
          { id: 'web-staging', name: 'Staging deploy', description: 'Deploy to staging environment', baseDuration: { small: 1, medium: 2, large: 3 }, dependencies: ['web-cicd'], isMilestone: false },
          { id: 'web-prod', name: 'Production deploy', description: 'Deploy to production', baseDuration: { small: 1, medium: 2, large: 3 }, dependencies: ['web-staging'], isMilestone: false },
          { id: 'web-launch-milestone', name: 'Launch', description: 'Project live', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['web-prod'], isMilestone: true }
        ]
      }
    ]
  },
  'mobile-app': {
    id: 'mobile-app',
    name: 'Mobile Application',
    icon: '📱',
    description: 'A complete mobile app lifecycle from research to app store submission.',
    phases: [
      {
        id: 'phase-mob-1',
        name: 'Research',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'mob-market', name: 'Market research', description: 'Analyze market and audience', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: [], isMilestone: false },
          { id: 'mob-plat', name: 'Platform decision', description: 'iOS, Android, or Cross-platform', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['mob-market'], isMilestone: false },
          { id: 'mob-feas', name: 'Technical feasibility', description: 'Assess technical requirements', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['mob-plat'], isMilestone: false },
          { id: 'mob-res-milestone', name: 'Research complete', description: 'Research phase finished', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mob-feas'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mob-2',
        name: 'UI/UX',
        color: '#ec4899',
        order: 2,
        tasks: [
          { id: 'mob-flows', name: 'User flows', description: 'Map out app navigation flows', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['mob-res-milestone'], isMilestone: false },
          { id: 'mob-proto', name: 'Prototype', description: 'Interactive wireframes', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['mob-flows'], isMilestone: false },
          { id: 'mob-vis', name: 'Visual design', description: 'High-fidelity screens', baseDuration: { small: 4, medium: 8, large: 14 }, dependencies: ['mob-proto'], isMilestone: false },
          { id: 'mob-des-milestone', name: 'Design approval', description: 'Designs approved for dev', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mob-vis'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mob-3',
        name: 'Core Development',
        color: '#3b82f6',
        order: 3,
        tasks: [
          { id: 'mob-setup', name: 'Project setup', description: 'Initialize repository and tools', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['mob-des-milestone'], isMilestone: false },
          { id: 'mob-nav', name: 'Navigation', description: 'Implement app routing', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['mob-setup'], isMilestone: false },
          { id: 'mob-screens', name: 'Core screens', description: 'Build main UI screens', baseDuration: { small: 5, medium: 12, large: 20 }, dependencies: ['mob-nav'], isMilestone: false },
          { id: 'mob-data', name: 'Data layer', description: 'API integration and state', baseDuration: { small: 4, medium: 8, large: 14 }, dependencies: ['mob-screens'], isMilestone: false },
          { id: 'mob-offline', name: 'Offline support', description: 'Local caching and sync', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['mob-data'], isMilestone: false },
          { id: 'mob-core-milestone', name: 'Core complete', description: 'Core functionality working', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mob-offline'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mob-4',
        name: 'Platform Features',
        color: '#f97316',
        order: 4,
        tasks: [
          { id: 'mob-push', name: 'Push notifications', description: 'Implement APNS/FCM', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['mob-core-milestone'], isMilestone: false },
          { id: 'mob-media', name: 'Camera/media', description: 'Device hardware integration', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['mob-core-milestone'], isMilestone: false },
          { id: 'mob-loc', name: 'Location services', description: 'GPS and maps integration', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['mob-core-milestone'], isMilestone: false },
          { id: 'mob-feat-milestone', name: 'Platform features done', description: 'Native features complete', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mob-push', 'mob-media', 'mob-loc'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mob-5',
        name: 'QA',
        color: '#10b981',
        order: 5,
        tasks: [
          { id: 'mob-dev-test', name: 'Device testing', description: 'Test on physical devices', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['mob-feat-milestone'], isMilestone: false },
          { id: 'mob-perf', name: 'Performance profiling', description: 'Optimize memory and battery', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['mob-dev-test'], isMilestone: false },
          { id: 'mob-beta', name: 'Beta testing', description: 'Internal or TestFlight beta', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['mob-perf'], isMilestone: false },
          { id: 'mob-qa-milestone', name: 'QA complete', description: 'App is stable', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mob-beta'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mob-6',
        name: 'App Store',
        color: '#f59e0b',
        order: 6,
        tasks: [
          { id: 'mob-assets', name: 'Store assets', description: 'Screenshots and descriptions', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['mob-qa-milestone'], isMilestone: false },
          { id: 'mob-sub', name: 'App submission', description: 'Submit to Apple/Google', baseDuration: { small: 1, medium: 2, large: 3 }, dependencies: ['mob-assets'], isMilestone: false },
          { id: 'mob-appr', name: 'Store approval', description: 'Review process', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['mob-sub'], isMilestone: false },
          { id: 'mob-launch-milestone', name: 'Launch', description: 'Available in stores', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mob-appr'], isMilestone: true }
        ]
      }
    ]
  },
  'data-pipeline': {
    id: 'data-pipeline',
    name: 'Data Pipeline',
    icon: '📊',
    description: 'End-to-end data engineering project for analytics or data warehousing.',
    phases: [
      {
        id: 'phase-dp-1',
        name: 'Requirements',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'dp-src', name: 'Source analysis', description: 'Identify data sources', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: [], isMilestone: false },
          { id: 'dp-audit', name: 'Data audit', description: 'Profile source data quality', baseDuration: { small: 3, medium: 5, large: 10 }, dependencies: ['dp-src'], isMilestone: false },
          { id: 'dp-req-milestone', name: 'Requirements doc', description: 'Sign-off on requirements', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['dp-audit'], isMilestone: true }
        ]
      },
      {
        id: 'phase-dp-2',
        name: 'Data Modeling',
        color: '#3b82f6',
        order: 2,
        tasks: [
          { id: 'dp-concept', name: 'Conceptual model', description: 'High-level entities', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['dp-req-milestone'], isMilestone: false },
          { id: 'dp-schema', name: 'Schema design', description: 'Physical database schema', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['dp-concept'], isMilestone: false },
          { id: 'dp-dict', name: 'Data dictionary', description: 'Document fields and types', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['dp-schema'], isMilestone: false },
          { id: 'dp-model-milestone', name: 'Model review', description: 'Schema approved', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['dp-dict'], isMilestone: true }
        ]
      },
      {
        id: 'phase-dp-3',
        name: 'ETL Development',
        color: '#06b6d4',
        order: 3,
        tasks: [
          { id: 'dp-extract', name: 'Extract connectors', description: 'Build data ingestion', baseDuration: { small: 3, medium: 7, large: 12 }, dependencies: ['dp-model-milestone'], isMilestone: false },
          { id: 'dp-transform', name: 'Transform logic', description: 'Implement business rules', baseDuration: { small: 4, medium: 10, large: 18 }, dependencies: ['dp-extract'], isMilestone: false },
          { id: 'dp-load', name: 'Load procedures', description: 'Write data to target', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['dp-transform'], isMilestone: false },
          { id: 'dp-orch', name: 'Pipeline orchestration', description: 'Airflow/Prefect setup', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['dp-load'], isMilestone: false },
          { id: 'dp-etl-milestone', name: 'ETL complete', description: 'Pipeline running in dev', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['dp-orch'], isMilestone: true }
        ]
      },
      {
        id: 'phase-dp-4',
        name: 'Validation',
        color: '#10b981',
        order: 4,
        tasks: [
          { id: 'dp-dq', name: 'Data quality rules', description: 'Automated DQ checks', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['dp-etl-milestone'], isMilestone: false },
          { id: 'dp-recon', name: 'Reconciliation checks', description: 'Verify against source', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['dp-dq'], isMilestone: false },
          { id: 'dp-uat', name: 'UAT', description: 'User acceptance testing', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['dp-recon'], isMilestone: false },
          { id: 'dp-val-milestone', name: 'Validation complete', description: 'Data is trusted', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['dp-uat'], isMilestone: true }
        ]
      },
      {
        id: 'phase-dp-5',
        name: 'Monitoring',
        color: '#f59e0b',
        order: 5,
        tasks: [
          { id: 'dp-dash', name: 'Dashboards', description: 'Build operational dashboards', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['dp-val-milestone'], isMilestone: false },
          { id: 'dp-alert', name: 'Alerting', description: 'Failure and SLA alerts', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['dp-val-milestone'], isMilestone: false },
          { id: 'dp-docs', name: 'Documentation', description: 'Runbooks and guides', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['dp-val-milestone'], isMilestone: false },
          { id: 'dp-live-milestone', name: 'Go-live', description: 'Pipeline in production', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['dp-dash', 'dp-alert', 'dp-docs'], isMilestone: true }
        ]
      }
    ]
  },
  'marketing-campaign': {
    id: 'marketing-campaign',
    name: 'Marketing Campaign',
    icon: '📢',
    description: 'Planning and execution of a multi-channel marketing campaign.',
    phases: [
      {
        id: 'phase-mc-1',
        name: 'Strategy',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'mc-aud', name: 'Audience research', description: 'Define target personas', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: [], isMilestone: false },
          { id: 'mc-goals', name: 'Goal setting', description: 'Define KPIs', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: [], isMilestone: false },
          { id: 'mc-chan', name: 'Channel strategy', description: 'Select distribution channels', baseDuration: { small: 2, medium: 4, large: 6 }, dependencies: ['mc-aud', 'mc-goals'], isMilestone: false },
          { id: 'mc-strat-milestone', name: 'Strategy approved', description: 'Plan signed off', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mc-chan'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mc-2',
        name: 'Content',
        color: '#ec4899',
        order: 2,
        tasks: [
          { id: 'mc-cal', name: 'Content calendar', description: 'Plan release schedule', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['mc-strat-milestone'], isMilestone: false },
          { id: 'mc-copy', name: 'Copywriting', description: 'Write core messaging', baseDuration: { small: 3, medium: 7, large: 12 }, dependencies: ['mc-cal'], isMilestone: false },
          { id: 'mc-blog', name: 'Blog posts', description: 'Write SEO articles', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['mc-copy'], isMilestone: false },
          { id: 'mc-social', name: 'Social media content', description: 'Draft social posts', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['mc-copy'], isMilestone: false },
          { id: 'mc-content-milestone', name: 'Content ready', description: 'All text finalized', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mc-blog', 'mc-social'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mc-3',
        name: 'Design',
        color: '#f97316',
        order: 3,
        tasks: [
          { id: 'mc-vis', name: 'Visual assets', description: 'Create banners and graphics', baseDuration: { small: 3, medium: 6, large: 12 }, dependencies: ['mc-copy'], isMilestone: false },
          { id: 'mc-landing', name: 'Landing pages', description: 'Design and build LP', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['mc-vis'], isMilestone: false },
          { id: 'mc-email', name: 'Email templates', description: 'Design newsletters', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['mc-vis'], isMilestone: false },
          { id: 'mc-des-milestone', name: 'Design complete', description: 'Visuals approved', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mc-landing', 'mc-email'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mc-4',
        name: 'Distribution',
        color: '#3b82f6',
        order: 4,
        tasks: [
          { id: 'mc-sched', name: 'Social scheduling', description: 'Queue posts in tools', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['mc-content-milestone', 'mc-des-milestone'], isMilestone: false },
          { id: 'mc-emailsend', name: 'Email campaigns', description: 'Setup email blasts', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['mc-content-milestone', 'mc-des-milestone'], isMilestone: false },
          { id: 'mc-ads', name: 'Paid ads setup', description: 'Configure ad accounts', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['mc-content-milestone', 'mc-des-milestone'], isMilestone: false },
          { id: 'mc-launch-milestone', name: 'Launch', description: 'Campaign is live', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mc-sched', 'mc-emailsend', 'mc-ads'], isMilestone: true }
        ]
      },
      {
        id: 'phase-mc-5',
        name: 'Analytics',
        color: '#10b981',
        order: 5,
        tasks: [
          { id: 'mc-track', name: 'Tracking setup', description: 'Configure UTMs and pixels', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['mc-strat-milestone'], isMilestone: false },
          { id: 'mc-review', name: 'Performance review', description: 'Mid-campaign check', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['mc-launch-milestone'], isMilestone: false },
          { id: 'mc-opt', name: 'Optimization report', description: 'Final report and learnings', baseDuration: { small: 2, medium: 4, large: 6 }, dependencies: ['mc-review'], isMilestone: false },
          { id: 'mc-done-milestone', name: 'Campaign complete', description: 'Retrospective finished', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['mc-opt'], isMilestone: true }
        ]
      }
    ]
  },
  'api-service': {
    id: 'api-service',
    name: 'API / Microservice',
    icon: '🔌',
    description: 'Backend API or microservice development from architecture to deployment.',
    phases: [
      {
        id: 'phase-api-1',
        name: 'Architecture',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'api-design', name: 'API design', description: 'Design REST/GraphQL endpoints', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: [], isMilestone: false },
          { id: 'api-spec', name: 'OpenAPI spec', description: 'Document API contract', baseDuration: { small: 1, medium: 3, large: 6 }, dependencies: ['api-design'], isMilestone: false },
          { id: 'api-auth', name: 'Auth strategy', description: 'Define security model', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['api-design'], isMilestone: false },
          { id: 'api-arch-milestone', name: 'Architecture review', description: 'Spec approved', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['api-spec', 'api-auth'], isMilestone: true }
        ]
      },
      {
        id: 'phase-api-2',
        name: 'Implementation',
        color: '#3b82f6',
        order: 2,
        tasks: [
          { id: 'api-scaffold', name: 'Project scaffold', description: 'Setup repo and framework', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['api-arch-milestone'], isMilestone: false },
          { id: 'api-models', name: 'Data models', description: 'Database and ORM setup', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['api-scaffold'], isMilestone: false },
          { id: 'api-endpoints', name: 'Core endpoints', description: 'Implement routes and handlers', baseDuration: { small: 4, medium: 10, large: 18 }, dependencies: ['api-models'], isMilestone: false },
          { id: 'api-logic', name: 'Business logic', description: 'Implement core services', baseDuration: { small: 3, medium: 8, large: 14 }, dependencies: ['api-models'], isMilestone: false },
          { id: 'api-error', name: 'Error handling', description: 'Standardized errors', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['api-endpoints'], isMilestone: false },
          { id: 'api-rate', name: 'Rate limiting', description: 'API protection', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['api-endpoints'], isMilestone: false },
          { id: 'api-impl-milestone', name: 'Implementation complete', description: 'Code complete', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['api-logic', 'api-error', 'api-rate'], isMilestone: true }
        ]
      },
      {
        id: 'phase-api-3',
        name: 'Testing',
        color: '#10b981',
        order: 3,
        tasks: [
          { id: 'api-unit', name: 'Unit tests', description: 'Test business logic', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['api-impl-milestone'], isMilestone: false },
          { id: 'api-int', name: 'Integration tests', description: 'Test endpoints and DB', baseDuration: { small: 3, medium: 6, large: 12 }, dependencies: ['api-unit'], isMilestone: false },
          { id: 'api-load', name: 'Load testing', description: 'Benchmark performance', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['api-int'], isMilestone: false },
          { id: 'api-sec', name: 'Security audit', description: 'Vulnerability scan', baseDuration: { small: 1, medium: 3, large: 6 }, dependencies: ['api-int'], isMilestone: false },
          { id: 'api-qa-milestone', name: 'QA done', description: 'Testing signed off', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['api-load', 'api-sec'], isMilestone: true }
        ]
      },
      {
        id: 'phase-api-4',
        name: 'Documentation',
        color: '#f59e0b',
        order: 4,
        tasks: [
          { id: 'api-docs', name: 'API docs', description: 'Generate/write documentation', baseDuration: { small: 1, medium: 3, large: 6 }, dependencies: ['api-arch-milestone'], isMilestone: false },
          { id: 'api-guide', name: 'Developer guide', description: 'Integration tutorials', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['api-docs'], isMilestone: false },
          { id: 'api-change', name: 'Changelog', description: 'Release notes', baseDuration: { small: 1, medium: 1, large: 2 }, dependencies: ['api-impl-milestone'], isMilestone: false },
          { id: 'api-doc-milestone', name: 'Docs complete', description: 'Ready for users', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['api-guide', 'api-change'], isMilestone: true }
        ]
      },
      {
        id: 'phase-api-5',
        name: 'Deployment',
        color: '#06b6d4',
        order: 5,
        tasks: [
          { id: 'api-infra', name: 'Infrastructure setup', description: 'Provision servers/DBs', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['api-qa-milestone'], isMilestone: false },
          { id: 'api-cicd', name: 'CI/CD', description: 'Deployment pipelines', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['api-infra'], isMilestone: false },
          { id: 'api-prod', name: 'Production deploy', description: 'Go live', baseDuration: { small: 1, medium: 2, large: 3 }, dependencies: ['api-cicd'], isMilestone: false },
          { id: 'api-launch-milestone', name: 'Launch', description: 'API is live', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['api-prod'], isMilestone: true }
        ]
      }
    ]
  },
  'ml-project': {
    id: 'ml-project',
    name: 'Machine Learning Project',
    icon: '🤖',
    description: 'Data science and ML model development from data collection to serving.',
    phases: [
      {
        id: 'phase-ml-1',
        name: 'Data Collection',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'ml-src', name: 'Data source identification', description: 'Find datasets', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: [], isMilestone: false },
          { id: 'ml-acq', name: 'Data acquisition', description: 'Download or scrape data', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['ml-src'], isMilestone: false },
          { id: 'ml-label', name: 'Data labeling', description: 'Annotate dataset', baseDuration: { small: 3, medium: 10, large: 20 }, dependencies: ['ml-acq'], isMilestone: false },
          { id: 'ml-data-milestone', name: 'Data ready', description: 'Raw data available', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ml-label'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ml-2',
        name: 'Preprocessing',
        color: '#3b82f6',
        order: 2,
        tasks: [
          { id: 'ml-eda', name: 'Exploratory analysis', description: 'EDA and visualization', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['ml-data-milestone'], isMilestone: false },
          { id: 'ml-clean', name: 'Data cleaning', description: 'Handle missing values', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['ml-eda'], isMilestone: false },
          { id: 'ml-feat', name: 'Feature engineering', description: 'Create new features', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['ml-clean'], isMilestone: false },
          { id: 'ml-splits', name: 'Data splits', description: 'Train/val/test splits', baseDuration: { small: 1, medium: 2, large: 3 }, dependencies: ['ml-feat'], isMilestone: false },
          { id: 'ml-pre-milestone', name: 'Preprocessing done', description: 'Data ready for training', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ml-splits'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ml-3',
        name: 'Model Development',
        color: '#ec4899',
        order: 3,
        tasks: [
          { id: 'ml-base', name: 'Baseline model', description: 'Simple heuristic model', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['ml-pre-milestone'], isMilestone: false },
          { id: 'ml-arch', name: 'Architecture selection', description: 'Choose ML algorithms', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['ml-base'], isMilestone: false },
          { id: 'ml-train', name: 'Training pipeline', description: 'Build training script', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['ml-arch'], isMilestone: false },
          { id: 'ml-hyper', name: 'Hyperparameter tuning', description: 'Optimize model', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['ml-train'], isMilestone: false },
          { id: 'ml-mod-milestone', name: 'Model ready', description: 'Best model selected', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ml-hyper'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ml-4',
        name: 'Evaluation',
        color: '#10b981',
        order: 4,
        tasks: [
          { id: 'ml-metrics', name: 'Metrics evaluation', description: 'Calculate final metrics', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['ml-mod-milestone'], isMilestone: false },
          { id: 'ml-bias', name: 'Bias analysis', description: 'Check for fairness', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['ml-metrics'], isMilestone: false },
          { id: 'ml-ab', name: 'A/B test design', description: 'Plan online experiment', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['ml-metrics'], isMilestone: false },
          { id: 'ml-eval-milestone', name: 'Evaluation complete', description: 'Model approved', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ml-bias', 'ml-ab'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ml-5',
        name: 'Deployment',
        color: '#f59e0b',
        order: 5,
        tasks: [
          { id: 'ml-serve', name: 'Model serving', description: 'Containerize model', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['ml-eval-milestone'], isMilestone: false },
          { id: 'ml-api', name: 'API wrapper', description: 'REST/gRPC interface', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['ml-serve'], isMilestone: false },
          { id: 'ml-mon', name: 'Monitoring', description: 'Drift detection', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['ml-api'], isMilestone: false },
          { id: 'ml-docs', name: 'Documentation', description: 'Model card', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['ml-eval-milestone'], isMilestone: false },
          { id: 'ml-dep-milestone', name: 'Deployed', description: 'Model in production', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ml-mon', 'ml-docs'], isMilestone: true }
        ]
      }
    ]
  },
  'ecommerce': {
    id: 'ecommerce',
    name: 'E-Commerce Platform',
    icon: '🛒',
    description: 'Online store build including catalog, payments, and fulfillment integrations.',
    phases: [
      {
        id: 'phase-ecom-1',
        name: 'Catalog',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'ecom-prod', name: 'Product data modeling', description: 'Define product schemas', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: [], isMilestone: false },
          { id: 'ecom-tax', name: 'Category taxonomy', description: 'Site navigation structure', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['ecom-prod'], isMilestone: false },
          { id: 'ecom-search', name: 'Search & filters', description: 'Implement search functionality', baseDuration: { small: 3, medium: 6, large: 12 }, dependencies: ['ecom-prod'], isMilestone: false },
          { id: 'ecom-img', name: 'Image pipeline', description: 'Asset optimization', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['ecom-prod'], isMilestone: false },
          { id: 'ecom-cat-milestone', name: 'Catalog ready', description: 'Products available', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ecom-tax', 'ecom-search', 'ecom-img'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ecom-2',
        name: 'Payments',
        color: '#3b82f6',
        order: 2,
        tasks: [
          { id: 'ecom-gate', name: 'Payment gateway', description: 'Stripe/PayPal integration', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['ecom-cat-milestone'], isMilestone: false },
          { id: 'ecom-cart', name: 'Cart & checkout', description: 'Shopping cart UX', baseDuration: { small: 4, medium: 8, large: 14 }, dependencies: ['ecom-gate'], isMilestone: false },
          { id: 'ecom-order', name: 'Order management', description: 'Order tracking system', baseDuration: { small: 3, medium: 7, large: 12 }, dependencies: ['ecom-cart'], isMilestone: false },
          { id: 'ecom-taxcalc', name: 'Tax calculation', description: 'Sales tax integration', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['ecom-cart'], isMilestone: false },
          { id: 'ecom-pay-milestone', name: 'Payments ready', description: 'Checkout works', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ecom-order', 'ecom-taxcalc'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ecom-3',
        name: 'UX',
        color: '#ec4899',
        order: 3,
        tasks: [
          { id: 'ecom-home', name: 'Homepage design', description: 'Storefront UI', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: [], isMilestone: false },
          { id: 'ecom-pdp', name: 'Product pages', description: 'Detail page UI', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['ecom-home'], isMilestone: false },
          { id: 'ecom-acc', name: 'User accounts', description: 'Profile and history', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['ecom-pdp'], isMilestone: false },
          { id: 'ecom-wish', name: 'Wishlist & reviews', description: 'Engagement features', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['ecom-pdp'], isMilestone: false },
          { id: 'ecom-ux-milestone', name: 'UX complete', description: 'Frontend done', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ecom-acc', 'ecom-wish'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ecom-4',
        name: 'Fulfillment',
        color: '#f97316',
        order: 4,
        tasks: [
          { id: 'ecom-inv', name: 'Inventory system', description: 'Stock management', baseDuration: { small: 3, medium: 7, large: 12 }, dependencies: ['ecom-pay-milestone'], isMilestone: false },
          { id: 'ecom-ship', name: 'Shipping integration', description: 'Carrier APIs', baseDuration: { small: 3, medium: 6, large: 10 }, dependencies: ['ecom-inv'], isMilestone: false },
          { id: 'ecom-ret', name: 'Returns workflow', description: 'RMA processing', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['ecom-ship'], isMilestone: false },
          { id: 'ecom-ful-milestone', name: 'Fulfillment ready', description: 'Operations setup', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ecom-ret'], isMilestone: true }
        ]
      },
      {
        id: 'phase-ecom-5',
        name: 'Launch',
        color: '#10b981',
        order: 5,
        tasks: [
          { id: 'ecom-seo', name: 'SEO setup', description: 'Meta tags and sitemaps', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['ecom-ux-milestone'], isMilestone: false },
          { id: 'ecom-ana', name: 'Analytics', description: 'E-commerce tracking', baseDuration: { small: 2, medium: 4, large: 6 }, dependencies: ['ecom-ux-milestone'], isMilestone: false },
          { id: 'ecom-perf', name: 'Performance optimization', description: 'Speed tuning', baseDuration: { small: 2, medium: 4, large: 8 }, dependencies: ['ecom-ux-milestone'], isMilestone: false },
          { id: 'ecom-soft', name: 'Soft launch', description: 'Limited release', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['ecom-seo', 'ecom-ana', 'ecom-perf', 'ecom-ful-milestone'], isMilestone: false },
          { id: 'ecom-launch-milestone', name: 'Full launch', description: 'Store open', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['ecom-soft'], isMilestone: true }
        ]
      }
    ]
  },
  'devops': {
    id: 'devops',
    name: 'DevOps / Infrastructure',
    icon: '⚙️',
    description: 'Infrastructure automation, CI/CD, and cloud migration.',
    phases: [
      {
        id: 'phase-devops-1',
        name: 'Assessment',
        color: '#8b5cf6',
        order: 1,
        tasks: [
          { id: 'do-audit', name: 'Current state audit', description: 'Review existing infra', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: [], isMilestone: false },
          { id: 'do-pain', name: 'Pain point analysis', description: 'Identify bottlenecks', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['do-audit'], isMilestone: false },
          { id: 'do-eval', name: 'Tool evaluation', description: 'Compare solutions', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['do-pain'], isMilestone: false },
          { id: 'do-ass-milestone', name: 'Assessment complete', description: 'Audit finished', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['do-eval'], isMilestone: true }
        ]
      },
      {
        id: 'phase-devops-2',
        name: 'Planning',
        color: '#3b82f6',
        order: 2,
        tasks: [
          { id: 'do-arch', name: 'Architecture design', description: 'Target cloud architecture', baseDuration: { small: 3, medium: 6, large: 12 }, dependencies: ['do-ass-milestone'], isMilestone: false },
          { id: 'do-sel', name: 'Tool selection', description: 'Finalize stack', baseDuration: { small: 1, medium: 2, large: 4 }, dependencies: ['do-arch'], isMilestone: false },
          { id: 'do-mig', name: 'Migration plan', description: 'Step-by-step approach', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['do-sel'], isMilestone: false },
          { id: 'do-plan-milestone', name: 'Planning done', description: 'Strategy approved', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['do-mig'], isMilestone: true }
        ]
      },
      {
        id: 'phase-devops-3',
        name: 'Implementation',
        color: '#06b6d4',
        order: 3,
        tasks: [
          { id: 'do-iac', name: 'IaC setup', description: 'Terraform/Pulumi scripts', baseDuration: { small: 4, medium: 8, large: 15 }, dependencies: ['do-plan-milestone'], isMilestone: false },
          { id: 'do-cicd', name: 'CI/CD pipelines', description: 'Automated builds/deploys', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['do-iac'], isMilestone: false },
          { id: 'do-k8s', name: 'Container orchestration', description: 'Kubernetes/ECS setup', baseDuration: { small: 4, medium: 10, large: 18 }, dependencies: ['do-iac'], isMilestone: false },
          { id: 'do-sec', name: 'Secret management', description: 'Vault/Secrets Manager', baseDuration: { small: 2, medium: 4, large: 7 }, dependencies: ['do-iac'], isMilestone: false },
          { id: 'do-impl-milestone', name: 'Infra ready', description: 'Base platform built', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['do-cicd', 'do-k8s', 'do-sec'], isMilestone: true }
        ]
      },
      {
        id: 'phase-devops-4',
        name: 'Migration',
        color: '#f97316',
        order: 4,
        tasks: [
          { id: 'do-pilot', name: 'Pilot migration', description: 'Move low-risk app', baseDuration: { small: 2, medium: 5, large: 10 }, dependencies: ['do-impl-milestone'], isMilestone: false },
          { id: 'do-data', name: 'Data migration', description: 'Sync databases', baseDuration: { small: 3, medium: 7, large: 14 }, dependencies: ['do-pilot'], isMilestone: false },
          { id: 'do-full', name: 'Full migration', description: 'Move remaining apps', baseDuration: { small: 4, medium: 10, large: 20 }, dependencies: ['do-data'], isMilestone: false },
          { id: 'do-roll', name: 'Rollback testing', description: 'Verify fallback', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['do-full'], isMilestone: false },
          { id: 'do-mig-milestone', name: 'Migration done', description: 'All workloads moved', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['do-roll'], isMilestone: true }
        ]
      },
      {
        id: 'phase-devops-5',
        name: 'Operations',
        color: '#10b981',
        order: 5,
        tasks: [
          { id: 'do-mon', name: 'Monitoring & alerting', description: 'Datadog/Prometheus', baseDuration: { small: 3, medium: 6, large: 12 }, dependencies: ['do-mig-milestone'], isMilestone: false },
          { id: 'do-run', name: 'Runbooks', description: 'Operational docs', baseDuration: { small: 2, medium: 5, large: 8 }, dependencies: ['do-mon'], isMilestone: false },
          { id: 'do-train', name: 'Team training', description: 'Knowledge transfer', baseDuration: { small: 1, medium: 3, large: 5 }, dependencies: ['do-run'], isMilestone: false },
          { id: 'do-ops-milestone', name: 'Operations live', description: 'Handoff complete', baseDuration: { small: 0, medium: 0, large: 0 }, dependencies: ['do-train'], isMilestone: true }
        ]
      }
    ]
  }
};

export function getTemplateById(id) {
  return PROJECT_TEMPLATES[id] || null;
}

export function getAllTemplates() {
  return Object.values(PROJECT_TEMPLATES).map(t => ({
    id: t.id,
    name: t.name,
    icon: t.icon,
    description: t.description
  }));
}
