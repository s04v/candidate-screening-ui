import { Field, FormikProvider, Form } from 'formik';
import style from './style.module.scss';
import { useSignIn } from './useSignIn';

export function SignIn() {
    const { formik } = useSignIn();

    return <div className={style.content}>
        <FormikProvider value={formik}>
            <div className={style.form}>
                <img src="/img/logo2.svg" alt="ScreenrAI" />
                <h3>Log in to your account</h3>
                <div id="error-panel">
                </div>
                <div id="success-panel">
                </div>
                <Form>

                    <Field type="text" name="email" placeholder="Email Address" />
                    <Field type="password" name="password" placeholder="Password"/>
                    <section>
                        <input type="checkbox" name="rememberMe" />
                        <label for="scales">Remember me</label>
                    </section>
                    <button type="submit">Log in</button>

                    <p className={style.goToSignup}>Don't have an account?  <a href="/signup">Sign up</a></p>
                </Form>
                <div className={style.footer}>
                        <p>©2023 ScreenrAI Ltd. All Rights Reserved.</p>
                        <a href="#">Privacy Policy</a>
                    </div>
            </div>
        </FormikProvider>
    </div>
}