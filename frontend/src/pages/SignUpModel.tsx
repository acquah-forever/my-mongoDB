import { useState } from "react"
import { useForm } from "react-hook-form"
import { signUp } from "../services/services"

type SignUpFormData = {
    username: string;
    email: string;
    password: string;
}


const SignUpModel = () => {

    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)

    const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>()

    async function onSubmit(data: SignUpFormData) {
        try {
            await signUp(data)
        } catch (error) {
            console.error("Sign-up failed:", error)
        }

        setIsSubmitting(true)
    }


    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="username">Username</label>
                    <input type="text" id="username" name="username"
                        {...register("username", { required: "Provide valid username" })} />
                </div>
                {errors.username && <p>{errors.username.message}</p>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email"
                        {...register("email", { required: "Provide valid email" })} />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
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
                <button type="submit" disabled={isSubmitting}>Sign Up</button>
            </form>

            <p>Already have an account? <a href="/login">Log in</a></p>
        </div>
    )
}

export default SignUpModel
