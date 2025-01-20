import { TAcademicSemester } from "../../../types/academicManagement.type";
import { TQueryParam, TResponseRedux } from "../../../types/global";
import { baseApi } from "../../api/baseApi";

const academicMangementApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
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
        addAcademicSemester: builder.mutation({
            query: (data) => ({
                url: "/academic-semesters/create-academic-emester",
                method: "POST",
                body: data,
            }),
        }),
    }),
})


export const { useGetAllSemesterQuery, useAddAcademicSemesterMutation } = academicMangementApi;