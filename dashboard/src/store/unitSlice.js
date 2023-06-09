import { apiSlice } from "./apiSlice";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";

export const unitSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseUnits: builder.query({
            query: (courseId) => {
                return {
                    url: `courses/${courseId}/units`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Unit"]
        }),
        getUnit: builder.query({
            query: ({ courseId, unitId }) => {
                return {
                    url: `courses/${courseId}/units/${unitId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["Unit", "Lesson"]
        }),
        createUnit: builder.mutation({
            query: ({ courseId, newUnitData }) => {
                return ({
                    url: `courses/${courseId}/units`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newUnitData)
                })
            },
            invalidatesTags: ["Unit", "Course"]
        }),
        updateUnit: builder.mutation({
            query: ({ courseId, unitId, newUnitData }) => {
                return ({
                    method: "PUT",
                    url: `courses/${courseId}/units/${unitId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newUnitData)
                })
            },
            invalidatesTags: ["Unit", "Course"]
        }),
        getNextUnitArrangement: builder.query({
            query: (id) => {
                return {
                    url: `courses/${id}/units/next-arrangement`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        })
    })
});

export const { useGetCourseUnitsQuery, useGetUnitQuery, useCreateUnitMutation, useUpdateUnitMutation, useGetNextUnitArrangementQuery } = unitSlice;