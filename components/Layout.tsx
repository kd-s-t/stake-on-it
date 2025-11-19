import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'
import { ReactNode, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { motion, AnimatePresence } from 'framer-motion'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
  Box,
  Chip,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  useMediaQuery,
  useTheme
} from '@mui/material'
import { AccountCircle, ArrowDropDown, Menu as MenuIcon } from '@mui/icons-material'
import { useAppSelector, useAppDispatch } from '../store/hooks'
import { setUser, logout, updateBalance } from '../store/userSlice'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouter()
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user.user)
  const balance = user?.balance || 0

  useEffect(() => {
    const token = localStorage.getItem('token')
    const userData = localStorage.getItem('user')
    if (token && userData) {
      const parsedUser = JSON.parse(userData)
      dispatch(setUser({ user: parsedUser, token }))
    }
  }, [dispatch])

  // Refresh balance periodically and on route change
  useEffect(() => {
    if (!user) return

    const refreshBalance = async () => {
      try {
        const token = localStorage.getItem('token')
        const res = await fetch('/api/user-stats', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
        const data = await res.json()
        if (data.balance !== undefined) {
          dispatch(updateBalance(parseFloat(data.balance) || 0))
        }
      } catch (error) {
        console.error('Failed to refresh balance')
      }
    }

    refreshBalance()
    // Refresh on route change
    const interval = setInterval(refreshBalance, 30000) // Every 30 seconds
    return () => clearInterval(interval)
  }, [user, router.pathname, dispatch])

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    dispatch(logout())
    setAnchorEl(null)
    router.push('/login')
  }

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/news', label: 'News' },
    { href: '/market-predictions', label: 'Market Predictions' },
    { href: '/stakes', label: 'Stakes' }
  ]

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Box sx={{ mx: { xs: 1, sm: 3 }, mt: { xs: 2, sm: 3 }, mb: 3 }}>
          <AppBar
            position="static"
            sx={{
              background: '#fff',
              borderRadius: '0.75rem',
            }}
          >
            <Toolbar sx={{ flexWrap: 'wrap', gap: { xs: 1, sm: 2 }, py: { xs: 1, sm: 2 }, px: { xs: 2, sm: 3 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: { xs: 1, sm: 2 }, cursor: 'pointer' }} onClick={() => router.push('/')}>
              <Image
                src="/logo.png"
                alt="Stake On It Logo"
                width={isMobile ? 30 : 40}
                height={isMobile ? 26 : 32}
                priority
              />
            </Box>
            {isMobile ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto', mr: { xs: 0, sm: 0 } }}>
                  {user ? (
                    <>
                      <Chip
                        label={`₱${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                        size="small"
                        sx={{
                          bgcolor: '#10b981',
                          color: 'white',
                          fontWeight: 600,
                          fontSize: '0.7rem',
                          height: 24
                        }}
                      />
                      <IconButton
                        onClick={handleMenu}
                        sx={{ color: '#000', p: 0.5 }}
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                      >
                        <MenuItem onClick={() => { router.push('/profile'); handleClose() }}>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Button
                      href="/login"
                      variant="contained"
                      size="small"
                      sx={{
                        bgcolor: '#424242',
                        color: 'white',
                        fontWeight: 600,
                        fontSize: '0.7rem',
                        minWidth: 60,
                        px: 1.5,
                        '&:hover': {
                          bgcolor: '#212121',
                        },
                      }}
                    >
                      Login
                    </Button>
                  )}
                  <IconButton
                    onClick={() => setMobileMenuOpen(true)}
                    sx={{ color: '#000' }}
                  >
                    <MenuIcon />
                  </IconButton>
                </Box>
                <Drawer
                  anchor="right"
                  open={mobileMenuOpen}
                  onClose={() => setMobileMenuOpen(false)}
                >
                  <Box sx={{ width: 250, pt: 2 }}>
                    <List>
                      {navItems.map((item) => {
                        const isActive = router.pathname === item.href
                        return (
                          <ListItem key={item.href} disablePadding>
                            <ListItemButton
                              component={Link}
                              href={item.href}
                              onClick={() => setMobileMenuOpen(false)}
                              sx={{
                                bgcolor: isActive ? '#424242' : 'transparent',
                                color: isActive ? 'white' : '#000',
                                '&:hover': {
                                  bgcolor: isActive ? '#212121' : 'rgba(0, 0, 0, 0.04)'
                                }
                              }}
                            >
                              <ListItemText primary={item.label} />
                            </ListItemButton>
                          </ListItem>
                        )
                      })}
                    </List>
                  </Box>
                </Drawer>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 1.5, flexGrow: 1, flexWrap: 'wrap' }}>
                {navItems.map((item) => {
                  const isActive = router.pathname === item.href
                  return (
                    <Button
                      key={item.href}
                      component={Link}
                      href={item.href}
                      variant={isActive ? 'contained' : 'text'}
                      size="small"
                      sx={{
                        textTransform: 'none',
                        borderRadius: '1rem',
                        minWidth: { xs: 80, sm: 100 },
                        fontSize: { xs: '0.75rem', sm: '0.875rem' },
                        ...(isActive ? {
                          bgcolor: '#424242',
                          color: 'white',
                          '&:hover': {
                            bgcolor: '#212121'
                          }
                        } : {
                          color: 'black',
                          '&:hover': {
                            bgcolor: 'rgba(0, 0, 0, 0.04)'
                          }
                        })
                      }}
                    >
                      {item.label}
                    </Button>
                  )
                })}
              </Box>
            )}
            {user && !isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 }, ml: 'auto', mr: 0 }}>
                <Chip
                  label={`₱${balance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}
                  sx={{
                    bgcolor: '#10b981',
                    color: 'white',
                    fontWeight: 600,
                    fontSize: { xs: '0.7rem', sm: '0.875rem' }
                  }}
                />
                <Button
                  onClick={handleMenu}
                  startIcon={<AccountCircle />}
                  endIcon={<ArrowDropDown />}
                  sx={{
                    color: '#000',
                    fontSize: { xs: '0.75rem', sm: '0.875rem' },
                    '&:hover': {
                      bgcolor: 'rgba(0, 0, 0, 0.04)'
                    }
                  }}
                >
                  {user.name}
                </Button>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                >
                  <MenuItem onClick={() => { router.push('/profile'); handleClose() }}>
                    Profile
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </Box>
            )}
            {!user && !isMobile && (
              <Button
                href="/login"
                variant="contained"
                size={isMobile ? 'small' : 'medium'}
                sx={{
                  bgcolor: '#424242',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: { xs: '0.75rem', sm: '0.875rem' },
                  ml: 'auto',
                  '&:hover': {
                    bgcolor: '#212121',
                  },
                }}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        </Box>

        <Box sx={{ maxWidth: 'lg', mx: 'auto', px: { xs: 2, sm: 3 }, mt: { xs: 2, sm: 3 } }}>
          <motion.main
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={router.pathname}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                {children}
              </motion.div>
            </AnimatePresence>
          </motion.main>
        </Box>
      </motion.div>
    </>
  )
}