
interface Props {
    totalItems: number;
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>
}


export const Pagination = ({ totalItems, page, setPage }) => {

    const handleNextPage = () => {
        setPage(page + 1);
    };

    const handlePrevPage = () => {
        setPage(prevPage => Math.max(prevPage - 1, 1));
    };

    const itemsPerPage = 10;
    const totalPage = totalItems
        ? Math.ceil(totalItems / itemsPerPage)
        : 1;
    const isLastPage = page >= totalPage;

    const startItem = (page - 1) * itemsPerPage + 1;
    const endItem = Math.min(page * itemsPerPage, totalItems)


    return <div>

    </div>
}