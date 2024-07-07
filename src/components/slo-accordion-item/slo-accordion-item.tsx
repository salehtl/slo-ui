import { Component, Prop, State, h, Element } from '@stencil/core';

@Component({
  tag: 'slo-accordion-item',
  styleUrl: 'slo-accordion-item.css',
  shadow: true,
})
export class SloAccordionItem {
  @Prop() heading: string;
  @Prop() disabled: boolean = false;
  @State() isOpen: boolean = false;
  @Element() el: HTMLElement;

  toggleItem() {
    if (!this.disabled) {
      this.isOpen = !this.isOpen;
    }
  }

  render() {
    return (
      <div class={{ 'accordion-item': true, disabled: this.disabled }}>
        <button
          class="accordion-header"
          onClick={() => this.toggleItem()}
          aria-expanded={this.isOpen.toString()}
          aria-disabled={this.disabled.toString()}
        >
          {this.heading}
        </button>
        <div class={{ 'accordion-content': true, 'is-open': this.isOpen }}>
          <slot></slot>
        </div>
      </div>
    );
  }
}
