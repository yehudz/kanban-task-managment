import SidebarMenuListItem from "../reusables/SidebarMenuListItem"
import styles from '../../styles/ui/ColumnsListMenu.module.scss'
import appContext from '../../context/appContext'
import { useContext } from "react"
import { BoardListItem } from "../../typings/common.types"

const ColumnsListMenu = ()=> {
  const {setModalVisibility, setModalContentType, boardsCount, boardsList} = useContext(appContext)

  let boards: BoardListItem[] = boardsList.map((board: BoardListItem, i: number)=> {
    return {
      id: board.id,
      name: board.name,
      active: i === 0 ? true : false
    }
  })
  function showAddBoardForm() {
    setModalVisibility(true)
    setModalContentType("CREATE_NEW_BOARD")
  }
  return(
    <div data-testid="columns-list-menu" className={`${styles.container} w-full`}>
      <div data-testid="columns-list-menu-title" className={`${styles.title} text-grey-400 font-bold`}>All Boards ({boardsCount})</div>
      <div data-testid="board-list-items" className="mt-7">
        {boards?.map((board: BoardListItem, i: number)=> {
          return(
            <div className="flex items-center" key={board.id}>
              <SidebarMenuListItem name={board.name} active={board.active}/>
            </div>
          )
        })}
      </div>
      <div onClick={()=> showAddBoardForm()} data-testid="add-board-button" className={`flex flex-row items-center cursor-pointer text-purple ${styles.createButton}`}>
        <img src="images/icon-board.svg" alt="board" />
        <span>+ Create New Board</span>  
      </div>
    </div>
  )
}

export default ColumnsListMenu