const Query = {
  async exercises(parent, args, { prisma }) {
    return await prisma.query.exercises(null, '{ name }');
  }
};

export default Query;