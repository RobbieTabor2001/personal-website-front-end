/**
 * @typedef {Object} Position
 * Conforms to https://jsonresume.org/schema/
 *
 * @property {string} name - Name of the company
 * @property {string} position - Position title
 * @property {string} url - Company website
 * @property {string} startDate - Start date of the position in YYYY-MM-DD format
 * @property {string|undefined} endDate - End date of the position in YYYY-MM-DD format.
 * If undefined, the position is still active.
 * @property {string|undefined} summary - html/markdown summary of the position
 * @property {string[]} highlights - plain text highlights of the position (bulleted list)
 */
const work = [
  {
    name: 'Blueport Commerce',
    position: 'Software Engineer Co-op',
    url: 'https://www.blueport.com/',
    startDate: '2022-01-01',
    endDate: '2022-07-01',
    summary: '',
    highlights: [
      'Specialized in backend development with expertise in cloud microservices and SQL server database management for a multi-client E-commerce platform.',
      'Pioneered the backend development for refactoring a client-facing application, enabling robust inventory management, sales and promotions tracking, and content customization functionalities.',
      'Devised and created new API endpoints to unify shopping carts across sessions, thereby improving user experience.',
      'Engineered a library to seamlessly integrate client’s POS systems, enhancing the application\'s overall functionality.',
    ],
  },
  {
    name: 'The Attic Vintage',
    position: 'Pricing and Sourcing Associate',
    url: 'https://www.instagram.com/atticvintagema/', // Assuming URL is not provided
    startDate: '2022-01-01',
    endDate: '2022-07-01',
    summary: '',
    highlights: [
      'Managed store operations independently during weekdays, ensuring smooth customer experiences and transactions.',
      'Implemented innovative sourcing and pricing strategies, significantly expanding the store\'s vintage clothing selection and enhancing profit margins on key items.',
      'Contributed to the store\'s dynamic social media presence, leading efforts in online sales initiatives and crafting engagement-driven posts that bolstered customer interaction and community growth.',
    ],
  },
];

export default work;
