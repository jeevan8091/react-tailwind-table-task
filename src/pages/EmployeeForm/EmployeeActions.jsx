/**
 * EmployeeActions Component
 * Renders action buttons (delete) for employee rows
 */
const EmployeeActions = ({ index, onDelete }) => {
  const handleDelete = () => {
    onDelete(index);
  };

  return (
    <div className="flex items-center justify-center gap-2">
      <button
        type="button"
        onClick={handleDelete}
        className="inline-flex items-center justify-center p-2 text-red-600 hover:bg-red-50 hover:text-red-800 rounded-lg transition-all duration-200 group"
        title="Delete row"
        aria-label="Delete employee record"
      >
        {/* Delete/Trash Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </div>
  );
};

export default EmployeeActions;
