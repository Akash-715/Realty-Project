import './style.css'

export default function Pagination({totalPage , rowsPerPage , setCurrentPage , currentPage}){

    let pages = [];

    for(let i = 1; i <= Math.ceil(totalPage / rowsPerPage); i++){
        pages.push(i);
    }

    return(
        <div className="pageContainer">
            {pages.map((page , index) => {
                return <button key={index} onClick={() => setCurrentPage(page)} className={page == currentPage ? 'active' : ''}>
                    {page}
                </button>
            }) } 
        </div>

    );
}