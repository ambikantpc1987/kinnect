import type { Page } from 'playwright';

export const pageFixture: { page?: Page } = {
  page: undefined,
};

export function getPage(): Page {
  const p = pageFixture.page;
  if (!p) {
    throw new Error(
      'Playwright page is not initialized. Ensure Cucumber hooks are loaded (--require ./hooks/**/*.ts) and Before hook created the page.'
    );
  }
  return p;
}
