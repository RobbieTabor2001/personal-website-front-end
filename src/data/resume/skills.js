const skills = [
  {
    title: 'Javascript',
    competency: 4,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'Node.JS',
    competency: 4,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'React',
    competency: 3,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Next.JS',
    competency: 3,
    category: ['Web Development', 'Javascript'],
  },
  {
    title: 'Bash',
    competency: 4,
    category: ['Tools', 'Languages'],
  },
  {
    title: 'Amazon Web Services',
    competency: 3,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'Heroku',
    competency: 3,
    category: ['Web Development', 'Tools'],
  },
  {
    title: 'MongoDB',
    competency: 3,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'PostgreSQL/SQLite3/SQL/Redshift',
    competency: 4,
    category: ['Web Development', 'Databases', 'Languages'],
  },
  {
    title: 'Redis',
    competency: 1,
    category: ['Web Development', 'Databases'],
  },
  {
    title: 'Git',
    competency: 4,
    category: ['Tools'],
  },
  {
    title: 'AWS',
    competency: 3,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Docker',
    competency: 3,
    category: ['Tools', 'Data Engineering'],
  },
  {
    title: 'Typescript',
    competency: 2,
    category: ['Web Development', 'Languages', 'Javascript'],
  },
  {
    title: 'HTML + SASS/SCSS/CSS',
    competency: 4,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'Python',
    competency: 2,
    category: ['Languages', 'Python', 'ML Engineering'],
  },
  {
    title: 'C++',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'R',
    competency: 2,
    category: ['Languages'],
  },
  // Adding missing skills below
  {
    title: 'C#',
    competency: 3,
    category: ['Languages'],
  },
  {
    title: 'Swift',
    competency: 3,
    category: ['Languages'],
  },
  // SQL is covered in PostgreSQL but adding as a general skill
  {
    title: 'SQL',
    competency: 3,
    category: ['Languages', 'Databases'],
  },
  {
    title: 'Java',
    competency: 4,
    category: ['Languages'],
  },
  // HTML and CSS are grouped under 'HTML + SASS/SCSS/CSS' but adding separately for clarity
  {
    title: 'HTML',
    competency: 3,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'CSS',
    competency: 3,
    category: ['Web Development', 'Languages'],
  },
  {
    title: 'PowerShell',
    competency: 3,
    category: ['Languages', 'Tools'],
  },
  // Adding tools and concepts
  {
    title: 'Jira',
    competency: 3,
    category: ['Tools'],
  },
  {
    title: 'BoomRPC',
    competency: 3,
    category: ['Tools', 'Web Development'],
  },
  {
    title: 'Stata',
    competency: 3,
    category: ['Tools', 'Data Engineering'],
  },
  // Concepts
  {
    title: 'Data Structures',
    competency: 3,
    category: ['Concepts'],
  },
  {
    title: 'Object Oriented Programming',
    competency: 3,
    category: ['Concepts'],
  },
  {
    title: 'Database Design',
    competency: 3,
    category: ['Concepts', 'Databases'],
  },
  {
    title: 'Lambda Functions',
    competency: 3,
    category: ['Concepts'],
  },
  {
    title: 'Restful APIs',
    competency: 3,
    category: ['Concepts', 'Web Development'],
  },
].map((skill) => ({ ...skill, category: skill.category.sort() }));


// this is a list of colors that I like. The length should be === to the
// number of categories. Re-arrange this list until you find a pattern you like.
const colors = [
  '#6968b3',
  '#37b1f5',
  '#40494e',
  '#515dd4',
  '#e47272',
  '#cc7b94',
  '#3896e2',
  '#c3423f',
  '#d75858',
  '#747fff',
  '#64cb7b',
];

const categories = [
  ...new Set(skills.flatMap(({ category }) => category)),
].sort().map((category, index) => ({
  name: category,
  color: colors[index],
}));

export { categories, skills };
