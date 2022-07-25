import styles from '../../styles/layout/BoardColumnsContainer.module.scss'
import BoardColumn from '../reusables/BoardColumn'
//TS Props interface
import { BoardColumnsProps } from '../../typings/interfaces'
import EmptyBoardScreen from '../ui/EmptyBoardScreen'
import AddNewColumnUi from '../ui/AddNewColumnUi'
const BoardColumnsContainer = ({board}: BoardColumnsProps)=> {
  return(
    <div data-testid="columns-container" className={`${styles.container} w-full h-full relative`}>
      {!board.columns.length && <EmptyBoardScreen />}
      {board.columns.map(column=> {
        return(
          <BoardColumn key={column.name} name={column.name} tasks={column.tasks}/>
        )
      })}
      {board.columns.length && <AddNewColumnUi />}
    </div>
  )
}

export default BoardColumnsContainer