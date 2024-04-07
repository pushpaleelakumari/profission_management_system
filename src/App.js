import { useState } from "react";


function App() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    profession: ""
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)
  const [data, setData] = useState(JSON.parse(localStorage.getItem('employee_data')) || [])

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = () => {
    const hasEmptyValue = Object.keys(formData).some(key => !formData[key]);
    if (hasEmptyValue) {
      setError(true)
    } else {
      setError(false)
      setSuccess(true)
      setData((prevData) => [...prevData, formData]);
      localStorage.setItem('employee_data', JSON.stringify([...data, formData]));
      setFormData({ name: "", age: "", profession: "" });
    }
  }

  const handleDelete = (user, index) => {
    console.log(user, 'hello user')
    let temp = [...data]
    temp.splice(index, 1)
    localStorage.setItem('employee_data', JSON.stringify(temp))
    setData(temp)
  }

  return (
    <section className="section">
      <div className="bg-dark text-white h-100">
        <div className="container py-5">
          <h3 className="py-3">New Employees</h3>
          <form onSubmit={(e) => e.preventDefault()}>
            <div className="row">
              <div className="col-lg-4">
                <label htmlFor="name" className="form-label mb-0">Name</label>
                <input type="text" className="form-control" name="name" value={formData?.name} onChange={(e) => handleChange(e)} />
              </div>
              <div className="col-lg-4">
                <label htmlFor="name" className="form-label mb-0">Enter Profession</label>
                <input type="text" className="form-control" name="profession" value={formData?.profession} onChange={(e) => handleChange(e)} />
              </div>
              <div className="col-lg-4">
                <label htmlFor="name" className="form-label mb-0">Enter Age</label>
                <input type="number" className="form-control" name="age" value={formData?.age} onChange={(e) => handleChange(e)} />
              </div>
            </div>
            <div>
              <div className="py-3">
                <button className="btn btn-light" onClick={() => handleSubmit()}>Add User</button>
              </div>
            </div>
          </form>
          {
            error ? <div className="text-danger py-1">Error: Please Make Sure All the fields are filled before adding in an employee !</div> :
              success && <div className="text-success">Success: Employee Added!</div>
          }
          <div>
            <div className="py-2">
              Add Employees
            </div>
            <div className="text-secondary py-4">
              you have {data?.length}  Employees
            </div>
          </div>
          <div className="my-2 container">
            {data?.map((user, index) => (
              <div key={index} className="py-2 ms-2">
                <div className="row">
                  <div className="col-lg-6 border pt-1 rounded">
                    <div className="row">
                      <div className="col-1">
                        <span >{index + 1}.</span>
                      </div>
                      <div className="col-4">
                        <span>Name: {user?.name}</span>
                      </div>
                      <div className="col-4">
                        <span>Profession: {user?.profession}</span>
                      </div>
                      <div className="col-3">
                        <span>Age: {user?.age}</span>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-5">
                    <button className="btn btn-light ms-3 rounded-3" onClick={() => handleDelete(user, index)}>Delete User</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default App;
