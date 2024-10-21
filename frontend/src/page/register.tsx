//import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

const Register = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = useState(false);

    const onSubmit = async () => {
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
                <h1 className='className="text-center text-2xl leading-8 font-normal tracking-tight text-[#F0FCFF] mt-4 mb-6'>Đăng ký</h1>
                <div>
                    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent text-white"
                                placeholder="Tên"
                                {...register('name', { required: true })}
                            />
                            {errors.name && <p className="text-white text-sm mt-2" hidden>Tên không được để trống</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                id="email"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent text-white"
                                placeholder="Email"
                                {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
                            />
                            {errors.email && <p className="text-white text-sm mt-2" hidden>Email không đúng định dạng</p>}
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent text-white"
                                placeholder="Số Điện Thoại"
                                {...register('telephone', { required: true })}
                            />
                            {errors.name && <p className="text-white text-sm mt-2" hidden>Sđt không được để trống</p>}
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
                        <div className="form-group">
                            <input
                                type="text"
                                id="name"
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 bg-transparent text-white"
                                placeholder="Nhập lại mật khẩu"
                                {...register('password', { required: true, minLength: 6 })}
                            />
                            {errors.password && <p className="text-white text-sm mt-2" hidden>Phải nhập lại mật khẩu</p>}
                        </div>
                        <button type="submit" className="w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200">
                            {loading ? 'Đang xử lý...' : 'Đăng ký'}
                        </button>
                        <span className='text-white text-sm mt-2'>Nếu bạn đã có tài khoản </span><a href="/login" className=" w-full py-3 text-white rounded-lg transition duration-200">Đăng nhập</a>:
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
