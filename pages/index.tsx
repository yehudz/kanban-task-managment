import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import TopBar from '../components/layout/TopBar'
import BoardColumnsContainer from '../components/layout/BoardColumnsContainer'
import Head from 'next/head'
import appContext from '../context/appContext'
import RightSidebar from '../components/layout/RightSidebar'
import MobileMenu from '../components/ui/MobileMenu'
import { Board, TaskItem } from '../typings/common.types'
import ResuableModal from '../components/reusables/ReusableModal'
import TaskDetailsForm from '../components/reusables/TaskDetailsForm'

// Dummy data singleton
import dummyData from '../data.json'

const Home: NextPage = (props) => {
  const [isMobile, setIsMobile] = useState<boolean>(false)
  const [openMobileMenu, setOpenMobileMenu] = useState<boolean>(false)
  const [exampleBoard, setExampleBoard] = useState<Board>({name: '', columns: []})
  const [modalVisibility, setModalVisibility] = useState<boolean>(false)
  const [taskDetails, setTaskDetails] = useState<TaskItem>({})

  useEffect(()=> {
    if (window.innerWidth < 900) setIsMobile(true)
  }, [])

  setTimeout(()=> {
    setExampleBoard(dummyData.boards[0])
  }, 1000)

  return (
    <>
      <Head>
        <title>Kanban Task Managment</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@500;700&display=swap" rel="stylesheet" />
      </Head>
      <appContext.Provider value={{isMobile, setOpenMobileMenu, modalVisibility, setModalVisibility, setTaskDetails}}>
        <div className="flex flex-row w-full h-screen bg-grey-400 dark:bg-grey">
          <div data-testid="left-container">
            {!isMobile && <RightSidebar />}
          </div>
          {isMobile && <MobileMenu show={openMobileMenu}/>}
          <div data-testid="right-container" className='w-full'>
            <TopBar boardName={exampleBoard.name}/>
            <BoardColumnsContainer board={exampleBoard}/>
          </div>
        </div>
        <ResuableModal>
          {taskDetails && <TaskDetailsForm 
            title={taskDetails?.title} 
            description={taskDetails?.description}
            status={taskDetails?.status}
            subtasks={taskDetails?.subtasks}
          />}
        </ResuableModal>
      </appContext.Provider>
    </>
  )
}

export default Home
