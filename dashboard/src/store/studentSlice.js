// import QueryParamsBuilder from '../services/queryParamsBuilder'
import StudentQueryParmsBuilder from '../services/stdentQueryParams'
import { getToken } from '../services/storage'
import { apiSlice } from './apiSlice'

export const studentSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getStudents: builder.query({
            query: (query = {}) => {
                let newQuery = new StudentQueryParmsBuilder();

                if (query.offset) newQuery.setOffset(query.offset)
                if (query.limit) newQuery.setLimit(query.limit)
                if (query.grade) newQuery.setGrade(query.grade)

                return ({
                    method: "GET",
                    url: `v2/students${newQuery.get()}`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            },
            providesTags: ["Student"]
        }),
        countStudents: builder.query({
            query: (query = {}) => {
                let newQuery = new StudentQueryParmsBuilder();

                if (query.grade) newQuery.setGrade(query.grade)

                return ({
                    method: "GET",
                    url: `v2/students/count${newQuery.get()}`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            }
        }),
        getStudent: builder.query({
            query: (studentId) => {
                return ({
                    method: "GET",
                    url: `v2/students/${studentId}`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            },
            providesTags: ["Student"]
        }),
        getStudentExamsScores: builder.query({
            query: (studentId) => {
                return ({
                    method: "GET",
                    url: `v2/exams-scores/students/${studentId}`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            }
        })
    })
})
export const { 
    useGetStudentQuery, 
    useGetStudentsQuery, 
    useCountStudentsQuery,
    useGetStudentExamsScoresQuery
} = studentSlice
