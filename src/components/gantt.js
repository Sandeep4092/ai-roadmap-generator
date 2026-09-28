export class GanttChart {
  constructor(container) {
    this.container = container;
    this.zoomLevel = 'week'; // 'day', 'week', 'month'
    this.roadmap = null;
    this.colWidths = { day: 30, week: 40, month: 60 };
    this.rowHeight = 40;
    this.headerHeight = 36;
  }

  render(roadmap) {
    if (roadmap) this.roadmap = roadmap;
    if (!this.roadmap) return;

    this.container.innerHTML = '';
    
    // Controls
    const controls = document.createElement('div');
    controls.className = 'gantt-controls';
    controls.innerHTML = `
      <div class="zoom-controls">
        <button class="btn btn-sm ${this.zoomLevel === 'day' ? 'btn-primary' : 'btn-secondary'}" data-zoom="day">Day</button>
        <button class="btn btn-sm ${this.zoomLevel === 'week' ? 'btn-primary' : 'btn-secondary'}" data-zoom="week">Week</button>
        <button class="btn btn-sm ${this.zoomLevel === 'month' ? 'btn-primary' : 'btn-secondary'}" data-zoom="month">Month</button>
      </div>
    `;
    this.container.appendChild(controls);

    // Setup wrapper
    const wrapper = document.createElement('div');
    wrapper.className = 'gantt-wrapper';
    wrapper.style.display = 'flex';
    wrapper.style.overflowX = 'auto';
    wrapper.style.position = 'relative';
    wrapper.style.border = '1px solid var(--border)';
    
    // Calc dates
    const msPerDay = 24 * 60 * 60 * 1000;
    let minDate = new Date();
    let maxDate = new Date();
    
    if (this.roadmap.phases.length > 0) {
      let firstTask = this.roadmap.phases[0].tasks[0];
      if (firstTask) minDate = new Date(firstTask.startDate);
      
      this.roadmap.phases.forEach(p => {
        p.tasks.forEach(t => {
          const start = new Date(t.startDate);
          const end = new Date(t.endDate);
          if (start < minDate) minDate = start;
          if (end > maxDate) maxDate = end;
        });
      });
    }

    // Pad dates
    minDate.setDate(minDate.getDate() - 7);
    maxDate.setDate(maxDate.getDate() + 14);
    const totalDays = Math.ceil((maxDate - minDate) / msPerDay);
    
    // Sidebar
    const sidebar = document.createElement('div');
    sidebar.className = 'gantt-sidebar';
    sidebar.style.minWidth = '250px';
    sidebar.style.width = '250px';
    sidebar.style.position = 'sticky';
    sidebar.style.left = '0';
    sidebar.style.background = 'var(--bg-default, #fff)';
    sidebar.style.zIndex = '10';
    sidebar.style.borderRight = '1px solid var(--border)';
    
    // Chart area
    const chartArea = document.createElement('div');
    chartArea.className = 'gantt-chart-area';
    
    let totalHeight = 60; // header height
    let yPos = 60;
    
    const svgNS = "http://www.w3.org/2000/svg";
    const colW = this.colWidths[this.zoomLevel];
    
    // Scale factor
    let scale = 1;
    if (this.zoomLevel === 'week') scale = 1/7;
    if (this.zoomLevel === 'month') scale = 1/30;
    
    const chartWidth = totalDays * scale * colW;
    chartArea.style.width = `${chartWidth}px`;
    chartArea.style.minWidth = `${chartWidth}px`;
    chartArea.style.position = 'relative';

    const svg = document.createElementNS(svgNS, 'svg');
    svg.setAttribute('width', chartWidth);
    
    // Build sidebar and elements
    let sidebarHTML = `<div style="height: 60px; border-bottom: 1px solid var(--border); padding: 10px; font-weight: bold;">Tasks</div>`;
    
    const taskElements = [];
    const taskPositions = {}; // id -> {x, y, w, h}
    
    this.roadmap.phases.forEach(phase => {
      // Phase row
      sidebarHTML += `<div style="height: ${this.headerHeight}px; padding: 8px 10px; font-weight: bold; background: #f8f9fa; border-left: 4px solid ${phase.color}; border-bottom: 1px solid var(--border);">${phase.name}</div>`;
      yPos += this.headerHeight;
      
      phase.tasks.forEach(task => {
        // Task row
        sidebarHTML += `<div style="height: ${this.rowHeight}px; padding: 10px; border-bottom: 1px solid var(--border, #eee); font-size: 0.9em; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: flex; align-items: center; gap: 5px;">`;
        if (task.isMilestone) sidebarHTML += `<span>🏁</span>`;
        sidebarHTML += `<span>${task.name}</span></div>`;
        
        const taskStart = new Date(task.startDate);
        const taskEnd = new Date(task.endDate);
        const dayOffset = (taskStart - minDate) / msPerDay;
        const duration = Math.max(1, (taskEnd - taskStart) / msPerDay);
        
        const x = dayOffset * scale * colW;
        const w = duration * scale * colW;
        const h = 24;
        const taskY = yPos + (this.rowHeight - h) / 2;
        
        taskPositions[task.id] = { x, y: taskY, w, h };
        
        // Render Bar or Milestone
        const group = document.createElementNS(svgNS, 'g');
        group.setAttribute('class', 'task-group');
        group.style.cursor = 'pointer';
        
        if (task.isMilestone) {
          const diamond = document.createElementNS(svgNS, 'polygon');
          const cx = x + w/2;
          const cy = taskY + h/2;
          const size = 12;
          diamond.setAttribute('points', `${cx},${cy-size} ${cx+size},${cy} ${cx},${cy+size} ${cx-size},${cy}`);
          diamond.setAttribute('fill', phase.color);
          group.appendChild(diamond);
        } else {
          const rect = document.createElementNS(svgNS, 'rect');
          rect.setAttribute('x', x);
          rect.setAttribute('y', taskY);
          rect.setAttribute('width', Math.max(2, w));
          rect.setAttribute('height', h);
          rect.setAttribute('rx', 4);
          rect.setAttribute('fill', phase.color);
          rect.setAttribute('opacity', 0.8);
          if (task.isCriticalPath) {
             rect.setAttribute('class', 'pulse-glow');
          }
          group.appendChild(rect);
        }
        
        // Tooltip data
        group.dataset.tooltip = `
          <strong>${task.name}</strong><br>
          ${task.startDate} → ${task.endDate} (${task.duration}d)<br>
          Phase: ${phase.name}
        `;
        
        svg.appendChild(group);
        yPos += this.rowHeight;
      });
    });
    
    totalHeight = yPos;
    svg.setAttribute('height', totalHeight);
    sidebar.innerHTML = sidebarHTML;
    
    // Draw Dependencies
    this.roadmap.phases.forEach(phase => {
      phase.tasks.forEach(task => {
        if (task.dependencies && task.dependencies.length > 0) {
          task.dependencies.forEach(depId => {
            const depPos = taskPositions[depId];
            const tPos = taskPositions[task.id];
            if (depPos && tPos) {
              const startX = depPos.x + depPos.w;
              const startY = depPos.y + depPos.h / 2;
              const endX = tPos.x;
              const endY = tPos.y + tPos.h / 2;
              
              const path = document.createElementNS(svgNS, 'path');
              const d = `M ${startX} ${startY} L ${startX + 10} ${startY} L ${startX + 10} ${endY} L ${endX} ${endY}`;
              path.setAttribute('d', d);
              path.setAttribute('fill', 'none');
              path.setAttribute('stroke', '#999');
              path.setAttribute('stroke-width', '1.5');
              path.setAttribute('marker-end', 'url(#arrowhead)');
              svg.insertBefore(path, svg.firstChild);
            }
          });
        }
      });
    });

    // Arrow marker
    const defs = document.createElementNS(svgNS, 'defs');
    defs.innerHTML = `<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto"><polygon points="0 0, 10 3.5, 0 7" fill="#999" /></marker>`;
    svg.insertBefore(defs, svg.firstChild);
    
    chartArea.appendChild(svg);
    wrapper.appendChild(sidebar);
    wrapper.appendChild(chartArea);
    this.container.appendChild(wrapper);

    // Event listeners
    this.container.querySelectorAll('.zoom-controls button').forEach(btn => {
      btn.addEventListener('click', (e) => {
        this.zoomLevel = e.target.dataset.zoom;
        this.render();
      });
    });
    
    // Tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'gantt-tooltip';
    tooltip.style.position = 'fixed';
    tooltip.style.background = 'rgba(0,0,0,0.8)';
    tooltip.style.color = 'white';
    tooltip.style.padding = '5px 10px';
    tooltip.style.borderRadius = '4px';
    tooltip.style.pointerEvents = 'none';
    tooltip.style.display = 'none';
    tooltip.style.zIndex = '1000';
    document.body.appendChild(tooltip);
    
    const taskGroups = svg.querySelectorAll('.task-group');
    taskGroups.forEach(g => {
      g.addEventListener('mouseover', (e) => {
        tooltip.innerHTML = g.dataset.tooltip;
        tooltip.style.display = 'block';
      });
      g.addEventListener('mousemove', (e) => {
        tooltip.style.left = (e.clientX + 10) + 'px';
        tooltip.style.top = (e.clientY + 10) + 'px';
      });
      g.addEventListener('mouseout', () => {
        tooltip.style.display = 'none';
      });
    });
  }
}
