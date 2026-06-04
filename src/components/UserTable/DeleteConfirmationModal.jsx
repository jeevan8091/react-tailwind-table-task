const DeleteConfirmationModal = ({ user, onCancel, onDelete }) => {
  if (!user) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-900/20">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-red-100 bg-red-50 text-red-600">
          <svg className="h-7 w-7" fill="none" stroke="currentColor" strokeWidth="2.25" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166M19.228 5.79L18.16 19.673A2.25 2.25 0 0115.916 21H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397M4.772 5.79c1.14-.173 2.306-.304 3.478-.397m7.5 0V4.477A1.125 1.125 0 0014.625 3h-5.25A1.125 1.125 0 008.25 4.477v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
          </svg>
        </div>

        <div className="mt-5 text-center">
          <h2 className="text-[20px] font-semibold text-slate-800">Delete user?</h2>
          <p className="mt-2 text-sm font-medium leading-6 text-slate-500">
            Are you sure you want to delete <span className="font-semibold text-slate-700">{user.name}</span>? This action removes the user from the current table view.
          </p>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={onCancel}
            className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition-colors duration-200 hover:bg-slate-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onDelete(user.id)}
            className="rounded-2xl bg-red-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-red-100 transition-all duration-300 hover:-translate-y-0.5 hover:bg-red-700 hover:shadow-xl hover:shadow-red-100"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
