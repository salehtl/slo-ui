import { Component, ComponentInterface, Element, Event, EventEmitter, h, Host, Prop } from '@stencil/core';

/**
 * @name Chip
 * @description Use chips to label, categorize, or organize items using keywords that describe them.
 * @category Data Display
 * @tag controls
 * @example <slo-chip dismissible="true">Important</slo-chip>
 */
@Component({
  tag: 'slo-chip',
  styleUrls: ['slo-chip.css', '../typography.css'],
  shadow: true,
})
export class SloChip implements ComponentInterface {
  /**
   * If true, the chip will have a close icon.
   */
  @Prop({ reflect: true, mutable: true }) dismissible: boolean = false;

  /**
   * Chip value.
   */
  @Prop({ reflect: true }) value: string = '';

  /**
   * If true, the chip will be selected.
   */
  @Prop({ reflect: true, mutable: true }) selected: boolean = false;

  /**
   * Emitted when the chip is clicked.
   */
  @Event({ eventName: 'slo-chip--click' }) sloClick: EventEmitter;

  /**
   * Emitted when the close icon is clicked.
   */
  @Event({ eventName: 'slo-chip--dismiss' }) sloChipDismissClick: EventEmitter;

  @Element() elm!: HTMLElement;

  componentWillLoad() {
    // Ensure that the chip cannot be both dismissible and selectable
    if (this.dismissible) {
      this.selected = false;
    } else if (this.selected) {
      this.dismissible = false;
    }
  }

  private dismissClickHandler = (event: Event) => {
    event.stopPropagation();
    this.sloChipDismissClick.emit({
      value: this.value || this.elm.textContent,
    });
    // Remove the chip from the DOM
    this.elm.remove();
  };

  private chipClickHandler = () => {
    if (!this.dismissible) {
      this.selected = !this.selected;
      this.sloClick.emit({ value: this.value || this.elm.textContent });
    }
  };

  renderCloseButton() {
    if (this.dismissible) {
      return (
        <button class="close-btn" onClick={this.dismissClickHandler}>
          <span class="close-btn-icon">&times;</span>
        </button>
      );
    }
  }

  render() {
    return (
      <Host>
        <div
          class={{
            chip: true,
            selected: this.selected,
            dismissible: this.dismissible,
          }}
          onClick={this.chipClickHandler}
        >
          <div class="chip-content">
            <small><slot /></small>
          </div>
          {this.renderCloseButton()}
        </div>
      </Host>
    );
  }
}
