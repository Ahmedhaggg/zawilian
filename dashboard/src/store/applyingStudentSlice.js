// import QueryParamsBuilder from '../services/queryParamsBuilder'
import StudentQueryParmsBuilder from '../services/stdentQueryParams'
import { getToken } from '../services/storage'
import { apiSlice } from './apiSlice'

export const applyingStudentSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getApplyingStudents: builder.query({
            query: (query = {}) => {
                console.log(query)
                let newQuery = new StudentQueryParmsBuilder();

                if (query.offset) newQuery.setOffset(query.offset)
                if (query.limit) newQuery.setLimit(query.limit)
                if (query.grade) newQuery.setGrade(query.grade)

                return ({
                    method: "GET",
                    url: `students/un-accepted${newQuery.get()}`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            },
            providesTags: ["Student"]
        }),
        countApplyingStudents: builder.query({
            query: (query = {}) => {
                let newQuery = new StudentQueryParmsBuilder();

                if (query.grade) newQuery.setGrade(query.grade)

                return ({
                    method: "GET",
                    url: `students/un-accepted/count${newQuery.get()}`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            }
        }),
        getApplyingStudent: builder.query({
            query: (studentId) => {
                return ({
                    method: "GET",
                    url: `students/${studentId}/un-accepted`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            },
            providesTags: ["Student"]
        }),
        createApplyingStudent: builder.mutation({
            query: ({ studentId, acceptingStudentData}) => {
                return ({
                    method: "PUT", 
                    url: `students/${studentId}/un-accepted`,
                    headers: {
                        'authorization': getToken()
                    },
                    body: JSON.stringify(acceptingStudentData)
                })
            }, 
            invalidatesTags: ["Student"]
        })
    })
})
export const { 
    useGetApplyingStudentQuery, 
    useGetApplyingStudentsQuery, 
    useCountApplyingStudentsQuery,
    useCreateApplyingStudentMutation
} = applyingStudentSlice;
