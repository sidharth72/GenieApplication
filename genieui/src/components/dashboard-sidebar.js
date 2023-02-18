import { useEffect } from 'react';
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
import CollectionsBookmarkOutlinedIcon from '@mui/icons-material/CollectionsBookmarkOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import CreateIcon from '@mui/icons-material/Create';

const items = [
  {
    href: '/',
    icon: (<CreateIcon fontSize="small" />),
    title: 'How to write?'
  },
  {
    href: '/create-article',
    icon: (<LibraryBooksOutlinedIcon fontSize="small" />),
    title: 'Your Posts'
  },
  {
    href: '/projects',
    icon: (<CollectionsBookmarkOutlinedIcon fontSize="small" />),
    title: 'Suggest Article'
  },
  {
    href: '/products',
    icon: (<CogIcon fontSize="small" />),
    title: 'Other Tools'
  },
  {
    href: '/products',
    icon: (<UserIcon fontSize="small" />),
    title: 'Perform Task'
  },
  {
    href: '/notes',
    icon: (<CogIcon fontSize="small" />),
    title: 'Analyser'
  },
  /*{
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

  const content = (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          //backgroundColor:""
          
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
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                px: 3,
                py: '11px',
                borderRadius:'10px',
                backgroundColor:"#F9FAFC"
                //boxShadow:"rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;"
                
                
              }}
            >
              <div>
                <Typography
                  color="#101828"
                  variant="subtitle1"

                >
                  Your Name
                </Typography>
                <Typography
                  color="#101828"
                  variant="body2"
                >
                  Your tier
                  {' '}
                  : <span style={{color:"#10B981"}} >Free</span>
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
        <br/>
        <Box sx={{ flexGrow: 1}}>
          {items.map((item) => (
            <NavItem
              key={item.title}
              icon={item.icon}
              href={item.href}
              title={item.title}
            />
          ))}
        </Box>

        <Box
          sx={{
            px: 2,
            py: 3
          }}
        >

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
            width: 245,
            border:"none",
            boxShadow:"none"

          }
        }}
        variant="permanent"
      >
        {content}
      </Drawer>
    );
  }

  
  return (
    <Drawer
      anchor="left"
      onClose={onClose}
      open={open}
      PaperProps={{
        sx: {
          backgroundColor: '#fff',
          color: '#121212',
          border:"none",
          boxShadow:"none",
          width: 250
        }
      }}
      sx={{ zIndex: (theme) => theme.zIndex.appBar + 100 }}
      variant="temporary"
    >
      {content}
    </Drawer>
  );
};

DashboardSidebar.propTypes = {
  onClose: PropTypes.func,
  open: PropTypes.bool
};


