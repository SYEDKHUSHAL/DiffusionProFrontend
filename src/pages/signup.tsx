import Head from 'next/head';
import Registration from '../../components/registration';


export default function RegistrationCOM() {
    return (
        <>
            <Head>
                <title>Registration</title>
            </Head>
            
            <div className='backbg'>
                <div style={{ height: "100vh" }}>
                    <div 
                        style={{ 
                            textAlign: "center", 
                            paddingTop: "14%", 
                            paddingLeft: "38%"
                        }}
                    >
                        <Registration />
                    </div>
                </div>
            </div>
        </>
    );
};