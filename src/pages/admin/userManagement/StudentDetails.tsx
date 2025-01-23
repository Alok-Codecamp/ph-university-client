import { useParams } from "react-router-dom";
import { useGetSingleStudentQuery } from "../../../redux/features/admin/userManagement.api";
import { Button, Space, Table, TableColumnsType } from "antd";
import { TTableData } from "./Student";

const StudentDetails = () => {
  const { studentId } = useParams();

  const { data: student, isFetching } = useGetSingleStudentQuery(studentId);
  const studentData = student?.data;
  console.log(studentData);
  let tableData: any = [];
  if (studentData) {
    tableData = [
      {
        _id: studentData?._id,
        id: studentData?.id,
        name: `${studentData?.name?.firstName} ${studentData?.name?.middleName} ${studentData?.name?.lastName}`,
        key: studentData?.id,
        email: studentData?.email,
      },
    ];
  }
  const columns: TableColumnsType<any> = [
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
        return (
          <Space>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  return (
    <Table
      loading={isFetching}
      columns={columns}
      dataSource={tableData}
      pagination={false}
    />
  );
};
export default StudentDetails;
