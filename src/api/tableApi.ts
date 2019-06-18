import apiDomainName from "../apiDomainName";

type View = "shoppingList" | "recipeBook" | "pantry";

export type ExistingPantryEntry = {
    primeId: number;
    itemName: string;
    itemSize: number;
    itemUnit: string;
    pantryCount: number;
};

export type NewPantryEntry = {
    itemName: string;
    itemSize: number;
    itemUnit: string;
    pantryCount: number;
};

export type NewRecipeEntry = {
    recipeName: string;
    serves: number;
};

export type ExistingRecipeEntry = {
    primeId: number;
    recipeName: string;
    serves: number;
};

export type ExistingTableEntry = ExistingPantryEntry | ExistingRecipeEntry;

export type NewTableEntry = NewPantryEntry | NewRecipeEntry;

const getApiUrl = (view: View) => `${apiDomainName}/${view}`;

const fetchTableData = (view: View) => async () => {
    const dataResponse = await fetch(getApiUrl(view));
    const data = await dataResponse.json();
    const tableData = data.map(
        (row: ExistingPantryEntry | ExistingRecipeEntry) => {
            return { ...row, key: row.primeId };
        }
    );
    return tableData;
};

const createTableEntry = (view: View) => async (entry: NewTableEntry) => {
    await fetch(getApiUrl(view), {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const deleteTableEntry = (view: View) => (
    entry: ExistingTableEntry
) => async () => {
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
    entry: ExistingTableEntry
) => async () => {
    await fetch(`${getApiUrl(view)}/${entryId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const viewEntryDetails = (view: View) => async (entryId: number) => {
    const entryDataResponse = await fetch(`${getApiUrl(view)}/${entryId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    const entryData = await entryDataResponse.json();
    const entryDataTable = entryData.map(
        (row: ExistingPantryEntry | ExistingRecipeEntry) => {
            return { ...row, key: row.primeId };
        }
    );
    console.log(entryDataTable);

    return entryDataTable;
};

const tableApiMethods = (view: View) => ({
    fetchTableData: fetchTableData(view),
    createTableEntry: createTableEntry(view),
    deleteTableEntry: deleteTableEntry(view),
    updateTableEntry: updateTableEntry(view),
    viewEntryDetails: viewEntryDetails(view)
});

export default tableApiMethods;
