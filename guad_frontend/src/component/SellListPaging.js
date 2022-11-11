import Pagination from "react-js-pagination"
import "./SellListPaging.css"

function SellListPaging({ page, count, handlerSetPage }) {
    return (
        <Pagination
            activePage={page}
            itemsCountPerPage={12}
            totalItemsCount={count}
            pageRangeDisplayed={3}
            prevPageText={'‹'}
            nextPageText={'›'}
            onChange={handlerSetPage}
        />
    )
}

export default SellListPaging

// .gr {
//     color: #808080;
//   }
//   .pagination {
//     display: flex;
//     justify-content: center;
//     margin-top: 15px;
//   }
//   ul {
//     list-style: none;
//     padding: 0;
//   }
//   ul.pagination li {
//     display: inline-block;
//     width: 30px;
//     height: 30px;
  
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     font-size: 1rem;
//   }
  
//   ul.pagination li a {
//     text-decoration: none;
//     color: #808080;
//     font-size: 1rem;
//   }
//   ul.pagination li.active a {
//     font-weight: 800;
//   }
//   ul.pagination li.active {
//     font-weight: 800;
//   }
//   ul.pagination li a:hover,
//   ul.pagination li a.active {
//     color: #808080;
//   }
//   .page-selection {
//     width: 48px;
//     height: 30px;
//     color: #808080;
//   }