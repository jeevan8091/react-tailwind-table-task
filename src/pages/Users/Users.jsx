import Table from '../../components/UserTable/Table';

const Users = () => {
  return (
    <div className="space-y-6">
      <section>
        <p className="text-xs font-semibold text-blue-600">
          Users
        </p>
        <h2 className="mt-1 text-3xl font-bold text-slate-800">
          Employee Directory
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-normal leading-6 text-slate-500">
          Search, review, and manage employee information.
        </p>
      </section>

      <Table />
    </div>
  );
};

export default Users;
