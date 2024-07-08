import { newSpecPage } from '@stencil/core/testing';
import { SloChip } from '../slo-chip';

describe('slo-chip', () => {
  it('renders without the dismiss button when dismissible is false', async () => {
    const page = await newSpecPage({
      components: [SloChip],
      html: `<slo-chip>Test Chip</slo-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <slo-chip>
        <mock:shadow-root>
          <div class="chip" selected="false" dismissible="false">
            <div class="chip-content">
              <small><slot></slot></small>
            </div>
          </div>
        </mock:shadow-root>
        Test Chip
      </slo-chip>
    `);
  });

  it('renders with the dismiss button when dismissible is true', async () => {
    const page = await newSpecPage({
      components: [SloChip],
      html: `<slo-chip dismissible="true">Test Chip</slo-chip>`,
    });
    expect(page.root).toEqualHtml(`
      <slo-chip dismissible="true">
        <mock:shadow-root>
          <div class="chip dismissible" selected="false">
            <div class="chip-content">
              <small><slot></slot></small>
            </div>
            <button class="close-btn">
              <span class="close-btn-icon">&times;</span>
            </button>
          </div>
        </mock:shadow-root>
        Test Chip
      </slo-chip>
    `);
  });

  it('emits slo-chip--click event when clicked', async () => {
    const page = await newSpecPage({
      components: [SloChip],
      html: `<slo-chip>Test Chip</slo-chip>`,
    });
    const chip = page.root.shadowRoot.querySelector('.chip') as HTMLElement;
    const clickEvent = new Event('slo-chip--click');
    const spy = jest.spyOn(page.rootInstance.sloClick, 'emit');

    chip.dispatchEvent(clickEvent);
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('emits slo-chip--dismiss event when dismiss button clicked', async () => {
    const page = await newSpecPage({
      components: [SloChip],
      html: `<slo-chip dismissible="true">Test Chip</slo-chip>`,
    });
    const closeButton = page.root.shadowRoot.querySelector('.close-btn') as HTMLElement;
    const dismissEvent = new Event('slo-chip--dismiss');
    const spy = jest.spyOn(page.rootInstance.sloChipDismissClick, 'emit');

    closeButton.dispatchEvent(dismissEvent);
    await page.waitForChanges();

    expect(spy).toHaveBeenCalled();
  });

  it('does not toggle selected state when dismissible is true', async () => {
    const page = await newSpecPage({
      components: [SloChip],
      html: `<slo-chip dismissible="true">Test Chip</slo-chip>`,
    });
    const chip = page.root.shadowRoot.querySelector('.chip') as HTMLElement;
    chip.click();
    await page.waitForChanges();

    expect(page.rootInstance.selected).toBe(false);
  });

  it('toggles selected state when dismissible is false', async () => {
    const page = await newSpecPage({
      components: [SloChip],
      html: `<slo-chip>Test Chip</slo-chip>`,
    });
    const chip = page.root.shadowRoot.querySelector('.chip') as HTMLElement;
    chip.click();
    await page.waitForChanges();

    expect(page.rootInstance.selected).toBe(true);

    chip.click();
    await page.waitForChanges();

    expect(page.rootInstance.selected).toBe(false);
  });
});
