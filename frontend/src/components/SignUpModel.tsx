
import { useForm } from "react-hook-form"

type SignUpFormData = {
    name: string;
    email: string;
    password: string;
}

const { register, handleSubmit, formState: { errors } } = useForm<SignUpFormData>()

const SignUpModel = () => {
    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name"
                    {...register("name", {required: "Provide valid name"})} />
                </div>
                {errors.name && <p>{errors.name.message}</p>}
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email"
                    {...register("email", {required: "Provide valid email"})}    />
                </div>
                {errors.email && <p>{errors.email.message}</p>}
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="password" id="password" name="password"
                    {...register("password", {required: "Provide valid password"})} />
                </div>
                {errors.password && <p>{errors.password.message}</p>}
                <button type="submit">Sign Up</button>
            </form>
        </div>
    )
}

export default SignUpModel
