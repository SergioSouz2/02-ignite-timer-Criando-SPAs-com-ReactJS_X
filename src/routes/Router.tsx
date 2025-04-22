import { Routes, Route } from 'react-router-dom'
import { HomePage } from '../pages/HomePage/HomePage'
import { HistoryPage } from '../pages/HistoryPage/HistoryPage'
import { DefaultLayout } from '../layouts/DefaultLayout/DefaultLayout'

export function Router() {
   return (
      <Routes>
         <Route path='/' element={<DefaultLayout/>}>
            <Route path='/' element={<HomePage />} />
            <Route path='/history' element={<HistoryPage />} />
         </Route>
      </Routes>
   )
}