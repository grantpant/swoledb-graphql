import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const Mutation = {
  async createUser(parent, args, { prisma }, info) {
    const createUserInput = {
      data: {
        ...args.data,
        password: await bcrypt.hash(args.data.password, 10)
      }
    };

    const user = await prisma.mutation.createUser(createUserInput);

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7 days' }
    );

    return {
      user,
      token
    };
  },
  async createExercise(parent, args, { prisma }, info) {
    const { name, bodySection, primaryMover, movementType, trainingPhases, workoutTypes, equipment } = args.data;

    return await prisma.mutation.createExercise({
      data: {
        name,
        bodySection,
        primaryMover,
        movementType,
        trainingPhases: trainingPhases ? { create: trainingPhases } : null,
        workoutTypes: workoutTypes ? { create: workoutTypes } : null,
        equipment: equipment ? { create: equipment } : null
      }
    }, info);
  }
};

export default Mutation;