const Query = {
  exercises(parent, args, { prisma }, info) {
    return prisma.query.exercises(args, info);
  }
};

export default Query;