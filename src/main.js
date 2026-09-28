import { Wizard } from './components/wizard.js';
import { GanttChart } from './components/gantt.js';
import { ExportManager } from './components/export.js';
import { generateRoadmap } from './engine/generator.js';

// Inject styles
const style = document.createElement('style');
style.textContent = `
  .loading-screen {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 60vh;
  }
  .loading-content {
    text-align: center;
  }
  .loading-icon {
    font-size: 4rem;
    margin-bottom: 1rem;
    animation: pulse 2s ease-in-out infinite;
  }
  .loading-bar {
    width: 300px;
    height: 4px;
    background: var(--surface-2, #ddd);
    border-radius: 2px;
    margin: 1.5rem auto;
    overflow: hidden;
  }
  .loading-bar-fill {
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, #8b5cf6, #3b82f6, #06b6d4);
    animation: shimmer 1.5s ease-in-out infinite;
    transform-origin: left;
  }

  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
  }
  @keyframes shimmer {
    0% { transform: translateX(-100%); }
    100% { transform: translateX(100%); }
  }

  .roadmap-stats {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  .stat-card {
    background: var(--surface-1, #f9fafb);
    border: 1px solid var(--border, #e5e7eb);
    border-radius: 8px;
    padding: 1rem 1.5rem;
    text-align: center;
    flex: 1;
  }
  .stat-value {
    display: block;
    font-size: 1.5rem;
    font-weight: 700;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
  .stat-label {
    font-size: 0.875rem;
    color: var(--text-muted, #6b7280);
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  .phase-details {
    margin-top: 2rem;
  }
  .phase-section {
    border-left: 3px solid;
    margin-bottom: 1rem;
    background: var(--surface-1, #f9fafb);
    border-radius: 0 8px 8px 0;
  }
  .phase-section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
    cursor: pointer;
  }
  .phase-section-title {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .phase-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .phase-task-count {
    color: var(--text-dim, #9ca3af);
    font-size: 0.875rem;
  }
  .phase-section-body {
    padding: 0 1.5rem 1rem;
    overflow: hidden;
    transition: max-height 0.3s, opacity 0.3s;
  }
  .phase-section-body.collapsed {
    max-height: 0;
    opacity: 0;
    padding: 0 1.5rem;
  }
  .task-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.5rem 0;
    border-bottom: 1px solid var(--border, #e5e7eb);
  }
  .task-item:last-child {
    border-bottom: none;
  }
  .task-info {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
  .task-status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    flex-shrink: 0;
  }
  .task-dates {
    display: flex;
    gap: 1rem;
    font-size: 0.875rem;
    color: var(--text-muted, #6b7280);
  }
  .task-duration {
    color: var(--text-dim, #9ca3af);
    min-width: 3rem;
    text-align: right;
  }
  .task-item.critical .task-name {
    color: #ef4444;
    font-weight: 600;
  }
  
  .pulse-glow {
    animation: glow 1.5s infinite alternate;
  }
  @keyframes glow {
    from { opacity: 0.7; filter: drop-shadow(0 0 2px rgba(239, 68, 68, 0.5)); }
    to { opacity: 1; filter: drop-shadow(0 0 8px rgba(239, 68, 68, 0.9)); }
  }

  .roadmap-header {
    padding: 2rem 0;
  }
  .roadmap-title-row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
  .roadmap-title-row h1 {
    font-size: 1.875rem;
    font-weight: 700;
    margin: 0 0 0.5rem 0;
  }
  .roadmap-actions {
    display: flex;
    gap: 0.75rem;
    margin-bottom: 1.5rem;
  }
`;
document.head.appendChild(style);


class App {
  constructor() {
    this.mainContent = document.getElementById('main-content');
    if (!this.mainContent) {
      this.mainContent = document.createElement('div');
      this.mainContent.id = 'main-content';
      document.body.appendChild(this.mainContent);
    }
    this.currentView = 'wizard';
    this.roadmap = null;
    this.exportManager = new ExportManager();
    this.init();
  }

  init() {
    this.showWizard();
  }

  showWizard() {
    this.mainContent.innerHTML = '';
    this.currentView = 'wizard';
    const wizard = new Wizard(this.mainContent, (config) => this.onRoadmapGenerated(config));
    wizard.render();
  }

  onRoadmapGenerated(config) {
    this.showLoading();
    
    setTimeout(() => {
      this.roadmap = generateRoadmap(config);
      this.showRoadmap();
    }, 1500);
  }

  showLoading() {
    this.mainContent.innerHTML = '';
    const loading = document.createElement('div');
    loading.className = 'loading-screen';
    loading.innerHTML = `
      <div class="loading-content animate-fade-in">
        <div class="loading-icon">🗺️</div>
        <h2 class="text-gradient">Generating your roadmap...</h2>
        <div class="loading-bar"><div class="loading-bar-fill"></div></div>
        <p class="text-muted">Analyzing project requirements and scheduling tasks</p>
      </div>
    `;
    this.mainContent.appendChild(loading);
  }

  showRoadmap() {
    this.mainContent.innerHTML = '';
    this.currentView = 'roadmap';
    
    const view = document.createElement('div');
    view.className = 'roadmap-view animate-fade-in';
    
    const header = document.createElement('div');
    header.className = 'roadmap-header';
    header.innerHTML = `
      <div class="roadmap-title-row">
        <div>
          <h1>${this.roadmap.config.projectName}</h1>
          <p class="text-muted">${this.roadmap.config.projectDescription || ''}</p>
        </div>
        <button class="btn btn-secondary" id="back-to-wizard">← New Roadmap</button>
      </div>
      <div class="roadmap-stats">
        <div class="stat-card">
          <span class="stat-value">${this.roadmap.stats.totalPhases}</span>
          <span class="stat-label">Phases</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${this.roadmap.stats.totalTasks}</span>
          <span class="stat-label">Tasks</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${this.roadmap.stats.totalMilestones}</span>
          <span class="stat-label">Milestones</span>
        </div>
        <div class="stat-card">
          <span class="stat-value">${this.roadmap.stats.estimatedWeeks}w</span>
          <span class="stat-label">Duration</span>
        </div>
      </div>
    `;
    view.appendChild(header);
    
    const actions = document.createElement('div');
    actions.className = 'roadmap-actions';
    actions.innerHTML = `
      <button class="btn btn-primary" id="export-btn">📄 Export Roadmap</button>
      <button class="btn btn-secondary" id="export-png-btn">🖼️ Export as PNG</button>
    `;
    view.appendChild(actions);
    
    const ganttContainer = document.createElement('div');
    ganttContainer.id = 'gantt-container';
    view.appendChild(ganttContainer);
    
    const details = document.createElement('div');
    details.className = 'phase-details';
    this.roadmap.phases.forEach(phase => {
      const section = document.createElement('div');
      section.className = 'phase-section';
      section.style.borderLeftColor = phase.color;
      
      const phaseHeader = document.createElement('div');
      phaseHeader.className = 'phase-section-header';
      phaseHeader.innerHTML = `
        <div class="phase-section-title">
          <span class="phase-dot" style="background:${phase.color}"></span>
          <h3>${phase.name}</h3>
          <span class="phase-task-count">${phase.tasks.length} tasks</span>
        </div>
        <button class="btn btn-ghost phase-toggle">▼</button>
      `;
      
      const phaseBody = document.createElement('div');
      phaseBody.className = 'phase-section-body';
      
      phase.tasks.forEach(task => {
        const taskEl = document.createElement('div');
        taskEl.className = `task-item ${task.isMilestone ? 'milestone' : ''} ${task.isCriticalPath ? 'critical' : ''}`;
        taskEl.innerHTML = `
          <div class="task-info">
            <span class="task-status-dot" style="background:${task.isCriticalPath ? '#ef4444' : phase.color}"></span>
            <span class="task-name">${task.isMilestone ? '🏁 ' : ''}${task.name}</span>
          </div>
          <div class="task-dates">
            <span>${task.startDate} → ${task.endDate}</span>
            <span class="task-duration">${task.duration}d</span>
          </div>
        `;
        phaseBody.appendChild(taskEl);
      });
      
      section.appendChild(phaseHeader);
      section.appendChild(phaseBody);
      details.appendChild(section);
      
      phaseHeader.addEventListener('click', () => {
        phaseBody.classList.toggle('collapsed');
        phaseHeader.querySelector('.phase-toggle').textContent = 
          phaseBody.classList.contains('collapsed') ? '▶' : '▼';
      });
    });
    view.appendChild(details);
    
    this.mainContent.appendChild(view);
    
    const gantt = new GanttChart(ganttContainer);
    gantt.render(this.roadmap);
    
    document.getElementById('back-to-wizard').addEventListener('click', () => this.showWizard());
    document.getElementById('export-btn').addEventListener('click', () => {
      this.exportManager.showExportModal(this.roadmap, ganttContainer);
    });
    document.getElementById('export-png-btn').addEventListener('click', () => {
      this.exportManager.exportPNG(ganttContainer, this.roadmap.config.projectName);
    });
  }
}

const app = new App();
