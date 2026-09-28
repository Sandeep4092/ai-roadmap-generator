export class Scheduler {
  constructor(config) {
    this.startDate = new Date(config.startDate);
    // Optional target deadline
    this.endDate = config.endDate ? new Date(config.endDate) : null;
    this.workingDaysPerWeek = config.workingDaysPerWeek;
    this.teamSize = config.teamSize;
  }

  isWorkingDay(date) {
    const day = date.getDay(); // 0 is Sunday, 6 is Saturday
    if (this.workingDaysPerWeek === 7) return true;
    if (this.workingDaysPerWeek === 6) return day !== 0; // Mon-Sat
    return day !== 0 && day !== 6; // Mon-Fri
  }

  nextWorkingDay(date) {
    const d = new Date(date);
    d.setDate(d.getDate() + 1);
    while (!this.isWorkingDay(d)) {
      d.setDate(d.getDate() + 1);
    }
    return d;
  }

  addWorkingDays(startDate, days) {
    const d = new Date(startDate);
    if (days === 0) return d;
    
    let added = 0;
    while (added < days) {
      d.setDate(d.getDate() + 1);
      if (this.isWorkingDay(d)) {
        added++;
      }
    }
    return d;
  }

  getWorkingDaysBetween(start, end) {
    let d = new Date(start);
    const endD = new Date(end);
    let count = 0;
    while (d < endD) {
      if (this.isWorkingDay(d)) {
        count++;
      }
      d.setDate(d.getDate() + 1);
    }
    return count;
  }

  scheduleTasks(tasks) {
    const adjList = new Map();
    const inDegree = new Map();
    
    // Initialize
    for (const task of tasks) {
      adjList.set(task.id, []);
      inDegree.set(task.id, 0);
    }

    // Build Graph
    for (const task of tasks) {
      for (const depId of task.dependencies) {
        if (adjList.has(depId)) {
          adjList.get(depId).push(task.id);
          inDegree.set(task.id, inDegree.get(task.id) + 1);
        }
      }
    }

    // Topological Sort
    const queue = [];
    for (const [taskId, degree] of inDegree.entries()) {
      if (degree === 0) queue.push(taskId);
    }

    const order = [];
    while (queue.length > 0) {
      const u = queue.shift();
      order.push(u);
      
      for (const v of adjList.get(u)) {
        inDegree.set(v, inDegree.get(v) - 1);
        if (inDegree.get(v) === 0) {
          queue.push(v);
        }
      }
    }

    if (order.length !== tasks.length) {
      throw new Error("Cycle detected in dependencies");
    }

    const taskMap = new Map();
    for (const task of tasks) {
      taskMap.set(task.id, task);
    }

    // Scaling durations based on teamSize
    const scaledTasks = tasks.map(t => {
      let duration = t.duration;
      if (!t.isMilestone && this.teamSize > 1) {
        duration = Math.floor(t.duration / (1 + 0.3 * Math.log2(this.teamSize)));
        duration = Math.max(1, duration);
      }
      return { ...t, duration };
    });

    for (const t of scaledTasks) {
      taskMap.set(t.id, t);
    }

    // Schedule
    const scheduled = new Map();

    for (const taskId of order) {
      const task = taskMap.get(taskId);
      let maxDepEndDate = null;

      for (const depId of task.dependencies) {
        const depTask = scheduled.get(depId);
        if (depTask) {
          const depEnd = new Date(depTask.endDate);
          if (!maxDepEndDate || depEnd > maxDepEndDate) {
            maxDepEndDate = depEnd;
          }
        }
      }

      let startD = maxDepEndDate ? this.nextWorkingDay(maxDepEndDate) : new Date(this.startDate);
      // Ensure start date itself is a working day
      if (!this.isWorkingDay(startD)) {
          startD = this.nextWorkingDay(startD);
      }
      
      const endD = task.duration > 0 ? this.addWorkingDays(startD, task.duration - 1) : new Date(startD);

      scheduled.set(taskId, {
        ...task,
        startDate: startD.toISOString().split('T')[0],
        endDate: endD.toISOString().split('T')[0],
      });
    }

    let finalTasks = Array.from(scheduled.values());

    // Compression if endDate is provided
    if (this.endDate) {
        const maxEndStr = finalTasks.reduce((max, t) => t.endDate > max ? t.endDate : max, '1970-01-01');
        const maxEnd = new Date(maxEndStr);
        if (maxEnd > this.endDate) {
            const totalScheduledDays = this.getWorkingDaysBetween(this.startDate, maxEnd);
            const availableDays = this.getWorkingDaysBetween(this.startDate, this.endDate);
            const compressionFactor = availableDays / totalScheduledDays;

            // Re-scale tasks
            for (const t of finalTasks) {
                if (!t.isMilestone) {
                    t.duration = Math.max(1, Math.floor(t.duration * compressionFactor));
                }
            }

            // Re-run scheduling with compressed durations
            scheduled.clear();
            for (const taskId of order) {
                const task = finalTasks.find(t => t.id === taskId);
                let maxDepEndDate = null;
          
                for (const depId of task.dependencies) {
                  const depTask = scheduled.get(depId);
                  if (depTask) {
                    const depEnd = new Date(depTask.endDate);
                    if (!maxDepEndDate || depEnd > maxDepEndDate) {
                      maxDepEndDate = depEnd;
                    }
                  }
                }
          
                let startD = maxDepEndDate ? this.nextWorkingDay(maxDepEndDate) : new Date(this.startDate);
                if (!this.isWorkingDay(startD)) {
                    startD = this.nextWorkingDay(startD);
                }
                const endD = task.duration > 0 ? this.addWorkingDays(startD, task.duration - 1) : new Date(startD);
          
                scheduled.set(taskId, {
                  ...task,
                  startDate: startD.toISOString().split('T')[0],
                  endDate: endD.toISOString().split('T')[0],
                });
            }
            finalTasks = Array.from(scheduled.values());
        }
    }

    return finalTasks;
  }

  findCriticalPath(scheduledTasks) {
    const adjList = new Map();
    const revAdjList = new Map();
    
    for (const t of scheduledTasks) {
      adjList.set(t.id, []);
      revAdjList.set(t.id, []);
    }

    for (const t of scheduledTasks) {
      for (const depId of t.dependencies) {
        if (adjList.has(depId)) {
            adjList.get(depId).push(t.id);
            revAdjList.get(t.id).push(depId);
        }
      }
    }

    // Latest end time calculation
    let globalMaxEnd = new Date(scheduledTasks[0].endDate);
    let endTaskId = scheduledTasks[0].id;
    for (const t of scheduledTasks) {
        const d = new Date(t.endDate);
        if (d > globalMaxEnd) {
            globalMaxEnd = d;
            endTaskId = t.id;
        }
    }

    const path = [];
    let curr = endTaskId;
    while (curr) {
        path.push(curr);
        const deps = revAdjList.get(curr) || [];
        if (deps.length === 0) break;

        let maxDepEnd = null;
        let nextCurr = null;
        for (const depId of deps) {
            const depTask = scheduledTasks.find(t => t.id === depId);
            const depEnd = new Date(depTask.endDate);
            if (!maxDepEnd || depEnd > maxDepEnd) {
                maxDepEnd = depEnd;
                nextCurr = depId;
            }
        }
        curr = nextCurr;
    }

    return path.reverse();
  }
}
