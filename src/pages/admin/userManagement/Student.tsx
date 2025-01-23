import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { useState } from "react";
import { TQueryParam } from "../../../types";
import { useGetAllStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Link } from "react-router-dom";

export type TTableData = {
  _id: string;
  id: string;
  name: string;
  email: string;
};

const Student = () => {
  const [params, setParams] = useState<TQueryParam[]>([]);
  const [page, setPage] = useState(1);
  const { data: studentData, isFetching } = useGetAllStudentQuery([
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);

  console.log(studentData);

  const metaData = studentData?.meta;
  const tableData = studentData?.data?.map(({ _id, id, name, email }) => ({
    _id: _id,
    id,
    name: `${name.firstName} ${name.middleName} ${name.lastName}`,
    key: id,
    email,
  }));
  console.log(tableData);
  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "id",
      showSorterTooltip: { target: "full-header" },
    },
    {
      title: "Roll",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },
    {
      title: "Acton",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/student-data/${item._id}`}>
              <Button>Details</Button>
            </Link>
            <Button>update</Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
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
      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );
      setParams(queryParams);
      console.log(params);
    }
  };

  return (
    <>
      <Table
        loading={isFetching}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        current={page}
        total={metaData?.total}
        pageSize={metaData?.limit}
        onChange={(value) => setPage(value)}
      />
    </>
  );
};

export default Student;
