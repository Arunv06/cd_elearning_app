/*eslint-disable-next-line*/
import React, { useState, useEffect } from 'react'; 
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';


const Allcourses = () => {
  const navigate = useNavigate();
      // Add your logic here when a card is clicked
      // For example, you can redirect to a new page or show additional information
      //console.log(`Clicked on ${title}` );
      const courseDetails =  (e) => {
          console.log('-----', e)
          navigate(`/coursedetails/${e}`);
      }
      const [data, setData] = useState([]);
      const [customerName, setCustomerName] = useState('');
  useEffect(() => {
    const storedCustomerName = sessionStorage.getItem('customerName');

        // Update state with the retrieved customer name
        setCustomerName(storedCustomerName || '');
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3000/courses');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
     <div className="container-fluid p-5">


    {/* NavBar */}
    <nav class="navbar navbar-expand-sm navbar-dark bg-light">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="j">All Courses</a>
    <a class="navbar-brand text-dark" href="j">My Dashboard</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
    <ul class="navbar-nav me-auto">
       
       </ul>
      <form class="d-flex">
       
        <button class="btn btn-primary" type="button"  >Logout</button>
      </form>
    </div>
  </div>
</nav>

    {/* ROW 1 */}
    <h1>Greetings {customerName} ,</h1>
    <div className="row">
    
      <div className="col-12 text-black" ><h4>Take a look into the list of all courses</h4></div>
    </div>
    <br />
    
    <div className="row">
    {data.map(item => (
    <div className="col-3  text-white">
      <div className="card"  style={{ width: '100%', height:'100%' }} onClick={() => courseDetails(item.id)}>
      <img
        className="card-img-top"
        src="https://s2.research.com/wp-content/uploads/2021/01/24120039/ResponsiveWebDesign-1-1200x600.png"
        alt="responsive"
         style={{ width: '100%' }}
      />
      <div className="card-body ">
        <h4 className="card-title " >{item.course_title}</h4>
        <p className="card-text"  >course<small> ID : {item.course_id}</small> </p>
        <div className="row">
      <div className="col-6 bg-light p-3 text-black p-1" >Start Date:<p>{item.course_starts}</p></div>
      <div className="col-6 bg-light p-3 text-black p-1">End Date:<p> {item.course_ends}</p></div>
      </div>
      </div>
    </div> </div>  ))}
    

    


   


    
    </div>
    <br />
    

   

<br /> <br />

</div>
  
);
  };

export default Allcourses;
