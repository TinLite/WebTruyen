import { Button, CssBaseline, TextField, Typography, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

export default function PageLogin() {
    return (
        <>
            <div className="w-screen h-screen bg-[url('https://wallpapercave.com/wp/wp9523242.jpg')] bg-bottom bg-no-repeat bg-cover flex flex-row-reverse">
                <div className="grid place-items-center w-full md:w-3/5 bg-[#001731AB]">
                    <div className="bg-[#001731] px-12 rounded-3xl py-6 w-full max-w-md">
                        <Typography variant="h5" className="text-center">Đăng nhập</Typography>
                        <form className="py-6 grid gap-2">
                            <TextField
                                label="Username"
                                size="small"
                                className="w-full"
                            />
                            <TextField
                                label="Password"
                                size="small"
                                className="w-full"
                                type="password"
                            />
                            <Button variant="contained">Đăng nhập</Button>
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