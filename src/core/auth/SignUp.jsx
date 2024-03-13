import { Field, Form, FormikProvider } from 'formik';
import style from './style.module.scss';
import { useSignUp } from './useSingUp';

export function SignUp() {
    const { formik } = useSignUp();

    return <div className={style.content}>
        <FormikProvider value={formik}>

        <div className={style.form}>
            <img src="/img/logo2.svg" alt="ScreenrAI" />
            <h3>Sign up for your account</h3>
                <div id="error-panel">
                
                </div>
                <div id="success-panel">
                </div>
                <Form>
                <div>
                    <Field type="text" name="firstName" placeholder="First name" />
                    <Field type="text" name="lastName" placeholder="Last name" />
                </div>
                <Field type="text" name="email"  placeholder="Email address" />
                <Field type="text" name="company" placeholder="Company" />
                <Field type="password" name="password" placeholder="Password" />
                <Field type="password" name="confirmPassword" placeholder="Confirm Pasword" />

                <button type="submit">Sign up</button>
                
                <p className={style.policy}>
                    We’re committed to your privacy. ScreenrAI uses the information you provide to us to contact you about our relevant content, products, and services. You may unsubscribe from these communications at any time. For more information, check out our <a href="#">Privacy Policy.</a>
                </p>
                
                <div className={style.divider}></div>

                <p class={style.goToSignin}>Log in to your account? <a href="/signin">Sign in</a></p>
                </Form>

            <div className={style.footer}>
                <p>©2023 ScreenrAI Ltd. All Rights Reserved.</p>
                <a href="#">Privacy Policy</a>
            </div>
        </div>
        </FormikProvider>
    </div>
}