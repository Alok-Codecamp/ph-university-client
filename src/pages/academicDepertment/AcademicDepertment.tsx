import { useState } from "react";
import { TQueryParam } from "../../types";
import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TTableData } from "../admin/academicManagement/AcademicSemester";
import { useGetAcademicDepertmentQuery } from "../../redux/features/admin/academicManagement.api";

const AcademicDepertment = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: facultyData, isFetching } =
    useGetAcademicDepertmentQuery(params);

  const tableData = facultyData?.data?.map(({ name }: TQueryParam) => ({
    name,
  }));
  console.log(tableData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "12734",
      showSorterTooltip: { target: "full-header" },
      filters: [
        {
          text: "Faculty of Web Development",
          value: "Faculty of Web Development",
        },
      ],
    },

    {
      title: "Acton",
      key: "x",
      render: () => {
        return (
          <div>
            <Button>update</Button>
          </div>
        );
      },
    },
  ];
  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    if (extra.action === "filter") {
      const queryParams: TQueryParam[] = [];
      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );
      setParams(queryParams);
    }
  };
  return (
    <div>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
      />
    </div>
  );
};

export default AcademicDepertment;
