import { Button, Row } from "antd";
import { FieldValues, useForm, useFormContext } from "react-hook-form";
import { useLoginMutation } from "../redux/features/auth/authApi";
import { useAppDispatch } from "../redux/hooks";
import { setUser } from "../redux/features/auth/authSlice";
import { verifyToken } from "../utils/verifyToken";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { TUser } from "../redux/features/auth/authSlice";
import PhForm from "../components/form/PhForm";
import PhInput from "../components/form/PhInput";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [login, { data, error }] = useLoginMutation();

  console.log("data==>", data);
  console.log("error==>", error);

  const onSubmit = async (data: FieldValues) => {
    console.log(data);
    const toastId = toast.loading("Logging in...");
    const userInfo = {
      id: data.id,
      password: data.password,
    };
    try {
      const res = await login(userInfo).unwrap();

      const user = verifyToken(res.data.accessToken);
      const { userRole } = user as TUser;
      // console.log("from login", user);
      dispatch(setUser({ user: user, token: res.data.accessToken }));
      toast.success("Login successfully", { id: toastId });
      navigate(`/${userRole}/dashboard`);
    } catch (err: any) {
      toast.error(err.message || "something went wrong", { id: toastId });
    }
  };
  return (
    <Row justify={"center"} align={"middle"} style={{ height: "100vh" }}>
      <PhForm onSubmit={onSubmit}>
        <div style={{ marginBottom: "20px" }} className="id-input-container">
          {/* <label htmlFor="id">ID</label> */}
          <PhInput type="text" name="id" label={"Id"} />
        </div>
        <div className="password-inpt-container">
          {/* <label htmlFor="password">Password</label> */}
          <PhInput type="password" name="password" label={"Password"} />
        </div>

        <Button htmlType="submit">Login</Button>
      </PhForm>
    </Row>
  );
};

export default Login;
