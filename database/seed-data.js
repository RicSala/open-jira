export const seedData = {
  entries: [
    {
      description:
        "PENDIENTE - lorem ipsum dolor sit amet consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      createdAt: Date.now(),
      status: "pending",
    },
    {
      description: "IN PROGRESS - incididunt ut labore et dolore magna aliqua",
      createdAt: Date.now() - 1000000,
      status: "in-progress",
    },
    {
      description:
        "FINISHED - consectetur adipisicing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua",
      createdAt: Date.now() - 5000000,
      status: "finished",
    },
  ],
};
