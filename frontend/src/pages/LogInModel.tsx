import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/services";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

type LoginFormData = {
    username: string;
    password: string;
}

const LogInModel = () => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

    const navigate = useNavigate()
    const queryClient = useQueryClient()

    async function onSubmit(data: LoginFormData) {
        setIsSubmitting(true)

        try {
            const user = await login(data)
            queryClient.setQueryData(["authenticatedUser"], user)
            navigate("/")
        } catch (error) {
            console.error("Login failed:", error)
        } finally {
            setIsSubmitting(false)
        }
    }

    function handleSignUpClick() {
        navigate("/signup")
    }

    return (
        <div className="flex flex-col items-center justify-center" id="login-model">
            <form className="bg-white p-6 rounded-lg shadow-xl max-w-xl w-full mt-10" onSubmit={handleSubmit(onSubmit)}>
            <h2 className="font-bold text-xl text-center mb-4">Log In</h2>
                <div className="mb-4 space-y-2">
                    <label className="block text-gray-700 text-xl font-semibold" htmlFor="username">Username</label>
                    <input className="border border-gray-300 p-2 rounded w-full" type="text" id="username"
                        {...register("username", { required: "Provide valid username" })} />
                </div>
                {errors.username && <p className="text-red-500 text-sm text-center">{errors.username.message}</p>}
                <div className="mb-4 space-y-2">
                    <label className="block text-gray-700 text-xl font-semibold" htmlFor="password">Password</label>
                    <input className="border border-gray-300 p-2 rounded w-full" type="password" id="password"
                        {...register("password", {
                            required: "Provide valid password",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            maxLength: { value: 20, message: "Password must be at most 20 characters long" }
                        })} />
                </div>
                {errors.password && <p className="text-red-500 text-sm text-center">{errors.password.message}</p>}
                <button className="cursor-pointer bg-blue-500 text-white px-3 py-2 rounded" type="submit" disabled={isSubmitting}>Log In</button>
                <p className="text-center">Don't have an account? <span className="cursor-pointer text-blue-500 hover:underline" onClick={handleSignUpClick}>Sign up</span></p>
            </form>

        </div>
    )
}

export default LogInModel;
