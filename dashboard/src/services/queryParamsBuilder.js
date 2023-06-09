export default class QueryParamsBuilder {
    query = ""
    setLimit(limit) {
        this.query += this.query === "" ? "?limit=" + limit : this.query + "&limit=" + limit;
    }
    setOffset(offset) {
        this.query += this.query === "" ? "?offset=" + offset : this.query + "&offset=" + offset;
    }
    get() {
        return this.query;
    }
}