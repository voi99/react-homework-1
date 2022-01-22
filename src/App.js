import React from 'react'
import styles from './App.module.css'
import Main from './components/Main'
import { Routes, Route } from 'react-router-dom'
import FirstTask from './Task-1/FirstTask'
import SecondTask from './Task-2/SecondTask'
import ThirdTask from './Task-3/ThirdTask'
import Header from './components/Header'
import Footer from './components/Footer'
import { Helmet } from 'react-helmet-async'
import { AnimatePresence } from 'framer-motion'
import withRouter from './withRouter'

const App = ({ location }) => {
   return (
      <div className={styles.app}>
         <Helmet>
            <title>Homework 1</title>
         </Helmet>
         <Header />
         <AnimatePresence exitBeforeEnter>
            <Routes location={location} key={location.key}>
               <Route path='/' element={<Main />} />
               <Route path='/task-1' element={<FirstTask />} />
               <Route path='/task-2' element={<SecondTask />} />
               <Route path='/task-3/*' element={<ThirdTask />} />
            </Routes>
         </AnimatePresence>
         <Footer />
      </div>
   )
}

export default withRouter(App)
