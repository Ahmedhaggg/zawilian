import { apiSlice } from "./apiSlice"
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";

export const courseSelice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllCourses: builder.query({
            query: () => {
                return {
                    url: "v2/courses",
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        getCourse: builder.query({
            query: (id) => {
                return {
                    url: `v2/courses/${id}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        createCourse: builder.mutation({
            query: newCourseData => {
                return ({
                    method: "POST",
                    url: "v2/courses",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseData)
                })
            },
            async onQueryStarted(newCourseData, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
                    
                    dispatch(
                        apiSlice.util.updateQueryData('getAllCourses', undefined, (draft) => {
                            draft.courses.push(data.newCourse)
                        })
                    )
                } catch (_) {}
            }
        }),
        updateCourse: builder.mutation({
            query: ({ courseId, newCourseData }) => {
                return ({
                    url: `v2/courses/${courseId}`,
                    method: "PATCH",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseData)
                })
            },
            onQueryStarted: async ({ courseId, newCourseData }, { dispatch, queryFulfilled}) => {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            Object.assign(draft, { ...draft, course: { ...newCourseData }})
                        })
                    )

                    dispatch(
                        apiSlice.util.updateQueryData('getAllCourses', undefined, (draft) => {
                            const updatedCourseIndex = draft.courses.findIndex((course) => course.id == courseId);
                            if (updatedCourseIndex !== -1) {
                                let courses = [
                                    ...draft.courses.slice(0, updatedCourseIndex),
                                    {
                                        ...draft.courses[updatedCourseIndex],
                                        ...newCourseData
                                    },
                                    ...draft.courses.slice(updatedCourseIndex + 1),
                                ];
                                
                                Object.assign(draft, {
                                    ...draft,
                                    courses
                                })
                            }
                        })
                    )
                } catch (_){}
            }
        })
    })
});

export const { 
    useGetAllCoursesQuery, 
    useGetCourseQuery, 
    useCreateCourseMutation, 
    useUpdateCourseMutation 
} = courseSelice;