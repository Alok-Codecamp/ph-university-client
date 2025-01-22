import { Button, Table, TableColumnsType, TableProps } from "antd";
import { TTableData } from "./AcademicSemester";
import { useGetAcademicFacultyQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { TQueryParam } from "../../../types";

const AcademicFaculty = () => {
  const [params, setParams] = useState<TQueryParam[] | undefined>(undefined);
  const { data: facultyData, isFetching } = useGetAcademicFacultyQuery(params);

  const tableData = facultyData?.data?.map(({ name }: TQueryParam) => ({
    name,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
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

export default AcademicFaculty;
