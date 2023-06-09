import QueryParamsBuilder from "./queryParamsBuilder";

export default class StudentQueryParmsBuilder extends QueryParamsBuilder {
    setGrade(gradeId) {
        this.query += this.query === "" ? "?grade=" + gradeId : "&grade=" + gradeId;
    }
}