import PhForm from "../../../components/form/PhForm";
import PhInput from "../../../components/form/PhInput";
import { Button, Col, Flex } from "antd";
import {
  useAddAcademicDepertmentMutation,
  useGetAcademicFacultyQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PhSelect from "../../../components/form/PhSelect";

const CreateAcademicDepertment = () => {
  const [addAcademicDepertment] = useAddAcademicDepertmentMutation();
  const res = useGetAcademicFacultyQuery(undefined);
  console.log(res);
  const academicFacultiesData: { name: string; _id: string }[] = res.data?.data;
  let academicFacultyOptions: { value: string; label: string }[] = [];

  if (academicFacultiesData) {
    academicFacultiesData.forEach((item) =>
      academicFacultyOptions.push({ value: item.name, label: item.name })
    );
  }

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Academic Depertment creating ...");
    const facultyId = academicFacultiesData.find(
      (item) => item.name === data.academicFaculty
    );

    const academicDepertmentData = {
      name: data.name,
      academicFaculty: facultyId?._id,
    };

    try {
      const res = await addAcademicDepertment(academicDepertmentData);

      if (res.data) {
        console.log(res);
        toast.success("Academic Depertment created successfully", {
          id: toastId,
        });
      }
    } catch (error: any) {
      toast.error(error.massage);
    }
  };
  return (
    <Flex justify="center" align="center">
      <Col span={10}>
        <PhForm onSubmit={onSubmit}>
          <PhInput type="text" name="name" label="Depertment name" />
          <PhSelect
            label="Academic Faculty"
            name="academicFaculty"
            options={academicFacultyOptions}
          />
          <Button htmlType="submit">Create Depertment</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepertment;
