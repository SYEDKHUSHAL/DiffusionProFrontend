import Head from 'next/head';
import Login from '../../components/login';


export default function LoginCOM() {
    return (
        <>
            <Head>
                <title>Login</title>
            </Head>

            <div className='backbg'>
                <div style={{ height: "100vh" }}>
                    <div 
                        style={{ 
                            textAlign: "center", 
                            paddingTop: "15%", 
                            paddingLeft: "40%"
                        }}
                    >
                        <Login />
                    </div>
                </div>
            </div>
        </>
    );
};