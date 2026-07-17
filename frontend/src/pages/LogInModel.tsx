import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../services/services";

type LoginFormData = {
    username: string;
    password: string;
}

const LogInModel = () => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>()

    async function onSubmit(data: LoginFormData) {
        try {
            await login(data)
        } catch (error) {
            console.error("Login failed:", error)
        }
        setIsSubmitting(true)

    }

    return (
        <div id="login-model">
            <h2>Log In</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"
                        {...register("username", { required: "Provide valid username" })} />
                </div>
                {errors.username && <p>{errors.username.message}</p>}
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"
                        {...register("password", {
                            required: "Provide valid password",
                            minLength: { value: 6, message: "Password must be at least 6 characters long" },
                            maxLength: { value: 20, message: "Password must be at most 20 characters long" }
                        })} />
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit" disabled={isSubmitting}>Log In</button>
            </form>

            <p>Don't have an account? <a href="/signup">Sign up</a></p>
        </div>
    )
}  

export default LogInModel;