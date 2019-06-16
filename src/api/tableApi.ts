import apiDomainName from "../apiDomainName";

type View = "shoppingList" | "recipeBook" | "pantry";

type ItemRow = {
    primeId: number;
    itemName: string;
    itemSize: number;
    itemUnit: string;
    pantryCount: number;
};

type DbRow = ItemRow;

type PantryEntry = {
    itemName: string;
    itemSize: number;
    itemUnit: string;
    pantryCount: number;
};

type RecipeEntry = {
    recipeName: string;
    serves: number;
};

type TableEntry = PantryEntry | RecipeEntry;

const getApiUrl = (view: View) => `${apiDomainName}/${view}`;

const fetchTableData = (view: View) => async () => {
    const dataResponse = await fetch(getApiUrl(view));
    const data = await dataResponse.json();
    const tableData = data.map((row: DbRow) => {
        return { ...row, key: row.primeId };
    });
    return tableData;
};

const createTableEntry = (view: View) => async (entry: TableEntry) => {
    await fetch(getApiUrl(view), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const deleteTableEntry = (view: View) => (entry: TableEntry) => async () => {
    await fetch(getApiUrl(view), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const updateTableEntry = (view: View) => (
    entryId: number,
    entry: TableEntry
) => async () => {
    await fetch(`${getApiUrl(view)}/${entryId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const tableApiMethods = (view: View) => ({
    fetchTableData: fetchTableData(view),
    createTableEntry: createTableEntry(view),
    deleteTableEntry: deleteTableEntry(view),
    updateTableEntry: updateTableEntry(view)
});

export default tableApiMethods;
