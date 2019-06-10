type Url =
    | "http://localhost:3003/pantry"
    | "http://localhost:3003/recipe-book"
    | "http://localhost:3003/shopping-list";

type ItemRow = {
    itemId: number;
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

type TableEntry = PantryEntry;

const fetchTableData = (url: Url) => async () => {
    const pantryDataResponse = await fetch(url);
    const pantryData = await pantryDataResponse.json();
    const tableData = pantryData.map((pantryItem: DbRow) => {
        return { ...pantryItem, key: pantryItem.itemId };
    });
    return tableData;
};

const postTableEntry = (url: Url) => async (entry: TableEntry) => {
    await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const deleteTableEntry = (url: Url) => (entry: TableEntry) => async () => {
    await fetch(url, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(entry)
    });
};

const tableUtils = (url: Url) => ({
    fetchTableData: fetchTableData(url),
    postTableEntry: postTableEntry(url),
    deleteTableEntry: deleteTableEntry(url)
});

export default tableUtils;
