const Mutation = {
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