// This file is going to replicating
export const getAvailableTables = () => ({
  table1: {
    tableName: "table1",
    tableColumns: [
      "Column 1",
      "Column 2",
      "Column 3",
      "Column 4",
      "Column 5",
      "Column 6",
      "Column 7",
      "Column 8",
      "Column 9",
      "Column 10",
      "Column 11",
      "Column 12"
    ],
    description: "Lorem ipsum dolor sit amet, consectetuer adipiscing elit",
    tagName: "Free Text"
  }
});

// [
//   "moduleId",
//   "title",
//   "Zero case text",
//   "instructions",
//   "moduleType",
//   "limits",
//   "hyperLinks (optional)",
//   "length",
// "hasLink"
// ],
export const fake_db = {
  1: {
    moduleId: "1",
    title: "What I do",
    zeroTextCase:
      "I am the project manager for Talent Insights responsible for understanding the user, our competitors, and our team's abilities and needs and defining winning products that will delight our customers.",
    instructions:
      "Think about what you do at work and on your team and describe it in clear, simple details",
    moduleType: "Free Text",
    charLimit: 250,
    hasLink: false,
    hyperLink: ""
  },
  2: {
    moduleId: "2",
    title: "Why it matters",
    zeroTextCase:
      "My work is important because... (e.g. someone has to be the voice of the customer and be creative and disciplined in leading the team towards products that will win in the marketplace)",
    instructions:
      "Tell your teammates and co-workers why you're work is meaningful and important",
    moduleType: "Free Text",
    charLimit: 250,
    hasLink: false,
    hyperLink: ""
  },
  3: {
    moduleId: "3",
    title: "What success looks like",
    zeroTextCase:
      "Success in my role means that... (e.g. the team has clear focused projects each week, we're building products that create high levels of user engagement, frequent use, and social sharing)",
    instructions:
      "Tell your teammates (and yourself) what success at your job looks like",
    moduleType: "Free Text",
    charLimit: 250,
    hasLink: true,
    hyperLink: "https://www.think2perform.com/values/#start"
  }
};

export const fake_db_copy = {
  1: {
    moduleId: "1",
    title: "What I do",
    zeroTextCase:
      "I am the project manager for Talent Insights responsible for understanding the user, our competitors, and our team's abilities and needs and defining winning products that will delight our customers.",
    instructions:
      "Think about what you do at work and on your team and describe it in clear, simple details",
    moduleType: "Free Text",
    charLimit: 250,
    hasLink: false
  },
  2: {
    moduleId: "2",
    title: "Why it matters",
    zeroTextCase:
      "My work is important because... (e.g. someone has to be the voice of the customer and be creative and disciplined in leading the team towards products that will win in the marketplace)",
    instructions:
      "Tell your teammates and co-workers why you're work is meaningful and important",
    moduleType: "Free Text",
    charLimit: 250,
    hasLink: false
  },
  3: {
    moduleId: "3",
    title: "What success looks like",
    zeroTextCase:
      "Success in my role means that... (e.g. the team has clear focused projects each week, we're building products that create high levels of user engagement, frequent use, and social sharing)",
    instructions:
      "Tell your teammates (and yourself) what success at your job looks like",
    moduleType: "Free Text",
    charLimit: 250,
    hasLink: false
  },
  4: {
    moduleId: "4",
    title: "4 Words",
    zeroTextCase: "I can be described as...",
    instructions:
      "Think about your personality and how you are at work (creative, strategic, goal-oriented, hard-working, etc)... and then pick 4 words to describe yourself",
    moduleType: "List",
    limits: "3-5 items",
    charLimit: 50,
    hasLink: false
  },
  5: {
    moduleId: "5",
    title: "What motivates me",
    zeroTextCase:
      "Supporting others, creating new things, delighting teammates and customers",
    instructions: "3-5 items",
    moduleType: "List",
    charLimit: 100,
    hasLink: false
  },
  6: {
    moduleId: "6",
    title: "Values Sort",
    zeroTextCase:
      "My top 4 values are:\n• Creativity\n• Hard-working\n• Family-oriented\n• Fun (and humor)",
    instructions:
      "Try this outsmoduleIde values sort activity (click the link) and then list your top 3-4 values for your teammates.\n\n\n",
    moduleType: "List",
    limits: "3-5 items",
    charLimit: 50,
    hyperLinks: "https://www.think2perform.com/values/#start",
    hasLink: true
  }
};

export const availableTypes = ["Free Text"];
