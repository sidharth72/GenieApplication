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

        <div style={{fontFamily:"system-ui", fontSize:"20px"}}>
        <h2>1. Introduction</h2>
<p>&nbsp;</p>
<p>Hi there! In today's fast-paced digital world, we all want quick and reliable answers to our questions. Whether you're a student trying to finish an assignment or a teacher trying to create study materials, you know how time-consuming it can be to search through multiple pages of search results on the internet. That's where Genie comes in - it's an AI-powered tool that can generate text to help you get the answers you need fast and efficiently.</p>
<p>&nbsp;</p>
<p>Genie uses a massive neural network called GPT-3, which is pretty smart, and it can store your data in a database. This means you can create your own account and access a huge database of information on a wide range of topics. You can also create your own topics and subtopics to create study materials in a snap. Genie is perfect for anyone who needs quick and accurate information, whether you're a student, teacher, blogger, or just someone who loves learning new things.</p>
<p>&nbsp;</p>
<p>In this thesis, we're going to take a closer look at Genie and explore how it can help make learning and teaching easier and more efficient. We'll dive into the features and capabilities of Genie, and explore the impact of AI technology on education. We'll also look at how Genie can be used to enhance the quality of education and discuss some of the potential challenges and limitations of using AI-powered tools in the classroom.</p>
<p>Our aim is to give you a comprehensive overview of Genie and help you understand how it can make a difference in the way we learn and teach. So, let's get started!</p>
<p>&nbsp;</p>
<h2>2. Objectives</h2>
<p>&nbsp;</p>
<p>Genie is a web application that is designed for students, teachers, bloggers, and other content creators. Its main goal is to help users create high-quality content like notes and articles using the power of Artificial Intelligence and Generative AI.</p>
<p>The system is built using Python and Django as the backend technology, and SQLite3 database for data storage. GPT-3 Algorithm (Neural Network) is also used to provide advanced AI capabilities such as language generation, natural language processing, and text summarization.</p>
<p>On the frontend, React JS is used to create an intuitive and user-friendly interface, making it easy for users to create and manage their content. The system also employs high JWT security to ensure that user data is kept safe and secure.</p>
<p>&nbsp;</p>
<h2>2.1. Defintion of the Problem</h2>
<p>&nbsp;</p>
<p>The Genie project is an AI-based system that provides users with a quick and easy way to generate and learn notes without having to spend hours scrolling through multiple webpages, books, pdf's, and videos. It leverages advanced algorithms to analyze user input and generate high-quality notes instantly, making it an ideal tool for students, researchers, and professionals who need to keep up with a lot of information.</p>
<p>The system also provides the ability to save notes, giving users a secure and reliable backup of their work. This ensures that they can access their notes at any time and from any device, providing them with greater flexibility and convenience. Whether you're a student preparing for an exam, a researcher working on a project, or a professional looking to stay ahead in your field, the Genie project is a powerful tool that can help you work smarter and more efficiently.</p>
<p>&nbsp;</p>
<h2>3. Tools and Requirements</h2>
<p>&nbsp;</p>
<h3>3.1 Software Requirements</h3>
<p>&nbsp;</p>
<p>Font End: React JS, Material UI</p>
<p>Back End: Django, Sqlite-3 database, GPT-3(AI algorithm)</p>
<p>IDE: Sublime Text, Python IDE</p>
<p>Browsers: Supported in all modern browsers</p>
<p>&nbsp;</p>
<h3>3.2 Software Description</h3>
<p>&nbsp;</p>
<h3>3.2.1 Front End:&nbsp;</h3>
<p>&nbsp;</p>
<p><strong>Python</strong>:&nbsp;</p>
<p>Python is a high-level, interpreted programming language that is used in a wide range of applications, from web development to scientific computing. It was created in the late 1980s by Guido van Rossum and has since become one of the most popular programming languages in the world.</p>
<p>One of the reasons for Python's popularity is its simplicity and ease of use. It has a simple syntax that is easy to read and write, making it a great language for beginners. Python's standard library is also very comprehensive, providing users with a vast array of built-in functions and modules that can be used to accomplish a wide variety of tasks.</p>
<p>Another key advantage of Python is its versatility. It is used in many different industries, including data science, web development, game development, machine learning, and scientific computing. This versatility has made Python a popular choice for developers and programmers who need a language that can handle a wide range of tasks.</p>
<p>Python also has a large and active community of developers and users who contribute to its ongoing development and support. There are many resources available for learning Python, including online tutorials, courses, and forums where users can ask questions and get help from experienced programmers.</p>
<p>&nbsp;</p>
<p><strong>Features of Python:</strong></p>
<p>&nbsp;</p>
<ol>
<li>
<p><strong>Simple and Easy to Learn</strong>: Python has a simple and easy-to-understand syntax that makes it an ideal language for beginners. It is easy to read and write, and requires less code to accomplish tasks when compared to other languages.</p>
</li>
<li>
<p><strong>Interpreted Language</strong>: Python is an interpreted language, which means that it does not need to be compiled before running. This makes the development process faster and more efficient.</p>
</li>
<li>
<p><strong>Object-Oriented Programming</strong>: Python supports object-oriented programming, which allows programmers to create reusable code and build more complex applications.</p>
</li>
<li>
<p><strong>Large Standard Library</strong>: Python has a large and comprehensive standard library that provides many built-in functions and modules for a wide range of tasks. This makes it easy for developers to create powerful and feature-rich applications.</p>
</li>
<li>
<p><strong>Cross-Platform Compatibility</strong>: Python is a cross-platform language, which means that it can run on multiple operating systems such as Windows, macOS, and Linux.</p>
</li>
<li>
<p><strong>Dynamically Typed:</strong> Python is a dynamically typed language, which means that the type of a variable is determined at runtime. This makes it easier for developers to write code quickly without worrying about variable types.</p>
</li>
<li>
<p><strong>Exception Handling</strong>: Python provides built-in exception handling, which allows programmers to handle errors and exceptions in a more elegant way.</p>
</li>
<li>
<p><strong>Extensible</strong>: Python can be extended by adding new modules and libraries, which makes it a powerful language for many different applications, including web development, data analysis, and scientific computing.</p>
</li>
</ol>
<p>&nbsp;</p>
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