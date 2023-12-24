

import React, { useState, useEffect } from 'react'; 
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./Allcourses.css";
const Allcoursesdetails = () => {
  const [data, setData] = useState([null]);
  const { id } = useParams();
  const [customerId, setCustomerId] = useState('');
  const [checkstatus, setCheckStatus] = useState(0);
  const navigate = useNavigate();
  const unenroll =  async (e) => {
    console.log('-----', e)
    try {
        const response = await fetch('http://localhost:3000/unenroll' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({course_id:id,customer_id:customerId}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        console.log(jsonData);
       
        alert(jsonData.message)
            navigate(`/allcourses`);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
  const enroll =  async (e) => {
    console.log('-----', e)
    try {
        const response = await fetch('http://localhost:3000/enroll' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({course_id:id,customer_id:customerId}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        console.log(jsonData);
       
        alert(jsonData.message)
            navigate(`/allcourses`);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
}
  useEffect(() => {
    const storedCustomerId = sessionStorage.getItem('customerId');
    setCustomerId(storedCustomerId || '');

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/coursedetails' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({course_id:id}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData.coursedetails);


        const response2= await fetch('http://localhost:3000/checkstatus' , {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({course_id:id,customer_id:storedCustomerId}),
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData2 = await response2.json();
        console.log(jsonData2);
        setCheckStatus(jsonData2.status);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);
console.log(data);
  return (
    <div>
     
      <nav className="navbar navbar-expand-sm navbar-dark bg-light">
  <div className="container-fluid">
    <a className="navbar-brand text-dark" href="j">My Courses</a>
    <a className="navbar-brand text-dark" href="j">My Dashboard</a>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="mynavbar">
    <ul className="navbar-nav me-auto">
       
       </ul>
      <form className="d-flex justify-content-lg-end" id="logout1">
       
        <button className="btn btn-primary" type="button">Logout</button>
      </form>
    </div>
  </div>
</nav>
{data ? (<div className='row'>
        <div className='col-lg-6  '>
           <div className="card" style={{width:"100%"}}>
             <div className="card-body">
               <br /><br /><br />
                <h2 className="card-title">{data.course_title}</h2>
     
                   <div className="row">
                    <div className="col-6  p-4 text-black p-1"><b>Instructors :</b> { data.instructors } <p><b>Duration :</b>{data.duration} </p></div>
                     <div className="col-6  p-4 text-black p-1"><b>Course Starts :</b> 19-12-2022<p><b>Course Ends :</b> 15-06-2023</p></div>
                        <p className="card-text">React.js, more commonly known as React, is a free, open-source JavaScript library <br />
                        It works best to build user interfaces by combining sections of code (components) into full websites. 
                        Originally built by Facebook, <br />  <br />Meta and the open-source community now maintain it. 
                        One of the good things about React is that you can use it as much or as little as you want!
                     
                       React.js is built using JSX – A combination of JavaScript and XML. Elements are created using JSX, then use JavaScript
                     to render them on your site. <br /> <br /> While React has a steep learning curve
                 for a junior developer, it’s quickly shaping into one of the most popular and in-demand JavaScript libraries.</p>
             </div>
             
       </div>
       <div className='text-centered'>
      {/* <button className="btn btn-primary " type="button" id="enroll"  onClick={enroll}>Enroll Now</button> */}
       {checkstatus ? (
       <button className="btn btn-primary " type="button" id="enroll"  onClick={unenroll}>Unenroll Now</button>
            ) : (
       <button className="btn btn-primary " type="button" id="enroll"  onClick={enroll}>Enroll Now</button>
            )}
       </div>
       
   </div>
</div>

          
           
        <div className='col-lg-6' >
          <img src="https://s2.research.com/wp-content/uploads/2021/01/24120039/ResponsiveWebDesign-1-1200x600.png" 
          alt='sideimg' 
           style={{ width: '100%', height:'100%' }}/>
        </div>
        
      </div>) : (
        <p>Loading...</p>
      )}
      
    </div>
  );
};

export default Allcoursesdetails