import Head from 'next/head';
import { Box, Container, Typography } from '@mui/material';
import { DashboardLayout } from '../components/dashboard-layout';
import { SettingsNotifications } from '../components/settings/settings-notifications';


const Settings = () => (
  <>
    <Head>
      <title>
        Thesis
      </title>
    </Head>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >
      <Container maxWidth="lg">

        {/*<SettingsNotifications />*/}
        <Box sx={{ pt: 3 }}>

        <h1>Project Thesis</h1><br/>

        <div style={{fontFamily:"times", fontSize:"20px"}}>
        
        <p>Hi there! In today's fast-paced digital world, we all want quick and reliable answers to our questions. Whether you're a student trying to finish an assignment or a teacher trying to create study materials, you know how time-consuming it can be to search through multiple pages of search results on the internet. That's where Genie comes in - it's an AI-powered tool that can generate text to help you get the answers you need fast and efficiently.</p>
        <p>Genie uses a massive neural network called GPT-3, which is pretty smart, and it can store your data in a database. This means you can create your own account and access a huge database of information on a wide range of topics. You can also create your own topics and subtopics to create study materials in a snap. Genie is perfect for anyone who needs quick and accurate information, whether you're a student, teacher, blogger, or just someone who loves learning new things.</p>
        <p>In this thesis, we're going to take a closer look at Genie and explore how it can help make learning and teaching easier and more efficient. We'll dive into the features and capabilities of Genie, and explore the impact of AI technology on education. We'll also look at how Genie can be used to enhance the quality of education and discuss some of the potential challenges and limitations of using AI-powered tools in the classroom.</p>
        <p>Our aim is to give you a comprehensive overview of Genie and help you understand how it can make a difference in the way we learn and teach. So, let's get started!</p>

        </div>

        </Box>
      </Container>
    </Box>
  </>
);

Settings.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Settings;