import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice";

export const lessonSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUnitLessons: builder.query({
            query: (unitId) => {
                return {
                    url: `units/units/${unitId}/lessons`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        getLesson: builder.query({
            query: ({ unitId, lessonId }) => {
                return {
                    url: `units/${unitId}/lessons/${lessonId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Lesson"]
        }),
        getNextLessontArrangement: builder.query({
            query: (unitId) => {
                return ({
                    method: "GET",
                    url: `units/${unitId}/lessons/next-arrangement`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
            providesTags: ["Lesson"]
        }),
        createLesson: builder.mutation({
            query: ({ unitId, newLessonData }) => {
                return ({
                    url: `units/${unitId}/lessons`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newLessonData)
                })
            },
            invalidatesTags: ["Lesson"]
        }),
        updateLesson: builder.mutation({
            query: ({ unitId, lessonId, newLessonData }) => {
                return ({
                    method: "PUT",
                    url: `units/${unitId}/lessons/${lessonId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newLessonData)
                })
            },
            invalidatesTags: ["Lesson"]
        })
    })
});

export const { useGetUnitLessonsQuery, useGetLessonQuery, useCreateLessonMutation, useUpdateLessonMutation, useGetNextLessontArrangementQuery } = lessonSlice;