import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice";
export const courseRevisionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        // endpoint not matched
        // getCourseRevisions: builder.query({
        //     query: (courseId) => {
        //         return {
        //             url: `courses/${courseId}/revisions`,
        //             method: "GET",
        //             headers: {
        //                 'authorization': getToken()
        //             }
        //         }
        //     }
        // }),
        getCourseRevision: builder.query({
            query: ({ courseId, revisionId }) => {
                return {
                    url: `v2/courses/${courseId}/revisions/${revisionId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        createCourseRevision: builder.mutation({
            query: ({ courseId, newCourseRevisionData }) => {
                return ({
                    url: `v2/courses/${courseId}/revisions`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseRevisionData)
                })
            },
            async onQueryStarted({ courseId, newcourseRevisionData }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            draft.course.courseRevisions.push({
                                id: data.newRevision,
                                name: data.newRevision.name,
                                arrangement: data.newRevision.arrangement
                            })
                        })
                    )
                } catch (e) {
                }
            }
        }), 
        updateCourseRevision: builder.mutation({
            query: ({ courseId, revisionId, newCourseRevisionData }) => {
                return ({
                    method: "PATCH",
                    url: `v2/courses/${courseId}/revisions/${revisionId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newCourseRevisionData)
                })
            },
            async onQueryStarted({ courseId, revisionId, newCourseRevisionData }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
 
                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            const updatedCourseRevisionIndex = draft.course.courseRevisions.findIndex((courseRevision) => courseRevision.id == revisionId);
                            if (updatedCourseRevisionIndex !== -1) {
                                let courseRevisions = [
                                    ...draft.course.courseRevisions.slice(0, updatedCourseRevisionIndex),
                                    {
                                      ...draft.course.courseRevisions[updatedCourseRevisionIndex],
                                      name: newCourseRevisionData.name,
                                    },
                                    ...draft.course.courseRevisions.slice(updatedCourseRevisionIndex + 1),
                                ];
                                
                                Object.assign(draft, {
                                    ...draft,
                                    course: {
                                        ...draft.course,
                                        courseRevisions
                                    },
                                })
                            }
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData('getcourseRevision', { courseId, revisionId }, (draft) => {
                            Object.assign(draft, {
                                ...draft,
                                courseRevision: {
                                    ...draft.courseRevision,
                                    name: newCourseRevisionData.name,
                                    description: newCourseRevisionData.description,
                                    video: newCourseRevisionData.video
                                },
                            })
                        })
                    )

                } catch (_) {}
            }
        }),
        deleteCourseRevision: builder.mutation({
            query: ({ courseId, revisionId }) => {
                return ({ 
                    method: "DELETE",
                    url: `v2/courses/${courseId}/revisions/${revisionId}`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
            async onQueryStarted({ courseId, revisionId }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;

                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            let courseRevisions = draft.course.courseRevisions.filter(revision => revision.id !== revisionId)
                            Object.assign(draft, {
                                ...draft,
                                course: {
                                    ...draft.course,
                                    courseRevisions
                                }
                            })
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData('getCourseRevision', { courseId, revisionId }, draft => {
                            delete draft.revision;
                        })
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        }),
        getCourseRevisionExam: builder.query({
            query: ({ courseId, revisionId }) => {
                return ({
                    url: `v2/courses/${courseId}/revisions/${revisionId}/exam`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
        })
    })
});

export const { 
    useCreateCourseRevisionMutation, 
    useUpdateCourseRevisionMutation,
    useDeleteCourseRevisionMutation,
    useGetCourseRevisionQuery,
    useGetCourseRevisionExamQuery
} = courseRevisionSlice;