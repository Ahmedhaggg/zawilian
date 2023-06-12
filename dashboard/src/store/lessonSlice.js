import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice";

export const lessonSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getLesson: builder.query({
            query: ({ unitId, lessonId }) => {
                return {
                    url: `v2/units/${unitId}/lessons/${lessonId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            }
        }),
        createLesson: builder.mutation({
            query: ({ courseId, unitId, newLessonData }) => {
                return ({
                    url: `v2/units/${unitId}/lessons`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newLessonData)
                })
            },
            async onQueryStarted({ courseId, unitId }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data)
                        return;
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            let { id, name, arrangement, type } = data.newLesson;
                            draft.unit.sections.push({ id, name, arrangement, type })
                        })
                    )
                } catch (_) {}
            }
        }),
        updateLesson: builder.mutation({
            query: ({ unitId, lessonId, newLessonData }) => {
                return ({
                    method: "PATCH",
                    url: `v2/units/${unitId}/lessons/${lessonId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newLessonData)
                })
            },
            async onQueryStarted({ courseId, unitId, lessonId, newLessonData }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
 
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            const updatedLessonIndex = draft.unit.sections.findIndex((section) => section.id == lessonId);
                            if (updatedLessonIndex !== -1) {
                                let sections = [
                                    ...draft.unit.sections.slice(0, updatedLessonIndex),
                                    {
                                      ...draft.unit.sections[updatedLessonIndex],
                                      name: newLessonData.name,
                                    },
                                    ...draft.unit.sections.slice(updatedLessonIndex + 1),
                                ];
                                
                                Object.assign(draft, {
                                    ...draft,
                                    unit: {
                                        ...draft.unit,
                                        sections
                                    },
                                })
                            }
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData('getLesson', { unitId, lessonId }, (draft) => {
                            Object.assign(draft, {
                                ...draft,
                                lesson: {
                                    ...draft.lesson,
                                    name: newLessonData.name,
                                    description: newLessonData.description,
                                    video: newLessonData.video
                                },
                            })
                        })
                    )

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteLesson: builder.mutation({
            query: ({ unitId, lessonId }) => {
                return ({
                    method: "DELETE",
                    url: `v2/units/${unitId}/lessons/${lessonId}`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
            async onQueryStarted({ courseId, unitId, lessonId }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
 
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            let sections = draft.unit.sections.filter(section => section.id !== lessonId);
                            Object.assign(draft, {
                                ...draft,
                                unit: {
                                    ...draft.unit,
                                    sections
                                }
                            })
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData('getLesson', { unitId, lessonId }, (draft) => {
                            delete draft.lesson;
                        })
                    )

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getLessonExam: builder.query({
            query: ({ unitId, lessonId }) => {
                return ({
                    url: `v2/units/${unitId}/lessons/${lessonId}/exam`,
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
    useGetUnitLessonsQuery, 
    useGetLessonQuery, 
    useCreateLessonMutation, 
    useUpdateLessonMutation,
    useGetLessonExamQuery,
    useDeleteLessonMutation
 } = lessonSlice;