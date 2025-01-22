import { Button, Col, Flex } from "antd";
import { useAddAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import PhForm from "../../../components/form/PhForm";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { FieldValues, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";
import PhInput from "../../../components/form/PhInput";

const CreateAcademicFaculty = () => {
  const [addAcademicSelector] = useAddAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Academic Faculty Creating...");
    console.log(data);

    try {
      const res = await addAcademicSelector(data);
      if (res.data) {
        console.log(res.data);
        toast.success("Academic faculty created successfully", { id: toastId });
      } else {
        console.log(res?.error);
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error.message || "faild to create academic faculty");
    }
  };

  const academicFacultyZodSchema = z.object({
    name: z.string({ required_error: "name is required" }),
  });
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicFacultyZodSchema)}
        >
          <PhInput type="text" name="name" label="Name" />
          <Button htmlType="submit">Create</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
