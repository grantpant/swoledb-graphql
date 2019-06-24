import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import verifyUser from '../utils/verifyUser';

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
  async login(parent, args, { prisma, request }, info) {
    const user = await prisma.query.user({
      where: { username: args.data.username }
    });

    if (!user) {
      throw new Error('Login failed');
    }

    const passwordVerified = await bcrypt.compare(args.data.password, user.password);

    if (!passwordVerified) {
      throw new Error('Login failed');
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: '7 days' }
    );

    return {
      user,
      token
    }
  },
  createExercise(parent, args, { prisma, request }, info) {
    const { name, bodySection, primaryMover, movementType, trainingPhases, workoutTypes, equipment } = args.data;

    const userId = verifyUser(request);

    return prisma.mutation.createExercise({
      data: {
        name,
        bodySection,
        primaryMover,
        movementType,
        trainingPhases: trainingPhases ? { create: trainingPhases } : null,
        workoutTypes: workoutTypes ? { create: workoutTypes } : null,
        equipment: equipment ? { create: equipment } : null,
        owner: {
          connect: { id: userId }
        }
      }
    }, info);

    // // Dummy response for testing
    // return {
    //   name: 'Dirty Sanchez',
    //   owner: {
    //     id: '2',
    //     username: 'number2'
    //   }
    // };
  },
  updateExercise(parent, args, { prisma }, info) {
    console.log('AAAAARRRRGGGGSS: ', JSON.stringify(args, undefined, 2))

    return prisma.mutation.updateExercise(args, info);
  }
};

export default Mutation;