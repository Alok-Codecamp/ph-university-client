import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Divider, Form, Input, Row } from "antd";
import PhSelect from "../../../components/form/PhSelect";
import {
  bloodGroupOptions,
  genderOptions,
} from "../../../constants/user.constant";
import PhDatePicker from "../../../components/form/PhDatePicker";
import {
  useGetAcademicDepertmentQuery,
  useGetAllSemesterQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { useAddStudentMutation } from "../../../redux/features/admin/userManagement.api";
const studentDummyData = {
  id: "ST12345678",
  user: "63e57c9d7f3f5a001c7b6c9a",
  name: {
    firstName: "John",
    middleName: "William",
    lastName: "Doe",
  },
  gender: "male",
  dateOfBirth: "2000-05-15",
  bloodGroup: "A+",

  email: "john.doe@example.com",
  contactNumber: "+1234567890",
  emergencyContactNo: "+1234509876",
  presentAddress: "123 Main Street, Springfield, USA",
  permanentAddress: "456 Elm Street, Springfield, USA",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+1234561234",
    motherName: "Emma Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+1234564321",
  },
  localGuardian: {
    localGuardianName: "Michael Smith",
    localGuardianOccupation: "Lawyer",
    localGuardianContactNo: "+1234567899",
  },
  admissionSemester: "63e57c9d7f3f5a001c7b6a7f",
  academicDepertment: "63e57c9d7f3f5a001c7b6a9b",
};

// use only for development enviornment
const defaultStudent = {
  name: {
    firstName: "John",
    middleName: "William",
    lastName: "Doe",
  },
  gender: "male",

  bloodGroup: "A+",

  email: "john.doe@example.com",
  contactNumber: "+1234567890",
  emergencyContactNo: "+1234509876",
  presentAddress: "123 Main Street, Springfield, USA",
  permanentAddress: "456 Elm Street, Springfield, USA",

  guardian: {
    fatherName: "Robert Doe",
    fatherOccupation: "Engineer",
    fatherContactNo: "+1234561234",
    motherName: "Emma Doe",
    motherOccupation: "Teacher",
    motherContactNo: "+1234564321",
  },
  localGuardian: {
    localGuardianName: "Michael Smith",
    localGuardianOccupation: "Lawyer",
    localGuardianContactNo: "+1234567899",
  },
  admissionSemester: "63e57c9d7f3f5a001c7b6a7f",
  academicDepertment: "63e57c9d7f3f5a001c7b6a9b",
};

const CreateStudent = () => {
  const [addStudent, { data, error }] = useAddStudentMutation();
  console.log(data, error);
  // get academic semester
  const { data: sData, isLoading: sIsLoading } =
    useGetAllSemesterQuery(undefined);
  // get academic depertment
  const { data: DData, isLoading: DIsLoading } =
    useGetAcademicDepertmentQuery(undefined);

  const semesterOptions = sData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  const depertmentOptions = DData?.data?.map((item) => ({
    value: item._id,
    label: `${item.name}`,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    console.log(data);
    const mData = {
      password: "student123",
      student: data,
    };
    const formData = new FormData();
    formData.append("data", JSON.stringify(mData));
    formData.append("file", data.image);

    const res = await addStudent(formData);
    console.log(res);
  };
  return (
    <Row>
      <Col span={16}>
        <PhForm onSubmit={onSubmit} defaultValues={defaultStudent}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            {/* name filds  */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            {/* gender fields  */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect name="gender" label="Gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                name="bloodGroup"
                label="Blood Group"
                options={bloodGroupOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="image"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Picture">
                    <Input
                      onChange={(e) => onChange(e.target.files?.[0])}
                      type="file"
                      {...field}
                    />
                  </Form.Item>
                )}
              />
            </Col>
          </Row>

          {/* contact info  */}
          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            {/* email filds  */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput type="email" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="contactNumber"
                label="Contact Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="emergencyContactNo"
                label="Emergency ContactNo"
              />
            </Col>

            {/* presentAddress fields  */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="presentAddress"
                label="presentAddress"
              />
            </Col>
            {/* permanent Address fields  */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="permanentAddress"
                label="permanentAddress"
              />
            </Col>
          </Row>

          {/* Guardian Info. */}
          <Divider>Guardian Info.</Divider>
          <Row gutter={8}>
            {/* email filds  */}
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherName"
                label="Father Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherOccupation"
                label="Father fatherOccupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.fatherContactNo"
                label="Father fatherContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherName"
                label="Mother Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherOccupation"
                label="Mother Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="guardian.motherContactNo"
                label="Mother ContactNo"
              />
            </Col>
          </Row>

          {/*Local Guardian Info. */}
          <Divider>Local Guardian Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.localGuardianName"
                label="LocalGuardian Name"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.localGuardianOccupation"
                label="LocalGuardian Occupation"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhInput
                type="text"
                name="localGuardian.localGuardianContactNo"
                label="LocalGuardian ContactNo"
              />
            </Col>
          </Row>
          {/*Academic  Info. */}
          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                name="admissionSemester"
                label="Admission Semester"
                disabled={DIsLoading}
                options={semesterOptions}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <PhSelect
                name="academicDepertment"
                label="Academic Depertment "
                disabled={DIsLoading}
                options={depertmentOptions}
              />
            </Col>
          </Row>
          <Button htmlType="submit">submit</Button>
        </PhForm>
      </Col>
    </Row>
  );
};

export default CreateStudent;
