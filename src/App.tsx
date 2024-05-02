import { useState } from 'react'
import { BrowserRouter as Router, Link, Outlet, Route, Routes} from 'react-router-dom'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import './App.css'

import Home from './components/Home/Home.tsx';
import Gallery from './components/Gallery/Gallery.tsx';
import Details from './components/Details/Details.tsx';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function MenuLayout() {
	const [activeTab, setActiveTab] = useState(0);

	function handleTabChange(_event: React.SyntheticEvent, newValue: number) {
    setActiveTab(newValue);
	}

	return (
	  <div>
      <div className='navBar'>
        <h1>Movies Galore!</h1>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab disableRipple={true} label='search' to='/movies-galore' component={Link} />
          <Tab disableRipple={true} label='gallery' to='/movies-galore/gallery' component={Link} />
        </Tabs>
      </div>
      
		{/* An <Outlet> renders whatever child route is currently active,
			so you can think about this <Outlet> as a placeholder for
			the child routes we defined above. */}
		<Outlet />
	  </div>
	);
}

function NoMatch() {
	return (
		<div>
			<h2>This is not the page you were looking for</h2>
			<p>
				<Link to="/movies-galore">Go back to the home page</Link>
			</p>
		</div>
	);
}

export default function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/movies-galore" element={<MenuLayout />}>
            <Route index element={<Home />} />
            <Route path="/movies-galore/gallery" element={<Gallery />} />
            <Route path='/movies-galore/details' element={<Details />} />
            <Route path='*' element={<NoMatch />} />
          </Route>
        </Routes>
      </Router>
    </ThemeProvider>
  )
}