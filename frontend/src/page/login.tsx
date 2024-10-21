import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';


const Login = () => {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm<{ name: string; password: string; }>();
    const [loading, setLoading] = useState(false);

    const onSubmit: SubmitHandler<{ name: string; password: string; }> = async (data) => {
        setLoading(true);
        try {
            navigate('/');
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className='h-screen w-screen bg-blue-950 bg-opacity-25 backdrop-blur-sm grid place-items-center'>
            <div className="justify-center px-10 py-2 w-full max-w-sm bg-[#001731] rounded-xl shadow-2xl">
                <h1 className="text-center text-2xl leading-8 font-normal tracking-tight text-[#F0FCFF] mt-4 mb-6">Đăng nhập</h1>
                <div>
                    <form className="space-y-3" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent text-white"
                                placeholder="Tên"
                                {...register('name', { required: true, minLength: 3 })}
                            />
                            {errors.name && <p className="text-white text-sm mt-2" hidden>Tên không được để trống và phải có ít nhất 3 ký tự</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="password"
                                id="password"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent text-white"
                                placeholder="Mật khẩu"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            {errors.password && <p className="text-white text-sm mt-2" hidden>Mật khẩu phải có ít nhất 6 ký tự</p>}
                        </div>
                        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200" disabled={loading}>
                            {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                        </button>
                        <span className='text-white text-sm mt-2'>Nếu bạn chưa có tài khoản </span><a href="/register" className=" w-full py-3 text-white rounded-lg transition duration-200">Đăng ký</a>:
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
