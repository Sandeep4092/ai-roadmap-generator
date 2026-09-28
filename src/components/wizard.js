import { getAvailableTemplates } from '../engine/generator.js';

export class Wizard {
  constructor(container, onComplete) {
    this.container = container;
    this.onComplete = onComplete;
    this.currentStep = 0;
    this.config = {
      projectType: null,
      projectName: '',
      projectDescription: '',
      scope: 'medium',
      teamSize: 3,
      startDate: new Date().toISOString().split('T')[0],
      endDate: '',
      workingDaysPerWeek: 5
    };
    
    this.templates = getAvailableTemplates();
  }

  render() {
    this.container.innerHTML = '';
    
    const wrapper = document.createElement('div');
    wrapper.className = 'wizard-wrapper';
    
    // Progress bar
    const progress = document.createElement('div');
    progress.className = 'wizard-progress';
    progress.innerHTML = `
      <div class="progress-steps">
        ${[1, 2, 3, 4].map((step, i) => `
          <div class="progress-step ${i <= this.currentStep ? 'active' : ''}">
            <div class="step-circle">${step}</div>
            <span class="step-label">Step ${step}</span>
          </div>
        `).join('')}
      </div>
    `;
    wrapper.appendChild(progress);

    // Content area
    const content = document.createElement('div');
    content.className = 'wizard-content animate-fade-in';
    content.innerHTML = this.getStepHTML();
    wrapper.appendChild(content);

    // Navigation
    const nav = document.createElement('div');
    nav.className = 'wizard-nav';
    
    const backBtn = document.createElement('button');
    backBtn.className = 'btn btn-secondary';
    backBtn.textContent = 'Back';
    backBtn.style.visibility = this.currentStep === 0 ? 'hidden' : 'visible';
    backBtn.onclick = () => this.goToStep(this.currentStep - 1);
    
    const nextBtn = document.createElement('button');
    nextBtn.className = 'btn btn-primary';
    nextBtn.textContent = this.currentStep === 3 ? 'Generate Roadmap' : 'Next';
    nextBtn.onclick = () => this.handleNext();
    
    nav.appendChild(backBtn);
    nav.appendChild(nextBtn);
    wrapper.appendChild(nav);

    this.container.appendChild(wrapper);
    this.attachEventListeners();
  }

  getStepHTML() {
    switch (this.currentStep) {
      case 0:
        return `
          <div class="step-header">
            <h2>What are you building?</h2>
            <p class="text-muted">Choose a project template to get started <a href="#" id="quick-generate" class="text-accent ml-2">Quick Generate (skip wizard)</a></p>
          </div>
          <div class="template-grid">
            ${this.templates.map(t => `
              <div class="template-card ${this.config.projectType === t.id ? 'selected' : ''}" data-id="${t.id}">
                <div class="template-icon">${t.icon}</div>
                <h3>${t.name}</h3>
                <p class="text-muted">${t.description}</p>
              </div>
            `).join('')}
          </div>
        `;
      case 1:
        return `
          <div class="step-header">
            <h2>Tell us about your project</h2>
          </div>
          <div class="form-group">
            <label>Project Name <span class="required">*</span></label>
            <input type="text" id="projectName" class="form-control" value="${this.config.projectName}" placeholder="My Awesome Project" required>
          </div>
          <div class="form-group">
            <label>Project Description</label>
            <textarea id="projectDescription" class="form-control" placeholder="Brief description of your project...">${this.config.projectDescription}</textarea>
          </div>
          <div class="form-group">
            <label>Scope / Complexity</label>
            <div class="scope-cards">
              ${[
                { id: 'small', icon: '🏃', label: 'Small', desc: 'Quick MVP, core features only' },
                { id: 'medium', icon: '⚡', label: 'Medium', desc: 'Standard scope, most features' },
                { id: 'large', icon: '🏗️', label: 'Large', desc: 'Full-scale, all features' }
              ].map(s => `
                <div class="scope-card ${this.config.scope === s.id ? 'selected' : ''}" data-id="${s.id}">
                  <div class="scope-icon">${s.icon}</div>
                  <div class="scope-info">
                    <h4>${s.label}</h4>
                    <p class="text-muted text-sm">${s.desc}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
          <div class="form-group">
            <label>Team Size</label>
            <input type="number" id="teamSize" class="form-control" min="1" max="20" value="${this.config.teamSize}">
          </div>
        `;
      case 2:
        return `
          <div class="step-header">
            <h2>Set your timeline</h2>
          </div>
          <div class="form-group">
            <label>Start Date</label>
            <input type="date" id="startDate" class="form-control" value="${this.config.startDate}">
          </div>
          <div class="form-group">
            <label>Target End Date <span class="text-muted font-normal">(Leave blank for auto-calculated)</span></label>
            <input type="date" id="endDate" class="form-control" value="${this.config.endDate}">
          </div>
          <div class="form-group">
            <label>Working Days per Week</label>
            <select id="workingDaysPerWeek" class="form-control">
              <option value="5" ${this.config.workingDaysPerWeek === 5 ? 'selected' : ''}>5 days (Mon-Fri)</option>
              <option value="6" ${this.config.workingDaysPerWeek === 6 ? 'selected' : ''}>6 days (Mon-Sat)</option>
              <option value="7" ${this.config.workingDaysPerWeek === 7 ? 'selected' : ''}>7 days (All week)</option>
            </select>
          </div>
        `;
      case 3:
        const tpl = this.templates.find(t => t.id === this.config.projectType);
        return `
          <div class="step-header">
            <h2>Review your project setup</h2>
          </div>
          <div class="review-card">
            <div class="review-header">
              <div class="review-icon">${tpl ? tpl.icon : '📝'}</div>
              <div>
                <h3>${this.config.projectName}</h3>
                <span class="badge badge-${this.config.scope}">${this.config.scope.toUpperCase()}</span>
                <span class="badge badge-info">${tpl ? tpl.name : 'Custom'}</span>
              </div>
            </div>
            <p class="review-desc">${this.config.projectDescription || 'No description provided.'}</p>
            <div class="review-details">
              <div class="detail-item">
                <span class="detail-label">Team Size:</span>
                <span class="detail-value">${this.config.teamSize} members</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Start Date:</span>
                <span class="detail-value">${this.config.startDate}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">End Date:</span>
                <span class="detail-value">${this.config.endDate || 'Auto-calculated'}</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Work Week:</span>
                <span class="detail-value">${this.config.workingDaysPerWeek} days</span>
              </div>
            </div>
          </div>
        `;
    }
  }

  attachEventListeners() {
    if (this.currentStep === 0) {
      this.container.querySelectorAll('.template-card').forEach(card => {
        card.addEventListener('click', (e) => {
          this.container.querySelectorAll('.template-card').forEach(c => c.classList.remove('selected'));
          e.currentTarget.classList.add('selected');
          this.config.projectType = e.currentTarget.dataset.id;
        });
      });
      
      const qg = this.container.querySelector('#quick-generate');
      if (qg) {
        qg.addEventListener('click', (e) => {
          e.preventDefault();
          this.config.projectType = this.config.projectType || this.templates[0].id;
          this.config.projectName = this.config.projectName || 'My Quick Project';
          this.currentStep = 3;
          this.render();
        });
      }
    } else if (this.currentStep === 1) {
      this.container.querySelectorAll('.scope-card').forEach(card => {
        card.addEventListener('click', (e) => {
          this.container.querySelectorAll('.scope-card').forEach(c => c.classList.remove('selected'));
          e.currentTarget.classList.add('selected');
          this.config.scope = e.currentTarget.dataset.id;
        });
      });

      const updateVal = (id) => {
        const el = this.container.querySelector('#' + id);
        if (el) {
          el.addEventListener('input', (e) => {
            this.config[id] = e.target.value;
            e.target.classList.remove('error');
          });
        }
      }
      updateVal('projectName');
      updateVal('projectDescription');
      updateVal('teamSize');
    } else if (this.currentStep === 2) {
      const updateVal = (id, isNum = false) => {
        const el = this.container.querySelector('#' + id);
        if (el) {
          el.addEventListener('change', (e) => {
            this.config[id] = isNum ? parseInt(e.target.value) : e.target.value;
          });
        }
      }
      updateVal('startDate');
      updateVal('endDate');
      updateVal('workingDaysPerWeek', true);
    }
  }

  validateStep() {
    if (this.currentStep === 0) {
      if (!this.config.projectType) {
        alert("Please select a project type");
        return false;
      }
    } else if (this.currentStep === 1) {
      const nameEl = this.container.querySelector('#projectName');
      if (!this.config.projectName.trim()) {
        nameEl.classList.add('error');
        nameEl.focus();
        return false;
      }
      this.config.teamSize = parseInt(this.container.querySelector('#teamSize').value) || 3;
    }
    return true;
  }

  handleNext() {
    if (!this.validateStep()) return;
    
    if (this.currentStep === 3) {
      this.onComplete(this.config);
    } else {
      this.goToStep(this.currentStep + 1);
    }
  }

  goToStep(step) {
    this.currentStep = step;
    this.render();
  }
}
