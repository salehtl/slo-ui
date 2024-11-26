import { newSpecPage } from '@stencil/core/testing';
import { SloButton } from '../slo-button';

describe('slo-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [SloButton],
      html: `<slo-button></slo-button>`,
    });
    expect(page.root).toEqualHtml(`
      <slo-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </slo-button>
    `);
  });
});
