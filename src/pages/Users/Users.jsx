import Table from '../../components/UserTable/Table';

const Users = () => {
  return (
    <div className="space-y-8">
      <section>
        <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-blue-600">
          Users
        </p>
        <h2 className="mt-2 text-[30px] font-bold tracking-tight text-slate-800">
          Employee Directory
        </h2>
        <p className="mt-2 max-w-2xl text-sm font-medium leading-6 text-slate-500">
          Search, review, and manage employee information.
        </p>
      </section>

      <Table />
    </div>
  );
};

export default Users;
