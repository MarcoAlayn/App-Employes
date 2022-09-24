import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { postEmployee } from '../../store/thunks';
import CustomButton from '../Common/SubmitButton';
import '../../styles/Theme.css'

interface Props { }

const EmployeeForm = (props: Props) => {
  const [name, setName] = useState<string>('');
  const [lastName, setLastName] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [active, setActive] = useState<boolean>(false);
  // const dispatch = useDispatch();
  const dispatch = useDispatch<any>();
  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(postEmployee({ name, lastName, birthday }));
    clearInputs();
  };
  const clearInputs = () => {
    setName('');
    setLastName('');
    setBirthday('');
    setActive(!active);
  };
  return (
    <div className="">
      <div className="">
        <div className=''>
          <div style={{ color: "#e8c3ed", background: "#120b6f", padding: "30px", borderRadius: "20px", boxShadow: "5px 5px 5px" }}>
            <div className=''></div>
            <div className="">
              <h4 onClick={() => clearInputs()}>
                Add Employee
              </h4>
              <form className="form-group"
                // className={`add-employee-form ${active ? 'active' : ''}`}
                onSubmit={handleSubmit}
              >
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="form-control"
                />
                <label htmlFor="birth">Birthday</label>
                <input
                  type="date"
                  name="birth"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  className="form-select"
                />
                <div style={{ paddingTop: "10px" }}>
                  <CustomButton
                    disabled={
                      name === '' ||
                      name.length > 30 ||
                      lastName === '' ||
                      lastName.length > 30 ||
                      birthday === ''
                    }
                    className="btn btn-dark mb-3"
                    type="submit"
                  >
                    Create Employee
                  </CustomButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default EmployeeForm;