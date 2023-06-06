
import Pagination from "react-bootstrap/Pagination";
import classes from "./pagination.module.scss";

const PaginationBasic = (props: {
  pages: number,
  currentPage: number,
  emitCurrentPage: Function
}) => {
  const { pages, currentPage, emitCurrentPage } = props;

  let items = [];
  for (let number = 1; number <= pages; number++) {
    items.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={()=>emitCurrentPage(number)}>
        {number}
      </Pagination.Item>,
    );
  }
  const handleClickPrev = () => {
    if(currentPage>1){
      emitCurrentPage(currentPage-1);
    }
  }
  const handleClickNext = () => {
    if(currentPage<pages){
      emitCurrentPage(currentPage+1);
    }
  }

  const pagination = (
    <div className={classes.pagination}>
      <Pagination size="sm">
        <Pagination.Prev onClick={handleClickPrev}/>
        {items}
        <Pagination.Next onClick={handleClickNext}/>
      </Pagination>
    </div>
  )

  return  pagination
};

export default PaginationBasic;
