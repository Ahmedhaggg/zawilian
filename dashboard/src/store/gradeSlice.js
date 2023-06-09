import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice"

export const gradeSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllGrades: builder.query({
            query: () => {
                return {
                    url: "grades",
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Grade", "Course"]
        }),
        getGrade: builder.query({
            query: (id) => {
                return {
                    url: `grades/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Grade", "Course"]
        }),
        createGrade: builder.mutation({
            query: newGradeData => {
                return ({
                    method: "POST",
                    url: "grades",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newGradeData)
                })
            },
            invalidatesTags: ["Grade"]
        }),
        updateGrade: builder.mutation({
            query: (data) => {
                return ({
                    method: "PUT",
                    url: `grades/${data.gradeId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(data.newGradeData)
                })
            },
            invalidatesTags: ["Grade"]
        })
    })
})


export const secondSlice = createApi({
    reducerPath: "gradeSlice",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    tagTypes: ["Grade"],
    endpoints: (builder) => ({
        getAllGrades: builder.query({
            query: () => {
                return {
                    url: "grades",
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Grade"]
        }),
        getGrade: builder.query({
            query: (id) => {
                return {
                    url: `grades/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Grade"]
        }),
        createGrade: builder.mutation({
            query: newGradeData => {
                return ({
                    method: "POST",
                    url: "grades",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newGradeData)
                })
            }
        }),
        updateGrade: builder.mutation({
            query: (data) => {
                return ({
                    method: "PUT",
                    url: `grades/${data.gradeId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(data.newGradeData)
                })
            },
            invalidatesTags: ["Grade"]
        })
    })
});

export const { useCreateGradeMutation, useGetGradeQuery, useGetAllGradesQuery, useUpdateGradeMutation } = gradeSlice;