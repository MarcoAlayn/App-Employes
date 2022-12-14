import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectEmployees, selectLoading } from '../../store/slices/Main';
import { getEmployees } from '../../store/thunks';
import Loader from '../Common/Loader';
import Table from '../Common/Table';
import EmployeeForm from './EmployeeForm';


const Employees = () => {
  const loading = useSelector(selectLoading);
  // const dispatch = useDispatch();
  const dispatch = useDispatch<any>();
  const employees = useSelector(selectEmployees);
  useEffect(() => {
    if (employees == null) dispatch(getEmployees());
  }, [dispatch, employees]);
  return (
    <div style={{ padding: "30px" }} className='container-fluid' >
      <div className='row justify-content-center'>
        <div style={{ textAlign: "center" }} className='col-md-6'>

          <h3>Employee Data</h3>
          {loading.includes('getEmployees') || loading.includes('postEmployee') ? (
            <Loader size="small" />
          ) : employees != null && employees.length > 0 ? (
            <Table data={employees || []} pageSize={10} />
          ) : (
            <h3>No employee information received</h3>
          )}
        </div>

        <div style={{ paddingTop: "40px" }} className='col-md-3'>
          <EmployeeForm />
        </div>
      </div>

    </div>
  );
};

export default Employees;