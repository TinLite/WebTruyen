import { UserContext } from "@/context/user-context";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useContext, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";

export default function PageRegister() {

    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();
    var formData = {
        email: "",
        password: "",
    };

    function formSubmitEvent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        // login(formData.email, formData.password).then(() => {
        //     getProfile().then(setUser)
        // })
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
                                label="Tên của bạn"
                                size="small"
                                className="w-full"
                                name="name"
                                required
                                aria-required
                            />
                            <TextField
                                label="Email"
                                type="email"
                                size="small"
                                className="w-full"
                                name="email"
                                required
                                aria-required
                            />
                            <TextField
                                label="Số điện thoại"
                                size="small"
                                className="w-full"
                                name="sdt"
                                required
                                aria-required
                            />
                            <TextField
                                label="Mật khẩu"
                                size="small"
                                className="w-full"
                                type="password"
                                name="password"
                                required
                                aria-required
                            />
                            <TextField
                                label="Nhập lại mật khẩu"
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