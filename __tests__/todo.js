const todoList = require("../todo");
const {
    all,
    add,
    markAsComplete,
    overdue,
    dueToday,
    dueLater,
    toDisplayableList,
} = todoList();
const todayDate = new Date();
const formatDate = (d) => {
    return d.toISOString().split("T")[0];
};
const today = formatDate(todayDate);

describe("Todo Application Test Suite", () => {
    beforeAll(() => {
        const formatDate = (d) => {
            return d.toISOString().split("T")[0];
        };

        var todayDate = new Date();
        const today = formatDate(todayDate);
        const yesterday = formatDate(
            new Date(new Date().setDate(todayDate.getDate() - 1))
        );
        const tomorrow = formatDate(
            new Date(new Date().setDate(todayDate.getDate() + 1))
        );

        add({
            title: "Todo Application Test",
            dueDate: new Date("2022-10-20"),
            completed: false,
        });
        add({
            title: "submit assignment",
            dueDate: new Date("2021-12-21"),
            completed: false,
        });
        add({
            title: "pay rent",
            dueDate: today,
            completed: true,
        });
        add({
            title: "service vehicle",
            dueDate: today,
            completed: false,
        });
        add({
            title: "file taxes",
            dueDate: new Date("2022-12-09"),
            completed: false,
        });
        add({
            title: "pay electric bill",
            dueDate: new Date("2022-11-21"),
            completed: false,
        });
    });

    test("should add a new item", () => {
        const todosCounts = all.length;
        add({
            title: "wants to submit book in library",
            completed: false,
            dueDate: new Date().toLocaleDateString("en-CA"),
        });
        expect(all.length).toBe(todosCounts + 1);
    });

    test("Should update a completed(mark as read) of given item", () => {
        expect(all[0].completed).toBe(false);
        markAsComplete(0);
        expect(all[0].completed).toBe(true);
    });

    test("Should retrieve a overdue items", () => {
        overDueItems = overdue();
        expect(
            overDueItems.every((todo) => {
                return todo.dueDate < today;
            })
        ).toBe(true);
    });

    test("Should retrieve a due today items", () => {
        dueTodayItems = dueToday();
        expect(
            dueTodayItems.every((todo) => {
                return todo.dueDate === today;
            })
        ).toBe(true);
    });

    test("Should retrieve a due later items", () => {
        dueLaterItems = dueLater();
        expect(
            dueLaterItems.every((todo) => {
                return todo.dueDate > today;
            })
        ).toBe(true);
    });
});