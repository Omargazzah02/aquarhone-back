const prisma = require ('../prisma/client')


const createReservation = async (req, res) => {
    const activityId = parseInt(req.params.activityId)
  const {date} = req.body;
  const userId = parseInt(req.user.id);


  

  try {
    const activity = await prisma.activity.findUnique({ where: { id: activityId } });

    if (!activity || activity.availableSpots <= 0) {
      return res.status(400).json({ message: 'No spots available' });
    }

    const existingReservation = await prisma.reservation.findFirst({
      where: {
        userId,
        activityId,
      }
    });

    if (existingReservation) {
      return res.status(400).json({ message: 'You already reserved this activity' });
    }

    const reservation = await prisma.reservation.create({
      data: {
        userId,
        activityId,
        date: new Date(date),
        
      }
    });

    await prisma.activity.update({
      where: { id: activityId },
      data: {
        availableSeats: {
          decrement: 1
        }
      }
    });

    res.status(201).json({ message: 'Reservation created', reservation });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};












const getReservationHistory = async (req, res) => {
  try {
    const userId = req.user.id;

    const reservations = await prisma.reservation.findMany({
      where: { userId },
      include: {
        activity: true // Inclure les détails de l’activité
      }
    });

    res.json(reservations);

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
};








module.exports = {createReservation , getReservationHistory}