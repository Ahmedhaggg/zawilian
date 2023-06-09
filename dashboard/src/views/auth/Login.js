import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from "../../store/authSlice"

export default function Login() {
    let dispatch = useDispatch();
    let { token, loginError } = useSelector(state => state.auth);

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    let submitHandler = (values) => {
        dispatch(login(values));
    }

    return <div className="d-flex align-items-center" style={{ minHeight: "100vh" }}>
        <div className="w-100">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-6 offset-md-3">
                        <p className="fs-1 text-main-color text-center">login</p>
                        <form onSubmit={handleSubmit(submitHandler)}>
                            <input className={`form-control form-control-lg mb-3 ${errors.email ? 'border-danger' : ''}`} type="email" name="email"
                                placeholder="email" aria-label="email"
                                {...register("email", { required: true })}
                            />
                            <input className={`form-control form-control-lg mb-3 ${errors.password ? 'border-danger' : ''}`} type="password" name="password"
                                placeholder="password" aria-label="password"
                                {...register("password", { required: true })}
                            />
                            {loginError &&
                                <div className="alert alert-danger mb-3" role="alert">
                                    {loginError}
                                </div>
                            }
                            <div className="text-center">
                                <button type="submit" className="btn btn-primary btn-lg w-25">login</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        {token && <Navigate to="/"></Navigate>}
    </div>;
}
