import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFromProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
};

const PhForm = ({ onSubmit, children }: TFromProps) => {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PhForm;
