function createDocuments(collection, howMany) {
    for (let i = 0; i < howMany; i++) {
        db[collection].insert({ docNumber: i });
    }
}