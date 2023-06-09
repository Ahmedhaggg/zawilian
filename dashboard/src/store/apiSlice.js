import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { getToken } from "../services/storage";

export const apiSlice = createApi({
    reducerPath: "apiSlice",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.REACT_APP_API_URL }),
    tagTypes: ["Api", "Student", "Course", "Grade", "UnitRevision", "CourseRevision", "Unit", "Lesson"],
    endpoints: (builder) => ({
        // getAllApi: builder.query({
        //     query: () => {
        //         return {
        //             url: "/",
        //             method: "GET",
        //             headers: {
        //                 'authorization': getToken()
        //             }
        //         }
        //     }
        // }),
        // getAllStudents: builder.query({
        //     query: () => {
        //         return {
        //             url: "students",
        //             method: "GET",
        //             headers: {
        //                 'authorization': getToken()
        //             }
        //         }
        //     },
        //     providesTags: ["Student"]
        // })
    })
});

export const { useGetAllApiQuery, useGetAllStudentsQuery } = apiSlice;