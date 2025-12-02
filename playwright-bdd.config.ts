import { defineBddConfig } from 'playwright-bdd';

export default defineBddConfig({
  features: ['./features/**/*.feature'],
  steps: ['./step-definitions/**/*.ts'],
  tags: '@smoke or @regression'
});
