const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const { Sequelize, DataTypes } = require('sequelize');
const cors=require('cors');
const app = express();

// Connect to MySQL
const sequelize = new Sequelize('elearning_app', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});
const course_register = sequelize.define('course_registers', {
  
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false, 
     
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false, 
     
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false, 
     
  }
  });

// Define User and Course models
const customer = sequelize.define('customers', {
  customer_name: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  customer_id: {
    type: DataTypes.STRING,
    allowNull: false,
    
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const Course = sequelize.define('Courses', {
  course_title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_id: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  instructors: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  duration: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  course_starts: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  course_ends: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: false,
  },

});

// Define the many-to-many relationship between User and Course
// customer.belongsToMany(Course, { through: 'Enrollment' });
// Course.belongsToMany(customer, { through: 'Enrollment' });

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'secret-key', resave: true, saveUninitialized: true }));

// Set up routes
app.post('/coursedetails' ,  async (req, res) => {
  const {course_id}=req.body;
  const coursedetails = await Course.findOne({ where: {id:course_id } });
   if (coursedetails ) {
    
    res.send({
        success:true,coursedetails:coursedetails
    });
  } else {
    res.status(401).send({success:false,message:"invalid credentials"});
  }

}
  )

app.post('/login', async (req, res) => {
  const { customer_id, password } = req.body;
  console.log(req);
  const user = await customer.findOne({ where: { customer_id, password } });

  if (user) {
    req.session.userId = user.id;
    res.send({
        success:true,message:"login successful",customer_id:user.customer_id,customer_name:user.customer_name
    });
  } else {
   res.status(401).send({success:false,message:"invalid credentials"});
    }
});

app.get('/courses', async (req, res) => {
  const courses = await Course.findAll();
  res.json(courses);
  console.log(courses);
});

app.post('/enroll', async (req, res) => {
  const customerid = req.body.customer_id;
  const course_id = req.body.course_id;
 
  await course_register.create({customer_id:customerid,course_id:course_id,status:1});
  res.send({
    success:true,message:"enrolled successfully"
});
});

app.post('/unenroll', async (req, res) => {
  const customerid = req.body.customer_id;
  const course_id = req.body.course_id; 
  await course_register.update({status:0},{where:{customer_id:customerid,course_id:course_id}});
  res.send({
    success:true,message:"unenrolled successfully"
});
});
app.post('/checkstatus', async (req, res) => {
  const customerid = req.body.customer_id;
  const course_id = req.body.course_id; 
 const val= await course_register.findOne({where:{customer_id:customerid,course_id:course_id}});
  if(val){
    console.log(val)
    res.send({
      success:true,status:val.status
  });

  }else{
    res.send({
      success:true,status:0
  });
  }
  
});

app.post('/my-courses', async (req, res) => {
  const customerid = req.body.customer_id;
  customer.hasMany(course_register, { foreignKey: 'customer_id' });
course_register.belongsTo(customer, { foreignKey: 'customer_id' });

Course.hasMany(course_register, { foreignKey: 'course_id' });
course_register.belongsTo(Course, { foreignKey: 'id' });
  const user = await course_register.findAll( {  include: [
    // {
    //     model: customer,
    //     attributes: ['name'], // Specify the columns you want from the customer table
    // },
    {
        model: Course,
        attributes: ['course_title','course_id','course_starts','course_ends'], // Specify the columns you want from the course table
    },
],where:{customer_id:customerid} });

  res.json(user);
});

// Sync models with the database and start the server
sequelize.sync().then(() => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
