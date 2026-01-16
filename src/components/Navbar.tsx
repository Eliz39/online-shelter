import { useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  AppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
} from '@mui/material'
import { Close, Login, Logout, Menu as MenuIcon } from '@mui/icons-material'
import Logo from '../assets/logo.svg?react'
import { useAuth } from '../context/useAuth.tsx'

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Pets', href: '/pets' },
  { label: 'Volunteer', href: '/volunteer' },
]

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const router = useRouterState()
  const { user, handleLogout } = useAuth()
  const currentPath = router.location.pathname

  const logout = async () => {
    setMobileMenuOpen(false)
    await handleLogout()
  }

  return (
    <AppBar
      position="sticky"
      sx={{ bgcolor: 'background.default', boxShadow: 1 }}
    >
      <Container maxWidth="lg">
        <Toolbar
          sx={{ justifyContent: 'space-between', py: 1 }}
          disableGutters={true}
        >
          <Link
            to="/"
            style={{
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <Logo width={48} height={48} />
            <Box
              component="span"
              sx={{
                fontSize: { xs: '1.5rem', md: '1.75rem' },
                fontWeight: 500,
                color: 'text.primary',
                fontFamily: '"Pacifico"',
              }}
            >
              Pawsitive
            </Box>
          </Link>

          <Box
            sx={{
              display: { xs: 'none', md: 'flex' },
              alignItems: 'center',
              gap: 0.5,
            }}
          >
            {navItems.map(item => (
              <Button
                key={item.href}
                component={Link}
                to={item.href}
                sx={{
                  color:
                    currentPath === item.href ? 'primary.main' : 'text.primary',
                  fontWeight: currentPath === item.href ? 600 : 500,
                  px: 2,
                  '&:hover': { bgcolor: 'action.hover' },
                }}
              >
                {item.label}
              </Button>
            ))}
            {user === null ? (
              <Button
                component={Link}
                to="/login"
                variant="outlined"
                color="primary"
                startIcon={<Login />}
                sx={{ ml: 2 }}
              >
                Login
              </Button>
            ) : (
              <Button
                onClick={logout}
                variant="outlined"
                color="primary"
                startIcon={<Logout />}
                sx={{ ml: 2 }}
              >
                Logout
              </Button>
            )}
          </Box>

          <IconButton
            sx={{ display: { xs: 'flex', md: 'none' } }}
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </Container>

      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
      >
        <Box sx={{ width: 280, pt: 2 }}>
          <Box
            sx={{ display: 'flex', justifyContent: 'flex-end', px: 2, mb: 2 }}
          >
            <IconButton onClick={() => setMobileMenuOpen(false)}>
              <Close />
            </IconButton>
          </Box>
          <List>
            {navItems.map(item => (
              <ListItem key={item.href} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  selected={currentPath === item.href}
                >
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{
                      fontWeight: currentPath === item.href ? 600 : 500,
                      color:
                        currentPath === item.href
                          ? 'primary.main'
                          : 'text.primary',
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
            <ListItem disablePadding>
              {user === null ? (
                <ListItemButton
                  component={Link}
                  to="/login"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Login sx={{ mr: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary="Login"
                    slotProps={{
                      primary: {
                        fontWeight: 600,
                        color: 'primary.main',
                      },
                    }}
                  />
                </ListItemButton>
              ) : (
                <ListItemButton component={Button} onClick={logout}>
                  <Logout sx={{ mr: 2, color: 'primary.main' }} />
                  <ListItemText
                    primary="Logout"
                    slotProps={{
                      primary: {
                        fontWeight: 600,
                        color: 'primary.main',
                        textTransform: 'none',
                      },
                    }}
                  />
                </ListItemButton>
              )}
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </AppBar>
  )
}
