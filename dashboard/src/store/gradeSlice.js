import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice"

export const gradeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGrades: builder.query({
            query: () => {
                return {
                    url: "v2/grades",
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        getGrade: builder.query({
            query: (id) => {
                return {
                    url: `v2/grades/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        createGrade: builder.mutation({
            query: newGradeData => {
                return ({
                    method: "POST",
                    url: "v2/grades",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newGradeData)
                })
            },
            async onQueryStarted(newGradeData, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
                    
                    dispatch(
                        apiSlice.util.updateQueryData('getAllGrades', undefined, (draft) => {
                            draft.grades.push(data.newGrade)
                        })
                    )
                } catch (_) {}
            }
        }),
        updateGrade: builder.mutation({
            query: (data) => {
                return ({
                    method: "PATCH",
                    url: `v2/grades/${data.gradeId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(data.newGradeData)
                })
            },
            onQueryStarted: async ({ gradeId, newGradeData }, { dispatch, queryFulfilled}) => {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
                    dispatch(
                        apiSlice.util.updateQueryData('getGrade', gradeId, (draft) => {
                            Object.assign(draft, { ...draft, grade: { ...newGradeData }})
                        })
                    )

                    dispatch(
                        apiSlice.util.updateQueryData('getAllGrades', undefined, (draft) => {
                            const updatedGradeIndex = draft.grades.findIndex((grade) => grade.id == gradeId);
                            if (updatedGradeIndex !== -1) {
                                let grades = [
                                    ...draft.grades.slice(0, updatedGradeIndex),
                                    {
                                        ...draft.grades[updatedGradeIndex],
                                        ...newGradeData
                                    },
                                    ...draft.grades.slice(updatedGradeIndex + 1),
                                ];
                                
                                Object.assign(draft, {
                                    ...draft,
                                    grades
                                })
                            }
                        })
                    )
                } catch (_){}
            }
        })
    })
})


export const { 
    useCreateGradeMutation, 
    useGetGradeQuery, 
    useGetAllGradesQuery, 
    useUpdateGradeMutation 
} = gradeSlice;