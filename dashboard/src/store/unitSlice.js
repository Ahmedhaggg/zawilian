import { apiSlice } from "./apiSlice";
import { getToken } from "../services/storage";

export const unitSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUnit: builder.query({
            query: ({ courseId, unitId }) => {
                return {
                    url: `v2/courses/${courseId}/units/${unitId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
        }),
        createUnit: builder.mutation({
            query: ({ courseId, newUnit }) => {
                return ({
                    url: `v2/courses/${courseId}/units`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newUnit)
                })
            },
            async onQueryStarted({ courseId, _newUnit }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data)
                        return;
                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            draft.course.units.push({
                                id: data.newUnit.id,
                                name: data.newUnit.name,
                                arrangement: data.newUnit.arrangement
                            })
                        })
                    )
                } catch (_) {}
            }
        }),
        updateUnit: builder.mutation({
            query: ({ courseId, unitId, newUnitData }) => {
                return ({
                    method: "PATCH",
                    url: `v2/courses/${courseId}/units/${unitId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newUnitData)
                })
            },
            async onQueryStarted({ courseId, unitId, newUnitData }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
 
                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            const updatedUnitIndex = draft.course.units.findIndex((unit) => unit.id === parseInt(unitId));
                            if (updatedUnitIndex !== -1) {
                                let units = [
                                    ...draft.course.units.slice(0, updatedUnitIndex),
                                    {
                                      ...draft.course.units[updatedUnitIndex],
                                      name: newUnitData.name,
                                    },
                                    ...draft.course.units.slice(updatedUnitIndex + 1),
                                ];
                                
                                Object.assign(draft, {
                                    ...draft,
                                    course: {
                                        ...draft.course,
                                        units
                                    },
                                })
                            }
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            Object.assign(draft, {
                                ...draft,
                                unit: {
                                    ...draft.unit,
                                    name: newUnitData.name,
                                    description: newUnitData.description
                                },
                            })
                        })
                    )

                } catch (error) {console.log(error)}
            }
        }),
        deleteUnit: builder.mutation({
            query: ({ courseId, unitId }) => {
                return ({
                    method: "DELETE",
                    url: `v2/courses/${courseId}/units/${unitId}`,
                    headers: {
                        'authorization': getToken()
                    },
                })
            },
            async onQueryStarted({ courseId, unitId }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;

                    dispatch(
                        apiSlice.util.updateQueryData('getCourse', courseId, (draft) => {
                            let units = draft.course.units.filter(unit => unit.id !== unitId)
                            Object.assign(draft, {
                                ...draft,
                                course: {
                                    ...draft.course,
                                    units
                                }
                            })
                        })
                    )
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, draft => {
                            delete draft.unit;
                        })
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        }),
        addExamToUnit: builder.mutation({
            query: ({ courseId, unitId, newExamData }) => {
                return ({
                    url: `v2/courses/${courseId}/units/${unitId}/exam`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newExamData)
                })
            },
            async onQueryStarted({ courseId, unitId, newExamData}, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;

                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            Object.assign(draft, {
                                ...draft,
                                unit: {
                                    ...draft.unit,
                                    exam: newExamData
                                },
                            })
                        })
                    )
                } catch (e) {
                    console.log(e)
                }
            }
        }),
        getUnitExam: builder.query({
            query: ({ courseId , unitId }) => {
                return ({
                    url: `v2/courses/${courseId}/units/${unitId}/exam`,
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
    useGetUnitQuery, 
    useCreateUnitMutation,
    useUpdateUnitMutation, 
    useDeleteUnitMutation,
    useAddExamToUnitMutation,
    useGetUnitExamQuery
} = unitSlice;


