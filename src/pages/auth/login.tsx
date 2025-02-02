import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import { showDialog, showToast } from "../../utils/alertUtils";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { login } from "../../redux/slices/authSlice";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>()

    return (
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <div className="w-full h-screen flex items-center justify-center bg-gray-50">
                <div className="flex flex-col w-[90%] max-w-[500px] bg-white shadow p-8 rounded">
                    <GoogleLogin
                        onSuccess={(response) => {
                            console.log("Login Success:", response);
                            const credential = response.credential;
                            if (credential) {
                                // Decode JWT payload to get user info
                                const user = JSON.parse(atob(credential.split('.')[1]));
                                
                                if (user) {
                                    showToast('success', 'Sign in successfully');
                                    dispatch(login({
                                        token: credential,
                                        user: {
                                            id: user.sub,
                                            name: user.name,
                                            email: user.email,
                                            picture: user.picture,
                                        }
                                    }));
                                    navigate('/');  // Navigate ke halaman utama
                                } else {
                                    showDialog('error', 'error', "User data is not available.");
                                    console.log("User data is not available.");
                                }
                            } else {
                                showDialog('error', 'error', "Login failed. No credentials.");
                                console.log("No credentials returned from Google.");
                            }
                        }}
                        onError={() => {
                            showDialog('error', 'error', "Login Failed")
                            console.log("Login Failed");
                        }}
                    />
                </div>
            </div>
        </GoogleOAuthProvider>
    )
}

export default Login