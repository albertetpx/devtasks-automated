import { describe, it, expect } from 'vitest';
import { isValidTask, createTask, filterTasks, getTaskStats } from '../js/taskManager.js';

describe("Suite de Proves per a TaskManager (DevTasks)", () => {

  // TEST 1: Validació de tasques
  describe("isValidTask()", () => {
    it("hauria de retornar true per a títols vàlids", () => {
      expect(isValidTask("Comprar llet")).toBe(true);
      expect(isValidTask("  Aprendre CI/CD  ")).toBe(true);
    });

    it("hauria de retornar false si el títol és massa curt, buit o té només espais", () => {
      expect(isValidTask("")).toBe(false);
      expect(isValidTask("  ")).toBe(false);
      expect(isValidTask("ab")).toBe(false); // Menys de 3 caràcters
    });
  });

  // TEST 2: Creació de tasques i estructura de l'objecte
  describe("createTask()", () => {
    it("hauria de crear un objecte de tasca correctament estructurat", () => {
      const task = createTask(1, "Estudiar GitHub Actions");
      
      expect(task).toEqual({
        id: 1,
        title: "Estudiar GitHub Actions",
        completed: false,
        createdAt: expect.any(String)
      });
    });

    // TEST 3: Cas límit en la creació de tasques (Error handling)
    it("hauria de llançar un error si s'intenta crear una tasca amb un títol invàlid", () => {
      expect(() => createTask(2, "a")).toThrow("El títol de la tasca no és vàlid.");
    });
  });

  // TEST 4: Filtratge de tasques
  describe("filterTasks()", () => {
    const mockTasks = [
      { id: 1, title: "Tasca 1", completed: true },
      { id: 2, title: "Tasca 2", completed: false },
      { id: 3, title: "Tasca 3", completed: true }
    ];

    it("hauria de filtrar correctament per estat (completades, pendents i totes)", () => {
      const completed = filterTasks(mockTasks, "completed");
      const pending = filterTasks(mockTasks, "pending");
      const all = filterTasks(mockTasks, "all");

      expect(completed).toHaveLength(2);
      expect(pending).toHaveLength(1);
      expect(all).toHaveLength(3);
      expect(pending[0].id).toBe(2);
    });
  });

  // TEST 5: Càlcul d'estadístiques i cas límit d'un array buit
  describe("getTaskStats()", () => {
    it("hauria de calcular correctament els percentatges i totals d'una llista", () => {
      const mockTasks = [
        { id: 1, completed: true },
        { id: 2, completed: true },
        { id: 3, completed: false },
        { id: 4, completed: false }
      ];

      const stats = getTaskStats(mockTasks);

      expect(stats).toEqual({
        total: 4,
        completed: 2,
        pending: 2,
        percentCompleted: 50
      });
    });

    it("hauria de gestionar correctament un array buit sense dividir per zero", () => {
      const stats = getTaskStats([]);

      expect(stats).toEqual({
        total: 0,
        completed: 0,
        pending: 0,
        percentCompleted: 0
      });
    });
  });

});