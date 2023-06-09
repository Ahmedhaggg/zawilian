import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice";
export const unitRevisionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUnitRevisions: builder.query({
            query: (unitId) => {
                return {
                    url: `units/${unitId}/revisions`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        getUnitRevision: builder.query({
            query: ({ unitId, revisionId }) => {
                return {
                    url: `units/${unitId}/revisions/${revisionId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["UnitRevision"]
        }),
        getNextUnitRevisionArrangement: builder.query({
            query: (unitId) => {
                return ({
                    method: "GET",
                    url: `units/${unitId}/revisions/next-arrangement`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
            providesTags: ["UnitRevision"]
        }),
        createUnitRevision: builder.mutation({
            query: ({ unitId, newUnitRevisionData }) => {
                return ({
                    url: `units/${unitId}/revisions`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newUnitRevisionData)
                })
            },
            invalidatesTags: ["UnitRevision", "Unit"]
        }),
        updateUnitRevision: builder.mutation({
            query: ({ unitId, revisionId, newRevisionData }) => {
                return ({
                    method: "PUT",
                    url: `units/${unitId}/revisions/${revisionId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newRevisionData)
                })
            },
            invalidatesTags: ["UnitRevision", "Unit"]
        })
    })
});

export const { useGetUnitRevisionQuery, useGetUnitRevisionsQuery, useCreateUnitRevisionMutation, useUpdateUnitRevisionMutation, useGetNextUnitRevisionArrangementQuery } = unitRevisionSlice;