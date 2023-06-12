import { getToken } from "../services/storage";
import { apiSlice } from "./apiSlice";
export const unitRevisionSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getUnitRevision: builder.query({
            query: ({ unitId, revisionId }) => {
                return {
                    url: `v2/units/${unitId}/revisions/${revisionId}`,
                    method: "GET",
                    headers: {
                        'authorization': getToken()
                    }
                }
            },
        }),
        createUnitRevision: builder.mutation({
            query: ({ unitId, newUnitRevisionData }) => {
                return ({
                    url: `v2/units/${unitId}/revisions`,
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newUnitRevisionData)
                })
            },
            async onQueryStarted({ courseId, unitId }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data)
                        return;
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            let { id, name, arrangement, type } = data.newRevision;
                            draft.unit.sections.push({ id, name, arrangement, type })
                        })
                    )
                } catch (_) {}
            }
        }),
        updateUnitRevision: builder.mutation({
            query: ({ unitId, revisionId, newRevisionData }) => {
                return ({
                    method: "PATCH",
                    url: `v2/units/${unitId}/revisions/${revisionId}`,
                    headers: {
                        'Content-Type': 'application/json',
                        'authorization': getToken()
                    },
                    body: JSON.stringify(newRevisionData)
                })
            },
            async onQueryStarted({ courseId, unitId, revisionId, newRevisionData }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
 
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            const updatedRevisionIndex = draft.unit.sections.findIndex((section) => section.id == revisionId);
                            if (updatedRevisionIndex !== -1) {
                                let sections = [
                                    ...draft.unit.sections.slice(0, updatedRevisionIndex),
                                    {
                                      ...draft.unit.sections[updatedRevisionIndex],
                                      name: newRevisionData.name,
                                    },
                                    ...draft.unit.sections.slice(updatedRevisionIndex + 1),
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
                        apiSlice.util.updateQueryData('getUnitRevision', { unitId, revisionId }, (draft) => {
                            Object.assign(draft, {
                                ...draft,
                                revision: {
                                    ...draft.revision,
                                    name: newRevisionData.name,
                                    description: newRevisionData.description,
                                    video: newRevisionData.video
                                },
                            })
                        })
                    )

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        deleteUnitRevision: builder.mutation({
            query: ({ unitId, revisionId }) => {
                return ({
                    method: "DELETE",
                    url: `v2/units/${unitId}/revisions/${revisionId}`,
                    headers: {
                        'authorization': getToken()
                    }
                })
            },
            async onQueryStarted({ courseId, unitId, revisionId }, { dispatch, queryFulfilled }) {
                try {
                    let { data } = await queryFulfilled;
                    if (!data.success)
                        return;
 
                    dispatch(
                        apiSlice.util.updateQueryData('getUnit', { courseId, unitId }, (draft) => {
                            let sections = draft.unit.sections.filter(section => section.id !== revisionId);
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
                        apiSlice.util.updateQueryData('getUnitRevision', { unitId, revisionId }, (draft) => {
                            delete draft.revision;
                        })
                    )

                } catch (error) {
                    console.log(error)
                }
            }
        }),
        getUnitRevisionExam: builder.query({
            query: ({ unitId , revisionId }) => {
                return ({
                    url: `v2/units/${unitId}/revisions/${revisionId}/exam`,
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
    useGetUnitRevisionQuery, 
    useCreateUnitRevisionMutation, 
    useUpdateUnitRevisionMutation, 
    useDeleteUnitRevisionMutation,
    useGetUnitRevisionExamQuery,
} = unitRevisionSlice;