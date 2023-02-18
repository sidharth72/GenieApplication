import { useEffect, useState } from 'react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { Box, Button, Divider, Drawer, Typography, useMediaQuery } from '@mui/material';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { ChartBar as ChartBarIcon } from '../icons/chart-bar';
import { Cog as CogIcon } from '../icons/cog';
import { Lock as LockIcon } from '../icons/lock';
import { Selector as SelectorIcon } from '../icons/selector';
import { ShoppingBag as ShoppingBagIcon } from '../icons/shopping-bag';
import { User as UserIcon } from '../icons/user';
import { UserAdd as UserAddIcon } from '../icons/user-add';
import { Users as UsersIcon } from '../icons/users';
import { XCircle as XCircleIcon } from '../icons/x-circle';
import { Logo } from './logo';
import { NavItem } from './nav-item';
import BookIcon from '@mui/icons-material/Book';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import CalculateIcon from '@mui/icons-material/Calculate';
import CodeIcon from '@mui/icons-material/Code';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import axiosInstance from "src/components/axios";
import TopicOutlinedIcon from '@mui/icons-material/TopicOutlined';

const items = [
  {
    href: '/',
    icon: (<ChartBarIcon fontSize="small" />),
    title: 'Dashboard'
  },
  {
    href: '/thesis',
    icon: (<AutoStoriesIcon fontSize="small" />),
    title: 'Project Thesis'
  },  
  {
    href: '/tutorial',
    icon: (<HelpOutlineIcon fontSize="small" />),
    title: 'Tutorial'
  },
  {
    href: '/titles',
    icon: (<TipsAndUpdatesIcon fontSize="small" />),
    title: 'Creator Wizard'
  },

  {
    href: '/account',
    icon: (<UserIcon fontSize="small" />),
    title: 'Account'
  },
  /*
  {
    href: '/notes',
    icon: (<CogIcon fontSize="small" />),
    title: 'Notes wizard'
  },
  {
    href: '/notes',
    icon: (<CogIcon fontSize="small" />),
    title: 'Short Summary'
  },
  {
    href: '/login',
    icon: (<LockIcon fontSize="small" />),
    title: 'Login'
  },
  {
    href: '/register',
    icon: (<UserAddIcon fontSize="small" />),
    title: 'Register'
  },
  {
    href: '/404',
    icon: (<XCircleIcon fontSize="small" />),
    title: 'Error'
  }*/
];

export const DashboardSidebar = (props) => {
  const { open, onClose } = props;
  const router = useRouter();
  const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'), {
    defaultMatches: true,
    noSsr: false
  });

  const [subtopics, setSubtopics] = useState([])
  const [reloading, setReloading] = useState(false)

  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }

      if (open) {
        onClose?.();
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.asPath]
  );


  useEffect(() => {
    if (typeof window !== "undefined") {
      const notesID = localStorage.getItem("notesID");
      if(notesID !== null){
      axiosInstance.get(`notesapi/create/${notesID}/`).then((response) => {
        setSubtopics(response.data.data);
        });
      }
    } else {
      console.log("Authetication Error");
    }

  }, []);




  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <div>
          <Box sx={{ p: 3 }}>
            <NextLink
              href="/"
              passHref
            >
              <a>
                <Logo
                  sx={{
                    height: 42,
                    width: 42
                  }}
                />
              </a>
            </NextLink>
          </Box>
          <Box sx={{ px: 2 }}>
            <Box
              sx={{
                alignItems: 'center',
                backgroundColor: 'rgba(255, 255, 255, 0.04)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius: 1
              }}
            >
              <div>
                <Typography
                  color="inherit"
                  variant="subtitle1"
                >
                  Genie
                </Typography>
                <Typography
                  color="neutral.400"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : Free
                </Typography>
              </div>
              <SelectorIcon
                sx={{
                  color: 'neutral.500',
                  width: 14,
                  height: 14
                }}
              />
            </Box>
          </Box>
        </div>
        <Divider
          sx={{
            borderColor: '#2D3748',
            my: 3
          }}
        />
        <Box sx={{ flexGrow: 1, fontSize:1 }}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>
        <Divider sx={{ borderColor: '#2D3748' }} />
        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >
        <h5 style={{textAlign:"center", backgroundColor:"#5048E5", borderRadius:"5px", padding:"5px"}}>Subtopics</h5><br/>
        {subtopics.map((topics) => (

          <Button onClick={()=>{
              localStorage.setItem("subtopicsID", topics['id']);
              //localStorage.setItem('notesID', value['id']);
              window.location.reload(true);
              router.push('/notes');
            }} 
              key = {topics['query']}
              variant="text" 
              style={{color:"#fff"}} 
              startIcon={(<TopicOutlinedIcon color="primary" 
              size="small" />)}
            >

              {topics['query'].length > 20 ? topics['query'].substring(0, 14) + "..." : topics['query']}
            </Button>

          ))}


        </Box>
      </Box>
    </>
  );

  if (lgUp) {
    return (
      <Drawer
        anchor="left"
        open
        PaperProps={{
          sx: {
            backgroundColor: 'neutral.900',
            color: '#FFFFFF',
            width: 230,
          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
    <Divider sx={{ borderColor: '#2D3748' }} />
  }

  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.900',
          color: '#FFFFFF',
          width: 280
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>

  );
  <Divider sx={{ borderColor: '#2D3748' }} />
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};


