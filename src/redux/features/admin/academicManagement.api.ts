import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicMangementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-emester",
                method: "POST",
                body: data,
            }),
        }),
        getAllSemester: builder.query({
            query: (args) => {

                const params = new URLSearchParams();

                if (args) {

                    args.forEach((item: TQueryParam) => (
                        params.append(item.name, item.value as string)
                    ))
                }


                return {
                    url: "/academic-semesters",
                    method: "GET",
                    params: params

                }
            },
            transformResponse: (response: TResponseRedux<TAcademicSemester[]>) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),



        addAcademicFaculty: builder.mutation({
            query: (data) => ({
                url: "/academic-faculties/create-academic-faculty",
                method: "POST",
                body: data,
            }),
        }),
        getAcademicFaculty: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {

                    args.forEach((item: TQueryParam) => (
                        params.append(item.name, item.value as string)

                    ))
                    console.log(params)
                }
                return {

                    url: "/academic-faculties",
                    method: "GET",
                    params: params,

                }
            },
        }),

        addAcademicDepertment: builder.mutation({
            query: (data) => ({
                url: "/academic-depertments/create-academic-depertment",
                method: "POST",
                body: data,
            })
        }),
        getAcademicDepertment: builder.query({
            query: (args) => {
                const params = new URLSearchParams();

                if (args) {

                    args.forEach((item: TQueryParam) => (
                        params.append(item.name, item.value as string)

                    ))

                }
                return {

                    url: "/academic-depertments",
                    method: "GET",
                    params: params,

                }
            },
        }),

    }),
})


export const {
    useGetAllSemesterQuery,
    useAddAcademicSemesterMutation,
    useAddAcademicFacultyMutation,
    useGetAcademicFacultyQuery,
    useAddAcademicDepertmentMutation,
    useGetAcademicDepertmentQuery
} = academicMangementApi;