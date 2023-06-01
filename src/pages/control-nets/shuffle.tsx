import { useState } from "react";
import Head from "next/head";
import {
  Button, Card, Input, Upload, UploadProps, UploadFile, message,
  Image, Slider, Row, Col, Select, Collapse, Divider,
} from "antd";
import { CaretRightOutlined, UploadOutlined } from "@ant-design/icons";

import MainLayout from "../../../components/layout";
import axios from "axios";
import convertImageToBase64 from "../utilities/getBase64";
import downloadBase64File from "../utilities/downloadBase64File";

const { TextArea } = Input;

export default function TextToImage() {
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [uploading, setUploading] = useState(false);
  const [image, setImage] = useState(
    "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"
  );
  const [originFileObj, setOriginFileObj] = useState<any>(null);
  const [imageOne, setImageOne] = useState<string>("");
  const [imageTwo, setImageTwo] = useState<string>("");
  const [imageThree, setImageThree] = useState<string>("");
  const [imageFour, setImageFour] = useState<string>("");
  const [preImg, setPreImg] = useState<any>(null);

  const [prompt, setPrompt] = useState<string>("");
  const [guidanceScale, setGuidanceScale] = useState<any>(8.5); // NOTE need to set decimal
  const [seed, setSeed] = useState<any>(30);
  const [steps, setSteps] = useState<any>(30);
  const [width, setWidth] = useState<any>(1000);
  const [height, setHeight] = useState<any>(1000);
  const [model, setModel] = useState<string>("shuffle");
  const [scheduler, setScheduler] = useState<string>("UniPCMultistepScheduler");
  const [negative, setNegative] = useState<string>("");

  const submitted = async () => {

    message.loading("Please wait... ", 0);

    const data = new FormData();
    fileList.forEach((file) => {
      return data.append("file", file as any);
    });

    let config = {
      method: 'post',
      maxBodyLength: Infinity,
      url: `https://ai-image-api.pktlr.xyz/${model}?prompt=${prompt}&negative_prompt=${negative}&guidance_scale=${guidanceScale}&seed=${seed}&steps=${steps}&height=${height}&width=${width}`,
      headers: {
        'accept': 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      data: data
    };

    axios.request(config)
      .then((response) => {

        setImageOne(response.data.img0);
        setImageTwo(response.data.img1);
        setImageThree(response.data.img2);
        setImageFour(response.data.img3);
        setPreImg(response.data.preImg);

        message.destroy();
        message.success("Image Generated Successfully");
      })
      .catch((error) => {
        console.log(error);

        message.destroy();
        message.error("Error Occured");
      });
  }

  const props: UploadProps = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);

      setFileList(newFileList);
    },
    beforeUpload: async (file: UploadFile) => {
      setFileList([...fileList, file]);
      
      const _file: any = file;

      if (_file) {
        try {
          
          const base64String = await convertImageToBase64(_file);
         
          setOriginFileObj(base64String);

        } catch (error) {
          console.error(error);
        }
      }

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
          title="Shuffle"
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
                          preview={originFileObj || false}
                          src={originFileObj || false}
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
                          src={`data:image/png;base64,${preImg}` || "/assets/one.png"}
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
                      src={`data:image/png;base64,${imageOne}` || "/assets/one.png"}
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                  <center>
                    {
                      imageOne !== "" &&
                      <Button
                        type="primary"
                        onClick={() => downloadBase64File(imageOne, 'image/png', 'test.png')}
                      >
                        Download
                      </Button>
                    }
                  </center>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src={`data:image/png;base64,${imageTwo}` || "/assets/one.png"}
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                  <center>
                    {
                      imageTwo !== "" &&
                      <Button
                        type="primary"
                        onClick={() => downloadBase64File(imageTwo, 'image/png', 'test.png')}
                      >
                        Download
                      </Button>
                    }
                  </center>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src={`data:image/png;base64,${imageThree}` || "/assets/one.png"}
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                  <center>
                    {
                      imageThree !== "" &&
                      <Button
                        type="primary"
                        onClick={() => downloadBase64File(imageThree, 'image/png', 'test.png')}
                      >
                        Download
                      </Button>
                    }
                  </center>
                </Col>
                <Col xs={2} sm={4} md={6} lg={8} xl={10}>
                  <center>
                    <Image
                      width={300}
                      height={300}
                      src={`data:image/png;base64,${imageFour}` || "/assets/one.png"}
                      fallback={`data:image/png;base64,${image}`}
                      style={{ padding: 10 }}
                    />
                  </center>
                  <center>
                    {
                      imageFour !== "" &&
                      <Button
                        type="primary"
                        onClick={() => downloadBase64File(imageFour, 'image/png', 'test.png')}
                      >
                        Download
                      </Button>
                    }
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
                    <Row>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Guidance Scale</p>
                          <Input
                            value={guidanceScale}
                            onChange={(e) => setGuidanceScale(e.target.value)}
                          />
                          {/* <Slider
                            defaultValue={30}
                            onChange={(value) => setGuidanceScale(value)}
                          /> */}
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
                          <Slider
                            min={400}
                            max={1000}
                            defaultValue={1000}
                            onChange={(e) => setHeight(e)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Width</p>
                          <Slider
                            min={400}
                            max={1000}
                            defaultValue={1000}
                            onChange={(e) => setWidth(e)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Steps</p>
                          <Slider
                            min={20}
                            max={40}
                            defaultValue={30}
                            onChange={(e) => setSteps(e)}
                          />
                        </div>
                      </Col>
                      <Col xs={12}>
                        <div style={{ marginBottom: 5 }}>
                          <p style={{ marginBottom: 2 }}>Strength</p>
                          <Slider
                            defaultValue={30}
                            disabled
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
                      <Select
                        placeholder="Modal"
                        style={{ width: "100%" }}
                        value={model}
                        onChange={(e) => setModel(e)}
                      >
                        <Select.Option value="shuffle">
                        control_v11e_sd15_shuffle
                        </Select.Option>
                      </Select>
                    </div>

                    <div>
                      <p style={{ marginBottom: 2 }}>Scheduler</p>
                      <Select
                        placeholder="Scheduler"
                        style={{ width: "100%" }}
                        value={scheduler}
                      >
                        <Select.Option value="UniPCMultistepScheduler">
                          UniPCMultistepScheduler
                        </Select.Option>
                      </Select>
                    </div>

                    <div>
                      <p style={{ marginBottom: 2 }}>Negative Prompt</p>
                      <TextArea placeholder="Negative Prompt" onChange={(e) => setNegative(e.target.value) } />
                    </div>

                    <div>
                      <p style={{ marginBottom: 2 }}>Prompt</p>

                      <TextArea
                        placeholder="Prompt"
                        onChange={(e) => setPrompt(e.target.value)}
                        style={{ width: "100%" }}
                      />
                    </div>
                  </Collapse.Panel>
                </Collapse>

                <Button
                  type="primary"
                  block
                  size={"large"}
                  style={{ marginTop: 15, backgroundColor: "#001529db" }}
                  onClick={submitted}
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
