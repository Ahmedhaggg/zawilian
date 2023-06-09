import { apiSlice } from "./apiSlice"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";

export const courseSelice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: () => {
                return {
                    url: "courses",
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Course"]
        }),
        getCourse: builder.query({
            query: (id) => {
                return {
                    url: `courses/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Course"]
        }),
        createCourse: builder.mutation({
            query: newCourseData => {
                return ({
                    method: "POST",
                    url: "courses",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseData)
                })
            },
            invalidatesTags: ["Course"]
        }),
        updateCourse: builder.mutation({
            query: ({ courseId, newCourseData }) => {
                return ({
                    url: `courses/${courseId}`,
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseData)
                })
            },
            invalidatesTags: ["Course"]
        })
    })
});

export const { useGetAllCoursesQuery, useGetCourseQuery, useCreateCourseMutation, useUpdateCourseMutation } = courseSelice;