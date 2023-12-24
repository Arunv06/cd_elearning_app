import React from 'react'

const Unenroll = () => {
  return (
      
  <div>
        <nav class="navbar navbar-expand-sm navbar-dark bg-light">
  <div class="container-fluid">
    <a class="navbar-brand text-dark" href="j">My Courses</a>
    <a class="navbar-brand text-dark" href="j">My Dashboard</a>
    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mynavbar">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="mynavbar">
    <ul class="navbar-nav me-auto">
       
       </ul>
      <form class="d-flex justify-content-lg-end" id="logout1">
       
        <button class="btn btn-primary" type="button">Logout</button>
      </form>
    </div>
  </div>
</nav>
      <div className='row'>
        <div className='col-lg-6  '>
          <div class="card" style={{width:"100%"}}>
             <div class="card-body">
               <br /><br /><br />
                <h2 class="card-title">React js Tutorial</h2>
     
                   <div className="row">
                    <div className="col-6  p-4 text-black p-1"><b>Instructors :</b> Jane Doe,Steve Rogers <p><b>Duration :</b> 19 hours</p></div>
                     <div className="col-6  p-4 text-black p-1"><b>Course Starts :</b> 19-12-2022<p><b>Course Ends :</b> 15-06-2023</p></div>
                        <p class="card-text">React.js, more commonly known as React, is a free, open-source JavaScript library <br />
                        It works best to build user interfaces by combining sections of code (components) into full websites. 
                        Originally built by Facebook, <br />  <br />Meta and the open-source community now maintain it. 
                        One of the good things about React is that you can use it as much or as little as you want!
                     
React.js is built using JSX – A combination of JavaScript and XML. Elements are created using JSX, then use JavaScript
 to render them on your site. <br /> <br /> While React has a steep learning curve
 for a junior developer, it’s quickly shaping into one of the most popular and in-demand JavaScript libraries.</p>
             </div>
             
       </div>
       <div class='text-centered'>
       <button class="btn btn-primary " type="button" id="enroll" >UnEroll Now</button></div>
       
   </div>
</div>

          
           
        <div className='col-lg-6' >
          <img src="https://s2.research.com/wp-content/uploads/2021/01/24120039/ResponsiveWebDesign-1-1200x600.png" 
          alt='sideimg' 
           style={{ width: '100%', height:'100%' }}/>
        </div>
        
      </div>
       
  </div>
  );
};

export default Unenroll