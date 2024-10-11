"use client"
import { Webchat, WebchatProvider, Fab, getClient } from "@botpress/webchat";
import { buildTheme } from "@botpress/webchat-generator";
import { Container, Header, MessageList, Composer, ComposerInput, ComposerButton, UploadButton } from '@botpress/webchat'
import { useState } from "react";
// import Logo from "../../public/images/LOGO.svg"
// Customize text color and background color
const { theme, style } = buildTheme({
    themeName: "prism", // existing theme
    themeColor: "#634433", // existing color
    backgroundColor: "#f5f5f5", // new color
});

// Add your Client ID here ⬇️
const clientId = "07e214ad-1aba-4a64-90a0-944c4b4677f0";
const config = {
    composerPlaceholder: "What would you like to know?",
    botName: "Tour De India",
    botAvatar: "https://i.ibb.co/0sMyFrh/Screenshot-2024-10-06-114133.png",

    email: {
        title: "xyz@gmail.com",
        link: "mailto:xyz@gmail.com",
    },

};
export default function App() {
    const client = getClient({ clientId });
    const [isWebchatOpen, setIsWebchatOpen] = useState(false);

    const toggleWebchat = () => {
        setIsWebchatOpen((prevState) => !prevState);
    };

    return (
        <div className="fixed top-[90vh] left-[90rem]  z-[100]" style={{ width: "100vw", height: "100vh" }}>
            <style>{style}</style>
            <WebchatProvider theme={theme} configuration={config} client={client}>
              <div
              className="fixed bottom-[5rem] right-2"
                    style={{
                        display: isWebchatOpen ? "block" : "none",
                        height: "79vh",
                        width: "30vw",
                    }}
                >
                    {/* <Webchat style={{ backgroundColor: "#d2b247", color: "white" }} /> */}
                <Container>
                    <Header  className="bg-[#562b06] pt-[0.5rem] pb-[0.5rem]" />
                    <MessageList />
                    <Composer>
                        <ComposerInput />
                        <ComposerButton />
                    </Composer>
                </Container>
                </div> 
                        <Fab onClick={toggleWebchat} />
        </WebchatProvider>
        </div >
    );
}
