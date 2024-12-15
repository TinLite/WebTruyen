import { UserContext } from "@/context/user-context";
import { register } from "@/repositories/authentication-repository";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function PageRegister() {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    var formData = {
        username: "",
        displayname: "",
        email: "",
        password: "",
        repeatPassword: "",
    };

    function formSubmitEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (formData.password !== formData.repeatPassword) {
            alert("Mật khẩu không khớp");
            return;
        }
        register(formData.username, formData.email, formData.displayname, formData.password).then((res) => {
            if (res.ok) {
                alert("Đăng ký thành công");
                navigate("/login");
            }
        })
    }

    useEffect(() => {
        console.log(user);
        if (user)
            navigate("/");
    }, [])

    return (
        <>
            <div className="w-screen h-screen bg-[url('/hagiang.jpg')] bg-bottom bg-no-repeat bg-cover flex flex-row-reverse">
                <div className="grid place-items-center w-full bg-[#001731AB]">
                    <div className="bg-[#001731] px-12 rounded-3xl py-6 w-full max-w-md">
                        <Typography variant="h5" className="text-center">Đăng ký</Typography>
                        <form onSubmit={formSubmitEvent} className="py-6 grid gap-2">
                            <TextField
                                label="Tên tài khoản"
                                size="small"
                                className="w-full"
                                name="name"
                                onChange={(e) => formData.username = e.target.value}
                                required
                                aria-required
                            />
                            <TextField
                                label="Tên hiển thị"
                                onChange={(e) => formData.displayname = e.target.value}
                                size="small"
                                className="w-full"
                                name="sdt"
                                required
                                aria-required
                            />
                            <TextField
                                label="Email"
                                onChange={(e) => formData.email = e.target.value}
                                type="email"
                                size="small"
                                className="w-full"
                                name="email"
                                required
                                aria-required
                            />
                            <TextField
                                label="Mật khẩu"
                                onChange={(e) => formData.password = e.target.value}
                                size="small"
                                className="w-full"
                                type="password"
                                name="password"
                                required
                                aria-required
                            />
                            <TextField
                                label="Nhập lại mật khẩu"
                                onChange={(e) => formData.repeatPassword = e.target.value}
                                size="small"
                                className="w-full"
                                type="password"
                                required
                                aria-required
                            />
                            <Button type="submit" variant="contained">Đăng ký</Button>
                            <div className="text-center">Đã có tài khoản? {''}
                                <Link to="/login" component={RouterLink}>Đăng nhập</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}