import { HashRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ProductsList from './pages/ProductsList'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'
import Purchases from './pages/Purchases'
import NavBar from './components/NavBar'
import LoadingScreen from './components/LoadingScreen'
import { useSelector } from 'react-redux'
import { Container } from 'react-bootstrap'
import ProtectedRoutes from './components/ProtectedRoutes'


function App() {

  const isLoading = useSelector(state => state.loading)


  return (
    <HashRouter>
      <NavBar />
      {isLoading && <LoadingScreen />}
      <Container className="my-5">
        <Routes>
          <Route path='/' element={<ProductsList />} />
          <Route path='/product/:id' element={<ProductDetail />} />
          <Route path='/login' element={<Login />} />
          <Route element={<ProtectedRoutes/>}>
            <Route path='/purchases' element={<Purchases />} />
          </Route>

        </Routes>
      </Container>
    </HashRouter>
  )
}

export default App
