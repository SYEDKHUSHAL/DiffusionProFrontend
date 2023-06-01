import { useState } from "react";
import Head from "next/head";
import {
  Button, Card, Input, Upload, UploadProps, UploadFile, message,
  Image, Slider, Row, Col, Select, Collapse, Divider,
} from "antd";
import { CaretRightOutlined, UploadOutlined } from "@ant-design/icons";

import MainLayout from "../../../components/layout";

const { TextArea } = Input;

export default function TextToImage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(
    "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"
  );

  const [preImg, setPreImg] = useState<any>(null);
  const [prompt, setPrompt] = useState<string>("");
  const [guidanceScale, setGuidanceScale] = useState<any>(8.5); // NOTE need to set decimal
  const [seed, setSeed] = useState<any>(30);
  const [steps, setSteps] = useState<any>(30);
  const [width, setWidth] = useState<any>(1000);
  const [height, setHeight] = useState<any>(1000);
  const [model, setModel] = useState<string>("canny_img");
  const [scheduler, setScheduler] = useState<string>("UniPCMultistepScheduler");
  const [negative, setNegative] = useState<string>("");

  const handleUpload = () => {
    const formData = new FormData();
    fileList.forEach((file) => {
      return formData.append("file", file as any);
    });
    setUploading(true);

    // You can use any AJAX library you like
    fetch("https://961d-20-243-97-114.ngrok-free.app/transform", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.text())
      .then((result) => {
        console.log(result);
        setImage(result);
        message.success("upload successfully.");
      })
      .catch(() => {
        message.error("upload failed.");
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
          title="Create Canny Image"
          bordered={false}
          // bodyStyle={{ backgroundColor: "black" }}
          headStyle={{ backgroundColor: "#001529", color: "white" }}
        >
          <Row>
            <Col xl={16}>
              <Row className="naaam">
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <div >
                    <Row className="naaam" >
                      <Col
                        xs={2}
                        sm={4}
                        md={6}
                        lg={8}
                        xl={10}
                        className="landCard"
                      >
                        <Image
                          width={300}
                          height={300}
                          src="/assets/n.jpg"
                          fallback={`data:image/png;base64,${image}`}
                          style={{ padding: 10 }}
                        />
                        <p style={{ fontSize: 18, fontWeight: 700 }}>
                          Original Image
                        </p>
                      </Col>
                      <Col
                        xs={2}
                        sm={4}
                        md={6}
                        lg={8}
                        xl={10}
                        className="landCard"
                      >
                         <Image
                          width={300}
                          height={300}
                          preview={preImg || false}
                          src={"assets/normalBae.png" || false}
                          fallback={`data:image/png;base64,${image}`}
                          style={{ padding: 10 }}
                        />
                        <p style={{ fontSize: 18, fontWeight: 700 }}>
                          Preprocessed Image
                        </p>
                      </Col>
                    </Row>
                  </div>

                  <Divider />

                  <div
                    className="thespan"
                    style={{
                      backgroundColor: "#001529",
                      width: "100%",
                      padding: 10,
                      color: "white",
                      borderRadius: 3,
                    }}
                  >
                    <span style={{ fontSize: 16, fontWeight: 600 }}>
                      Generated Results
                    </span>
                  </div>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src="/assets/one.png"
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src="/assets/one1.png"
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src="/assets/one2.png"
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src="/assets/one3.png"
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                </Col>
              </Row>
            </Col>
            <Col xl={8}>
              <Card>
                <Collapse
                  bordered={false}
                  defaultActiveKey={["1"]}
                  expandIcon={({ isActive }) => (
                    <CaretRightOutlined rotate={isActive ? 90 : 0} />
                  )}
                >
                  <Collapse.Panel header="Settings" key="1">
                    {/* <Button>Classifier Settings</Button> */}
                    <Row>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Guidance Scale</p>
                          <Input
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Seed</p>
                          <Input
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Height</p>
                          <Input
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Width</p>
                          <Input
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Steps</p>
                          <Input
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Strength</p>
                          <Input
                            value={seed}
                            onChange={(e) => setSeed(e.target.value)}
                          />
                        </div>
                      </Col>
                    </Row>
                  </Collapse.Panel>

                  <Collapse.Panel header="Upload Image" key="2">
                    <Upload {...props}>
                      <Button
                        className="uploadBtn"
                        block
                        type="primary"
                        style={{ marginTop: 10 }}
                        icon={<UploadOutlined />}
                      >
                        Click to Upload
                      </Button>
                    </Upload>
                  </Collapse.Panel>

                  <Collapse.Panel header="Generate Output" key="3">
                    <div>
                      <p style={{ marginBottom: 2 }}> Model </p>
                      <Select placeholder="Modal" style={{ width: "100%" }}>
                        <Select.Option value="1">waifu-diffusion</Select.Option>
                        <Select.Option value="2">
                          stable_diffusion_1_5
                        </Select.Option>
                        <Select.Option value="3">
                          stable-diffusion-2-1
                        </Select.Option>
                        <Select.Option value="4">
                          stable-diffusion-2-depth
                        </Select.Option>
                        <Select.Option value="5">anything-v3.0</Select.Option>
                        <Select.Option value="6">
                          RealESRGAN_x4plus
                        </Select.Option>
                        <Select.Option value="7">
                          controlnet-openpose
                        </Select.Option>
                        <Select.Option value="8">
                          sd-controlnet-canny
                        </Select.Option>
                        <Select.Option value="9">
                          control_v11e_sd15_shuffle
                        </Select.Option>
                        <Select.Option value="10">
                          controlnet_scribble
                        </Select.Option>
                        <Select.Option value="11">controlnet_hed</Select.Option>
                        <Select.Option value="12">
                          controlnet_lineart
                        </Select.Option>
                        <Select.Option value="14">
                          controlnet_softEdge
                        </Select.Option>
                        <Select.Option value="15">
                          controlnet_normalBae
                        </Select.Option>
                        <Select.Option value="16">
                          controlnet_mlsd
                        </Select.Option>
                      </Select>
                    </div>

                    <div>
                      <p style={{ marginBottom: 2 }}>Scheduler</p>
                      <Select placeholder="Scheduler" style={{ width: "100%" }}>
                        <Select.Option value="UniPCMultistepScheduler">
                          UniPCMultistepScheduler
                        </Select.Option>
                        <Select.Option value="DPMSolverMultistepScheduler">
                          DPMSolverMultistepScheduler
                        </Select.Option>
                      </Select>
                    </div>

                    <div>
                      <p style={{ marginBottom: 2 }}>Negative Prompt</p>
                      <TextArea placeholder="Negative Prompt" />
                    </div>

                    <div>
                      <p style={{ marginBottom: 2 }}>Prompt</p>

                      <TextArea
                        placeholder="Prompt"
                        style={{
                          width: "100%",
                        }}
                      />
                    </div>
                  </Collapse.Panel>
                </Collapse>

                <Button
                  type="primary"
                  block
                  size={"large"}
                  style={{ marginTop: 15, backgroundColor: "#001529db" }}
                  onClick={handleUpload}
                >
                  Generate
                </Button>
              </Card>
            </Col>
          </Row>
        </Card>
      </MainLayout>
    </>
  );
}
