/**
 * Lògica de negoci independent del DOM per a DevTasks
 */

// 1. Validació d'una tasca
export function isValidTask(title) {
  if (typeof title !== 'string') return false;
  const trimmed = title.trim();
  // Validem que no estigui buit i que tingui una longitud mínima de 3 caràcters
  return trimmed.length >= 3 && trimmed.length <= 100;
}

// 2. Creació d'un objecte de tasca
export function createTask(id, title, completed = false) {
  if (!isValidTask(title)) {
    throw new Error("El títol de la tasca no és vàlid.");
  }
  return {
    id: id || Date.now(),
    title: title.trim(),
    completed: Boolean(completed),
    createdAt: new Date().toISOString()
  };
}

// 3. Filtratge de tasques
export function filterTasks(tasks, filterType) {
  if (!Array.isArray(tasks)) return [];

  switch (filterType) {
    case 'completed':
      return tasks.filter(task => task.completed === true);
    case 'pending':
      return tasks.filter(task => task.completed === false);
    case 'all':
    default:
      return [...tasks];
  }
}

// 4. Càlcul d'estadístiques
export function getTaskStats(tasks) {
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return { total: 0, completed: 0, pending: 0, percentCompleted: 0 };
  }

  const total = tasks.length;
  const completed = tasks.filter(t => t.completed).length;
  const pending = total - completed;
  const percentCompleted = Math.round((completed / total) * 100);

  return {
    total,
    completed,
    pending,
    percentCompleted
  };
}