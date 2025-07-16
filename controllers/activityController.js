const prisma = require('../prisma/client'); 



const getAvailableActivities = async (req , res) => {

    const userId = req.user.id;
    try {

         const activities = await prisma.activity.findMany({
      where: {
        availableSeats: {
          gt: 0
        }
      }
    });

    const userReservations = await prisma.reservation.findMany({
      where: { userId }
    });

    const reservedActivityIds = new Set(userReservations.map(r => r.activityId));

    const activitiesWithReserved = activities.map(activity => ({
      ...activity,
      reserved: reservedActivityIds.has(activity.id)
    }));

    res.json(activitiesWithReserved);


    } catch(err) {
        console.log(err)
 res.status(500).json({ message: 'Internal server error' });


    }
}







const getActivityById = async (req , res) => {
   const activityId = req.params.activityId ; 

    try {
        const activity = await prisma.activity.findUnique({
            where:  {id : parseInt(activityId)}
        })


        
    if (!activity) {
      return res.status(404).json({ message: 'Activity not found' });
    }


     res.json(activity);



    } catch(err) {

       res.status(500).json({ message: 'Internal server error' });


    }
}










//admin




const addActivity = async (req, res) => {
  const { name, description, type, availableSeats, image, price, location } = req.body;

  try {
    const activity = await prisma.activity.create({
      data: {
        name,
        description,
        type,
        image,
        availableSeats,
        price,
        location,
      },
    });
    res.status(201).json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};






const updateActivity = async (req, res) => {
  const  activityId  = req.params.activityId;
  const { name, description, type, image, availableSeats, price, location } = req.body;

  try {
    const activity = await prisma.activity.update({
      where: { id: Number(activityId) },
      data: {
        name,
        description,
        type,
        image,
        availableSeats : parseInt(availableSeats),
        price : Number(price),
        location,
      },
    });
    res.json(activity);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




const deleteActivity = async (req, res) => {
  const activityId  = req.params.activityId;

  try {
    await prisma.activity.delete({
      where: { id: Number(activityId) },
    });
    res.json({ message: 'Activity deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};




module.exports ={getAvailableActivities, getActivityById,addActivity,updateActivity , deleteActivity}
