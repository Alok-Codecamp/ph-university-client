import { TQueryParam, TResponseRedux, Tstudent } from "../../../types";
import { baseApi } from "../../api/baseApi";



const userManagementApi = baseApi.injectEndpoints({

    endpoints: (builder) => ({
        addStudent: builder.mutation({
            query: (data) => ({
                url: '/users/create-student',
                method: 'POST',
                body: data
            })
        }),
        getAllStudent: builder.query({
            query: (args) => {

                const params = new URLSearchParams();

                if (args) {

                    args.forEach((item: TQueryParam) => (
                        params.append(item.name, item.value as string)
                    ))
                }


                return {
                    url: "/students",
                    method: "GET",
                    params: params

                }
            },
            transformResponse: (response: TResponseRedux<Tstudent[]>) => {

                return {
                    data: response.data,
                    meta: response.meta
                }
            }
        }),
        getSingleStudent: builder.query({
            query: (args) => ({
                url: `/students/${args}`,
                method: "GET",
            })

        }),

    })
})

export const {
    useAddStudentMutation,
    useGetAllStudentQuery,
    useGetSingleStudentQuery } = userManagementApi;