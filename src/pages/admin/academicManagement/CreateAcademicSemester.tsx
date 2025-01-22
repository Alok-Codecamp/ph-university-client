import { Button, Col, Flex } from "antd";
import PhForm from "../../../components/form/PhForm";
import { FieldValues, SubmitHandler } from "react-hook-form";
import PhSelect from "../../../components/form/PhSelect";
import { semesterOptions } from "../../../constants/academicSemester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicSemesterSchema";
import { useAddAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";

// assign current year;
const currentYear = new Date().getFullYear();

// assign year options for year select field
const yearOptions = [0, 1, 2, 3, 4].map((number) => ({
  value: String(currentYear + number),
  label: String(currentYear + number),
}));

const CreateAcademicSemester = () => {
  // get mutation
  const [addAcademicSelester] = useAddAcademicSemesterMutation();

  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("semester creating...");
    const name = semesterOptions[Number(data.name) - 1]?.label;
    const code = data?.name;
    const semesterData = {
      name,
      code,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = await addAcademicSelester(semesterData);

      if (res.data) {
        console.log(res.data);
        toast.success("created success", { id: toastId });
      } else {
        toast.error(res?.error?.data?.message, { id: toastId });
      }
    } catch (error: any) {
      toast.error(error?.message || "faild to create academic semester");
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PhForm
          onSubmit={onsubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <PhSelect label="Name" name="name" options={semesterOptions} />
          <PhSelect label="Year" name="year" options={yearOptions} />
          <PhSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <PhSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Create</Button>
        </PhForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
