import { getTemplateById, getAllTemplates } from './templates.js';
import { Scheduler } from './scheduler.js';

export function getAvailableTemplates() {
  return getAllTemplates();
}

export function generateRoadmap(config) {
  const template = getTemplateById(config.projectType);
  if (!template) {
    throw new Error(`Template not found for projectType: ${config.projectType}`);
  }

  // Deep clone phases and tasks
  const phases = JSON.parse(JSON.stringify(template.phases));

  // Resolve durations and flatten tasks
  let flatTasks = [];
  
  for (const phase of phases) {
    for (const task of phase.tasks) {
      task.phaseId = phase.id;
      task.duration = task.baseDuration[config.scope] || 0;
      flatTasks.push(task);
    }
  }

  // Inject custom tasks
  if (config.customTasks && config.customTasks.length > 0) {
    config.customTasks.forEach((ct, i) => {
      const phase = phases.find(p => p.id === ct.phase || p.name === ct.phase) || phases[0];
      const newTaskId = `custom-task-${i}`;
      const newTask = {
        id: newTaskId,
        name: ct.name,
        phaseId: phase.id,
        description: 'Custom task',
        baseDuration: { [config.scope]: ct.duration },
        duration: ct.duration,
        dependencies: [],
        isMilestone: false,
        progress: 0
      };
      
      // If there are existing tasks in the phase, make this custom task depend on the last one, or vice-versa
      // We'll just add it with no deps, let it start early, or if we want better integration we could link it.
      // Keeping it simple with no dependencies.
      
      phase.tasks.push(newTask);
      flatTasks.push(newTask);
    });
  }

  // Schedule tasks
  const scheduler = new Scheduler(config);
  const scheduledTasks = scheduler.scheduleTasks(flatTasks);

  // Find critical path
  const criticalPathIds = scheduler.findCriticalPath(scheduledTasks);

  // Decorate tasks with critical path info and progress
  const scheduledTaskMap = new Map(scheduledTasks.map(t => [t.id, t]));

  let totalDurationDays = 0;
  let totalTasks = 0;
  let totalMilestones = 0;

  for (const phase of phases) {
    phase.tasks = phase.tasks.map(t => {
      const sched = scheduledTaskMap.get(t.id);
      totalTasks += 1;
      if (sched.isMilestone) totalMilestones += 1;
      
      return {
        id: sched.id,
        name: sched.name,
        phaseId: phase.id,
        description: sched.description,
        startDate: sched.startDate,
        endDate: sched.endDate,
        duration: sched.duration,
        dependencies: sched.dependencies,
        isMilestone: sched.isMilestone,
        isCriticalPath: criticalPathIds.includes(sched.id),
        progress: 0
      };
    });
  }

  if (scheduledTasks.length > 0) {
      const firstStart = new Date(scheduledTasks.reduce((min, t) => t.startDate < min ? t.startDate : min, scheduledTasks[0].startDate));
      const lastEnd = new Date(scheduledTasks.reduce((max, t) => t.endDate > max ? t.endDate : max, scheduledTasks[0].endDate));
      totalDurationDays = scheduler.getWorkingDaysBetween(firstStart, lastEnd) + 1;
  }

  const estimatedWeeks = Math.ceil(totalDurationDays / config.workingDaysPerWeek);

  const roadmap = {
    config,
    phases,
    totalDuration: totalDurationDays,
    criticalPath: criticalPathIds,
    stats: {
      totalTasks,
      totalPhases: phases.length,
      totalMilestones,
      estimatedWeeks
    }
  };

  return roadmap;
}
