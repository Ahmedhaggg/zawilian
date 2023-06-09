// import QueryParamsBuilder from '../services/queryParamsBuilder'
import StudentQueryParmsBuilder from '../services/stdentQueryParams'
import { getToken } from '../services/storage'
import { apiSlice } from './apiSlice'

export const applyingStudentSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getApplyingStudents: builder.query({
            query: (query = {}) => {
                let newQuery = new StudentQueryParmsBuilder();

                if (query.offset) newQuery.setOffset(query.offset)
                if (query.limit) newQuery.setLimit(query.limit)
                if (query.grade) newQuery.setGrade(query.grade)

                return ({
                    method: "GET",
                    url: `v2/applying-students${newQuery.get()}`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            }
        }),
        countApplyingStudents: builder.query({
            query: (query = {}) => {
                let newQuery = new StudentQueryParmsBuilder();

                if (query.grade) newQuery.setGrade(query.grade)

                return ({
                    method: "GET",
                    url: `v2/applying-students/count${newQuery.get()}`,
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
                    url: `v2/applying-students/${studentId}`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            }
        }),
        acceptApplyingStudent: builder.mutation({
            query: ({ studentId, acceptingStudentData }) => {
                return ({
                    method: "PATCH", 
                    url: `v2/applying-students/${studentId}`,
                    headers: {
                        'authorization': getToken(),
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(acceptingStudentData)
                })
            }
        }),
        refuseApplyingStudent: builder.mutation({
            query: (studentId) => {
                return {
                    method: "DELETE", 
                    url: `v2/applying-students/${studentId}`,
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        })
    })
})
export const { 
    useGetApplyingStudentQuery, 
    useGetApplyingStudentsQuery, 
    useCountApplyingStudentsQuery,
    useAcceptApplyingStudentMutation,
    useRefuseApplyingStudentMutation
} = applyingStudentSlice;
