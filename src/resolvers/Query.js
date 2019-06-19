import verifyUser from '../utils/verifyUser';

const Query = {
  exercises(parent, args, { prisma, request }, info) {
    const userId = verifyUser(request);

    if (!args.where) {
      args.where = {
        owner: { id: userId }
      }
    } else {
      args.where.AND.push({
        owner: { id: userId }
      });
    }

    return prisma.query.exercises(args, info);
  },
  exercise(parent, args, { prisma }, info) {
    return prisma.query.exercise(args, info);
  }
};

export default Query;