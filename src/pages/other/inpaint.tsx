import { useState } from 'react';
import Head from 'next/head';
import { 
    Button, Card, Divider, Input, Upload, UploadProps, UploadFile, 
    message, Image, Slider, Row, Col, Select 
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import MainLayout from '../../../components/layout';

export default function Inpaint() {

    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [uploading, setUploading] = useState(false);
    const [image, setImage] = useState("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");

    const handleUpload = () => {
        
        const formData = new FormData();
        fileList.forEach((file) => {
            return formData.append('file', file as any);
        });
        setUploading(true);
        
        // You can use any AJAX library you like
        fetch('https://961d-20-243-97-114.ngrok-free.app/transform', {
            method: 'POST',
            body: formData,
        })
            .then((res) => res.text())
            .then((result) => {
                console.log(result)
                setImage(result);
                message.success('upload successfully.');
            })
            .catch(() => {
                message.error('upload failed.');
            })
            .finally(() => {
                setUploading(false);
            });
    };

    const props: UploadProps = {
        onRemove: (file) => {
            const index = fileList.indexOf(file);
            const newFileList = fileList.slice();
            newFileList.splice(index, 1);
            setFileList(newFileList);
        },
        beforeUpload: (file) => {
            setFileList([...fileList, file]);

            return false;
        },
        fileList,
    };
    
    return (
        <>
            <Head>
                <title>DiffusionPro</title>
                <meta name="description" content="Generated by DiffusionPro" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <MainLayout>
                <Card
                    title="Inpaint"
                    bordered={false}
                >
                    <Row>
                        <Col xl={16}>
                            <div style={{ textAlign: "center" }}>
                                <Image
                                    width={600}
                                    height={600}
                                    src="error"
                                    fallback={`data:image/png;base64,${image}`}
                                />
                            </div>
                        </Col>
                        <Col xl={8}>
                            <Row>
                                <Col xs={12}>
                                    <div style={{ marginBottom: 5 }}>
                                        <p style={{ marginBottom: 2 }}>Classifier-Free Guidance (Scale)</p>
                                        <Slider defaultValue={30} tooltip={{ open: true, }} />
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div style={{ marginBottom: 5 }}>
                                        <p style={{ marginBottom: 2 }}>Classifier-Free Guidance (Scale)</p>
                                        <Slider defaultValue={30} tooltip={{ open: true, }} />
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div style={{ marginBottom: 5 }}>
                                        <p style={{ marginBottom: 2 }}>Classifier-Free Guidance (Scale)</p>
                                        <Slider defaultValue={30} tooltip={{ open: true, }} />
                                    </div>
                                </Col>
                                <Col xs={12}>
                                    <div style={{ marginBottom: 5 }}>
                                        <p style={{ marginBottom: 2 }}>Classifier-Free Guidance (Scale)</p>
                                        <Slider defaultValue={30} tooltip={{ open: true, }} />
                                    </div>
                                </Col>

                            </Row>
                            <>
                                <div>
                                    <p style={{ marginBottom: 2 }}>Model</p>
                                    <Select placeholder="Modal" style={{ width: "100%" }}>
                                        <Select.Option value="1">1</Select.Option>
                                        <Select.Option value="2">2</Select.Option>
                                        
                                    </Select>
                                </div>

                                <div>
                                    <p style={{ marginBottom: 2 }}>Model</p>
                                    <Input placeholder='Negative Prompt' />
                                </div>

                                <div>
                                    <p style={{ marginBottom: 2 }}>Seed</p>
                                    <Input placeholder='Seed' />
                                </div>

                                <div>
                                    <p style={{ marginBottom: 2 }}>Sampler</p>
                                    <Select placeholder="Sampler" style={{ width: "100%" }}>
                                        <Select.Option value="1">1</Select.Option>
                                        <Select.Option value="2">2</Select.Option>
                                        
                                    </Select>
                                </div>
                            </>
                        </Col>
                    </Row>

                    <Divider />

                    <p className='mb-4'>Prompt Image</p>

                    <Input placeholder="Prompt" style={{ width: 300 }} />

                    <Upload {...props}>
                        <Button
                            style={{ marginLeft: 10 }}
                            icon={<UploadOutlined />}
                        >
                            Click to Upload
                        </Button>
                    </Upload>

                    <Button
                        type="primary"
                        style={{ marginTop: 10 }}
                        onClick={handleUpload}
                    >
                        Preview
                    </Button>
                </Card>
            </MainLayout>
        </>
    )
}
