import { UserContext } from "@/context/user-context";
import { login } from "@/repositories/authentication-repository";
import { getProfile } from "@/repositories/user-repository";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function PageLogin() {
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    var formData = {
        email: "",
        password: "",
    };

    function formSubmitEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        login(formData.email, formData.password).then(() => {
            getProfile().then(setUser)
        })
    }

    useEffect(() => {
        if (user)
            navigate("/");
    }, [])

    return (
        <>
            <div className="w-screen h-screen bg-[url('https://wallpapercave.com/wp/wp9523242.jpg')] bg-bottom bg-no-repeat bg-cover flex flex-row-reverse">
                <div className="grid place-items-center w-full md:w-3/5 bg-[#001731AB]">
                    <div className="bg-[#001731] px-12 rounded-3xl py-6 w-full max-w-md">
                        <Typography variant="h5" className="text-center">Đăng nhập</Typography>
                        <form onSubmit={formSubmitEvent} className="py-6 grid gap-2">
                            <TextField
                                label="Email"
                                size="small"
                                className="w-full"
                                type="email"
                                onChange={(e) => {
                                    formData.email = e.currentTarget.value;
                                }}
                                required
                            />
                            <TextField
                                label="Password"
                                size="small"
                                className="w-full"
                                type="password"
                                onChange={(e) => {
                                    formData.password = e.currentTarget.value;
                                }}
                                required
                            />
                            <Button type="submit" variant="contained">Đăng nhập</Button>
                            <div className="text-center">Bạn chưa có tài khoản? {''}
                                <Link to="/register" component={RouterLink}>Đăng ký ngay</Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}