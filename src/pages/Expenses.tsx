interface ExpensesProps {
  hasExpensesAccess?: boolean;
}

const Expenses = ({ hasExpensesAccess = false }: ExpensesProps) => {
  if (!hasExpensesAccess) {
    return (
      <div className="flex flex-col items-center justify-center min-h-full">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Access Denied</h1>
        <p className="text-xl text-gray-600 text-center">
          You are not authorized to view this page.
          <br />
          If you believe this is an error, please contact the accounting department.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-full">
      <h1 className="text-3xl font-bold text-gray-900 mb-4">Expenses</h1>
      <p className="text-xl text-gray-600 text-center">
        This page is under construction
      </p>
    </div>
  );
};

export default Expenses; 