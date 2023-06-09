import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice";
export const courseRevisionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCourseRevisions: builder.query({
            query: (courseId) => {
                return {
                    url: `courses/${courseId}/revisions`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        getCourseRevision: builder.query({
            query: ({ courseId, revisionId }) => {
                return {
                    url: `courses/${courseId}/revisions/${revisionId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
            providesTags: ["CourseRevision"]
        }),
        getNextCourseRevisionArrangement: builder.query({
            query: (courseId) => {
                return ({
                    method: "GET",
                    url: `courses/${courseId}/revisions/next-arrangement`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
            providesTags: ["CourseRevision"]
        }),
        createCourseRevision: builder.mutation({
            query: ({ courseId, newCourseRevisionData }) => {
                return ({
                    url: `courses/${courseId}/revisions`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseRevisionData)
                })
            },
            invalidatesTags: ["CourseRevision", "Course"]
        }),
        updateCourseRevision: builder.mutation({
            query: ({ courseId, revisionId, newRevisionData }) => {
                return ({
                    method: "PUT",
                    url: `courses/${courseId}/revisions/${revisionId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newRevisionData)
                })
            },
            invalidatesTags: ["CourseRevision", "Course"]
        })
    })
});

export const { useGetCourseRevisionQuery, useGetCourseRevisionsQuery, useCreateCourseRevisionMutation, useUpdateCourseRevisionMutation, useGetNextCourseRevisionArrangementQuery } = courseRevisionSlice;