import Head from 'next/head';
import { Box, Container, Grid } from '@mui/material';
import { Budget } from '../components/dashboard/budget';
import { LatestOrders } from '../components/dashboard/latest-orders';
import { LatestProducts } from '../components/dashboard/latest-products';
import { Sales } from '../components/dashboard/sales';
import { TasksProgress } from '../components/dashboard/tasks-progress';
import { TotalCustomers } from '../components/dashboard/total-customers';
import { TotalProfit } from '../components/dashboard/total-profit';
import { TrafficByDevice } from '../components/dashboard/traffic-by-device';
import { DashboardLayout } from '../components/dashboard-layout';
import Divider from '@mui/material/Divider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/router'
import TopicOutlinedIcon from '@mui/icons-material/Topic';
import NotesIcon from '@mui/icons-material/Notes';
import QuizOutlinedIcon from '@mui/icons-material/QuizOutlined';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import PostAddOutlinedIcon from '@mui/icons-material/PostAddOutlined';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import PictureAsPdfOutlinedIcon from '@mui/icons-material/PictureAsPdfOutlined';
import AutoAwesomeOutlinedIcon from '@mui/icons-material/AutoAwesomeOutlined';



const Dashboard = () => {
  const router = useRouter();

return(
  <>
    <Head>
      <title>
        Dashboard | Genie
      </title>
    </Head>
    <h2 style={{textAlign:"center"}}>What Genie Can Do?</h2>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        py: 8
      }}
    >

      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>Create Topics</h3><br/>
            <Divider/><br/>

            <TopicOutlinedIcon sx={{fontSize:"60px",}}/>
            </Box>


          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>Write Notes</h3><br/>
            <Divider/><br/>
            <NotesIcon sx={{fontSize:"60px"}}/>
            </Box>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
            <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>Q & A</h3><br/>
            <Divider/><br/>
            <QuizOutlinedIcon sx={{fontSize:"60px"}}/>

            </Box>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
          <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>Summarize</h3><br/>
            <Divider/><br/>
            <SummarizeOutlinedIcon sx={{fontSize:"60px"}}/>
            </Box>
          </Grid>

          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
          <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>Create Subtopics</h3><br/>
            <Divider/><br/>
            
              <PostAddOutlinedIcon sx={{fontSize:"60px"}}/>
            </Box>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
          <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>Image to Text</h3><br/>
            <Divider/><br/>
            <DocumentScannerOutlinedIcon sx={{fontSize:"60px"}}/>

            </Box>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
          <Box
              sx={{backgroundColor:"#fff", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

            <h3>PDF Exports</h3><br/>
            <Divider/><br/>
            <PictureAsPdfOutlinedIcon sx={{fontSize:"60px"}}/>

            </Box>
          </Grid>
          <Grid
            item
            xl={3}
            lg={3}
            sm={6}
            xs={12}
          >
          <Box
              sx={{backgroundColor:"#5048E5", 
              padding:"20px",
              boxShadow:"rgba(0, 0, 0, 0.05) 0px 0px 0px 1px;",
              borderRadius:"10px"
            }}
            >

              <Button
                onClick={()=>router.push('/create-notes')}
                startIcon={(<AutoAwesomeOutlinedIcon sx={{fontSize:"40px"}} />)}
                color="primary"
                variant="contained"
                sx={{padding:"50px", fontSize:"20px"}}
              >
                Start
              </Button>

            </Box>
          </Grid>
          
        </Grid>
      </Container>
    </Box>
  </>)
}

Dashboard.getLayout = (page) => (
  <DashboardLayout>
    {page}
  </DashboardLayout>
);

export default Dashboard;
