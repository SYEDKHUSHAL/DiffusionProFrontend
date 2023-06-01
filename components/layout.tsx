import React, { useState } from "react";
import { MenuProps, } from "antd";
import { Layout, Menu, } from "antd";
import Link from "next/link";
import Footer from "./footer";

const { Content, Sider } = Layout;

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: "group"
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuProps["items"] = [
  getItem(
    <Link href="/" rel="Home noreferrer">
      &nbsp; &nbsp; &nbsp; &nbsp;  Home
    </Link>,
    "sub11",
  ),
  getItem(
    "Base Models",
    "sub1",
    <img src="/assets/hhhhh.png" alt="logoMenu" className="logoMenu" />,
    [
      getItem(
        <Link href="/base-models/text-to-image" rel="noopener noreferrer">
          Text to Image
        </Link>,
        "1"
      ),
      getItem(
        <Link href="/base-models/image-to-image" rel="noopener noreferrer">
          Image to Image
        </Link>,
        "2"
      ),
      // getItem(
      //   <Link href="/base-models/depth-to-image" rel="noopener noreferrer">
      //     Depth to Image
      //   </Link>,
      //   "3"
      // ),
      // getItem(
      //   <Link href="/base-models/upsample-super-resolution" rel="noopener noreferrer">
      //     Upsample: Super Resolution
      //   </Link>,
      //   "4"
      // ),
      getItem(
        <Link href="/base-models/text-to-image-anime" rel="noopener noreferrer">
          Text to Image: Anime
        </Link>,
        "5"
      ),
      // getItem(
      //   <Link href="/base-models/image-to-image-anime" rel="noopener noreferrer">
      //     Image to Image: Anime
      //   </Link>,
      //   "6"
      // ),
    ]
  ),

  { type: "divider" },

  getItem(
    "Control Nets",
    "sub2",
    <img src="/assets/hhhhh.png" alt="logoMenu" className="logoMenu" />,
    [
      getItem(
        <Link href="/control-nets/canny-image" rel="noopener noreferrer">
          Canny Image
        </Link>,
        "7"
      ),
      getItem(
        <Link href="/control-nets/post-to-image" rel="noopener noreferrer">
          Pose to Image
        </Link>,
        "9"
      ),
      getItem(
        <Link href="/control-nets/shuffle" rel="noopener noreferrer">
          Shuffle
        </Link>,
        "10"
      ),
      getItem(
        <Link href="/control-nets/scribble" rel="noopener noreferrer">
          Scribble
        </Link>,
        "11"
      ),
      getItem(
        <Link href="/control-nets/hed" rel="noopener noreferrer">
          HED
        </Link>,
        "12"
      ),
      getItem(
        <Link href="/control-nets/lineart" rel="noopener noreferrer">
          Lineart
        </Link>,
        "13"
      ),
      getItem(
        <Link href="/control-nets/softedge" rel="noopener noreferrer">
          Softedge
        </Link>,
        "14"
      ),
      getItem(
        <Link href="/control-nets/normal-bae" rel="noopener noreferrer">
          NormalBae
        </Link>,
        "15"
      ),
      getItem(
        <Link href="/control-nets/mlsd" rel="noopener noreferrer">
          MLSD
        </Link>,
        "16"
      ),
    ]
  ),

  // getItem(
  //   "Utilities",
  //   "sub3",
  //   <img src="/assets/hhhhh.png" alt="logoMenu" className="logoMenu" />,
  //   [
  //     getItem(
  //       <Link href="/utilities/create-canny-image" rel="noopener noreferrer">
  //         Create Canny Image
  //       </Link>,
  //       "18"
  //     ),
  //     getItem(
  //       <Link href="/utilities/pose-generator" rel="noopener noreferrer">
  //         Pose Generator
  //       </Link>,
  //       "19"
  //     ),
  //   ]
  // ),
];

type MainLayoutProps = {
  children: React.ReactNode; //👈 children prop typr
};

const MainLayout = (props: MainLayoutProps) => {
  const [collapsed, setCollapsed] = useState(false);

  const [openKeys, setOpenKeys] = useState(["sub1", "sub2", "sub3"]);
  const rootSubmenuKeys = ["sub1", "sub2", "sub3"];

  const onOpenChange: MenuProps["onOpenChange"] = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Layout>
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          width={280}
          collapsible
        >
          <div
            className="brandLogo"
            style={{
              height: 50,
              margin: 15,
            }}
          />
          <Menu
            theme="dark"
            mode="inline"
            items={items}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
          />
        </Sider>
        <Content>
          <div style={{ padding: 24, minHeight: 360 }}>{props.children}</div>

          
        </Content>
      </Layout>
      <Footer backgroundColor={"#001529"} width={"302px"} marginLeft={270} />
    </Layout>
  );
};

export default MainLayout;
