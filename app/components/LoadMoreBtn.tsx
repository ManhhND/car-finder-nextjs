interface LoadMoreBtnProps {
  onBtnClick: () => void;
}
const LoadMoreBtn = ({ onBtnClick }: LoadMoreBtnProps) => {
  return (
    <button
      onClick={onBtnClick}
      type="button"
      className="bg-gray-4 font-bold text-white px-9 py-2.5 m-auto block rounded min-w-40"
    >
      Show more
    </button>
  );
};

export default LoadMoreBtn;
