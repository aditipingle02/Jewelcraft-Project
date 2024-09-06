import { Button, Input, message, Row, Col, Form, Spin } from "antd";
import "./Dashboard.css";
import React, { useState } from "react";

import logoImg from '../logo.svg';

export default function Dashboard() {
  //  const response=fetch('https://clipdrop-api.co/text-to-image/v1')
  //  console.log(response)
  const [imageURL, setImageURL] = useState(undefined);
  const [loading, setLoading] = useState(false);

  const callAPI = (values) => {
    let apiKey = "c0ac001cc1d921f0cfa757b374395e276e64af165f6eecc7de1bd06e486e2f730c6d15049a123be8d19abe343b9e083d";

    const formData = new FormData();

    for (const name in values) {
      formData.append(name, values[name]);
    }

    setLoading(true);
    fetch("https://clipdrop-api.co/text-to-image/v1", {
      method: "post",
      body: formData,
      headers: {
        "x-api-key": apiKey,
      },
    })

      .then(async (response) => {
        const imageData = await response.blob();
        setImageURL(URL.createObjectURL(imageData));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        message.error(error);
      });
  };

  return (
    <Spin spinning={loading}>
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-primary to-primary-foreground"
        style={{ backgroundColor: "#1d5242" }}
      >

        <div
          className="bg-card p-8 rounded-2xl shadow-lg w-full max-w-md animate-fade-in"
          style={{ backgroundColor: "#F9EEE7", border: "2px solid black" }}
        >
          <img className="main-logo" src={logoImg} alt="" />
          <div
            className="flex items-center justify-between mb-6"
            style={{ backgroundColor: "#F9EEE7" }}
          >
            <h2
              className="text-3xl font-bold text-card-foreground font-serif animate-fade-in-up"
              style={{ backgroundColor: "#F9EEE7", marginBlockEnd: 0 }}
            >
              Unleash Your Creativity with AI-Powered Jewelry Design
            </h2>
            <Button
              style={{ marginBottom: "55px" }}
              variant="ghost"
              size="icon"
            // className="text-card-foreground hover:bg-card/50 animate-fade-in-right"
            >
              <SettingsIcon className="w-6 h-6" />
            </Button>
          </div>
          <p
            className="text-card-foreground mb-8 text-lg font-medium animate-fade-in-up"
            style={{ backgroundColor: "#F9EEE7" }}
          >
            Effortlessly craft stunning jewelry pieces with our AI-driven design
            tool. Enter a prompt and let the magic happen.
          </p>
          <Form
            className="flex items-center mb-8 animate-fade-in-up"
            style={{ backgroundColor: "#F9EEE7", marginBottom: "20px" }}
            onFinish={callAPI}
          >
            <Form.Item name="prompt" rules={[{ required: true }]}>
              <Input
                style={{ marginRight: "30px", border: "2px solid black" }}
                type="text"
                placeholder="Describe your dream jewelry item..."

              // className="flex-1 mr-4 bg-muted text-muted-foreground rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </Form.Item>
            <Form.Item>
              <Button
                className="px-6 py-2 text-lg font-semibold animate-fade-in-right"
                style={{ backgroundColor: "black", color: "white", marginLeft: '10px' }}
                htmlType="submit"
              >
                Generate
              </Button>
            </Form.Item>
          </Form>
          {imageURL && (
            <Row>
              <Col md={24} sm={24}>
                <img src={imageURL} 
                alt="Generated Jewelry Image" 
                style={{ maxWidth: "100%" }}
                />
              </Col>
            </Row>
          )}
          <div
            className="flex justify-end mt-6 animate-fade-in-up"
            style={{ backgroundColor: "white", color: "#F9EEE7" }}
          >
            {/* <Button className="btn-save px-6 py-2 text-lg font-semibold">
            <span
            className = 'save-btn'
            style={{backgroundColor:'#369bdf',color:'black'}}
            >Save</span>
          </Button> */}
            <Button
              className="save-btn"
              style={{
                width: "1000px",
                marginTop: "0",
                backgroundColor: "#369bdf",
                color: "#F9EEE7",
                border: "2px solid black",
              }}
              onClick={() => alert("Saved SuccessFully")}
            >
              Save
            </Button>
          </div>
        </div>
      </div>
    </Spin>
  );
}

function SettingsIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}
