import React, { useState, useEffect } from 'react'
import { InputForm, Button, Loading } from '../../components'
import { useLocation, useNavigate } from 'react-router-dom'
import * as actions from '../../store/actions'
import { useDispatch, useSelector } from 'react-redux'
import Swal from 'sweetalert2'
import validate from '../../ultils/Common/validateFields'
import { apiForgotPassword, apiRegister } from '../../services'

const Login = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { isLoggedIn, msg, update } = useSelector(state => state.auth)
    const [isRegister, setIsRegister] = useState(location.state?.flag)
    const [invalidFields, setInvalidFields] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [isForgot, setIsForgot] = useState(false)
    const [payload, setPayload] = useState({
        email: '',
        phone: '',
        password: '',
        name: '',
    })
    const [email, setEmail] = useState('')
    useEffect(() => {
        setIsRegister(location.state?.flag)
    }, [location.state?.flag])

    useEffect(() => {
        setIsLoading(false)
        isLoggedIn && navigate('/')
    }, [isLoggedIn])

    useEffect(() => {
        setIsLoading(false)
        msg && Swal.fire('Oops !', msg, 'error')
    }, [msg, update])

    const handleForgotPassword = async () => {
        const response = await apiForgotPassword({ email })
        Swal.fire('Almost...', response.data.mes, 'info').then(() => {
            setIsForgot(false)
        })
    }

    const handleSubmit = async () => {
        let finalPayload = isRegister ? {
            phone: payload.phone,
            password: payload.password,
            name: payload.name,
            email: payload.email,
        } : {
            phone: payload.phone,
            password: payload.password
        }
        let invalids = validate(finalPayload, setInvalidFields)
        if (invalids === 0) {
            setIsLoading(true)
            if (isRegister) {
                const response = await apiRegister(payload)
                Swal.fire('Well~', response.data.msg, 'info').then(() => { setIsLoading(false) })
            } else {
                dispatch(actions.login(payload))
            }
        }
    }

    return (
        <div className='w-full flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-white to-indigo-100 py-8'>
            {isLoading && <div className='fixed top-0 right-0 left-0 bottom-0 bg-overlay-70 flex items-center justify-center z-50 backdrop-blur-sm'>
                <Loading />
            </div>}
            {isForgot && <div onClick={() => setIsForgot(false)} className='fixed top-0 right-0 left-0 bottom-0 bg-overlay-70 flex items-center justify-center z-50 backdrop-blur-sm animate-fade-in'>
                <div onClick={e => e.stopPropagation()} className='w-[600px] bg-white rounded-xl p-6 flex flex-col gap-4 shadow-2xl animate-scale-in'>
                    <span className='font-bold text-xl gradient-text'>Nhập email của bạn:</span>
                    <input type="text"
                        className='p-3 border-2 border-blue-200 rounded-lg outline-none placeholder:text-sm placeholder:italic focus:border-blue-400 transition-all duration-300'
                        placeholder='Nhập email để có thể xác thực đổi mật khẩu'
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <div className='flex justify-end gap-2'>
                        <button
                            type='button'
                            className='px-4 py-2 text-gray-600 font-medium bg-gray-200 rounded-lg hover:bg-gray-300 transition-all duration-300'
                            onClick={() => setIsForgot(false)}
                        >
                            Hủy
                        </button>
                        <button
                            type='button'
                            className='px-6 py-2 text-white font-bold bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg btn-primary shadow-lg'
                            onClick={handleForgotPassword}
                        >
                            Xác nhận
                        </button>
                    </div>
                </div>
            </div>}
            <div className='bg-white w-[600px] p-10 pb-12 rounded-2xl shadow-2xl animate-fade-in-up border border-gray-100'>
                <h3 className='font-bold text-3xl mb-6 text-[#B53518] text-center'>{isRegister ? 'Đăng ký tài khoản' : 'Đăng nhập'}</h3>
                <div className='w-full flex flex-col gap-5'>
                    {isRegister && <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} label={'HỌ TÊN'}
                        value={payload.name}
                        setValue={setPayload}
                        keyPayload={'name'}
                    />}
                    {isRegister && <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields} label={'EMAIL'}
                        value={payload.email}
                        setValue={setPayload}
                        keyPayload={'email'}
                    />}
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'SỐ ĐIỆN THOẠI'}
                        value={payload.phone}
                        setValue={setPayload}
                        keyPayload={'phone'}
                    />
                    <InputForm
                        setInvalidFields={setInvalidFields}
                        invalidFields={invalidFields}
                        label={'MẬT KHẨU'}
                        value={payload.password}
                        setValue={setPayload}
                        keyPayload={'password'}
                        type='password'
                    />
                    <Button
                        text={isRegister ? 'Đăng ký ngay' : 'Đăng nhập'}
                        bgColor='bg-gradient-to-r from-[#FBB91C] via-[#FF5B35] to-[#E74F2C]'
                        textColor='text-white'
                        fullWidth
                        onClick={handleSubmit}
                    />
                </div>
                <div className='mt-8 flex items-center justify-between'>
                    {isRegister
                        ? <small className='text-gray-600'>Bạn đã có tài khoản? <span
                            onClick={() => {
                                setIsRegister(false)
                                setPayload({
                                    phone: '',
                                    password: '',
                                    name: ''
                                })
                            }}
                            className='text-blue-600 hover:text-blue-700 font-semibold cursor-pointer transition-colors duration-300 hover:underline'
                        >
                            Đăng nhập ngay
                        </span></small>
                        : <>
                            <small onClick={() => setIsForgot(true)} className='text-blue-600 hover:text-red-500 cursor-pointer font-medium transition-colors duration-300' >Quên mật khẩu?</small>
                            <small
                                onClick={() => {
                                    setIsRegister(true)
                                    setPayload({
                                        phone: '',
                                        password: '',
                                        name: ''
                                    })
                                }}
                                className='text-blue-600 hover:text-red-500 cursor-pointer font-medium transition-colors duration-300'
                            >
                                Tạo tài khoản mới
                            </small>
                        </>}
                </div>

            </div>
        </div>
    )
}

export default Login