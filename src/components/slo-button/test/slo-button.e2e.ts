import { newE2EPage } from '@stencil/core/testing';

describe('slo-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<slo-button></slo-button>');

    const element = await page.find('slo-button');
    expect(element).toHaveClass('hydrated');
  });
});
